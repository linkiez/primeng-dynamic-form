export const ERROR_CODES = {
  MISSING_SCHEMA_VERSION: 'missing_schema_version',
  UNSUPPORTED_SCHEMA_VERSION: 'unsupported_schema_version',
  UNSUPPORTED_FIELD_TYPE: 'unsupported_field_type',
  MISSING_FIELD_OPTIONS: 'missing_field_options',
  DUPLICATE_FIELD_KEY: 'duplicate_field_key',
  UNSUPPORTED_VALIDATOR: 'unsupported_validator',
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

export interface DynamicFormConfigError {
  code: ErrorCode;
  message: string;
  fieldKey?: string;
  recommendation?: string;
}
