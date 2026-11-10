"use client";

import React from 'react';
import { AutoCarousel } from '@/components/ui/auto-carousel';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CarouselImage {
  src: string;
  alt: string;
}

const sampleImages: CarouselImage[] = [
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&auto=format",
    alt: "Traditional wooden sauna interior with warm lighting"
  },
  {
    src: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop&auto=format",
    alt: "Luxury spa treatment room with natural stone features"
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=600&fit=crop&auto=format",
    alt: "Serene wellness center with bamboo and water features"
  },
  {
    src: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800&h=600&fit=crop&auto=format",
    alt: "Modern banya exterior surrounded by forest"
  },
  {
    src: "https://images.unsplash.com/photo-1594736797933-d0a9ba7f1db1?w=800&h=600&fit=crop&auto=format",
    alt: "Traditional Russian banya with birch branches"
  },
  {
    src: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=800&h=600&fit=crop&auto=format",
    alt: "Outdoor hot tub overlooking mountain landscape"
  },
  {
    src: "https://images.unsplash.com/photo-1515541475118-1f0e4b76dd8d?w=800&h=600&fit=crop&auto=format",
    alt: "Wellness retreat meditation space"
  }
];

export const CarouselDemo = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          AutoCarousel Component Demo
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore different configurations of our AutoCarousel component showcasing beautiful banya and wellness imagery. 
          Perfect for highlighting featured venues, services, or experiences in your marketplace.
        </p>
      </div>

      {/* Demo Grid */}
      <div className="grid gap-8 lg:gap-12">
        
        {/* Default Configuration */}
        <Card className="overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Default Configuration</h3>
                <p className="text-muted-foreground">
                  Full-featured carousel with navigation arrows, indicators, and auto-rotation (3s interval)
                </p>
              </div>
              <Badge variant="secondary">Default</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <AutoCarousel
              images={sampleImages}
              showArrows={true}
              showIndicators={true}
              autoRotateInterval={3000}
              height="h-96"
              className="rounded-lg overflow-hidden"
            />
            <div className="mt-4 p-3 bg-muted/50 rounded-md">
              <p className="text-sm text-muted-foreground font-mono">
                {`<AutoCarousel images={images} showArrows={true} showIndicators={true} autoRotateInterval={3000} />`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Grid Layout for Multiple Examples */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* No Arrows */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Without Navigation Arrows</h3>
                <p className="text-muted-foreground text-sm">
                  Clean presentation focusing on indicators and auto-rotation
                </p>
              </div>
              <Badge variant="outline">Minimalist</Badge>
            </CardHeader>
            <CardContent className="pt-0">
              <AutoCarousel
                images={sampleImages.slice(0, 5)}
                showArrows={false}
                showIndicators={true}
                autoRotateInterval={4000}
                height="h-64"
                className="rounded-lg overflow-hidden"
              />
              <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
                <code className="text-muted-foreground">showArrows={false}</code>
              </div>
            </CardContent>
          </Card>

          {/* No Indicators */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Without Indicators</h3>
                <p className="text-muted-foreground text-sm">
                  Arrow-only navigation with seamless transitions
                </p>
              </div>
              <Badge variant="outline">Arrows Only</Badge>
            </CardHeader>
            <CardContent className="pt-0">
              <AutoCarousel
                images={sampleImages.slice(0, 5)}
                showArrows={true}
                showIndicators={false}
                autoRotateInterval={4000}
                height="h-64"
                className="rounded-lg overflow-hidden"
              />
              <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
                <code className="text-muted-foreground">showIndicators={false}</code>
              </div>
            </CardContent>
          </Card>

          {/* Fast Rotation */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Fast Auto-Rotation</h3>
                <p className="text-muted-foreground text-sm">
                  Quick transitions every 2 seconds for dynamic content
                </p>
              </div>
              <Badge variant="secondary">Fast</Badge>
            </CardHeader>
            <CardContent className="pt-0">
              <AutoCarousel
                images={sampleImages.slice(2, 6)}
                showArrows={true}
                showIndicators={true}
                autoRotateInterval={2000}
                height="h-64"
                className="rounded-lg overflow-hidden"
              />
              <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
                <code className="text-muted-foreground">autoRotateInterval={2000}</code>
              </div>
            </CardContent>
          </Card>

          {/* Compact Example */}
          <Card className="overflow-hidden">
            <CardHeader className="pb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Compact Size</h3>
                <p className="text-muted-foreground text-sm">
                  Smaller format perfect for sidebar or feature highlights
                </p>
              </div>
              <Badge variant="outline">Compact</Badge>
            </CardHeader>
            <CardContent className="pt-0">
              <AutoCarousel
                images={sampleImages.slice(3, 7)}
                showArrows={true}
                showIndicators={true}
                autoRotateInterval={5000}
                height="h-48"
                className="rounded-lg overflow-hidden"
              />
              <div className="mt-3 p-2 bg-muted/30 rounded text-xs">
                <code className="text-muted-foreground">height="h-48"</code>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Notes */}
        <Card className="border-2 border-primary/20 bg-accent/30">
          <CardHeader>
            <h3 className="text-xl font-semibold text-primary">Implementation Notes</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Key Features:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Auto-rotate stops when arrows are clicked</li>
                  <li>Hover to pause auto-rotation</li>
                  <li>Keyboard navigation support (arrow keys)</li>
                  <li>Responsive design with optimized images</li>
                  <li>Accessibility features with ARIA labels</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Usage Tips:</h4>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Support for 3-10 images recommended</li>
                  <li>Auto-rotate resumes after 10s of inactivity</li>
                  <li>Use 3-6 second intervals for optimal UX</li>
                  <li>Include descriptive alt text for images</li>
                  <li>Test performance with large image sets</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-background/50 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Code Example:</h4>
              <div className="bg-foreground/5 p-3 rounded text-sm font-mono">
                {`import { AutoCarousel } from '@/components/ui/auto-carousel';

const images = [
  { src: '/image1.jpg', alt: 'Description 1' },
  { src: '/image2.jpg', alt: 'Description 2' },
  // ... more images
];

<AutoCarousel 
  images={images}
  autoRotateInterval={3000}
  showArrows={true}
  showIndicators={true}
  height="h-96"
/>`}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};