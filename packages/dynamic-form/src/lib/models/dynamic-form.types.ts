export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'date-range'
  | 'file'
  | 'custom';

export const SUPPORTED_FIELD_TYPES: readonly FieldType[] = [
  'text',
  'email',
  'password',
  'number',
  'textarea',
  'select',
  'checkbox',
  'radio',
  'date',
  'date-range',
  'file',
  'custom',
] as const;

export type ValidatorName =
  | 'required'
  | 'minLength'
  | 'maxLength'
  | 'min'
  | 'max'
  | 'pattern'
  | 'email'
  | 'customSync';

export interface FieldOption {
  label: string;
  value: string | number | boolean;
}

export interface ValidationRule {
  name: ValidatorName;
  params?: Record<string, unknown>;
  message?: string;
}

export interface UIHints {
  tooltip?: string;
  ariaLabel?: string;
  ariaDescription?: string;
  ariaDescriptionId?: string;
}

export type TranslationDictionary = Record<string, string>;
export type TranslationsByLocale = Record<string, TranslationDictionary>;

export interface LayoutConfig {
  columns?: 1 | 2 | 3 | 4;
  responsive?: boolean;
}

export interface SubmitConfig {
  mode?: 'emit' | 'callback';
  debounceMs?: number;
}

export interface FieldDefinition {
  key: string;
  type: FieldType;
  label: string;
  i18nKey?: string;
  placeholder?: string;
  initialValue?: unknown;
  options?: FieldOption[];
  validators?: ValidationRule[];
  ui?: UIHints;
  disabled?: boolean;
  hidden?: boolean;
  accept?: string;
  multiple?: boolean;
  maxFileSizeBytes?: number;
}

export interface FormSchema {
  schemaVersion: string;
  formId: string;
  title?: string;
  fields: FieldDefinition[];
  layout?: LayoutConfig;
  submit?: SubmitConfig;
}

export interface DynamicFormConfiguration {
  showSubmitButton?: boolean;
  submitLabel?: string;
  showResetButton?: boolean;
  resetLabel?: string;
  emitOnChange?: boolean;
  layoutMode?: 'vertical' | 'horizontal' | 'grid';
  locale?: string;
  fallbackLocale?: string;
  translations?: TranslationsByLocale;
}

export interface FormSubmissionPayload {
  valid: boolean;
  values: Record<string, unknown>;
  errors: Record<string, string[]>;
}
