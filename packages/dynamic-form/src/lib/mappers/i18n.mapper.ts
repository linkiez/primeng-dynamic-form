import { TranslationsByLocale } from '../models/dynamic-form.types';

interface TranslationInput {
  key: string;
  fallbackText: string;
  locale: string;
  fallbackLocale: string;
  translations: TranslationsByLocale;
}

export function resolveTranslation(input: TranslationInput): string {
  const activeLocale = input.translations[input.locale] ?? {};
  const fallbackLocale = input.translations[input.fallbackLocale] ?? {};

  return activeLocale[input.key] ?? fallbackLocale[input.key] ?? input.fallbackText;
}
