import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, MessageCircle, Phone, Shield } from 'lucide-react';

interface CTASectionProps {
  onAnalysisClick: () => void;
  onWhatsAppClick: () => void;
  onCallClick: () => void;
}

export function CTASection({ onAnalysisClick, onWhatsAppClick, onCallClick }: CTASectionProps) {
  const { t } = useTranslation();

  return (
    <div className="relative py-12 sm:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Mobile-optimized CTA Card */}
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/80 dark:bg-black/40 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-4 sm:p-8 md:p-12">
            <div className="absolute inset-0 bg-grid-white/5 pointer-events-none" />
            <div className="relative text-center space-y-4 sm:space-y-6">
              {/* Badge - Hidden on mobile */}
              <div className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-4 mx-auto transition-all duration-300 hover:scale-[1.02]">
                <Shield className="w-4 h-4 text-primary dark:text-white/90" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/90">
                  {t.price.cta.badge}
                </span>
              </div>

              {/* Title - Smaller on mobile */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground dark:text-white">
                {t.price.cta.title}
              </h3>

              {/* Description - Hidden on mobile */}
              <p className="hidden sm:block text-base sm:text-lg text-foreground/60 dark:text-white/60 max-w-2xl mx-auto">
                {t.price.cta.description}
              </p>

              {/* CTA Buttons - Optimized for mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-4 pt-2 sm:pt-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-11 sm:h-14 px-4 sm:px-10 text-sm sm:text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-xl sm:rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={onAnalysisClick}
                >
                  <ArrowRight className="w-4 h-4" />
                  {t.price.cta.buttons.analysis}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-11 sm:h-14 px-4 sm:px-10 text-sm sm:text-base gap-2 rounded-xl sm:rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-primary dark:text-white hover:bg-black/5 dark:hover:bg-black/70"
                  onClick={onWhatsAppClick}
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.price.cta.buttons.whatsapp}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-11 sm:h-14 px-4 sm:px-10 text-sm sm:text-base gap-2 rounded-xl sm:rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-primary dark:text-white hover:bg-black/5 dark:hover:bg-black/70"
                  onClick={onCallClick}
                >
                  <Phone className="w-4 h-4" />
                  {t.price.cta.buttons.call}
                </Button>
              </div>

              {/* Security Note - Smaller on mobile */}
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-foreground/60 dark:text-white/60 pt-2 sm:pt-4">
                <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{t.price.cta.secureNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}