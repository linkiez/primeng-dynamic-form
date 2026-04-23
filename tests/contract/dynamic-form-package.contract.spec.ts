import { DynamicFormComponent, SUPPORTED_FIELD_TYPES, ERROR_CODES } from '@primeng-dynamic-form/core';
import type {
  FormSchema,
  ValidationRule,
  DynamicFormConfiguration,
  FormSubmissionPayload,
} from '@primeng-dynamic-form/core';

describe('Contract: @primeng-dynamic-form/core exports', () => {
  describe('Component export', () => {
    it('should export DynamicFormComponent', () => {
      expect(DynamicFormComponent).toBeDefined();
    });

    it('should DynamicFormComponent have selector pdf-dynamic-form', () => {
      const metadata = (DynamicFormComponent as unknown as { ɵcmp: { selectors: string[][] } }).ɵcmp;
      expect(metadata?.selectors?.[0]?.[0]).toBe('pdf-dynamic-form');
    });

    it('should DynamicFormComponent be standalone', () => {
      const metadata = (DynamicFormComponent as unknown as { ɵcmp: { standalone: boolean } }).ɵcmp;
      expect(metadata?.standalone).toBe(true);
    });
  });

  describe('Type exports', () => {
    it('should FormSchema be structurally compatible', () => {
      const schema: FormSchema = {
        schemaVersion: '1.0',
        formId: 'test-form',
        fields: [],
      };
      expect(schema.schemaVersion).toBe('1.0');
      expect(schema.formId).toBe('test-form');
    });

    it('should FormSubmissionPayload have required shape', () => {
      const payload: FormSubmissionPayload = {
        valid: true,
        values: { name: 'Test' },
        errors: {},
      };
      expect(payload).toMatchObject({
        valid: expect.any(Boolean),
        values: expect.any(Object),
        errors: expect.any(Object),
      });
    });

    it('should ValidationRule accept all supported validator names', () => {
      const rules: ValidationRule[] = [
        { name: 'required' },
        { name: 'email' },
        { name: 'minLength', params: { min: 3 } },
        { name: 'maxLength', params: { max: 100 } },
        { name: 'min', params: { min: 0 } },
        { name: 'max', params: { max: 999 } },
        { name: 'pattern', params: { pattern: '^[A-Z]' } },
        { name: 'customSync' },
      ];
      expect(rules).toHaveLength(8);
    });

    it('should DynamicFormConfiguration accept all config keys', () => {
      const config: DynamicFormConfiguration = {
        showSubmitButton: true,
        submitLabel: 'Enviar',
        showResetButton: false,
        resetLabel: 'Limpar',
        emitOnChange: false,
        layoutMode: 'vertical',
      };
      expect(config.layoutMode).toBe('vertical');
    });
  });

  describe('Constants', () => {
    it('should export SUPPORTED_FIELD_TYPES with 9 types', () => {
      expect(SUPPORTED_FIELD_TYPES).toHaveLength(9);
      expect(SUPPORTED_FIELD_TYPES).toContain('text');
      expect(SUPPORTED_FIELD_TYPES).toContain('email');
      expect(SUPPORTED_FIELD_TYPES).toContain('password');
      expect(SUPPORTED_FIELD_TYPES).toContain('number');
      expect(SUPPORTED_FIELD_TYPES).toContain('textarea');
      expect(SUPPORTED_FIELD_TYPES).toContain('select');
      expect(SUPPORTED_FIELD_TYPES).toContain('checkbox');
      expect(SUPPORTED_FIELD_TYPES).toContain('radio');
      expect(SUPPORTED_FIELD_TYPES).toContain('date');
    });

    it('should export ERROR_CODES with expected keys', () => {
      expect(ERROR_CODES.MISSING_SCHEMA_VERSION).toBe('missing_schema_version');
      expect(ERROR_CODES.UNSUPPORTED_SCHEMA_VERSION).toBe('unsupported_schema_version');
      expect(ERROR_CODES.UNSUPPORTED_FIELD_TYPE).toBe('unsupported_field_type');
      expect(ERROR_CODES.MISSING_FIELD_OPTIONS).toBe('missing_field_options');
      expect(ERROR_CODES.DUPLICATE_FIELD_KEY).toBe('duplicate_field_key');
      expect(ERROR_CODES.UNSUPPORTED_VALIDATOR).toBe('unsupported_validator');
    });
  });
});
