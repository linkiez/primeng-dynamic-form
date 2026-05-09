import type { FormSubmissionPayload } from '@linkiez/primeng-dynamic-form';

describe('Contract: US2 - Validation error payload shape', () => {
  it('should FormSubmissionPayload have valid=false when errors exist', () => {
    const payload: FormSubmissionPayload = {
      valid: false,
      values: { email: '' },
      errors: { email: ['Este campo é obrigatório.'] },
    };
    expect(payload.valid).toBe(false);
    expect(payload.errors['email']).toBeDefined();
    expect(Array.isArray(payload.errors['email'])).toBe(true);
    expect(payload.errors['email'].length).toBeGreaterThan(0);
  });

  it('should errors be a string array per field key', () => {
    const payload: FormSubmissionPayload = {
      valid: false,
      values: { name: 'a', minLength: 'x' },
      errors: {
        name: ['Mínimo de 3 caracteres.'],
        minLength: ['Mínimo de 5 caracteres.', 'Este campo é obrigatório.'],
      },
    };
    expect(payload.errors['name']).toHaveLength(1);
    expect(payload.errors['minLength']).toHaveLength(2);
    payload.errors['minLength'].forEach((msg) => expect(typeof msg).toBe('string'));
  });

  it('should errors be empty when valid=true', () => {
    const payload: FormSubmissionPayload = {
      valid: true,
      values: { email: 'test@test.com' },
      errors: {},
    };
    expect(payload.valid).toBe(true);
    expect(Object.keys(payload.errors)).toHaveLength(0);
  });

  it('should values contain all field keys regardless of validity', () => {
    const payload: FormSubmissionPayload = {
      valid: false,
      values: { name: '', email: 'a@b.com' },
      errors: { name: ['Este campo é obrigatório.'] },
    };
    expect(Object.keys(payload.values)).toContain('name');
    expect(Object.keys(payload.values)).toContain('email');
  });
});
