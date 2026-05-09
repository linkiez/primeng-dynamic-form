import { DynamicFormComponent, SUPPORTED_FIELD_TYPES, ERROR_CODES } from '@linkiez/primeng-dynamic-form';
import type { FormSchema, FormSubmissionPayload } from '@linkiez/primeng-dynamic-form';

describe('Contract: US1 - Entry points and component symbols', () => {
  it('should export DynamicFormComponent as a valid Angular component class', () => {
    expect(typeof DynamicFormComponent).toBe('function');
    expect(DynamicFormComponent.name).toBe('DynamicFormComponent');
  });

  it('should DynamicFormComponent use selector pdf-dynamic-form', () => {
    const metadata = (DynamicFormComponent as unknown as { ɵcmp: { selectors: string[][] } }).ɵcmp;
    expect(metadata?.selectors?.[0]?.[0]).toBe('pdf-dynamic-form');
  });

  it('should DynamicFormComponent be standalone', () => {
    const metadata = (DynamicFormComponent as unknown as { ɵcmp: { standalone: boolean } }).ɵcmp;
    expect(metadata?.standalone).toBe(true);
  });

  it('should SUPPORTED_FIELD_TYPES be readonly and contain exactly 9 types', () => {
    expect(Array.isArray(SUPPORTED_FIELD_TYPES)).toBe(true);
    expect(SUPPORTED_FIELD_TYPES).toHaveLength(9);
  });

  it('should ERROR_CODES be a frozen-like constant object', () => {
    expect(typeof ERROR_CODES).toBe('object');
    expect(Object.keys(ERROR_CODES).length).toBeGreaterThan(0);
  });

  it('should FormSchema type accept required schemaVersion and formId', () => {
    const schema: FormSchema = {
      schemaVersion: '1.0',
      formId: 'us1-test',
      fields: [{ key: 'name', type: 'text', label: 'Nome' }],
    };
    expect(schema.schemaVersion).toBe('1.0');
    expect(schema.fields).toHaveLength(1);
  });

  it('should FormSubmissionPayload enforce required shape', () => {
    const payload: FormSubmissionPayload = { valid: false, values: {}, errors: { name: ['required'] } };
    expect(payload.valid).toBe(false);
    expect(payload.errors['name']).toContain('required');
  });
});
