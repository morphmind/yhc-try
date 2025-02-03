import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { useCurrency } from '@/hooks/useCurrency';
import Header from '@/components/layout/Header';
import { DesktopPageNavigation } from '@/components/layout/DesktopPageNavigation';
import { Building2, Microscope, Sparkles, MapPin, Award } from 'lucide-react';

export default function ClinicPage() {
  const { t } = useTranslation();
  const { selectedCurrency, updateCurrency } = useCurrency();
  const [activeSection, setActiveSection] = React.useState('overview');

  // Navigation sections
  const navigationSections = React.useMemo(
    () => [
      { id: 'overview', icon: Building2, label: t.clinic.hero.title },
      { id: 'features', icon: Sparkles, label: t.clinic.features.title },
      { id: 'facilities', icon: Microscope, label: t.clinic.facilities.title },
      { id: 'location', icon: MapPin, label: t.clinic.location.title },
      { id: 'certifications', icon: Award, label: t.clinic.certifications.title },
    ],
    [t.clinic]
  );

  // Get all sections
  const sections = ['overview', 'features', 'facilities', 'location', 'certifications'];

  // Intersection Observer for sections
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only update if section is more than 50% visible
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-80px 0px -80px 0px', // Account for header
      }
    );

    // Observe sections
    const sectionElements = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    sectionElements.forEach((section) => observer.observe(section));

    return () => {
      sectionElements.forEach((section) => observer.unobserve(section));
    };
  }, [sections]);

  // Handle section change (scroll to section)
  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 88; // Header height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  // Update meta tags if needed
  React.useEffect(() => {
    // e.g. document.title = t.clinic.meta.title;
  }, [t]);

  return (
    <>
      <Header
        selectedCurrency={selectedCurrency}
        onCurrencyChange={updateCurrency}
      />

      <DesktopPageNavigation
        sections={navigationSections}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        position="left"
      />

      <main>
        <section id="overview" className="relative min-h-[80dvh] flex items-center justify-center overflow-hidden pt-[72px] md:pt-[88px] lg:pt-0">
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.15] tracking-tight mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  {t.clinic.title}
                </span>
                <span className="block mt-2 text-foreground dark:text-white">
                  {t.clinic.description}
                </span>
              </h1>
          {/* Overview content */}
            </div>
          </div>
        </section>
        <section id="features">
          {/* Features content */}
        </section>
        <section id="facilities">
          {/* Facilities content */}
        </section>
        <section id="location">
          {/* Location content */}
        </section>
        <section id="certifications">
          {/* Certifications content */}
        </section>
      </main>
    </>
  );
}
