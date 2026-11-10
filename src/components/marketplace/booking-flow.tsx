"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Calendar, 
  Clock, 
  CreditCard, 
  User, 
  MapPin, 
  Users, 
  Gift, 
  Tag, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Star,
  Wifi,
  Car,
  Coffee
} from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface TimeSlot {
  time: string
  available: boolean
}

interface Service {
  id: string
  name: string
  duration: string
  price: number
  provider: {
    name: string
    rating: number
    image: string
  }
}

interface Venue {
  id: string
  name: string
  capacity: number
  hourlyRate: number
  amenities: string[]
}

interface BookingFlowProps {
  isOpen: boolean
  onClose: () => void
  type: 'service' | 'venue'
  service?: Service
  venue?: Venue
}

const timeSlots: TimeSlot[] = [
  { time: '9:00', available: true },
  { time: '10:00', available: false },
  { time: '11:00', available: true },
  { time: '12:00', available: true },
  { time: '13:00', available: true },
  { time: '14:00', available: false },
  { time: '15:00', available: true },
  { time: '16:00', available: true },
  { time: '17:00', available: true }
]

const sampleService: Service = {
  id: '1',
  name: 'Глубокий тканевой массаж',
  duration: '60 минут',
  price: 8400,
  provider: {
    name: 'Сара Джонсон',
    rating: 4.9,
    image: '/api/placeholder/48/48'
  }
}

const sampleVenue: Venue = {
  id: '1',
  name: 'Студия Спокойствия',
  capacity: 15,
  hourlyRate: 5950,
  amenities: ['WiFi', 'Парковка', 'Напитки', 'Звуковая система']
}

export default function BookingFlow({ 
  isOpen, 
  onClose, 
  type = 'service',
  service = sampleService,
  venue = sampleVenue 
}: BookingFlowProps) {
  const { t, language } = useLanguage()
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [guestCount, setGuestCount] = useState(1)
  const [isGiftCard, setIsGiftCard] = useState(false)
  const [promoCode, setPromoCode] = useState('')
  const [customerDetails, setCustomerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    billingAddress: ''
  })

  const steps = [
    { number: 1, title: t('booking.selectDate'), icon: Calendar },
    { number: 2, title: t('booking.guestInfo'), icon: User },
    { number: 3, title: t('booking.payment'), icon: CreditCard },
    { number: 4, title: t('booking.confirmation'), icon: Check }
  ]

  const generateCalendarDays = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }
    return days
  }

  const calendarDays = generateCalendarDays()

  const calculateTotal = () => {
    if (type === 'service') {
      return service.price
    } else {
      return venue.hourlyRate * 2 // Assuming 2-hour minimum
    }
  }

  const handleNextStep = () => {
    setStep(prevStep => Math.min(4, prevStep + 1))
  }
  
  const handlePrevStep = () => {
    setStep(prevStep => Math.max(1, prevStep - 1))
  }

  const handleDateSelect = (date: Date) => {
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()
    const isPast = date < today && !isToday
    
    if (!isPast) {
      setSelectedDate(date)
    }
  }

  const handleTimeSelect = (time: string, available: boolean) => {
    if (available) {
      setSelectedTime(time)
    }
  }

  const handleGuestCountChange = (increment: boolean) => {
    if (increment) {
      setGuestCount(prev => Math.min(venue.capacity, prev + 1))
    } else {
      setGuestCount(prev => Math.max(1, prev - 1))
    }
  }

  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setSelectedDate(null)
      setSelectedTime('')
      setGuestCount(1)
      setIsGiftCard(false)
      setPromoCode('')
      setCustomerDetails({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialRequests: ''
      })
      setPaymentDetails({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        nameOnCard: '',
        billingAddress: ''
      })
    }
  }, [isOpen])

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi': return Wifi
      case 'парковка': case 'parking': return Car
      case 'напитки': case 'refreshments': return Coffee
      default: return Check
    }
  }

  const isStep1Valid = selectedDate && selectedTime
  const isStep2Valid = customerDetails.firstName && customerDetails.lastName && customerDetails.email
  const isStep3Valid = paymentDetails.cardNumber && paymentDetails.nameOnCard

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card/95 backdrop-blur-sm sm:max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 rounded-lg" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12" />
        
        <div className="relative z-10">
          <DialogHeader className="bg-background/80 backdrop-blur-sm border-b border-border p-6">
            <DialogTitle className="text-2xl font-semibold text-foreground mb-4">
              {t('booking.title')}
            </DialogTitle>
            
            <div className="flex items-center justify-between">
              {steps.map((stepItem, index) => (
                <div key={stepItem.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    step >= stepItem.number
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-background border-muted-foreground text-muted-foreground'
                  }`}>
                    {step > stepItem.number ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <stepItem.icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`ml-2 text-sm font-medium transition-colors duration-300 ${
                    step >= stepItem.number ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {stepItem.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-px mx-4 transition-colors duration-300 ${
                      step > stepItem.number ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </DialogHeader>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">{t('booking.selectDate')}</h3>
                      <div className="bg-background rounded-lg p-4 border border-border">
                        <div className="grid grid-cols-7 gap-2 mb-4">
                          {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map((day) => (
                            <div key={day} className="text-xs font-medium text-muted-foreground text-center py-2">
                              {day}
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                          {calendarDays.map((date, index) => {
                            const today = new Date()
                            const isToday = date.toDateString() === today.toDateString()
                            const isCurrentMonth = date.getMonth() === today.getMonth()
                            const isPast = date < today && !isToday
                            const isSelected = selectedDate?.toDateString() === date.toDateString()
                            
                            return (
                              <button
                                key={index}
                                onClick={() => handleDateSelect(date)}
                                disabled={isPast}
                                className={`h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 ${
                                  isSelected
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : isToday
                                    ? 'bg-primary/20 text-primary border border-primary/50'
                                    : isPast
                                    ? 'text-muted-foreground cursor-not-allowed'
                                    : isCurrentMonth
                                    ? 'text-foreground hover:bg-accent'
                                    : 'text-muted-foreground'
                                }`}
                              >
                                {date.getDate()}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-foreground">{t('booking.selectTime')}</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.time}
                            onClick={() => handleTimeSelect(slot.time, slot.available)}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
                              selectedTime === slot.time
                                ? 'bg-primary text-primary-foreground border-primary shadow-md'
                                : slot.available
                                ? 'bg-background border-border hover:bg-accent text-foreground'
                                : 'bg-muted text-muted-foreground border-muted cursor-not-allowed'
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {type === 'venue' && (
                    <div className="mt-6">
                      <Label htmlFor="guestCount" className="text-sm font-medium text-foreground">
                        Количество гостей
                      </Label>
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => handleGuestCountChange(false)}
                          className="w-10 h-10 rounded-lg border border-border hover:bg-accent flex items-center justify-center transition-colors"
                          type="button"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-semibold text-foreground">{guestCount}</span>
                        <button
                          onClick={() => handleGuestCountChange(true)}
                          className="w-10 h-10 rounded-lg border border-border hover:bg-accent flex items-center justify-center transition-colors"
                          type="button"
                        >
                          +
                        </button>
                        <span className="text-sm text-muted-foreground ml-2">
                          Максимум {venue.capacity} гостей
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 p-4 bg-accent/50 rounded-lg border border-border">
                    {type === 'service' ? (
                      <div className="flex items-start gap-4">
                        <img
                          src={service.provider.image}
                          alt={service.provider.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{service.name}</h4>
                          <p className="text-sm text-muted-foreground">с {service.provider.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-primary text-primary" />
                              <span className="text-sm font-medium text-foreground">{service.provider.rating}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.duration}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">
                            {language === 'ru' ? `${service.price} ₽` : `$${(service.price / 70).toFixed(2)}`}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-foreground">{venue.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              <Users className="w-4 h-4 inline mr-1" />
                              До {venue.capacity} гостей
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-foreground">
                              {language === 'ru' ? `${venue.hourlyRate} ₽/час` : `$${(venue.hourlyRate / 70).toFixed(2)}/час`}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {venue.amenities.map((amenity) => {
                            const IconComponent = getAmenityIcon(amenity)
                            return (
                              <Badge key={amenity} variant="outline" className="text-xs">
                                <IconComponent className="w-3 h-3 mr-1" />
                                {amenity}
                              </Badge>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-foreground">Ваша информация</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium text-foreground">{t('booking.firstName')}</Label>
                      <Input
                        id="firstName"
                        value={customerDetails.firstName}
                        onChange={(e) => setCustomerDetails({...customerDetails, firstName: e.target.value})}
                        className="h-12 bg-background border-border"
                        placeholder="Введите имя"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium text-foreground">{t('booking.lastName')}</Label>
                      <Input
                        id="lastName"
                        value={customerDetails.lastName}
                        onChange={(e) => setCustomerDetails({...customerDetails, lastName: e.target.value})}
                        className="h-12 bg-background border-border"
                        placeholder="Введите фамилию"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-foreground">{t('booking.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerDetails.email}
                        onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                        className="h-12 bg-background border-border"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-foreground">{t('booking.phone')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                        className="h-12 bg-background border-border"
                        placeholder="+7 (999) 123-45-67"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialRequests" className="text-sm font-medium text-foreground">{t('booking.specialRequests')}</Label>
                    <Textarea
                      id="specialRequests"
                      value={customerDetails.specialRequests}
                      onChange={(e) => setCustomerDetails({...customerDetails, specialRequests: e.target.value})}
                      className="min-h-[100px] bg-background border-border"
                      placeholder="Особые требования или пожелания..."
                    />
                  </div>

                  <div className="p-4 bg-accent/30 rounded-lg border border-border">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="giftCard"
                        checked={isGiftCard}
                        onCheckedChange={(checked) => setIsGiftCard(checked as boolean)}
                      />
                      <Label htmlFor="giftCard" className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Gift className="w-4 h-4 text-primary" />
                        Это покупка подарочного сертификата
                      </Label>
                    </div>
                    {isGiftCard && (
                      <p className="text-sm text-muted-foreground mt-2 ml-7">
                        Данные подарочного сертификата будут отправлены на указанный email.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promoCode" className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Tag className="w-4 h-4 text-primary" />
                      Промокод (необязательно)
                    </Label>
                    <Input
                      id="promoCode"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="h-12 bg-background border-border"
                      placeholder="Введите промокод"
                    />
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-foreground">Информация для оплаты</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber" className="text-sm font-medium text-foreground">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                        className="h-12 bg-background border-border"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate" className="text-sm font-medium text-foreground">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={paymentDetails.expiryDate}
                          onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                          className="h-12 bg-background border-border"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv" className="text-sm font-medium text-foreground">CVV</Label>
                        <Input
                          id="cvv"
                          value={paymentDetails.cvv}
                          onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                          className="h-12 bg-background border-border"
                          placeholder="123"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard" className="text-sm font-medium text-foreground">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={paymentDetails.nameOnCard}
                        onChange={(e) => setPaymentDetails({...paymentDetails, nameOnCard: e.target.value})}
                        className="h-12 bg-background border-border"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="billingAddress" className="text-sm font-medium text-foreground">Billing Address</Label>
                      <Textarea
                        id="billingAddress"
                        value={paymentDetails.billingAddress}
                        onChange={(e) => setPaymentDetails({...paymentDetails, billingAddress: e.target.value})}
                        className="min-h-[80px] bg-background border-border"
                        placeholder="123 Main St, City, State 12345"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-accent/30 rounded-lg border border-border">
                    <h4 className="font-semibold text-foreground mb-3">Сводка заказа</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {type === 'service' ? service.name : `${venue.name} (2 часа)`}
                        </span>
                        <span className="font-medium text-foreground">
                          {language === 'ru' ? `${calculateTotal()} ₽` : `$${(calculateTotal() / 70).toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Сервисный сбор</span>
                        <span className="font-medium text-foreground">
                          {language === 'ru' ? '350 ₽' : '$5'}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">Итого</span>
                        <span className="text-foreground">
                          {language === 'ru' ? `${calculateTotal() + 350} ₽` : `$${((calculateTotal() + 350) / 70).toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center space-y-6"
                >
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-10 h-10 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{t('booking.thankYou')}</h3>
                    <p className="text-muted-foreground">
                      Ваше бронирование успешно подтверждено.
                    </p>
                  </div>

                  <div className="p-4 bg-accent/30 rounded-lg border border-border text-left">
                    <h4 className="font-semibold text-foreground mb-3">Детали бронирования</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Дата и время</span>
                        <span className="font-medium text-foreground">
                          {selectedDate?.toLocaleDateString('ru-RU')} в {selectedTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          {type === 'service' ? 'Услуга' : 'Заведение'}
                        </span>
                        <span className="font-medium text-foreground">
                          {type === 'service' ? service.name : venue.name}
                        </span>
                      </div>
                      {type === 'venue' && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Гости</span>
                          <span className="font-medium text-foreground">{guestCount}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Итого</span>
                        <span className="font-semibold text-foreground">
                          {language === 'ru' ? `${calculateTotal() + 350} ₽` : `$${((calculateTotal() + 350) / 70).toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {t('booking.confirmationEmail')} {customerDetails.email}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between pt-6 mt-6 border-t border-border">
              {step > 1 && step < 4 && (
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  className="flex items-center gap-2"
                  type="button"
                >
                  <ChevronLeft className="w-4 h-4" />
                  {t('booking.previous')}
                </Button>
              )}
              
              {step < 3 && (
                <Button
                  onClick={handleNextStep}
                  disabled={
                    (step === 1 && !isStep1Valid) ||
                    (step === 2 && !isStep2Valid)
                  }
                  className="ml-auto flex items-center gap-2 bg-primary hover:bg-primary/90"
                  type="button"
                >
                  {t('booking.next')}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}

              {step === 3 && (
                <Button
                  onClick={handleNextStep}
                  disabled={!isStep3Valid}
                  className="ml-auto bg-primary hover:bg-primary/90"
                  type="button"
                >
                  {t('booking.complete')}
                </Button>
              )}

              {step === 4 && (
                <Button
                  onClick={onClose}
                  className="mx-auto bg-primary hover:bg-primary/90"
                  type="button"
                >
                  Готово
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}