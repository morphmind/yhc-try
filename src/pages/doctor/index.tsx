import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Phone, Calendar } from 'lucide-react';

export default function DoctorPage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();
  const [hoveredButton, setHoveredButton] = React.useState<string | null>(null);

  const handleWhatsAppClick = () => window.open('https://wa.me/905360344866', '_blank');
  const handleCallClick = () => window.open('tel:+905360344866', '_blank');
  const handleScheduleClick = () => window.location.href = '/hair-analysis';

  return (
    <div className="min-h-screen bg-background">
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={updateCurrency}
      />

      <div className="relative min-h-[80dvh] flex items-center justify-center overflow-hidden pt-[72px] md:pt-[88px] lg:pt-0">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
            <div className="absolute bottom-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
          </div>
          <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.15] tracking-tight mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {t.doctor.title}
              </span>
              <span className="block mt-2 text-foreground dark:text-white">
                {t.doctor.name}
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 px-8 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleWhatsAppClick}
                onMouseEnter={() => setHoveredButton('whatsapp')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <MessageCircle className="w-4 h-4" />
                {t.doctor.cta.buttons.whatsapp}
                {hoveredButton === 'whatsapp' && (
                  <ArrowRight className="w-4 h-4 ml-2 animate-[slide-right_0.3s_ease-out]" />
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleScheduleClick}
                onMouseEnter={() => setHoveredButton('schedule')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Calendar className="w-4 h-4" />
                {t.doctor.cta.buttons.schedule}
                {hoveredButton === 'schedule' && (
                  <ArrowRight className="w-4 h-4 ml-2 animate-[slide-right_0.3s_ease-out]" />
                )}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 px-8 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={handleCallClick}
                onMouseEnter={() => setHoveredButton('call')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <Phone className="w-4 h-4" />
                {t.doctor.cta.buttons.call}
                {hoveredButton === 'call' && (
                  <ArrowRight className="w-4 h-4 ml-2 animate-[slide-right_0.3s_ease-out]" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
