"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
  Star,
  MapPin,
  Heart,
  Map,
  Grid3x3,
  Filter,
  Search,
  Calendar,
  Users,
  Thermometer,
  Waves,
  TreePine,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { VenuePopupCard } from "./venue-popup-card"

interface Amenity {
  id: string
  nameKey: string
  icon: React.ReactNode
}

interface Venue {
  id: string
  nameKey: string
  locationKey: string
  images: string[]
  priceRange: string
  priceRangeRu: string
  rating: number
  reviewCount: number
  amenities: string[]
  descriptionKey: string
  availability: string[]
  address?: string
  openHours?: string
  website?: string
  mapUrl?: string
}

const amenities: Amenity[] = [
  { id: "traditional", nameKey: "venues.amenities.steamRoom", icon: <Thermometer className="h-4 w-4" /> },
  { id: "modern-spa", nameKey: "venues.amenities.treatments", icon: <Sparkles className="h-4 w-4" /> },
  { id: "private-rooms", nameKey: "venues.amenities.relaxationArea", icon: <Users className="h-4 w-4" /> },
  { id: "cold-plunge", nameKey: "venues.amenities.coldPlunge", icon: <Waves className="h-4 w-4" /> },
  { id: "sauna", nameKey: "venues.amenities.saunaRoom", icon: <TreePine className="h-4 w-4" /> },
]

const venues: Venue[] = [
  {
    id: "1",
    nameKey: "Golden Pine Banya",
    locationKey: "venues.locations.downtown",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    ],
    priceRange: "$80-120",
    priceRangeRu: "5 600 - 8 400 ₽",
    rating: 4.8,
    reviewCount: 128,
    amenities: ["traditional", "private-rooms", "cold-plunge"],
    descriptionKey:
      "Authentic Russian banya experience with traditional venik treatments and cedar-lined steam rooms.",
    availability: ["Morning", "Afternoon", "Evening"],
    address: "123 Amber Ave., Downtown",
    openHours: "8:00 – 22:00 daily",
    website: "https://goldenpinebanya.example.com",
    mapUrl: "https://maps.google.com/?q=123+Amber+Ave",
  },
  {
    id: "2",
    nameKey: "Nordic Wellness Retreat",
    locationKey: "venues.locations.oldTown",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    ],
    priceRange: "$100-150",
    priceRangeRu: "7 000 - 10 500 ₽",
    rating: 4.9,
    reviewCount: 89,
    amenities: ["modern-spa", "sauna", "cold-plunge", "private-rooms"],
    descriptionKey:
      "Modern wellness sanctuary combining Nordic traditions with contemporary luxury amenities.",
    availability: ["Morning", "Afternoon"],
    address: "25 Oak St., Old Town",
    openHours: "10:00 – 20:00 daily",
    website: "https://nordicwellness.example.com",
    mapUrl: "https://maps.google.com/?q=25+Oak+St",
  },
  {
    id: "3",
    nameKey: "Cedar & Steam",
    locationKey: "venues.locations.riverside",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    ],
    priceRange: "$60-90",
    priceRangeRu: "4 200 - 6 300 ₽",
    rating: 4.6,
    reviewCount: 156,
    amenities: ["traditional", "sauna"],
    descriptionKey:
      "Family-owned banya featuring handcrafted cedar installations and time-honored traditions.",
    availability: ["Evening"],
    address: "78 River Rd., Riverside",
    openHours: "12:00 – 00:00 daily",
    website: "https://cedarsteam.example.com",
    mapUrl: "https://maps.google.com/?q=78+River+Rd",
  },
  {
    id: "4",
    nameKey: "Emerald City Spa",
    locationKey: "venues.locations.hillside",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    ],
    priceRange: "$90-130",
    priceRangeRu: "6 300 - 9 100 ₽",
    rating: 4.7,
    reviewCount: 203,
    amenities: ["modern-spa", "private-rooms", "cold-plunge"],
    descriptionKey: "Contemporary spa offering personalized wellness experiences in a serene urban setting.",
    availability: ["Morning", "Afternoon", "Evening"],
    address: "334 Garden Hill, Hillside",
    openHours: "9:00 – 21:00 daily",
    website: "https://emeraldcityspa.example.com",
    mapUrl: "https://maps.google.com/?q=334+Garden+Hill",
  },
  {
    id: "5",
    nameKey: "Heritage Banya House",
    locationKey: "venues.locations.cityCenter",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    ],
    priceRange: "$70-110",
    priceRangeRu: "4 900 - 7 700 ₽",
    rating: 4.8,
    reviewCount: 92,
    amenities: ["traditional", "sauna", "private-rooms"],
    descriptionKey:
      "Historic banya preserving authentic traditions with modern comfort and safety standards.",
    availability: ["Afternoon", "Evening"],
    address: "15 Heritage Rd., City Center",
    openHours: "09:00 – 21:00 daily",
    website: "https://heritagebanya.example.com",
    mapUrl: "https://maps.google.com/?q=15+Heritage+Rd",
  },
  {
    id: "6",
    nameKey: "Cascade Wellness",
    locationKey: "venues.locations.suburbs",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    ],
    priceRange: "$85-125",
    priceRangeRu: "5 950 - 8 750 ₽",
    rating: 4.9,
    reviewCount: 167,
    amenities: ["modern-spa", "cold-plunge", "sauna", "private-rooms"],
    descriptionKey:
      "Premium wellness destination featuring mountain-inspired design and therapeutic services.",
    availability: ["Morning"],
    address: "972 Cascade Blvd., Suburbs",
    openHours: "10:00 – 22:00 daily",
    website: "https://cascadewellness.example.com",
    mapUrl: "https://maps.google.com/?q=972+Cascade+Blvd",
  },
]

export default function VenueCatalog() {
  const { t, language } = useLanguage()
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all")
  const [favorites, setFavorites] = useState<string[]>([])

  const moscowDistricts = [
    "Все округа",
    "Центральный",
    "Северный", 
    "Южный",
    "Западный",
    "Восточный",
    "Северо-Западный",
    "Северо-Восточный",
    "Юго-Западный",
    "Юго-Восточный",
    "Новомосковский",
    "Троицкий"
  ]

  const toggleFavorite = (venueId: string) => {
    setFavorites(prev =>
      prev.includes(venueId)
        ? prev.filter(id => id !== venueId)
        : [...prev, venueId]
    )
  }

  const toggleAmenityFilter = (amenityId: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityId)
        ? prev.filter(id => id !== amenityId)
        : [...prev, amenityId]
    )
  }

  const filteredVenues = venues.filter(venue => {
    const venueName = venue.nameKey
    const venueLocation = t(venue.locationKey)
    const matchesSearch = venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venueLocation.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLocation = selectedLocation === "all" || venue.locationKey.includes(selectedLocation)
    let matchesDistrict = true;
    if(selectedLocation === 'downtown' && selectedDistrict !== 'all') {
      matchesDistrict = venue.address ? venue.address.includes(selectedDistrict) : false
    }
    const matchesAmenities = selectedAmenities.length === 0 ||
                           selectedAmenities.some(amenity => venue.amenities.includes(amenity))
    const matchesPrice = selectedPriceRange === "all" || venue.priceRange.includes(selectedPriceRange)
    
    return matchesSearch && matchesLocation && matchesDistrict && matchesAmenities && matchesPrice
  })

  const openVenueModal = (venue: Venue) => {
    setSelectedVenue(venue)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedVenue) {
      setCurrentImageIndex((prev) => 
        prev === selectedVenue.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const previousImage = () => {
    if (selectedVenue) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedVenue.images.length - 1 : prev - 1
      )
    }
  }

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl mb-4">
            {t('venues.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('venues.subtitle')}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm border border-border">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('venues.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={selectedLocation} onValueChange={value => {
                setSelectedLocation(value);
                setSelectedDistrict("all");
              }}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder={t('venues.filterByLocation')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'ru' ? 'Все регионы' : 'All regions'}</SelectItem>
                  <SelectItem value="downtown">{language === 'ru' ? 'Москва' : 'Moscow'}</SelectItem>
                  <SelectItem value="oldTown">{language === 'ru' ? 'Санкт-Петербург' : 'St. Petersburg'}</SelectItem>
                  <SelectItem value="riverside">{language === 'ru' ? 'Новосибирск' : 'Novosibirsk'}</SelectItem>
                  <SelectItem value="hillside">{language === 'ru' ? 'Екатеринбург' : 'Yekaterinburg'}</SelectItem>
                  <SelectItem value="cityCenter">{language === 'ru' ? 'Казань' : 'Kazan'}</SelectItem>
                  <SelectItem value="suburbs">{language === 'ru' ? 'Сочи' : 'Sochi'}</SelectItem>
                </SelectContent>
              </Select>

              {/* Округ — активен только если выбрана Москва */}
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict} disabled={selectedLocation !== 'downtown'}>
                <SelectTrigger className="w-[180px] bg-background" disabled={selectedLocation !== 'downtown'}>
                  <SelectValue placeholder={language === 'ru' ? 'Все округа' : 'All districts'} />
                </SelectTrigger>
                <SelectContent>
                  {moscowDistricts.map((d, idx) => (
                    <SelectItem key={d} value={idx === 0 ? 'all' : d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="bg-background border-border"
                >
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="bg-background border-border"
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Amenity Filters */}
          <div className="border-t border-border pt-4">
            <div className="flex items-center gap-3 mb-3">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{t('venues.filterByAmenities')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {amenities.map((amenity) => (
                <Button
                  key={amenity.id}
                  variant={selectedAmenities.includes(amenity.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleAmenityFilter(amenity.id)}
                  className="h-8 text-xs bg-background border-border data-[state=selected]:bg-primary data-[state=selected]:text-primary-foreground"
                >
                  {amenity.icon}
                  <span className="ml-1">{t(amenity.nameKey)}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* View Toggle Results */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <Card
                key={venue.id}
                className="group overflow-hidden bg-card border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedVenue(venue)}
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={venue.images[0]}
                      alt={venue.nameKey}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm border-border hover:bg-background"
                    onClick={e => { e.stopPropagation(); toggleFavorite(venue.id) }}
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(venue.id) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                    />
                  </Button>
                  <div className="absolute bottom-3 right-3">
                    <Badge className="bg-background/80 backdrop-blur-sm text-foreground border-border">
                      {language === 'ru' ? venue.priceRangeRu : venue.priceRange}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg leading-tight">{venue.nameKey}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {t(venue.locationKey)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(venue.rating) ? "fill-primary text-primary" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {venue.rating} ({venue.reviewCount})
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {venue.amenities.slice(0, 3).map((amenityId) => {
                        const amenity = amenities.find(a => a.id === amenityId)
                        return amenity ? (
                          <Badge key={amenityId} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                            {amenity.icon}
                            <span className="ml-1">{t(amenity.nameKey)}</span>
                          </Badge>
                        ) : null
                      })}
                      {venue.amenities.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                          +{venue.amenities.length - 3} {t('common.showMore')}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Map className="h-12 w-12 text-muted-foreground mx-auto" />
                  <p className="text-muted-foreground">Interactive map view</p>
                  <p className="text-sm text-muted-foreground">
                    Shows {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Venue Details Popup */}
        {selectedVenue && (
          <VenuePopupCard
            open={!!selectedVenue}
            onClose={() => setSelectedVenue(null)}
            venue={{
              id: selectedVenue.id,
              name: selectedVenue.nameKey,
              address: selectedVenue.address ?? '',
              map_link: selectedVenue.mapUrl ?? '',
              website: selectedVenue.website ?? '',
              contacts: {
                phone: '',
                telegram: '',
              },
              media: {
                video: '',
                photos: selectedVenue.images,
              },
              // Можно доработать: добавить передачу телефона, тг, видео из venue при их наличии в структуре данных
            }}
          />
        )}
      </div>
    </section>
  )
}