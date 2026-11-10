"use client";

import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface NewsItem {
  id: number;
  title: string;
  description?: string;
  image: string;
  date: string;
  link?: string;
}

// Mock useLanguage hook for i18n support
const useLanguage = () => {
  const [language, setLanguage] = useState<'ru' | 'en'>('en');
  
  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'news.readMore': 'Read More',
        'news.latest': 'Latest News'
      },
      ru: {
        'news.readMore': 'Подробнее',
        'news.latest': 'Последние новости'
      }
    };
    return translations[language][key] || key;
  };
  
  return { language, setLanguage, t };
};

export const NewsCarousel = () => {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample news data
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Revolutionary AI Technology Breakthrough",
      description: "Scientists achieve major milestone in artificial intelligence research with new neural network architecture.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      date: "2024-01-15",
      link: "/news/ai-breakthrough"
    },
    {
      id: 2,
      title: "Sustainable Energy Solutions for the Future",
      description: "New renewable energy technologies promise to revolutionize how we power our cities and homes.",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&h=600&fit=crop",
      date: "2024-01-12",
      link: "/news/sustainable-energy"
    },
    {
      id: 3,
      title: "Space Exploration Reaches New Frontiers",
      description: "Latest mission to Mars reveals groundbreaking discoveries about the potential for life beyond Earth.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=600&fit=crop",
      date: "2024-01-10",
      link: "/news/space-exploration"
    },
    {
      id: 4,
      title: "Medical Innovation Saves Lives",
      description: "New treatment protocols show remarkable success rates in treating previously incurable conditions.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      date: "2024-01-08",
      link: "/news/medical-innovation"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
  }, [newsItems.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + newsItems.length) % newsItems.length);
  }, [newsItems.length]);

  // Auto-play functionality (optional)
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          {t('news.latest')}
        </h2>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/50 to-accent/30 shadow-xl">
        {/* Navigation buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border-border shadow-lg transition-all duration-200 hover:scale-105"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/90 hover:bg-background border-border shadow-lg transition-all duration-200 hover:scale-105"
          onClick={nextSlide}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>

        {/* Carousel content */}
        <div className="relative h-[500px] md:h-[600px]">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {newsItems.map((news) => (
              <div key={news.id} className="flex-shrink-0 w-full h-full relative">
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${news.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className="relative h-full flex items-end p-6 md:p-12">
                  <Card className="w-full max-w-2xl bg-background/95 border-border shadow-2xl">
                    <CardContent className="p-6 md:p-8">
                      {/* Date */}
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          {formatDate(news.date)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                        {news.title}
                      </h3>

                      {/* Description */}
                      {news.description && (
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {news.description}
                        </p>
                      )}

                      {/* CTA Button */}
                      <Button
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 transition-all duration-200 hover:scale-105 hover:shadow-lg"
                        onClick={() => {
                          if (news.link) {
                            window.open(news.link, '_blank');
                          }
                        }}
                      >
                        {t('news.readMore')}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {newsItems.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-background/60 hover:bg-background/80'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};