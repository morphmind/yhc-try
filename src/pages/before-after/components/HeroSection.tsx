import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Play,
  Star,
  ChevronDown,
  Shield,
  Users,
  Clock,
  Medal,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface HeroSectionProps {
  onAnalysisClick: () => void;
  onWhatsAppClick: () => void;
}

export function HeroSection({ onAnalysisClick, onWhatsAppClick }: HeroSectionProps) {
  const { t } = useTranslation();
  const [stories, setStories] = React.useState<any[]>([]);
  const [currentStoryIndex, setCurrentStoryIndex] = React.useState(0);
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<{ x: number; position: number } | null>(null);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  // Fetch stories on mount
  React.useEffect(() => {
    fetchStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-rotate stories every 5 seconds
  React.useEffect(() => {
    if (stories.length > 1) {
      const interval = setInterval(() => {
        if (!isDragging) {
          setCurrentStoryIndex((prev) => (prev + 1) % stories.length);
          setSliderPosition(50); // Reset slider position
        }
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [stories.length, isDragging]);

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  // Handle slider drag
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setDragStart({
      x: clientX,
      position: sliderPosition,
    });
  };

  const handleDragMove = (
    e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent
  ) => {
    if (!isDragging || !dragStart || !sliderRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = sliderRef.current.getBoundingClientRect();
    const deltaX = clientX - dragStart.x;
    const deltaPercent = (deltaX / rect.width) * 100;
    const newPosition = Math.max(0, Math.min(100, dragStart.position + deltaPercent));
    setSliderPosition(newPosition);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  // Handle global drag events
  React.useEffect(() => {
    if (isDragging) {
      const handleGlobalMove = (e: MouseEvent | TouchEvent) => handleDragMove(e);
      const handleGlobalEnd = handleDragEnd;

      document.addEventListener('mousemove', handleGlobalMove);
      document.addEventListener('mouseup', handleGlobalEnd);
      document.addEventListener('touchmove', handleGlobalMove);
      document.addEventListener('touchend', handleGlobalEnd);

      return () => {
        document.removeEventListener('mousemove', handleGlobalMove);
        document.removeEventListener('mouseup', handleGlobalEnd);
        document.removeEventListener('touchmove', handleGlobalMove);
        document.removeEventListener('touchend', handleGlobalEnd);
      };
    }
  }, [isDragging]); // eslint-disable-line react-hooks/exhaustive-deps

  const currentStory = stories[currentStoryIndex];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 md:pt-16">
      {/* Rich Background Effects */}
      <div className="absolute inset-0">
        {/* Dynamic Background */}
        <div className="absolute inset-0">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.15),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.2),transparent_60%)] dark:bg-[radial-gradient(circle_at_0%_0%,rgba(120,119,198,0.25),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(74,86,226,0.3),transparent_60%)] pointer-events-none" />

          {/* Animated Lines (add pointer-events-none) */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse pointer-events-none" />
            <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent animate-pulse delay-75 pointer-events-none" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-pulse delay-150 pointer-events-none" />
          </div>
        </div>

        {/* Animated Gradient Spheres */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[30%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-[128px] animate-pulse dark:from-primary/20 dark:to-secondary/20 pointer-events-none" />
          <div className="absolute bottom-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-secondary/30 to-primary/30 blur-[96px] animate-pulse dark:from-secondary/20 dark:to-primary/20 pointer-events-none" />
        </div>

        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-[0.02] dark:opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 cursor-auto mt-8 sm:mt-0">
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                {t.beforeAfter.hero.title.highlight}
              </span>
              <span className="block mt-4 text-foreground dark:text-white">
                {t.beforeAfter.hero.title.main}
              </span>
            </h1>

            <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed max-w-xl">
              {t.beforeAfter.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className={cn(
                  'w-full sm:w-auto h-14 px-10 text-base gap-2',
                  'text-white dark:text-primary',
                  'bg-gradient-to-r from-primary via-primary to-secondary',
                  'dark:from-white dark:via-white dark:to-white/95',
                  'rounded-full',
                  'shadow-[0_8px_32px_rgba(0,0,0,0.25)]',
                  'dark:shadow-[0_8px_32px_rgba(255,255,255,0.25)]',
                  'transition-all duration-500',
                  'hover:shadow-[0_16px_48px_rgba(0,0,0,0.35)]',
                  'dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.35)]',
                  'hover:scale-[1.02] active:scale-[0.98]',
                  'group overflow-hidden'
                )}
                onClick={onAnalysisClick}
              >
                <ArrowRight className="w-4 h-4" />
                {t.beforeAfter.cta.buttons.analysis}
              </Button>

              <Button
                size="lg"
                variant="outline"
                className={cn(
                  'w-full sm:w-auto h-14 px-10 text-base gap-2',
                  'rounded-full',
                  'bg-white/90 dark:bg-white/10',
                  'backdrop-blur-xl',
                  'border border-black/[0.08] dark:border-white/[0.08]',
                  'shadow-[0_8px_32px_rgba(0,0,0,0.15)]',
                  'dark:shadow-[0_8px_32px_rgba(255,255,255,0.15)]',
                  'transition-all duration-500',
                  'hover:shadow-[0_16px_48px_rgba(0,0,0,0.25)]',
                  'dark:hover:shadow-[0_16px_48px_rgba(255,255,255,0.25)]',
                  'hover:bg-white/90 dark:hover:bg-white/20',
                  'hover:scale-[1.02] active:scale-[0.98]'
                )}
                onClick={onWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4" />
                {t.beforeAfter.cta.buttons.whatsapp}
              </Button>
            </div>
          </div>

          {/* Success Stories Slider */}
          <div className="space-y-8">
            {currentStory && (
              <>
                {/* Before/After Slider */}
                <div
                  ref={sliderRef}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize"
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                >
                  {/* Before Image */}
                  <div className="absolute inset-0">
                    <img
                      src={currentStory.before_image}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* After Image */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{
                      clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
                    }}
                  >
                    <img
                      src={currentStory.after_image}
                      alt="After"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Slider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div
                      className={cn(
                        'absolute top-1/2 -translate-y-1/2 -translate-x-1/2',
                        'w-12 h-12 rounded-full',
                        'bg-white/90 backdrop-blur-sm',
                        'shadow-[0_0_0_4px_rgba(255,255,255,0.3),0_4px_16px_rgba(0,0,0,0.2)]',
                        'flex items-center justify-center',
                        'transition-all duration-300',
                        isDragging
                          ? 'scale-110 shadow-[0_0_0_6px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.3)]'
                          : ''
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4 text-primary" />
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg pointer-events-none">
                      {t.beforeAfter.content.labels.before}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg pointer-events-none">
                      {t.beforeAfter.content.labels.after}
                    </div>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <div className="text-sm font-medium">
                          {
                            t.beforeAfter.content.timeframes[
                              currentStory.timeframe as keyof typeof t.beforeAfter.content.timeframes
                            ]
                          }
                        </div>
                        <div className="text-xs text-white/80 mt-0.5">
                          {currentStory.grafts} {t.beforeAfter.content.labels.grafts} •{' '}
                          {t.beforeAfter.content.labels.age} {currentStory.age}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: currentStory.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* View Success Stories Button */}
                <button
                  className={cn(
                    'relative w-full overflow-hidden rounded-2xl p-8',
                    'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent',
                    'dark:from-primary/20 dark:via-primary/10 dark:to-transparent',
                    'border border-primary/20 dark:border-primary/30',
                    'group cursor-pointer',
                    'transition-all duration-500',
                    'hover:scale-[1.02]',
                    'hover:shadow-[0_32px_64px_rgba(0,0,0,0.25)]'
                  )}
                  onClick={() => {
                    document.getElementById('gallery')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 pointer-events-none" />
                  </div>

                  {/* Content */}
                  <div className="relative flex flex-col items-center gap-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl animate-pulse pointer-events-none" />
                      <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center">
                        <Star className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold">
                        {t.beforeAfter.hero.viewResults}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t.beforeAfter.hero.viewResultsDescription}
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="font-medium text-primary dark:text-white">
                        {t.beforeAfter.hero.viewResultsButton}
                      </span>
                      <ChevronDown className="w-5 h-5 text-primary dark:text-white animate-bounce" />
                    </div>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
