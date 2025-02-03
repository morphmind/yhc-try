import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import Header from '@/components/layout/Header';
import { HeroSection } from './components/HeroSection';
import { ContentSection } from './components/ContentSection';
import { CTASection } from './components/CTASection';
import { GallerySection } from './components/GallerySection';
import { ProcessSection } from './components/ProcessSection';
import { StatsSection } from './components/StatsSection';

export default function BeforeAfterPage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();

  // Update meta tags
  React.useEffect(() => {
    document.title = t.beforeAfter.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.beforeAfter.meta.description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', t.beforeAfter.meta.keywords);
  }, [t.beforeAfter.meta]);

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

      <GallerySection />
      
      <ProcessSection />
    
      <ContentSection />

      <CTASection 
        onAnalysisClick={handleAnalysisClick}
        onWhatsAppClick={handleWhatsAppClick}
        onCallClick={handleCallClick}
      />
    </div>
  );
}