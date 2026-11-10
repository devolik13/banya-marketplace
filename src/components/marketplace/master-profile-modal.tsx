"use client";

import { useEffect, useState } from 'react'
import { X, Play, Star, MapPin, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export interface Master {
  id: string
  name: string
  title: string
  image: string | string[]
  videoUrl?: string
  specialties: string[]
  rating: number
  reviewCount: number
  hourlyRate: number
  location: string
  availability: string
  services?: string[]
}

interface MasterProfileModalProps {
  open: boolean
  onClose: () => void
  master: Master | null
}

export const MasterProfileModal = ({ open, onClose, master }: MasterProfileModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose()
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      setCurrentImageIndex(0)
      setShowVideo(false)
    }
  }, [open, master])

  if (!open || !master) return null

  const images = Array.isArray(master.image) ? master.image : [master.image]
  const hasMultipleImages = images.length > 1

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-6"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="popup-card bg-background rounded-2xl shadow-2xl w-[90vw] max-w-[1200px] max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)] overflow-x-hidden overflow-y-auto transform transition-all duration-300 animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          .popup-card {
            word-wrap: break-word;
          }
        `}</style>
        <Card className="border-0 shadow-none">
          <CardHeader className="relative p-0">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-8 right-8 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="h-8 w-8" />
            </Button>

            {/* Media Gallery: 2x2 images grid with optional View More */}
            <div className="w-full bg-muted/20 rounded-t-2xl flex items-center justify-center min-h-[420px]"> 
              <div className="w-full p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Only show up to first 4 images in grid */}
                  {images.slice(0, 4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${master.name} - Image ${idx + 1}`}
                      className="w-full aspect-video object-cover rounded-lg border border-muted"
                      style={{ maxHeight: 240 }}
                    />
                  ))}
                  {/* Fill grid cells if less than 4 images */}
                  {Array.from({ length: Math.max(0, 4 - images.length) }).map((_, fakeIdx) => (
                    <div key={fakeIdx} className="w-full aspect-video rounded-lg bg-muted/40 flex items-center justify-center text-muted-foreground text-xl">No image</div>
                  ))}
                </div>
                {/* View More Button if more images exist */}
                {images.length > 4 && (
                  <div className="flex justify-end mt-3">
                    <Button variant="secondary" className="text-base py-3 px-6" onClick={() => setCurrentImageIndex(4)}>
                      View More Photos
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Show full screen gallery starting from index >= 4 */}
            {currentImageIndex >= 4 && (
              <div className="fixed inset-0 z-50 bg-black/80 flex flex-col items-center justify-center p-4" onClick={() => setCurrentImageIndex(0)}>
                <div className="grid grid-cols-2 gap-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
                  {images.slice(4).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${master.name} - Extra Image ${4 + idx + 1}`}
                      className="w-full aspect-video object-cover rounded-lg border border-muted"
                    />
                  ))}
                </div>
                <Button variant="ghost" className="mt-8 text-white text-lg" onClick={() => setCurrentImageIndex(0)}>Close Gallery</Button>
              </div>
            )}

            {/* Video Section - Always 16:9 aspect ratio, no overflow */}
            {master.videoUrl && (
              <div className="relative w-full flex justify-center items-center bg-muted/20 rounded-2xl mt-10">
                <div className="w-full max-w-3xl aspect-video">
                  {showVideo ? (
                    <video
                      controls
                      className="w-full h-full object-cover rounded-2xl"
                      src={master.videoUrl}
                      autoPlay
                      style={{ aspectRatio: '16/9', maxHeight: 420 }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20 cursor-pointer group rounded-2xl"
                      onClick={() => setShowVideo(true)}
                      style={{ aspectRatio: '16/9', minHeight: 180 }}
                    >
                      <div className="bg-primary rounded-full p-20 group-hover:scale-110 transition-transform">
                        <Play className="h-16 w-16 text-primary-foreground ml-1" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent className="p-8 sm:p-16 space-y-16">
            {/* Info Grid: 50% column widths, word-break everywhere */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
              <div className="space-y-4 break-all">
                <h2 id="modal-title" className="text-5xl font-extrabold text-foreground break-words">
                  {master.name}
                </h2>
                <p className="text-muted-foreground font-medium text-2xl break-words">{master.title}</p>
                {/* Rating and Reviews */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Star className="h-7 w-7 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-2xl">{master.rating}</span>
                    <span className="text-muted-foreground text-base">({master.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              {/* Location, Availability, Price */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4 md:mt-0 text-xl break-all">
                <div className="flex items-center gap-3">
                  <MapPin className="h-7 w-7 text-muted-foreground" />
                  <span>{master.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-7 w-7 text-muted-foreground" />
                  <span>{master.availability}</span>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="h-7 w-7 text-muted-foreground" />
                  <span className="font-semibold">${master.hourlyRate}/hour</span>
                </div>
              </div>
            </div>

            {/* Specialties and Services (also forced word break + safe grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Specialties */}
              <div className="space-y-4 break-words">
                <h3 className="font-semibold text-foreground text-2xl">Specialties</h3>
                <div className="flex flex-wrap gap-3">
                  {master.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary" className="text-lg py-2 px-5 break-words">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              {/* Services */}
              {master.services && master.services.length > 0 && (
                <div className="space-y-4 break-words">
                  <h3 className="font-semibold text-foreground text-2xl">Services</h3>
                  <div className="grid grid-cols-2 gap-5">
                    {master.services.map((service, index) => (
                      <div key={index} className="flex items-center gap-2 text-base">
                        <div className="w-3 h-3 bg-primary rounded-full" />
                        <span className="break-words">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 pt-8">
              <Button className="flex-1 text-xl py-6 min-w-[120px]">
                Book Session
              </Button>
              <Button variant="outline" className="flex-1 text-xl py-6 min-w-[120px]">
                Contact Master
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}