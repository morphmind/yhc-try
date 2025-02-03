import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Star,
  ArrowRight,
  ArrowLeft,
  Play,
  Filter,
  ChevronRight,
  MessageCircle,
  Phone,
  Shield,
  RefreshCw
} from 'lucide-react';
import { VideoModal } from '@/components/ui/video-modal';
import { supabase } from '@/lib/supabase';

export function GallerySection() {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = React.useState('all');
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [stories, setStories] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentStoryIndex, setCurrentStoryIndex] = React.useState(0);
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<{ x: number; position: number } | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);
  const maxRetries = 3;
  const sliderRef = React.useRef<HTMLDivElement>(null);

  // Fetch stories on mount
  React.useEffect(() => {
    fetchStories();
    return () => setRetryCount(0); // Reset retry count on unmount
  }, []);

  const fetchStories = async () => {
    try {
      if (retryCount >= maxRetries) {
        setError(new Error('Failed to load success stories after multiple attempts. Please try again later.'));
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        setRetryCount(prev => prev + 1);
        throw new Error(error.message || 'Failed to fetch success stories');
      }

      setStories(data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching stories:', error);
      setError(new Error('Unable to load success stories. Please check your connection and try again.'));
      setStories([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter stories based on active filters
  const filteredStories = React.useMemo(() => {
    let filtered = stories;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(story => {
        const grafts = parseInt(activeFilter);
        return story.grafts >= grafts && story.grafts < grafts + 500;
      });
    }

    if (activeCategory !== 'all') {
      filtered = filtered.filter(story => story.type === activeCategory);
    }

    return filtered;
  }, [stories, activeFilter, activeCategory]);

  // Pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredStories.length / itemsPerPage);
  const currentStories = filteredStories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle slider drag
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sliderRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setIsDragging(true);
    setDragStart({
      x: clientX,
      position: sliderPosition
    });
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
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
  }, [isDragging]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-primary dark:border-white border-t-transparent animate-spin" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 blur-lg animate-pulse" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
        <div className="text-center text-red-500 dark:text-red-400 font-medium">
          <p className="mb-2">{error.message}</p>
          <p className="text-sm text-muted-foreground">
            {retryCount > 0 ? `Retry attempt ${retryCount} of ${maxRetries}` : ''}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setRetryCount(0);
            fetchStories();
          }}
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      </div>
    );
  }

  // No data state
  if (stories.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No success stories available yet.</p>
      </div>
    );
  }

  return (
    <div id="gallery" className="relative py-24 overflow-hidden">
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
              {t.beforeAfter.content.title}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl !leading-[1.2] font-bold text-foreground dark:text-white mb-4">
            {t.beforeAfter.content.title}
          </h2>
          <p className="text-lg text-foreground/60 dark:text-white/60 leading-relaxed">
            {t.beforeAfter.content.description}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            className={cn(
              "h-11 px-6 gap-2 rounded-full group relative overflow-hidden",
              "transition-all duration-300 hover:scale-[1.02]",
              activeFilter === 'all' 
                ? "bg-primary text-white shadow-lg hover:bg-primary/90" 
                : "hover:bg-black/5 dark:hover:bg-white/5"
            )}
            onClick={() => setActiveFilter('all')}
          >
            <Filter className="w-4 h-4" />
            <span className="font-medium">{t.beforeAfter.content.filters.all}</span>
            {activeFilter === 'all' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
            )}
          </Button>
          {Object.entries(t.beforeAfter.content.filters)
            .filter(([key]) => key !== 'all')
            .map(([key, label]) => (
              <Button
                key={key}
                variant={activeFilter === key ? 'default' : 'outline'}
                className={cn(
                  "h-11 px-6 gap-2 rounded-full group relative overflow-hidden",
                  "transition-all duration-300 hover:scale-[1.02]",
                  activeFilter === key 
                    ? "bg-primary text-white shadow-lg hover:bg-primary/90" 
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => setActiveFilter(key)}
              >
                <span className="font-medium">{label}</span>
                {activeFilter === key && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
                )}
              </Button>
            ))}
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              className={cn(
                "h-11 px-6 gap-2 rounded-full group relative overflow-hidden",
                "transition-all duration-300 hover:scale-[1.02]",
                activeCategory === 'all' 
                  ? "bg-primary text-white shadow-lg hover:bg-primary/90" 
                  : "hover:bg-black/5 dark:hover:bg-white/5"
              )}
              onClick={() => setActiveCategory('all')}
            >
              <span className="font-medium">{t.beforeAfter.content.filters.all}</span>
              {activeCategory === 'all' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
              )}
            </Button>
            {Object.entries(t.beforeAfter.content.categories.items).map(([key, label]) => (
              <Button
                key={key}
                variant={activeCategory === key ? 'default' : 'outline'}
                className={cn(
                  "h-11 px-6 gap-2 rounded-full group relative overflow-hidden",
                  "transition-all duration-300 hover:scale-[1.02]",
                  activeCategory === key 
                    ? "bg-primary text-white shadow-lg hover:bg-primary/90" 
                    : "hover:bg-black/5 dark:hover:bg-white/5"
                )}
                onClick={() => setActiveCategory(key)}
              >
                <span className="font-medium">{label}</span>
                {activeCategory === key && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" />
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          {currentStories.map((story) => (
            <div
              key={story.id}
              className="group relative"
            >
              <div className={cn(
                "relative overflow-hidden rounded-2xl transition-all duration-300",
                "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "shadow-[0_1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_1px_2px_rgba(255,255,255,0.05)]",
                "hover:scale-[1.02] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_8px_16px_rgba(255,255,255,0.1)]"
              )}>
                {/* Before/After Slider */}
                <div
                  ref={sliderRef}
                  className="relative aspect-[4/3] cursor-ew-resize"
                  onMouseDown={handleDragStart}
                  onTouchStart={handleDragStart}
                >
                  {/* Before Image */}
                  <div className="absolute inset-0">
                    <img
                      src={story.before_image}
                      alt="Before"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* After Image */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img
                      src={story.after_image}
                      alt="After"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                  {/* Slider Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white cursor-ew-resize z-10"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className={cn(
                      "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
                      "w-12 h-12 rounded-full",
                      "bg-white/90 backdrop-blur-sm",
                      "shadow-[0_0_0_4px_rgba(255,255,255,0.3),0_4px_16px_rgba(0,0,0,0.2)]",
                      "flex items-center justify-center",
                      "transition-all duration-300",
                      isDragging ? "scale-110 shadow-[0_0_0_6px_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.3)]" : ""
                    )}>
                      <div className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4 text-primary" />
                        <ArrowRight className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg">
                      {t.beforeAfter.content.labels.before}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 z-10">
                    <div className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium text-white border border-white/20 shadow-lg">
                      {t.beforeAfter.content.labels.after}
                    </div>
                  </div>

                  {/* Info Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <div className="text-sm font-medium">
                          {t.beforeAfter.content.timeframes[story.timeframe as keyof typeof t.beforeAfter.content.timeframes]}
                        </div>
                        <div className="text-xs text-white/80 mt-0.5">
                          {story.grafts} {t.beforeAfter.content.labels.grafts} • {t.beforeAfter.content.labels.age} {story.age}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: story.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story Details */}
                <div className="p-6 border-t border-black/[0.08] dark:border-white/[0.08]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{story.patient_name}</span>
                      <span className="text-muted-foreground">{story.patient_country}</span>
                    </div>
                    {story.video_id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                        onClick={() => setActiveVideo(story.video_id)}
                      >
                        <Play className="w-4 h-4" />
                        {t.beforeAfter.content.labels.watchStory}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={cn(
                "h-10 w-10 p-0 rounded-full",
                "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "transition-all duration-300 hover:scale-[1.02]",
                "disabled:opacity-50"
              )}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
                if (i === 4) pageNum = totalPages;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                className={cn(
                  "w-10 h-10 rounded-full",
                  "transition-all duration-300 hover:scale-[1.02]",
                  currentPage === pageNum 
                    ? "bg-primary text-white shadow-lg hover:bg-primary/90 border-transparent" 
                    : "bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {pageNum}
              </Button>
            )})}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={cn(
                "h-10 w-10 p-0 rounded-full",
                "bg-white/80 dark:bg-white/5 backdrop-blur-md",
                "border border-black/[0.08] dark:border-white/[0.08]",
                "transition-all duration-300 hover:scale-[1.02]",
                "disabled:opacity-50"
              )}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white mb-4">
              {t.beforeAfter.cta.title}
            </h3>
            <p className="text-lg text-foreground/60 dark:text-white/60 mb-8">
              {t.beforeAfter.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 px-10 text-base gap-2 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => window.location.href = '/hair-analysis'}
              >
                <ArrowRight className="w-4 h-4" />
                {t.beforeAfter.cta.buttons.analysis}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-10 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => window.open('https://wa.me/905360344866', '_blank')}
              >
                <MessageCircle className="w-4 h-4" />
                {t.beforeAfter.cta.buttons.whatsapp}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-14 px-10 text-base gap-2 rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => window.open('tel:+905360344866', '_blank')}
              >
                <Phone className="w-4 h-4" />
                {t.beforeAfter.cta.buttons.call}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        videoId={activeVideo || ''}
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        onExternalClick={() => {
          window.open(`https://www.youtube.com/watch?v=${activeVideo}`, '_blank');
          setActiveVideo(null);
        }}
        translations={{
          watchOnYoutube: t.beforeAfter.content.labels.watchOnYoutube,
          cta: {
            whatsapp: t.beforeAfter.cta.buttons.whatsapp,
            schedule: t.beforeAfter.cta.buttons.analysis,
            call: t.beforeAfter.cta.buttons.call
          }
        }}
      />
    </div>
  );
}