import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useCurrency } from '../../hooks/useCurrency';
import Header from '../../components/layout/Header';
import { HeroSection } from './components/HeroSection';
import { SeasonsSection } from './components/SeasonsSection';
import { AttractionsSection } from './components/AttractionsSection';
import { CuisineSection } from './components/CuisineSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { AccommodationSection } from './components/AccommodationSection';
import { TransportationSection } from './components/TransportationSection';
import { CTASection } from './components/CTASection';

export default function FethiyePage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();

  // Update meta tags
  React.useEffect(() => {
    document.title = t.fethiye.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.fethiye.meta.description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', t.fethiye.meta.keywords);
  }, [t.fethiye.meta]);

  const handleAnalysisClick = () => window.location.href = '/hair-analysis';
  const handleWhatsAppClick = () => window.open('https://wa.me/905360344866', '_blank');
  const handleCallClick = () => window.open('tel:+905360344866', '_blank');

  return (
    <div className="min-h-screen bg-background">
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={updateCurrency}
      />
      
      <HeroSection 
        onAnalysisClick={handleAnalysisClick}
        onWhatsAppClick={handleWhatsAppClick}
      />

      <SeasonsSection />
      
      <AttractionsSection />
      
      <CuisineSection />
      
      <ActivitiesSection />
      
      <AccommodationSection />
      
      <TransportationSection />

      <CTASection 
        onAnalysisClick={handleAnalysisClick}
        onWhatsAppClick={handleWhatsAppClick}
        onCallClick={handleCallClick}
      />
    </div>
  );
}