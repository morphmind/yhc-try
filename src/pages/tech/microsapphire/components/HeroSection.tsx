import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Star,
  ArrowRight,
  MessageCircle,
  Users,
  Clock,
  Medal,
  Sparkles
} from 'lucide-react';

interface HeroSectionProps {
  onAnalysisClick: () => void;
  onWhatsAppClick: () => void;
}

export function HeroSection({ onAnalysisClick, onWhatsAppClick }: HeroSectionProps) {
  const { t } = useTranslation();
  const [hoveredStat, setHoveredStat] = React.useState<number | null>(null);

  const stats = [
    {
      value: t.beforeAfter.hero.stats.operations.value,
      label: t.beforeAfter.hero.stats.operations.label,
      icon: Users,
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-500'
    },
    {
      value: t.beforeAfter.hero.stats.satisfaction.value,
      label: t.beforeAfter.hero.stats.satisfaction.label,
      icon: Star,
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-500'
    },
    {
      value: t.beforeAfter.hero.stats.experience.value,
      label: t.beforeAfter.hero.stats.experience.label,
      icon: Clock,
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500'
    },
    {
      value: t.beforeAfter.hero.stats.rating.value,
      label: t.beforeAfter.hero.stats.rating.label,
      icon: Medal,
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-500'
    }
  ];

  return (
    <div className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-[72px] md:pt-[88px] lg:pt-0 pb-12">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.15),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.2),transparent_60%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.25),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.3),transparent_60%)]" />
          
          {/* Animated Lines */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse" />
            <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent animate-pulse delay-75" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse delay-150" />
          </div>
        </div>

        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[30%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-[128px] animate-pulse dark:from-primary/20 dark:to-secondary/20" />
          <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-[96px] animate-pulse dark:from-secondary/20 dark:to-primary/20" />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="relative space-y-8 lg:col-span-5">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 relative z-[15] group transition-all duration-300 hover:scale-[1.02]">
              <Star className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
                {t.beforeAfter.hero.badge}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold !leading-[1.15] tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {t.microsapphire.hero.title.highlight}
              </span>
              <span className="block mt-3 text-foreground dark:text-white text-[0.85em]">
                {t.beforeAfter.hero.title.main}
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-foreground/60 dark:text-white/60 leading-relaxed max-w-xl">
              {t.beforeAfter.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={cn(
                  "w-full sm:w-auto h-14 px-10 text-base gap-2",
                  "text-white dark:text-primary",
                  "bg-gradient-to-r from-primary via-primary to-secondary",
                  "dark:from-white dark:via-white dark:to-white/95",
                  "rounded-full",
                  "shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
                  "dark:shadow-[0_8px_32px_rgba(255,255,255,0.25)]",
                  "transition-all duration-500",
                  "hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]",
                  "dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.35)]",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  "group overflow-hidden"
                )}
                onClick={onAnalysisClick}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_107%,rgba(255,255,255,0.4)_5%,rgba(255,255,255,0.2)_15%,rgba(255,255,255,0)_30%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <ArrowRight className="w-4 h-4" />
                {t.beforeAfter.cta.buttons.analysis}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "w-full sm:w-auto h-14 px-10 text-base gap-2",
                  "rounded-full",
                  "bg-white/90 dark:bg-white/10",
                  "backdrop-blur-xl",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_8px_32px_rgba(0,0,0,0.15)]",
                  "dark:shadow-[0_8px_32px_rgba(255,255,255,0.15)]",
                  "transition-all duration-500",
                  "hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]",
                  "dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.25)]",
                  "hover:scale-[1.02] active:scale-[0.98]",
                  "group overflow-hidden"
                )}
                onClick={onWhatsAppClick}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <MessageCircle className="w-4 h-4" />
                {t.beforeAfter.cta.buttons.whatsapp}
              </Button>
            </div>

            {/* View Success Stories Card */}
            <div className="relative mt-16">
              <div 
                className={cn(
                  "relative overflow-hidden rounded-2xl p-8",
                  "bg-gradient-to-br from-primary/10 via-primary/5 to-transparent",
                  "dark:from-primary/20 dark:via-primary/10 dark:to-transparent",
                  "border border-primary/20 dark:border-primary/30",
                  "group cursor-pointer",
                  "transition-all duration-500",
                  "hover:scale-[1.02]",
                  "hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)]"
                )}
                onClick={() => {
                  document.getElementById('gallery')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                {/* Animated Background */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
                
                {/* Content */}
                <div className="relative flex flex-col items-center gap-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse" />
                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      {t.beforeAfter.hero.viewResults}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t.beforeAfter.hero.viewResultsDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-primary dark:text-white">
                    <span className="font-medium">{t.beforeAfter.hero.viewResultsButton}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mt-8 sm:mt-10 lg:mt-0 z-[1]">
            <div className="relative">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.15),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.25),transparent_60%)] rounded-3xl" />
              
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-2xl animate-pulse" />
              
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.1)]">
                <img
                  src="https://glokalizm.com/yakisikli/img/before-after/hero.jpg"
                  alt="Before & After Results"
                  className="w-full aspect-[4/3] object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4 mt-12">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative"
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  "aspect-[4/3]",
                  hoveredStat === index ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                )}>
                  <div className="p-6 flex flex-col items-center justify-center h-full text-center">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                        "bg-white dark:bg-white/10",
                        "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]"
                      )}>
                        <stat.icon className={cn(
                          "w-6 h-6 transition-colors",
                          hoveredStat === index ? stat.iconColor : "text-primary/80 dark:text-white/80"
                        )} />
                      </div>
                      <div className="text-2xl font-bold text-primary dark:text-white mb-1">
                        {stat.value}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}