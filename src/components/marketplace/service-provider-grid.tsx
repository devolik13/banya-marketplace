"use client"

import { useState, useMemo, useCallback, memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Play, MessageCircle, User, MapPin, Filter } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { MasterProfileModal } from "./master-profile-modal"
import { useDebounce } from "@/hooks/use-debounce"

interface ServiceProvider {
  id: string
  name: string
  title: string
  image: string
  hasVideo: boolean
  specialties: string[]
  rating: number
  reviewCount: number
  hourlyRate: number
  location: string
  availability: string
  gender: "male" | "female"
  experience: number
}

const mockProviders: ServiceProvider[] = [
  {
    id: "1",
    name: "Елена Волкова",
    title: "Мастер банных процедур",
    image: "/api/placeholder/120/120",
    hasVideo: true,
    specialties: ["Традиционная баня", "Оздоровительная терапия"],
    rating: 4.9,
    reviewCount: 127,
    hourlyRate: 85,
    location: "Московский район",
    availability: "Доступен сегодня",
    gender: "female",
    experience: 8,
  },
  {
    id: "2",
    name: "Дмитрий Петров",
    title: "Мастер терапевтической сауны",
    image: "/api/placeholder/120/120",
    hasVideo: true,
    specialties: ["Глубокий тканевой массаж", "Ароматерапия"],
    rating: 4.8,
    reviewCount: 89,
    hourlyRate: 75,
    location: "Центральный район",
    availability: "Доступен завтра",
    gender: "male",
    experience: 5,
  },
  {
    id: "3",
    name: "Анна Козлова",
    title: "Специалист по оздоровлению и детоксу",
    image: "/api/placeholder/120/120",
    hasVideo: false,
    specialties: ["Детокс-программы", "Фитотерапия"],
    rating: 4.7,
    reviewCount: 156,
    hourlyRate: 95,
    location: "СПА-квартал",
    availability: "Предварительная запись",
    gender: "female",
    experience: 3,
  },
  {
    id: "4",
    name: "Виктор Соколов",
    title: "Традиционный целитель",
    image: "/api/placeholder/120/120",
    hasVideo: true,
    specialties: ["Традиционная баня", "Восстановление мышц"],
    rating: 4.9,
    reviewCount: 203,
    hourlyRate: 110,
    location: "Исторический район",
    availability: "Доступен сегодня",
    gender: "male",
    experience: 10,
  },
  {
    id: "5",
    name: "Катя Романова",
    title: "Тренер целостного оздоровления",
    image: "/api/placeholder/120/120",
    hasVideo: true,
    specialties: ["Оздоровительная терапия", "Медитация"],
    rating: 4.6,
    reviewCount: 94,
    hourlyRate: 70,
    location: "Оздоровительный центр",
    availability: "Доступна сегодня",
    gender: "female",
    experience: 2,
  },
  {
    id: "6",
    name: "Сергей Иванов",
    title: "Специалист по спортивному восстановлению",
    image: "/api/placeholder/120/120",
    hasVideo: false,
    specialties: ["Восстановление мышц", "Спортивная терапия"],
    rating: 4.8,
    reviewCount: 167,
    hourlyRate: 90,
    location: "Спортивный район",
    availability: "Доступен завтра",
    gender: "male",
    experience: 6,
  }
]

const convertToMaster = (provider: ServiceProvider): import("./master-profile-modal").Master => ({
  ...provider,
  image: provider.image,
  videoUrl: provider.hasVideo ? '/api/placeholder/video.mp4' : undefined,
  specialties: provider.specialties,
  rating: provider.rating,
  reviewCount: provider.reviewCount,
  hourlyRate: provider.hourlyRate,
  location: provider.location,
  availability: provider.availability,
  services: provider.specialties,
})

// Memoized provider card component
const ProviderCard = memo(({ 
  provider, 
  language, 
  t, 
  onViewProfile 
}: {
  provider: ServiceProvider
  language: string
  t: (key: string) => string
  onViewProfile: (master: import("./master-profile-modal").Master) => void
}) => {
  const handleProfileClick = useCallback(() => {
    onViewProfile(convertToMaster(provider))
  }, [provider, onViewProfile])

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-card border-2 border-secondary/20 hover:border-primary/30 overflow-hidden">
      <CardContent className="p-6">
        {/* Profile Image and Video Overlay */}
        <div className="relative mb-4 flex justify-center">
          <div className="relative">
            <button
              className="block w-24 h-24 rounded-full overflow-hidden border-4 border-secondary/20 group-hover:border-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={handleProfileClick}
              aria-label={`Подробнее о мастере ${provider.name}`}
              type="button"
            >
              <img
                src={provider.image}
                alt={provider.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {provider.hasVideo && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/25 rounded-full">
                  <div className="bg-primary text-primary-foreground rounded-full p-2">
                    <Play className="w-4 h-4 fill-current" />
                  </div>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Master Info */}
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {provider.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {provider.title}
          </p>

          {/* Specialty Badges */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {provider.specialties.map((specialty) => (
              <Badge
                key={specialty}
                variant="secondary"
                className="text-xs bg-accent text-accent-foreground border border-secondary/20"
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(provider.rating)
                    ? "fill-primary text-primary"
                    : "text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">
            {provider.rating}
          </span>
          <span className="text-sm text-muted-foreground">
            ({provider.reviewCount} отзывов)
          </span>
        </div>

        {/* Pricing */}
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-foreground">
            {language === 'ru' ? `${provider.hourlyRate * 70} ₽` : `$${provider.hourlyRate}`}
            <span className="text-sm font-normal text-muted-foreground">/час</span>
          </div>
        </div>

        {/* Location and Availability */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{provider.location}</span>
          </div>
          <div className="text-center">
            <Badge
              variant={provider.availability.includes("сегодня") ? "default" : "secondary"}
              className={`text-xs ${
                provider.availability.includes("сегодня")
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {provider.availability}
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
            {t('services.bookService')}
          </Button>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-secondary/40 text-secondary hover:bg-secondary/10"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Сообщение
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-secondary/40 text-secondary hover:bg-secondary/10"
            >
              <User className="w-4 h-4 mr-2" />
              Профиль
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

ProviderCard.displayName = 'ProviderCard'

function ServiceProviderGrid() {
  const { t, language } = useLanguage()
  const [regionFilter, setRegionFilter] = useState("all")
  const [genderFilter, setGenderFilter] = useState("all")
  const [experienceFilter, setExperienceFilter] = useState("all")
  const [selectedMaster, setSelectedMaster] = useState<import("./master-profile-modal").Master | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  // Debounced filters for better performance
  const debouncedRegionFilter = useDebounce(regionFilter, 300)
  const debouncedGenderFilter = useDebounce(genderFilter, 300)
  const debouncedExperienceFilter = useDebounce(experienceFilter, 300)

  const allRegions = useMemo(() => 
    Array.from(new Set(mockProviders.map(provider => provider.location))), 
    []
  )

  // Memoized filtered providers for performance
  const filteredProviders = useMemo(() => {
    let filtered = mockProviders

    if (debouncedRegionFilter !== "all") {
      filtered = filtered.filter(provider => provider.location === debouncedRegionFilter)
    }
    if (debouncedGenderFilter !== "all") {
      filtered = filtered.filter(provider => provider.gender === debouncedGenderFilter)
    }
    if (debouncedExperienceFilter !== "all") {
      if (debouncedExperienceFilter === "less3") {
        filtered = filtered.filter(provider => provider.experience < 3)
      } else if (debouncedExperienceFilter === "3_7") {
        filtered = filtered.filter(provider => provider.experience >= 3 && provider.experience <= 7)
      } else if (debouncedExperienceFilter === "more7") {
        filtered = filtered.filter(provider => provider.experience > 7)
      }
    }
    return filtered
  }, [debouncedRegionFilter, debouncedGenderFilter, debouncedExperienceFilter])

  const handleViewProfile = useCallback((master: import("./master-profile-modal").Master) => {
    setSelectedMaster(master)
    setModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {t('services.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Фильтр мастеров</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Регион */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Регион
              </label>
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Все регионы" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Все регионы</SelectItem>
                  {allRegions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Пол */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Пол
              </label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Любой" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Любой</SelectItem>
                  <SelectItem value="male">Мужчина</SelectItem>
                  <SelectItem value="female">Женщина</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Опыт */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Опыт
              </label>
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Любой опыт" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="all">Любой</SelectItem>
                  <SelectItem value="less3">Менее 3 лет</SelectItem>
                  <SelectItem value="3_7">3–7 лет</SelectItem>
                  <SelectItem value="more7">Более 7 лет</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Показано {filteredProviders.length} из {mockProviders.length} мастеров
          </p>
        </div>

        {/* Provider Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              language={language}
              t={t}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>

        {/* Load More Button */}
        {filteredProviders.length >= 6 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
            >
              Загрузить ещё мастеров
            </Button>
          </div>
        )}

        {/* Master Profile Modal */}
        <MasterProfileModal 
          open={modalOpen} 
          onClose={handleCloseModal}
          master={selectedMaster}
        />
      </div>
    </div>
  )
}

export default memo(ServiceProviderGrid)