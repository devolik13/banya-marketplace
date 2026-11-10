"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, MapPin, Globe, Phone, Send, Play, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface Venue {
  id: string;
  name: string;
  address: string;
  map_link: string;
  website: string;
  contacts: {
    phone: string;
    telegram: string;
  };
  media: {
    video?: string;
    photos: string[];
  };
}

interface VenuePopupCardProps {
  open: boolean;
  onClose: () => void;
  venue: Venue;
  onBookNow?: () => void;
}

export const VenuePopupCard = ({ open, onClose, venue, onBookNow }: VenuePopupCardProps) => {
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);

  const getVideoEmbedUrl = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.includes('youtu.be') 
        ? url.split('/').pop()?.split('?')[0]
        : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`;
    }
    if (url.includes('vimeo.com')) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1`;
    }
    return url;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="p-0 w-[100vw] h-[100vh] flex flex-col overflow-hidden">
          {/* Header - 20% */}
          <div className="relative h-[20%] flex-shrink-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${venue.media.photos[0] || '/placeholder-banya.jpg'})`,
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-10 bg-black/20 hover:bg-black/40 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
              aria-label="Close venue details"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
                {venue.name}
              </h1>
            </div>
          </div>

          {/* Body - 60% */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
              {/* Left Column - Media */}
              <div className="space-y-6">
                {/* Video Section */}
                <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
                  {venue.media.video ? (
                    playingVideo ? (
                      <iframe
                        src={getVideoEmbedUrl(venue.media.video)}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={`${venue.name} video`}
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <img
                          src={venue.media.photos[0] || '/placeholder-banya.jpg'}
                          alt={`${venue.name} preview`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => setPlayingVideo(true)}
                          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors group"
                        >
                          <div className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-4 transform group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 ml-1" fill="currentColor" />
                          </div>
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <img
                        src={venue.media.photos[0] || '/placeholder-banya.jpg'}
                        alt={`${venue.name}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Photo Gallery */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Gallery</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {venue.media.photos.slice(1, 5).map((photo, index) => (
                      <div 
                        key={index} 
                        className="relative aspect-square bg-muted rounded-lg overflow-hidden group cursor-pointer"
                        onClick={() => setShowFullGallery(true)}
                      >
                        <img
                          src={photo}
                          alt={`${venue.name} photo ${index + 2}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {index === 3 && venue.media.photos.length > 5 && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <div className="text-white text-center">
                              <MoreHorizontal className="h-8 w-8 mx-auto mb-2" />
                              <span className="text-sm font-medium">
                                +{venue.media.photos.length - 5} more
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Information */}
              <div className="space-y-8">
                {/* Address */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Location</h3>
                  <a
                    href={venue.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-lg text-primary hover:underline transition-colors group"
                  >
                    <MapPin className="h-6 w-6 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="leading-relaxed">{venue.address}</span>
                  </a>
                </div>

                {/* Website */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-foreground">Website</h3>
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                  >
                    <a href={venue.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-5 w-5 mr-3" />
                      Visit Website
                    </a>
                  </Button>
                </div>

                {/* Contacts */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">Contact</h3>
                  <div className="space-y-3">
                    {venue.contacts.phone && (
                      <a
                        href={`tel:${venue.contacts.phone}`}
                        className="flex items-center gap-3 text-lg text-foreground hover:text-primary transition-colors group"
                      >
                        <Phone className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                        <span>{venue.contacts.phone}</span>
                      </a>
                    )}
                    {venue.contacts.telegram && (
                      <a
                        href={`https://t.me/${venue.contacts.telegram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-lg text-foreground hover:text-primary transition-colors group"
                      >
                        <Send className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                        <span>@{venue.contacts.telegram}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - 20% */}
          <div className="h-[20%] flex-shrink-0 p-6 border-t bg-card/50">
            <div className="h-full flex items-center">
              <Button
                onClick={onBookNow}
                className="w-full h-16 bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
                disabled={!onBookNow}
              >
                Book Now
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Gallery Modal */}
      <Dialog open={showFullGallery} onOpenChange={setShowFullGallery}>
        <DialogContent className="w-[100vw] h-[100vh] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Photo Gallery</h2>
            <button
              onClick={() => setShowFullGallery(false)}
              className="text-muted-foreground hover:text-foreground p-2"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto">
            {venue.media.photos.map((photo, index) => (
              <div key={index} className="aspect-square bg-muted rounded-lg overflow-hidden">
                <img
                  src={photo}
                  alt={`${venue.name} photo ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};