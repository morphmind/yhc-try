import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus
} from 'lucide-react';

export function FAQSection() {
  const { t } = useTranslation();
  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null);

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
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/10 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.04)] mb-8 transition-all duration-300 hover:scale-[1.02]">
              <AlertCircle className="w-4 h-4 text-primary dark:text-white" />
              <span className="text-sm font-medium text-foreground/80 dark:text-white/80">
                {t.price.faq.title}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white mb-4">
              {t.price.faq.title}
            </h2>
            <p className="text-lg text-foreground/60 dark:text-white/60 max-w-2xl mx-auto">
              {t.price.faq.description}
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {t.price.faq.items.map((faq, index) => (
              <div
                key={index}
                className={cn(
                  "relative overflow-hidden rounded-xl transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  expandedFaq === index ? "shadow-lg" : "hover:shadow-md"
                )}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left p-6 flex items-center justify-between group"
                >
                  <span className="font-medium pr-4 group-hover:text-primary dark:group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
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
  );
}