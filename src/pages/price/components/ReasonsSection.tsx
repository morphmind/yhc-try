import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { 
  Stethoscope,
  Award,
  Sparkles,
  Star,
  HeartHandshake,
  Building2
} from 'lucide-react';

export function ReasonsSection() {
  const { t } = useTranslation();
  const [hoveredReason, setHoveredReason] = React.useState<number | null>(null);

  const icons = [
    { icon: Stethoscope, gradient: 'from-emerald-500/20 to-green-500/20', iconColor: 'text-emerald-500' },
    { icon: Award, gradient: 'from-blue-500/20 to-indigo-500/20', iconColor: 'text-blue-500' },
    { icon: Sparkles, gradient: 'from-purple-500/20 to-pink-500/20', iconColor: 'text-purple-500' },
    { icon: Star, gradient: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-500' },
    { icon: HeartHandshake, gradient: 'from-rose-500/20 to-pink-500/20', iconColor: 'text-rose-500' },
    { icon: Building2, gradient: 'from-cyan-500/20 to-blue-500/20', iconColor: 'text-cyan-500' }
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
            <Star className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
              {t.price.reasons.title}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.price.reasons.title}
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.price.reasons.items.map((reason, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredReason(index)}
              onMouseLeave={() => setHoveredReason(null)}
            >
              <div className={cn(
                "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                hoveredReason === index ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
              )}>
                <div className="p-6 space-y-4">
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center",
                    "bg-gradient-to-br",
                    icons[index].gradient
                  )}>
                    {React.createElement(icons[index].icon, {
                      className: cn(
                        "w-6 h-6 transition-colors",
                        hoveredReason === index ? "text-white" : icons[index].iconColor
                      )
                    })}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-foreground/60 dark:text-white/60">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}