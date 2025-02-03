import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  ArrowRight, 
  MessageCircle, 
  Phone, 
  Shield,
  Sparkles,
  Microscope,
  Syringe,
  Star
} from 'lucide-react';

interface CTASectionProps {
  onAnalysisClick: () => void;
  onWhatsAppClick: () => void;
  onCallClick: () => void;
}

export function CTASection({ onAnalysisClick, onWhatsAppClick, onCallClick }: CTASectionProps) {
  const { t } = useTranslation();
  const [hoveredFeature, setHoveredFeature] = React.useState<number | null>(null);

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Glowing Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_100%_0%,rgba(120,119,198,0.2),transparent_50%),radial-gradient(circle_at_0%_100%,rgba(74,86,226,0.2),transparent_50%)]" />
        
        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-[96px] animate-pulse dark:from-primary/10 dark:to-secondary/10" />
          <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-[64px] animate-pulse dark:from-secondary/10 dark:to-primary/10" />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Card */}
          <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-md border border-white/10">
            <div className="absolute inset-0">
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent animate-gradient" />
              
              {/* Glowing Lines */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
              </div>
            </div>

            <div className="relative p-8 sm:p-12">
              {/* Tech Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 mt-4 mx-auto w-fit transition-all duration-300 hover:scale-[1.02]">
                <Shield className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
                  {t.microsapphire.cta.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="max-w-2xl mx-auto text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white">
                  {t.microsapphire.cta.title}
                </h2>
                <p className="text-lg text-foreground/60 dark:text-white/60 max-w-2xl mx-auto">
                  {t.microsapphire.cta.description}
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {[
                  {
                    icon: Microscope,
                    title: t.microsapphire.cta.features.precision,
                    gradient: 'from-blue-500/20 to-cyan-500/20',
                    iconColor: 'text-blue-400'
                  },
                  {
                    icon: Shield,
                    title: t.microsapphire.cta.features.safe,
                    gradient: 'from-green-500/20 to-emerald-500/20',
                    iconColor: 'text-green-400'
                  },
                  {
                    icon: Star,
                    title: t.microsapphire.cta.features.natural,
                    gradient: 'from-purple-500/20 to-pink-500/20',
                    iconColor: 'text-purple-400'
                  },
                  {
                    icon: Sparkles,
                    title: t.microsapphire.cta.features.expert,
                    gradient: 'from-amber-500/20 to-orange-500/20',
                    iconColor: 'text-amber-400'
                  }
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="group relative"
                    onMouseEnter={() => setHoveredFeature(index)}
                    onMouseLeave={() => setHoveredFeature(null)}
                  >
                    <div className={cn(
                      "relative p-4 rounded-xl transition-all duration-300",
                      "bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08]",
                      hoveredFeature === index ? "scale-[1.02] shadow-[0_0_30px_rgba(59,130,246,0.3)]" : "hover:scale-[1.01]"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          "bg-gradient-to-br",
                          feature.gradient
                        )}>
                          <feature.icon className={cn(
                            "w-5 h-5 transition-colors",
                            hoveredFeature === index ? "text-foreground dark:text-white" : feature.iconColor
                          )} />
                        </div>
                        <span className="text-sm font-medium text-foreground dark:text-white">
                          {feature.title}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-10 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={onAnalysisClick}
                >
                  <ArrowRight className="w-4 h-4" />
                  {t.microsapphire.cta.buttons.analysis}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-10 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={onWhatsAppClick}
                >
                  <MessageCircle className="w-4 h-4" />
                  {t.microsapphire.cta.buttons.whatsapp}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-10 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={onCallClick}
                >
                  <Phone className="w-4 h-4" />
                  {t.microsapphire.cta.buttons.call}
                </Button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-2 text-sm text-foreground/60 dark:text-white/60 pt-4">
                <Shield className="w-4 h-4" />
                <span>{t.microsapphire.cta.secureNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}