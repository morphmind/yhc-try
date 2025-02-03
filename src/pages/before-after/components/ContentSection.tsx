import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Star,
  ArrowRight,
  MessageCircle,
  Phone,
  Shield,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Clock,
  CheckCircle,
  Calendar,
  AlertCircle
} from 'lucide-react';

export function ContentSection() {
  const { t } = useTranslation();
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);
  const [hoveredSection, setHoveredSection] = React.useState<number | null>(null);

  const faqs = t.beforeAfter.content.faq.items;

  const bestAgeInfo = t.beforeAfter.content.bestAge.items;

  const worthItReasons = t.beforeAfter.content.worthIt.items;

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
        {/* Best Age Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-8 sm:p-12">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-4 transition-all duration-300 hover:scale-[1.02]">
                <Calendar className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.beforeAfter.content.badges.bestAge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white mb-6">
                {t.beforeAfter.content.bestAge.title}
              </h2>
              <p className="text-lg text-foreground/60 dark:text-white/60 mb-8 max-w-2xl mx-auto">
                {t.beforeAfter.content.bestAge.description}
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {bestAgeInfo.map((info, index) => (
                  <div
                    key={index}
                    className="group relative"
                    onMouseEnter={() => setHoveredSection(index)}
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className={cn(
                      "relative overflow-hidden rounded-xl transition-all duration-300 p-6",
                      "bg-white/50 dark:bg-white/5 backdrop-blur-sm",
                      "border border-black/[0.08] dark:border-white/[0.08] h-full",
                      hoveredSection === index ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]"
                    )}>
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                          "bg-gradient-to-br",
                          index === 0 ? "from-emerald-500/20 to-green-500/20" :
                          index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                          index === 2 ? "from-purple-500/20 to-pink-500/20" :
                          "from-amber-500/20 to-orange-500/20"
                        )}>
                          <Clock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
                            {info.title}
                          </h3>
                          <p className="text-sm text-foreground/60 dark:text-white/60">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Worth It Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-8 sm:p-12">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-4 transition-all duration-300 hover:scale-[1.02]">
                <CheckCircle className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.beforeAfter.content.badges.valueAnalysis}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white mb-6">
                {t.beforeAfter.content.worthIt.title}
              </h2>
              <p className="text-lg text-foreground/60 dark:text-white/60 mb-8 max-w-2xl mx-auto">
                {t.beforeAfter.content.worthIt.description}
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {worthItReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="group relative"
                    onMouseEnter={() => setHoveredSection(index + 4)} // Offset to avoid conflict with previous section
                    onMouseLeave={() => setHoveredSection(null)}
                  >
                    <div className={cn(
                      "relative overflow-hidden rounded-xl transition-all duration-300 p-6",
                      "bg-white/50 dark:bg-white/5 backdrop-blur-sm",
                      "border border-black/[0.08] dark:border-white/[0.08] h-full",
                      hoveredSection === index + 4 ? "scale-[1.02] shadow-lg" : "hover:scale-[1.01]"
                    )}>
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                          "bg-gradient-to-br",
                          index === 0 ? "from-emerald-500/20 to-green-500/20" :
                          index === 1 ? "from-blue-500/20 to-indigo-500/20" :
                          index === 2 ? "from-purple-500/20 to-pink-500/20" :
                          "from-amber-500/20 to-orange-500/20"
                        )}>
                          <Star className="w-5 h-5 text-white" />
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
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] p-8 sm:p-12">
            <div className="absolute inset-0 bg-grid-white/5" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-4 transition-all duration-300 hover:scale-[1.02]">
                <AlertCircle className="w-4 h-4 text-primary dark:text-white" />
                <span className="text-sm font-medium text-foreground/80 dark:text-white/80">{t.beforeAfter.content.badges.faq}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white mb-6">
                {t.beforeAfter.content.faq.title}
              </h2>
              <p className="text-lg text-foreground/60 dark:text-white/60 mb-8 max-w-2xl mx-auto">
                {t.beforeAfter.content.faq.description}
              </p>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className={cn(
                      "relative overflow-hidden rounded-xl transition-all duration-300",
                      "bg-white/50 dark:bg-white/5 backdrop-blur-sm",
                      "border border-black/[0.08] dark:border-white/[0.08]",
                      expandedFaq === index ? "shadow-lg" : "hover:shadow-md"
                    )}
                  >
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full text-left p-6 flex items-center justify-between group"
                    >
                      <span className="font-medium pr-4 group-hover:text-primary dark:group-hover:text-white transition-colors">{faq.question}</span>
                      {expandedFaq === index ? (
                        <Minus className="w-4 h-4 flex-shrink-0 text-primary dark:text-white transition-colors" />
                      ) : (
                        <Plus className="w-4 h-4 flex-shrink-0 group-hover:text-primary dark:group-hover:text-white transition-colors" />
                      )}
                    </button>
                    <div className={cn(
                      "grid transition-all duration-300",
                      expandedFaq === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}>
                      <div className="overflow-hidden">
                        <div className="p-6 pt-0 text-base text-foreground/60 dark:text-white/60 leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}