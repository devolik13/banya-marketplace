"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="relative group h-9 px-3 rounded-md transition-all duration-300 hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus:ring-2 focus:ring-primary/20 active:scale-95"
      aria-label={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
      title={`Switch to ${language === 'en' ? 'Russian' : 'English'}`}
    >
      <div className="flex items-center gap-2">
        <Globe 
          className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" 
          aria-hidden="true"
        />
        
        <div className="relative overflow-hidden">
          <span
            className={`inline-block transition-all duration-300 ${
              isHovered 
                ? 'transform translate-x-0 opacity-100' 
                : 'transform translate-x-1 opacity-100'
            }`}
          >
            {isHovered ? (language === 'en' ? 'English' : 'Русский') : language.toUpperCase()}
          </span>
        </div>

        {/* Subtle indicator for active language */}
        <div className="w-1 h-1 rounded-full bg-primary/60 animate-pulse" />
      </div>

      {/* Hover effect background */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Tooltip-like expansion for better UX */}
      <div
        className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-primary text-primary-foreground text-xs rounded shadow-lg transition-all duration-200 pointer-events-none ${
          isHovered 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-1'
        }`}
      >
        Click to switch
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
      </div>
    </Button>
  );
};