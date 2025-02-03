import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import Header from '@/components/layout/Header';
import { HeroSection } from './components/HeroSection';
import { PackagesSection } from './components/PackagesSection';
import { GuideSection } from './components/GuideSection';
import { ReasonsSection } from './components/ReasonsSection';
import { ComparisonSection } from './components/ComparisonSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';

export default function PricePage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();

  // Update meta tags
  React.useEffect(() => {
    document.title = t.price.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.price.meta.description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', t.price.meta.keywords);
  }, [t.price.meta]);

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

      <PackagesSection />
      
      <GuideSection />
      
      <ReasonsSection />
      
      <ComparisonSection />
      
      <FAQSection />

      <CTASection 
        onAnalysisClick={handleAnalysisClick}
        onWhatsAppClick={handleWhatsAppClick}
        onCallClick={handleCallClick}
      />
    </div>
  );
}