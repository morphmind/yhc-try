import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { Globe } from 'lucide-react';

export function ComparisonSection() {
  const { t } = useTranslation();
  const [hoveredCountry, setHoveredCountry] = React.useState<string | null>(null);

  // Ülke bayraklarını emoji olarak tutan obje
  const flags = {
    turkey: '🇹🇷',
    uk: '🇬🇧',
    usa: '🇺🇸',
    germany: '🇩🇪',
    spain: '🇪🇸',
    france: '🇫🇷',
    ireland: '🇮🇪',
  };

  return (
    <div className="relative py-24 overflow-hidden">
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
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Globe className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
              {t.price.comparison.title}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.price.comparison.title}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.price.comparison.description}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(t.price.comparison.countries).map(([code, country]) => {
            return (
              <div
                key={code}
                className="group relative"
                onMouseEnter={() => setHoveredCountry(code)}
                onMouseLeave={() => setHoveredCountry(null)}
              >
                <div
                  className={cn(
                    'relative overflow-hidden rounded-2xl h-full transition-all duration-300',
                    'bg-white/80 dark:bg-white/5 backdrop-blur-md',
                    'border border-black/[0.08] dark:border-white/[0.08]',
                    'shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]',
                    hoveredCountry === code
                      ? 'scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]'
                      : 'hover:scale-[1.01]'
                  )}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center text-2xl select-none',
                          'bg-gradient-to-br',
                          'from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10'
                        )}
                      >
                        {flags[code as keyof typeof flags]}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-white">
                          {country.name}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-white/60">
                          {country.range}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
