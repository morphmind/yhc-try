import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import Header from '@/components/layout/Header';
import { HeroSection } from './components/HeroSection';
import { ContentSection } from './components/ContentSection';
import { CTASection } from './components/CTASection';

export default function AfroHairTransplantPage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();

  const handleAnalysisClick = () => window.location.href = '/hair-analysis';
  const handleWhatsAppClick = () => window.open('https://wa.me/905360344866', '_blank');
  const handleCallClick = () => window.open('tel:+905360344866', '_blank');

  return (
    <div className="min-h-screen bg-background">
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={updateCurrency}
      />
      
      <div id="hero">
        <HeroSection 
          onAnalysisClick={handleAnalysisClick}
          onWhatsAppClick={handleWhatsAppClick}
        />
      </div>
      
      <div id="content">
        <ContentSection />
      </div>

      <CTASection 
        onAnalysisClick={handleAnalysisClick}
        onWhatsAppClick={handleWhatsAppClick}
        onCallClick={handleCallClick}
      />

    </div>
  );
}