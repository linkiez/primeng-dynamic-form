import { buildSubmissionPayload } from '../../packages/dynamic-form/src/lib/mappers/submission-payload.mapper';
import { buildFormGroup } from '../../packages/dynamic-form/src/lib/validators/control-validator.adapter';
import type { FieldDefinition } from '@primeng-dynamic-form/core';

describe('Unit: US1 - Submit payload builder', () => {
  const fields: FieldDefinition[] = [
    { key: 'name', type: 'text', label: 'Nome' },
    { key: 'email', type: 'email', label: 'Email', validators: [{ name: 'email' }] },
  ];

  it('should return valid=true when all controls are valid', () => {
    const formGroup = buildFormGroup(fields, { name: 'João', email: 'joao@example.com' });
    const payload = buildSubmissionPayload(formGroup);
    expect(payload.valid).toBe(true);
    expect(payload.errors).toEqual({});
  });

  it('should return valid=false when a required field is empty', () => {
    const fieldsWithRequired: FieldDefinition[] = [
      { key: 'name', type: 'text', label: 'Nome', validators: [{ name: 'required' }] },
    ];
    const formGroup = buildFormGroup(fieldsWithRequired, { name: '' });
    const payload = buildSubmissionPayload(formGroup);
    expect(payload.valid).toBe(false);
    expect(payload.errors['name']).toBeDefined();
    expect(payload.errors['name'].length).toBeGreaterThan(0);
  });

  it('should include all field values in payload.values', () => {
    const formGroup = buildFormGroup(fields, { name: 'Maria', email: 'maria@test.com' });
    const payload = buildSubmissionPayload(formGroup);
    expect(payload.values['name']).toBe('Maria');
    expect(payload.values['email']).toBe('maria@test.com');
  });

  it('should have empty errors for each valid field', () => {
    const formGroup = buildFormGroup(fields, { name: 'Test', email: 'valid@email.com' });
    const payload = buildSubmissionPayload(formGroup);
    expect(payload.errors['name']).toBeUndefined();
    expect(payload.errors['email']).toBeUndefined();
  });

  it('should include error messages for invalid email format', () => {
    const formGroup = buildFormGroup(fields, { name: 'Test', email: 'not-an-email' });
    const payload = buildSubmissionPayload(formGroup);
    expect(payload.valid).toBe(false);
    expect(payload.errors['email']).toBeDefined();
    expect(payload.errors['email'][0]).toContain('email');
  });
});
