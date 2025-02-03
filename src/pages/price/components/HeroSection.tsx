import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  Clock,
  CheckCircle,
  Shield,
  Star,
  Coins,
  Package,
  Receipt,
  Crown,
  ChevronDown,
} from 'lucide-react';

interface HeroSectionProps {
  onAnalysisClick: () => void;
  onWhatsAppClick: () => void;
}

// Paket özellikleri
const features = [
  {
    key: 'allInclusive',
    icon: Package,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    key: 'noHidden',
    icon: Receipt,
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconColor: 'text-green-400',
  },
  {
    key: 'vipService',
    icon: Crown,
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
];

// 3 çeşit paket
const packageTypes = ['fue', 'dhi', 'vip'] as const;

export function HeroSection({ onAnalysisClick, onWhatsAppClick }: HeroSectionProps) {
  const { t } = useTranslation();
  const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null);

  // Paketlere scroll fonksiyonu (manuel offset)
  const scrollToPackages = () => {
    const packagesSection = document.getElementById('pricing-packages');
    if (!packagesSection) return;

    // Sticky header + biraz boşluk payı
    const headerOffset = 120; // 80 yerine 120 yaptık, projenize göre değiştirebilirsiniz

    const elementPosition = packagesSection.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-[120px] md:pt-[140px] lg:pt-[160px]">
      {/* Arka Plan Deseni */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Sol Metin Alanı */}
          <div className="lg:col-span-6 space-y-8">
            {/* Badge (Üstteki küçük etiket) */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 relative z-[15] group transition-all duration-300 hover:scale-[1.02]">
              <Coins className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
                {t.price.hero.badge}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl !leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent font-[750]">
                {t.price.hero.title.highlight}
              </span>
              <span className="block mt-4 text-foreground dark:text-white">
                {t.price.hero.title.main}
              </span>
            </h1>

            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed max-w-xl">
              {t.price.hero.description}
            </p>

            <p className="text-base text-foreground/80 dark:text-white/80 font-medium">
              {t.price.hero.subtext}
            </p>

            {/* Özellikler (features) */}
            <div className="grid grid-cols-3 gap-3">
              {features.map((feature) => (
                <div
                  key={feature.key}
                  className="group relative"
                  onMouseEnter={() => setHoveredFeature(feature.key)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div
                    className={cn(
                      'relative p-3 rounded-xl transition-all duration-300',
                      'bg-white/50 dark:bg-white/5 backdrop-blur-sm',
                      'border border-black/[0.08] dark:border-white/[0.08]',
                      hoveredFeature === feature.key
                        ? 'scale-[1.02] shadow-lg'
                        : 'hover:scale-[1.01]'
                    )}
                  >
                    <div className="flex flex-col items-center text-center gap-3">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center',
                          'bg-gradient-to-br',
                          feature.gradient
                        )}
                      >
                        <feature.icon
                          className={cn(
                            'w-4 h-4 transition-colors',
                            hoveredFeature === feature.key ? 'text-white' : feature.iconColor
                          )}
                        />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-foreground dark:text-white mb-1">
                          {
                            t.price.hero.features[
                              feature.key as keyof typeof t.price.hero.features
                            ].title
                          }
                        </h3>
                        <p className="text-[10px] text-foreground/60 dark:text-white/60">
                          {
                            t.price.hero.features[
                              feature.key as keyof typeof t.price.hero.features
                            ].description
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Butonları */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Paketlerimize Götüren Buton */}
              <Button
                size="lg"
                className="relative w-full sm:w-auto h-14 px-10 text-base gap-3 text-white dark:text-primary bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-white dark:via-white dark:to-white/95 rounded-full shadow-[0_8px_32px_rgba(37,99,235,0.25)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.25)] transition-all duration-500 hover:shadow-[0_16px_48px_rgba(37,99,235,0.35)] dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.35)] hover:scale-[1.02] active:scale-[0.98] group overflow-hidden"
                onClick={scrollToPackages}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_107%,rgba(255,255,255,0.4)_5%,rgba(255,255,255,0.2)_15%,rgba(255,255,255,0)_30%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                  <span>{t.price.hero.scrollText}</span>
                  <ChevronDown className="w-4 h-4 transition-all duration-300 group-hover:translate-y-1" />
                </div>
              </Button>

              {/* WhatsApp Butonu */}
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  'w-full sm:w-auto h-14 px-10 text-base gap-2',
                  'rounded-full',
                  'bg-white/90 dark:bg-white/10',
                  'backdrop-blur-xl',
                  'border border-black/[0.08] dark:border-white/[0.08]',
                  'shadow-[0_8px_32px_rgba(0,0,0,0.15)]',
                  'dark:shadow-[0_8px_32px_rgba(255,255,255,0.15)]',
                  'transition-all duration-500',
                  'hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]',
                  'dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.25)]',
                  'hover:scale-[1.02] active:scale-[0.98]',
                  'group overflow-hidden'
                )}
                onClick={onWhatsAppClick}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <MessageCircle className="w-4 h-4" />
                <span>{t.price.cta.buttons.whatsapp}</span>
              </Button>
            </div>
          </div>

          {/* Sağ Tarafta Fiyat Paketleri Önizlemesi */}
          {/*
            "hidden lg:block" -> YERİNE "block" yaptık,
            böylece mobilde de paket kısmı DOM'a ekleniyor, scroll hedefi var.
          */}
          <div className="lg:col-span-6 relative block" id="pricing-packages">
            <div className="relative">
              {/* Küçük Arka Plan Deseni */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.2),transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_70%)] rounded-3xl" />
              {/* Dekoratif Gradientler */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-2xl animate-pulse" />

              {/* Fiyat Paketleri */}
              <div className="relative space-y-4">
                {packageTypes.map((type) => (
                  <div
                    key={type}
                    className={cn(
                      'relative overflow-hidden rounded-2xl transition-all duration-300',
                      'bg-white/80 dark:bg-white/5 backdrop-blur-md',
                      'border border-black/[0.08] dark:border-white/[0.08]',
                      'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]',
                      'hover:scale-[1.02] hover:shadow-[0_16px_32px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_16px_32px_rgba(255,255,255,0.15)]',
                      'p-6 space-y-4',
                      type === 'dhi' ? 'lg:scale-105 lg:shadow-lg' : ''
                    )}
                  >
                    {/* En Popüler Badge */}
                    {type === 'dhi' && (
                      <div className="absolute -top-px left-0 right-0 flex justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-secondary/20 blur-lg" />
                          <div className="relative flex items-center">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent via-secondary to-transparent" />
                            <div className="relative px-4 py-1.5 bg-secondary text-white shadow-lg">
                              <div className="flex items-center gap-2">
                                <Star className="w-3.5 h-3.5 fill-white" />
                                <span className="text-xs font-semibold tracking-wide whitespace-nowrap uppercase">
                                  {t.price.packages.items[type].badge}
                                </span>
                                <Star className="w-3.5 h-3.5 fill-white" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Paket İçeriği */}
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center',
                          'bg-gradient-to-br',
                          type === 'fue'
                            ? 'from-blue-500/20 to-cyan-500/20'
                            : type === 'dhi'
                            ? 'from-secondary/20 to-secondary/10'
                            : 'from-amber-500/20 to-orange-500/20'
                        )}
                      >
                        {type === 'fue' ? (
                          <Package className="w-6 h-6 text-white" />
                        ) : type === 'dhi' ? (
                          <Crown className="w-6 h-6 text-white" />
                        ) : (
                          <Star className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground dark:text-white">
                          {t.price.packages.items[type].title}
                        </h3>
                        <p className="text-xs text-foreground/60 dark:text-white/60">
                          {t.price.packages.items[type].description}
                        </p>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-primary dark:text-white">
                      {t.price.packages.items[type].price}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* -- Bitiş -- */}
        </div>
      </div>
    </div>
  );
}
