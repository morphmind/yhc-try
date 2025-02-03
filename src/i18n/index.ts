import { en } from './locales/en';
import { tr } from './locales/tr';
import { clinic } from './locales/clinic';
import { hairTransplant } from './locales/hair-transplant';
import { afroHairTransplant } from './locales/afro-hair-transplant';
import { price } from './locales/price';
import { fuetechnique } from './locales/fuetechnique';
import { dhitechnique } from './locales/dhitechnique';
import { sapphireFue } from './locales/sapphirefue';
import { microsapphire } from './locales/microsapphire';
import { needlefree } from './locales/needlefree';
import { beardTransplant } from './locales/beard-transplant';
import { eyebrowTransplant } from './locales/eyebrow-transplant';
import { womenHairTransplant } from './locales/women-hair-transplant';
import { beforeAfter } from './locales/before-after';
import { contact } from './locales/contact';
import { Language } from '@/types';

export const translations = {
  en: { 
    ...en, 
    clinic: clinic.en, 
    hairTransplant: hairTransplant.en, 
    price: price.en,
    afroHairTransplant: afroHairTransplant.en, 
    fuetechnique: fuetechnique.en,
    dhitechnique: dhitechnique.en,
    sapphireFue: sapphireFue.en,
    microsapphire: microsapphire.en,
    needlefree: needlefree.en,
    beardTransplant: beardTransplant.en,
    eyebrowTransplant: eyebrowTransplant.en, 
    womenHairTransplant: womenHairTransplant.en, 
    beforeAfter: beforeAfter.en,
    contact: contact.en 
  },
  tr: { 
    ...tr, 
    clinic: clinic.tr, 
    hairTransplant: hairTransplant.tr, 
    price: price.tr,
    afroHairTransplant: afroHairTransplant.tr,
    fuetechnique: fuetechnique.tr,
    dhitechnique: dhitechnique.tr,
    sapphireFue: sapphireFue.tr,
    microsapphire: microsapphire.tr,
    needlefree: needlefree.tr,
    beardTransplant: beardTransplant.tr, 
    eyebrowTransplant: eyebrowTransplant.tr, 
    womenHairTransplant: womenHairTransplant.tr, 
    beforeAfter: beforeAfter.tr,
    contact: contact.tr 
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function getTranslation(lang: Language) {
  return translations[lang as TranslationKey] || translations.en;
}

export type Translation = typeof translations.en;