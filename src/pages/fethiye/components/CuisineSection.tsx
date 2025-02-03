import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { 
  UtensilsCrossed,
  Fish,
  Soup,
  Dessert,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CuisineSection() {
  const { t } = useTranslation();
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);

  const categories = [
    {
      id: 'seafood',
      icon: Fish,
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/seafood.jpg'
    },
    {
      id: 'turkish',
      icon: UtensilsCrossed,
      gradient: 'from-red-500/20 to-rose-500/20',
      iconColor: 'text-red-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/turkish.jpg'
    },
    {
      id: 'mezze',
      icon: Soup,
      gradient: 'from-emerald-500/20 to-green-500/20',
      iconColor: 'text-emerald-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/mezze.jpg'
    },
    {
      id: 'desserts',
      icon: Dessert,
      gradient: 'from-amber-500/20 to-yellow-500/20',
      iconColor: 'text-amber-500',
      image: 'https://glokalizm.com/yakisikli/img/fethiye/desserts.jpg'
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
              {t.fethiye.cuisine.title}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.fethiye.cuisine.title}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.fethiye.cuisine.description}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const categoryData = t.fethiye.cuisine.categories[category.id as keyof typeof t.fethiye.cuisine.categories];
            return (
              <div
                key={category.id}
                className="group relative"
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-2xl h-full transition-all duration-300",
                  "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                  "border border-black/[0.08] dark:border-white/[0.08]",
                  "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                  hoveredCategory === category.id ? "scale-[1.02] shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_16px_rgba(255,255,255,0.1)]" : "hover:scale-[1.01]"
                )}>
                  {/* Category Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={categoryData.title}
                      className={cn(
                        "w-full h-full object-cover transition-transform duration-500",
                        hoveredCategory === category.id ? "scale-110" : ""
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
                        category.gradient
                      )}>
                        <category.icon className={cn(
                          "w-6 h-6 transition-colors",
                          hoveredCategory === category.id ? "text-white" : category.iconColor
                        )} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground dark:text-white">
                          {categoryData.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground/60 dark:text-white/60">
                      {categoryData.description}
                    </p>

                    {/* Dishes */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-foreground dark:text-white">
                        {t.fethiye.cuisine.title}:
                      </div>
                      <ul className="space-y-2">
                        {categoryData.dishes.map((dish, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-foreground/60 dark:text-white/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 dark:bg-white/50" />
                            <span>{dish}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* View More Button */}
                    <Button
                      variant="outline"
                      className="w-full gap-2 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(`https://www.google.com/search?q=${encodeURIComponent(`${categoryData.title} restaurants Fethiye`)}`, '_blank');
                      }}
                    >
                      <UtensilsCrossed className="w-4 h-4" />
                      Find Restaurants
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