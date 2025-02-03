import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { 
  Sparkles,
  Plane,
  Car,
  Train,
  Bus,
  ParkingCircle as Parking,
  ArrowRight,
  MapPin,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TransportationSection() {
  const { t } = useTranslation();
  const [hoveredOption, setHoveredOption] = React.useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = React.useState<string | null>(null);

  const options = [
    {
      id: 'airport',
      icon: Plane,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/dalaman-airport.jpg'
    },
    {
      id: 'local',
      icon: Bus,
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/public-transport.jpg'
    },
    {
      id: 'excursions',
      icon: Car,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/excursions.jpg'
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
              {t.fethiye.transportation.title}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.fethiye.transportation.title}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.fethiye.transportation.description}
          </p>
        </div>

        {/* Transportation Options Grid */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {options.map((option) => {
            const optionData = t.fethiye.transportation.options[option.id as keyof typeof t.fethiye.transportation.options];
            return (
              <div
                key={option.id}
                className="group relative"
                onMouseEnter={() => setHoveredOption(option.id)}
                onMouseLeave={() => setHoveredOption(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  hoveredOption === option.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                )}>
                  {/* Option Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={option.image}
                      alt={optionData.title}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-500",
                        hoveredOption === option.id ? "scale-110" : ""
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
                        option.gradient
                      )}>
                        <option.icon className={cn(
                          "w-6 h-6 transition-colors",
                          hoveredOption === option.id ? "text-white" : option.iconColor
                        )} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-white">
                          {optionData.title}
                        </h3>
                        <p className="text-sm text-foreground/60 dark:text-white/60">
                          {optionData.description}
                        </p>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-2">
                      {optionData.features.map((feature, index) => (
                        <li
                          key={index}
                          className="group/item relative"
                          onMouseEnter={() => setHoveredFeature(`${option.id}-${index}`)}
                          onMouseLeave={() => setHoveredFeature(null)}
                        >
                          <div className={cn(
                            "flex items-center gap-2 p-2 rounded-lg transition-all duration-300",
                            "hover:bg-black/5 dark:hover:bg-white/5",
                            hoveredFeature === `${option.id}-${index}` && "bg-black/5 dark:bg-white/5"
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
                        window.open(`https://maps.app.goo.gl/fVb8V5hj7R3UDdPR8`, '_blank');
                      }}
                    >
                      <Navigation className="w-4 h-4" />
                      Get Directions
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

        {/* Location Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-8">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="relative flex flex-col lg:flex-row gap-8">
            {/* Map */}
            <div className="flex-1 rounded-xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.7459742056745!2d29.126231076680706!3d36.63533942935868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c041f7b8c9c8a5%3A0x9f8d8b8d8b8d8b8d!2sYak%C4%B1%C5%9F%C4%B1kl%C4%B1%20Hair%20Clinic!5e0!3m2!1sen!2str!4v1620000000000!5m2!1sen!2str"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>

            {/* Location Info */}
            <div className="lg:w-1/3 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary dark:text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground dark:text-white">
                    {t.fethiye.transportation.title}
                  </h3>
                  <p className="text-sm text-foreground/60 dark:text-white/60">
                    {t.fethiye.transportation.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-black/[0.08] dark:border-white/[0.08]">
                  <MapPin className="w-5 h-5 text-primary dark:text-white" />
                  <span className="text-sm text-foreground/80 dark:text-white/80">
                    Babataşı, Celal Bayar Cd. 81/1, 48850 Muğla/Fethiye
                  </span>
                </div>

                {/* Parking Info */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-black/[0.08] dark:border-white/[0.08]">
                  <Parking className="w-5 h-5 text-primary dark:text-white" />
                  <span className="text-sm text-foreground/80 dark:text-white/80">
                    {t.fethiye.transportation.options.parking.description}
                  </span>
                </div>

                {/* Get Directions Button */}
                <Button
                  className="w-full gap-2 h-12 text-white dark:text-primary bg-primary dark:bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => window.open('https://maps.app.goo.gl/fVb8V5hj7R3UDdPR8', '_blank')}
                >
                  <Navigation className="w-4 h-4" />
                  {t.fethiye.transportation.options.parking.title}
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}