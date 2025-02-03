import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { 
  Microscope,
  Shield,
  Heart,
  CheckCircle,
  Sparkles,
  Star,
  ArrowRight,
  Stethoscope,
  Syringe,
  Laptop,
  Palette
} from 'lucide-react';

export function ProcessSection() {
  const { t } = useTranslation();
  const [hoveredStep, setHoveredStep] = React.useState<number | null>(null);

  const icons = [
    { icon: Stethoscope, gradient: 'from-emerald-500/20 to-green-500/20', iconColor: 'text-emerald-500' },
    { icon: Laptop, gradient: 'from-blue-500/20 to-indigo-500/20', iconColor: 'text-blue-500' },
    { icon: Syringe, gradient: 'from-purple-500/20 to-pink-500/20', iconColor: 'text-purple-500' },
    { icon: Palette, gradient: 'from-amber-500/20 to-orange-500/20', iconColor: 'text-amber-500' }
  ];

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        {/* Modern Gradient Background */}
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
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
            <Star className="w-4 h-4 text-primary dark:text-white" />
            <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
              {t.beforeAfter.process.badge}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.beforeAfter.process.title}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.beforeAfter.process.description}
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />

          <div className="grid gap-8">
            {t.beforeAfter.process.steps.map((step, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-8 -translate-x-1/2 hidden lg:block">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-primary/20 dark:bg-primary/40 animate-ping" />
                    <div className="absolute inset-0 w-4 h-4 rounded-full bg-primary/40 dark:bg-primary/60" />
                  </div>
                </div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 items-center">
                  {/* Left Side - Step Number */}
                  <div className={cn(
                    "relative overflow-hidden rounded-2xl transition-all duration-300 p-6 text-center",
                    "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    "hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                    "lg:translate-x-4 group-hover:translate-x-0 transition-transform"
                  )}>
                    <div className="relative">
                      {/* Step Number */}
                      <div className="relative w-16 h-16 mx-auto mb-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-lg animate-pulse" />
                        <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center">
                          <span className="text-2xl font-bold text-white">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full mx-auto" />
                    </div>
                  </div>

                  {/* Right Side - Description */}
                  <div className={cn(
                    "relative overflow-hidden rounded-2xl transition-all duration-300 p-6",
                    "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                    "border border-black/[0.08] dark:border-white/[0.08]",
                    "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                    "hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]",
                    "lg:-translate-x-4 group-hover:translate-x-0 transition-transform"
                  )}>
                    <div className="relative flex items-center gap-4">
                      <div className={cn(
                        "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                        "bg-gradient-to-br",
                        icons[index].gradient
                      )}>
                        {React.createElement(icons[index].icon, { className: "w-6 h-6 text-white" })}
                      </div>
                      <div>
                        <p className="text-sm text-foreground/60 dark:text-white/60">
                          {step.description}
                        </p>
                      </div>
                    </div>
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