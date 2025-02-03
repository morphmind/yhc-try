import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { 
  Sparkles,
  Building2,
  Hotel,
  Home,
  Crown,
  Wifi,
  Tv,
  Phone,
  Bell,
  Sofa,
  Coffee,
  Briefcase,
  UserRound,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AccommodationSection() {
  const { t } = useTranslation();
  const [hoveredType, setHoveredType] = React.useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null);

  const types = [
    {
      id: 'luxury',
      icon: Crown,
      gradient: 'from-amber-500/20 to-yellow-500/20',
      iconColor: 'text-amber-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/luxury-hotels.jpg'
    },
    {
      id: 'boutique',
      icon: Hotel,
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/boutique-hotels.jpg'
    },
    {
      id: 'apartments',
      icon: Building2,
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/apartments.jpg'
    },
    {
      id: 'villas',
      icon: Home,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/villas.jpg'
    }
  ];

  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Tv, label: 'Smart TV' },
    { icon: Phone, label: '24/7 Support' },
    { icon: Bell, label: 'Room Service' },
    { icon: Sofa, label: 'Lounge Access' },
    { icon: Coffee, label: 'Breakfast' },
    { icon: Briefcase, label: 'Business Center' },
    { icon: UserRound, label: 'Concierge' }
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
              {t.fethiye.accommodation.title}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.fethiye.accommodation.title}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.fethiye.accommodation.description}
          </p>
        </div>

        {/* Accommodation Types Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {types.map((type) => {
            const typeData = t.fethiye.accommodation.types[type.id as keyof typeof t.fethiye.accommodation.types];
            return (
              <div
                key={type.id}
                className="group relative"
                onMouseEnter={() => setHoveredType(type.id)}
                onMouseLeave={() => setHoveredType(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  hoveredType === type.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                )}>
                  {/* Type Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={type.image}
                      alt={typeData.title}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-500",
                        hoveredType === type.id ? "scale-110" : ""
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
                        type.gradient
                      )}>
                        <type.icon className={cn(
                          "w-6 h-6 transition-colors",
                          hoveredType === type.id ? "text-white" : type.iconColor
                        )} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-white">
                          {typeData.title}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-white/60">
                          {typeData.description}
                        </p>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2">
                      {typeData.features.map((feature, index) => (
                        <li
                          key={index}
                          className="group/item relative"
                          onMouseEnter={() => setHoveredFeature(`${type.id}-${index}`)}
                          onMouseLeave={() => setHoveredFeature(null)}
                        >
                          <div className={cn(
                            "flex items-center gap-2 p-2 rounded-lg transition-all duration-300",
                            "hover:bg-black/5 dark:hover:bg-white/5",
                            hoveredFeature === `${type.id}-${index}` && "bg-black/5 dark:bg-white/5"
                          )}>
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-white/50" />
                            <span className="text-sm text-foreground/60 dark:text-white/60">{feature}</span>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* View More Button */}
                    <Button
                      variant="outline"
                      className="w-full gap-2 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://www.booking.com/searchresults.html?ss=Fethiye`, '_blank');
                      }}
                    >
                      <type.icon className="w-4 h-4" />
                      Book Now
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

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className={cn(
                "relative overflow-hidden rounded-xl p-4 text-center transition-all duration-300",
                "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                "hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
              )}
            >
              <div className="flex flex-col items-center gap-2">
                <amenity.icon className="w-5 h-5 text-primary dark:text-white" />
                <span className="text-xs text-foreground/60 dark:text-white/60">{amenity.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}