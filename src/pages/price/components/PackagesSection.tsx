import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Sparkles,
  Star,
  Shield,
  MessageCircle,
  Syringe,
  Microscope,
  Check,
  Crown,
  ArrowRight,
} from 'lucide-react';

export function PackagesSection() {
  const { t } = useTranslation();
  const [hoveredPackage, setHoveredPackage] = React.useState<string | null>(null);

  return (
    // <-- ID'yi en üstteki kapsayıcıya ekledik.
    <div id="pricing-packages" className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Sparkles className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
              {t.price.packages.title}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.price.packages.subtitle}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.price.packages.description}
          </p>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed mt-4">
            {t.price.packages.consultation}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="relative grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Reorder packages to put DHI in the middle */}
          {[
            t.price.packages.items.fue,
            t.price.packages.items.dhi,
            t.price.packages.items.vip,
          ].map((pkg, index) => {
            const packageId = index === 0 ? 'fue' : index === 1 ? 'dhi' : 'vip';
            return (
              <div
                key={packageId}
                className={cn(
                  'group relative transition-all duration-300',
                  packageId === 'dhi' ? 'lg:z-20' : 'lg:z-10',
                  hoveredPackage === packageId ? 'lg:scale-105' : ''
                )}
                onMouseEnter={() => setHoveredPackage(packageId)}
                onMouseLeave={() => setHoveredPackage(null)}
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl transition-all duration-300 h-full flex flex-col',
                    'bg-white/80 dark:bg-white/5 backdrop-blur-md',
                    'border border-black/[0.08] dark:border-white/[0.08]',
                    'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]',
                    packageId === 'dhi'
                      ? 'lg:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:lg:shadow-[0_8px_16px_rgba(255,255,255,0.1)]'
                      : '',
                    hoveredPackage === packageId
                      ? 'shadow-[0_16px_32px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_32px_rgba(255,255,255,0.15)]'
                      : ''
                  )}
                >
                  {/* Popular Badge */}
                  {packageId === 'dhi' && (
                    <div className="absolute -top-px left-0 right-0 flex justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-secondary/20 blur-lg" />
                        <div className="relative flex items-center">
                          <div className="h-px w-12 bg-gradient-to-r from-transparent via-secondary to-transparent" />
                          <div className="relative px-4 py-1.5 bg-secondary text-white shadow-lg">
                            <div className="flex items-center gap-2">
                              <Star className="w-3.5 h-3.5 fill-white" />
                              <span className="text-xs font-semibold tracking-wide whitespace-nowrap">
                                {pkg.badge}
                              </span>
                              <Star className="w-3.5 h-3.5 fill-white" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Package Header */}
                  <div className="relative p-6 sm:p-8 border-b border-border/50 mt-4">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                    </div>

                    {/* Mobile Header Layout */}
                    <div className="flex flex-col sm:block">
                      <div
                        className={cn(
                          'w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mx-0 sm:mb-8',
                          'bg-white dark:bg-white/10',
                          'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]'
                        )}
                      >
                        {packageId === 'fue' ? (
                          <Microscope className="w-7 h-7 sm:w-8 sm:h-8 text-primary dark:text-white" />
                        ) : packageId === 'dhi' ? (
                          <Syringe className="w-7 h-7 sm:w-8 sm:h-8 text-primary dark:text-white" />
                        ) : (
                          <Crown className="w-7 h-7 sm:w-8 sm:h-8 text-primary dark:text-white" />
                        )}
                      </div>

                      <div className="text-center sm:text-left">
                        <h3 className="text-2xl sm:text-2xl font-bold text-foreground dark:text-white mb-2">
                          {pkg.title}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-white/60 leading-relaxed max-w-xs mx-auto sm:max-w-none sm:mx-0">
                          {pkg.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center sm:items-start mt-6 sm:mt-8">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={cn(
                            'text-3xl sm:text-4xl font-bold',
                            packageId === 'dhi' ? 'text-secondary' : 'text-foreground dark:text-white'
                          )}
                        >
                          {pkg.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-6 sm:p-8 space-y-6 sm:space-y-8 flex-1 flex flex-col">
                    {/* Technique Info */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_8px_rgba(255,255,255,0.1)] transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center">
                            <Syringe className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground dark:text-white mb-1">
                              {t.price.packages.labels.implantation}
                            </div>
                            <div className="text-sm text-foreground/60 dark:text-white/60">
                              {pkg.implantation}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-white/10 border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_4px_8px_rgba(255,255,255,0.1)] transition-all duration-300">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center">
                            <Microscope className="w-4 h-4 sm:w-5 sm:h-5 text-primary dark:text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground dark:text-white mb-1">
                              {t.price.packages.labels.technique}
                            </div>
                            <div className="text-sm text-foreground/60 dark:text-white/60">
                              {pkg.technique}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feature List */}
                    <ul className="space-y-4 flex-1">
                      {pkg.features.map((featureItem: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-white dark:bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-primary dark:text-white" />
                          </div>
                          <span className="text-sm text-foreground/60 dark:text-white/60">
                            {featureItem}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="space-y-4 mt-auto pt-6">
                      <Button
                        className={cn(
                          'w-full gap-3 h-12 sm:h-14 text-base font-medium rounded-full',
                          'text-white dark:text-primary',
                          'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]',
                          'transition-all duration-300',
                          'hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]',
                          'hover:scale-[1.02] active:scale-[0.98]',
                          packageId === 'dhi'
                            ? 'bg-secondary dark:bg-white hover:bg-secondary/90 dark:hover:bg-white/90'
                            : 'bg-primary dark:bg-white hover:bg-primary/90 dark:hover:bg-white/90'
                        )}
                        onClick={() => window.open('https://wa.me/905360344866', '_blank')}
                      >
                        <MessageCircle className="w-4 h-4" />
                        {t.price.packages.labels.whatsapp}
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </Button>
                      <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-foreground/60 dark:text-white/60">
                        <Shield className="w-3.5 h-3.5" />
                        <span>{t.price.secureNote}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Graft Count Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)]">
            <Microscope className="w-4 h-4 text-primary dark:text-white" />
            <p className="text-sm text-foreground/60 dark:text-white/60">
              {t.price.packages.graftNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
