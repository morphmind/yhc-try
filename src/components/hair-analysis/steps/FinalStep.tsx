import React, { useState, useEffect } from 'react';
import { HairAnalysisFormData } from '@/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Check, Lock, Shield, UserCheck, Info, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/useToast';
import { countries } from '@/config/countries';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

interface FinalStepProps {
  formData: HairAnalysisFormData;
  setFormData: (data: HairAnalysisFormData) => void;
  onSubmit: () => void;
}

export function FinalStep({ formData, setFormData, onSubmit }: FinalStepProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPhoneCode, setSelectedPhoneCode] = useState('+90'); // Default to Turkey
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // Validate required fields
  const isValid = React.useMemo(() => {
    return !!(
      formData.firstName?.trim() &&
      formData.lastName?.trim() &&
      formData.phone?.trim() &&
      formData.email?.trim() &&
      formData.country &&
      privacyConsent
    );
  }, [formData.firstName, formData.lastName, formData.phone, formData.email, formData.country, privacyConsent]);

  // Find country by phone code and update country selection
  useEffect(() => {
    const country = countries.find(c => c.phoneCode === selectedPhoneCode);
    if (country) {
      setFormData(prev => ({ ...prev, country: country.code }));
    }
  }, [selectedPhoneCode, setFormData]);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.firstName?.trim() || !formData.email?.trim() || !formData.phone?.trim()) {
      toast({
        variant: "destructive",
        title: t.hairAnalysis.toast.error.title,
        description: t.hairAnalysis.toast.error.requiredFields
      });
      setIsSubmitting(false);
      return;
    }

    // Validate privacy consent
    if (!privacyConsent) {
      toast({
        variant: "destructive",
        title: t.hairAnalysis.toast.error.title,
        description: t.hairAnalysis.privacyConsent.required,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="space-y-8">
        {/* Name Fields */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-base font-medium">{t.hairAnalysis.steps.final.firstName}</Label>
            <Input
              required
              aria-required="true"
              type="text"
              value={formData.firstName || ''}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder={t.hairAnalysis.steps.final.firstNamePlaceholder}
              className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-base font-medium">{t.hairAnalysis.steps.final.lastName}</Label>
            <Input
              required
              aria-required="true"
              type="text"
              value={formData.lastName || ''}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              placeholder={t.hairAnalysis.steps.final.lastNamePlaceholder}
              className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label className="text-base font-medium">{t.hairAnalysis.steps.final.email}</Label>
          <Input
            required
            aria-required="true"
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder={t.hairAnalysis.steps.final.emailPlaceholder}
            className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label className="text-base font-medium">{t.hairAnalysis.steps.final.phone}</Label>
          <div className="flex gap-2">
            <Select
              defaultValue="+90"
              value={selectedPhoneCode}
              onValueChange={(value) => setSelectedPhoneCode(value)}
            >
              <SelectTrigger className="w-[120px] h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{countries.find(c => c.phoneCode === selectedPhoneCode)?.flag}</span>
                    <span className="text-sm">{selectedPhoneCode}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-[280px]">
                {countries.map((country) => (
                  <SelectItem
                    key={country.code}
                    value={country.phoneCode}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{country.flag}</span>
                      <span className="text-sm">{country.phoneCode}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              required
              aria-required="true"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => {
                const phoneNumber = e.target.value.replace(/[^0-9]/g, '');
                setFormData({ ...formData, phone: phoneNumber });
              }}
              placeholder={t.hairAnalysis.steps.final.phonePlaceholder}
              className="flex-1 h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl"
            />
          </div>
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label className="text-base font-medium">{t.hairAnalysis.steps.final.country}</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData({ ...formData, country: value })}
          >
            <SelectTrigger className="h-12 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl">
              <SelectValue placeholder={t.hairAnalysis.steps.final.countryPlaceholder} />
            </SelectTrigger>
            <SelectContent className="max-h-[280px]">
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center gap-2">
                    <span className="text-base">{country.flag}</span>
                    <span>{country.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Features */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Check, label: t.hairAnalysis.steps.final.features.free, id: 'free' },
            { icon: Lock, label: t.hairAnalysis.steps.final.features.secure, id: 'secure' },
            { icon: UserCheck, label: t.hairAnalysis.steps.final.features.expert, id: 'expert' }
          ].map((feature) => (
            <div
              key={feature.id}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              className={`relative overflow-hidden rounded-xl transition-all duration-300 ${
                hoveredFeature === feature.id
                  ? 'scale-[1.02] shadow-lg'
                  : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3 p-4 bg-white/50 dark:bg-white/5 backdrop-blur-sm border-border/50 rounded-xl">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  hoveredFeature === feature.id
                    ? 'bg-primary/10 dark:bg-primary/20'
                    : 'bg-white dark:bg-white/10'
                }`}>
                  <feature.icon className={`w-5 h-5 transition-colors ${
                    hoveredFeature === feature.id
                      ? 'text-primary dark:text-white'
                      : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground dark:text-white">
                    {feature.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Notice & Consent */}
        <div
          className="flex items-start gap-4 p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50 relative overflow-hidden group cursor-pointer transition-all duration-300"
          onClick={() => !privacyConsent && setShowPrivacyDialog(true)}
        >
          <Checkbox
            id="privacy-consent"
            checked={privacyConsent}
            onCheckedChange={(checked) => {
              if (!checked || privacyConsent) {
                setPrivacyConsent(checked as boolean);
              } else {
                setShowPrivacyDialog(true);
              }
            }}
            className={cn(
              "mt-1 transition-all duration-300",
              privacyConsent
                ? "bg-gradient-to-br from-primary via-primary to-secondary border-primary text-primary-foreground"
                : "hover:border-primary/50"
            )}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <Shield className={cn(
                "w-5 h-5 flex-shrink-0 transition-colors mt-0.5",
                privacyConsent ? "text-primary dark:text-white" : "text-muted-foreground"
              )} />
              <p className="text-sm text-muted-foreground dark:text-white/60">
                {t.hairAnalysis.steps.final.privacyNotice}
              </p>
            </div>
          </div>

          {/* Background Gradient Effect */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br transition-opacity duration-300",
            privacyConsent
              ? "from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 dark:to-transparent opacity-100"
              : "opacity-0 group-hover:opacity-50"
          )} />

          {/* Bottom Highlight */}
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>

        {/* Privacy Policy Dialog */}
        <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white/95 dark:bg-black/95 backdrop-blur-xl border-border/50">
            <DialogHeader>
              <DialogTitle className="flex flex-col items-center text-center gap-6">
                {/* Success Icon with Animation */}
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 bg-primary/20 dark:bg-primary/40 rounded-full animate-ping" />
                  <div className="relative w-full h-full bg-white dark:bg-black rounded-full border border-primary/20 dark:border-primary/40 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-2">
                    {t.hairAnalysis.privacyConsent.title}
                  </h2>
                  <p className="text-base text-muted-foreground dark:text-white/60">
                    {t.hairAnalysis.privacyConsent.description}
                  </p>
                </div>
              </DialogTitle>
              <DialogDescription className="mt-8 text-base whitespace-pre-line leading-relaxed text-foreground/80 dark:text-white/80 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-border/50">
                {t.hairAnalysis.privacyConsent.content}
              </DialogDescription>
            </DialogHeader>
            
            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <Button
                size="lg"
                className="w-full h-14 gap-3 text-white dark:text-primary bg-primary dark:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-base font-medium"
                onClick={() => {
                  setPrivacyConsent(true);
                  setShowPrivacyDialog(false);
                }}
              >
                <Shield className="w-5 h-5" />
                {t.hairAnalysis.privacyConsent.accept}
                <ArrowRight className="w-5 h-5 ml-auto group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="w-full h-14 gap-2 text-base font-medium rounded-full bg-white/80 dark:bg-white/5 backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                onClick={() => {
                  setShowPrivacyDialog(false);
                  localStorage.setItem('hidePrivacyDialog', 'true');
                }}
              >
                Şimdilik Geç
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Verileriniz güvende ve gizli tutulur</span>
            </div>
            
            {/* Additional Trust Badges */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary/60 dark:text-white/60" />
                <span className="text-xs text-muted-foreground">SSL Korumalı</span>
              </div>
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-primary/60 dark:text-white/60" />
                <span className="text-xs text-muted-foreground">KVKK Uyumlu</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Submit Button */}
        <Button
          type="submit"
          onClick={() => handleSubmit()}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? t.hairAnalysis.steps.final.submitting : t.hairAnalysis.steps.final.submit}
        </Button>
      </div>
    </div>
  );
}