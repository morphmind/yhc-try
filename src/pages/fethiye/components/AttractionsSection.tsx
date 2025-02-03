import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { 
  Sparkles,
  MapPin,
  Navigation,
  Camera,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AttractionsSection() {
  const { t } = useTranslation();
  const [hoveredPlace, setHoveredPlace] = React.useState<string | null>(null);
  const [activePlace, setActivePlace] = React.useState<string | null>(null);

  const places = [
    {
      id: 'oludeniz',
      icon: Navigation,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500'
    },
    {
      id: 'butterfly',
      icon: Camera,
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-500'
    },
    {
      id: 'kayakoy',
      icon: MapPin,
      gradient: 'from-amber-500/20 to-yellow-500/20',
      iconColor: 'text-amber-500'
    },
    {
      id: 'saklikent',
      icon: Navigation,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500'
    }
  ];

  return (
    <div className="relative py-24 overflow-hidden">
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
              {t.fethiye.attractions.title}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.fethiye.attractions.title}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.fethiye.attractions.description}
          </p>
        </div>

        {/* Places Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {places.map((place) => {
            const placeData = t.fethiye.attractions.places[place.id as keyof typeof t.fethiye.attractions.places];
            return (
              <div
                key={place.id}
                className="group relative"
                onMouseEnter={() => setHoveredPlace(place.id)}
                onMouseLeave={() => setHoveredPlace(null)}
                onClick={() => setActivePlace(activePlace === place.id ? null : place.id)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  hoveredPlace === place.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                )}>
                  {/* Place Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={placeData.image}
                      alt={placeData.title}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-500",
                        hoveredPlace === place.id ? "scale-110" : ""
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Icon and Title */}
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center",
                        "bg-gradient-to-br",
                        place.gradient
                      )}>
                        <place.icon className={cn(
                          "w-6 h-6 transition-colors",
                          hoveredPlace === place.id ? "text-white" : place.iconColor
                        )} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-white">
                          {placeData.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground/60 dark:text-white/60">
                      {placeData.description}
                    </p>

                    {/* View on Map Button */}
                    <Button
                      variant="outline"
                      className="w-full gap-2 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://www.google.com/maps/search/${encodeURIComponent(placeData.title)}+Fethiye`, '_blank');
                      }}
                    >
                      <MapPin className="w-4 h-4" />
                      View on Map
                      <ArrowRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                    </Button>

                    {/* Hover Effect */}
                    <div className={cn(
                      "absolute bottom-0 left-0 w-full h-1",
                      "bg-gradient-to-r from-transparent via-primary/20 to-transparent",
                      "transform scale-x-0 group-hover:scale-x-100",
                      "transition-transform duration-500"
                    )} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}