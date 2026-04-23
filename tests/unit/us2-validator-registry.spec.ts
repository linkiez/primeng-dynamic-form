import { resolveValidators } from '../../packages/dynamic-form/src/lib/validators/validator-registry';
import { buildFormGroup } from '../../packages/dynamic-form/src/lib/validators/control-validator.adapter';
import type { FieldDefinition, ValidationRule } from '@primeng-dynamic-form/core';
import { FormControl } from '@angular/forms';

describe('Unit: US2 - Validator registry', () => {
  describe('resolveValidators', () => {
    it('should return empty validators and errors for empty rules', () => {
      const result = resolveValidators('field1', []);
      expect(result.validators).toHaveLength(0);
      expect(result.errors).toHaveLength(0);
    });

    it('should resolve required validator', () => {
      const result = resolveValidators('field1', [{ name: 'required' }]);
      expect(result.validators).toHaveLength(1);
      expect(result.errors).toHaveLength(0);

      const control = new FormControl('');
      const errors = result.validators[0](control);
      expect(errors).toHaveProperty('required');
    });

    it('should resolve email validator', () => {
      const result = resolveValidators('email', [{ name: 'email' }]);
      expect(result.validators).toHaveLength(1);

      const control = new FormControl('not-email');
      const errors = result.validators[0](control);
      expect(errors).toHaveProperty('email');
    });

    it('should resolve minLength validator', () => {
      const result = resolveValidators('field', [{ name: 'minLength', params: { min: 5 } }]);
      expect(result.validators).toHaveLength(1);

      const control = new FormControl('ab');
      const errors = result.validators[0](control);
      expect(errors).toHaveProperty('minlength');
    });

    it('should resolve maxLength validator', () => {
      const result = resolveValidators('field', [{ name: 'maxLength', params: { max: 3 } }]);
      expect(result.validators).toHaveLength(1);

      const control = new FormControl('toolong');
      const errors = result.validators[0](control);
      expect(errors).toHaveProperty('maxlength');
    });

    it('should resolve min validator', () => {
      const result = resolveValidators('age', [{ name: 'min', params: { min: 18 } }]);
      expect(result.validators).toHaveLength(1);

      const control = new FormControl(10);
      const errors = result.validators[0](control);
      expect(errors).toHaveProperty('min');
    });

    it('should resolve max validator', () => {
      const result = resolveValidators('age', [{ name: 'max', params: { max: 100 } }]);
      expect(result.validators).toHaveLength(1);

      const control = new FormControl(200);
      const errors = result.validators[0](control);
      expect(errors).toHaveProperty('max');
    });

    it('should resolve pattern validator', () => {
      const result = resolveValidators('code', [
        { name: 'pattern', params: { pattern: '^[A-Z]+$' } },
      ]);
      expect(result.validators).toHaveLength(1);

      const control = new FormControl('abc');
      const errors = result.validators[0](control);
      expect(errors).toHaveProperty('pattern');
    });

    it('should report config error for unsupported validator name', () => {
      const rules: ValidationRule[] = [{ name: 'customSync', params: { fn: 'not-a-function' } }];
      const result = resolveValidators('field', rules);
      expect(result.validators).toHaveLength(0);
    });

    it('should use custom message when provided for required', () => {
      const result = resolveValidators('field', [
        { name: 'required', message: 'Campo obrigatório personalizado.' },
      ]);
      const control = new FormControl('');
      const errors = result.validators[0](control);
      expect(errors?.['required']?.message).toBe('Campo obrigatório personalizado.');
    });
  });

  describe('buildFormGroup', () => {
    it('should create a FormGroup with controls for each field', () => {
      const fields: FieldDefinition[] = [
        { key: 'name', type: 'text', label: 'Nome' },
        { key: 'email', type: 'email', label: 'Email' },
      ];
      const group = buildFormGroup(fields, { name: 'Test', email: 'test@test.com' });
      expect(group.get('name')).toBeTruthy();
      expect(group.get('email')).toBeTruthy();
    });

    it('should apply initial values to controls', () => {
      const fields: FieldDefinition[] = [{ key: 'name', type: 'text', label: 'Nome' }];
      const group = buildFormGroup(fields, { name: 'Inicial' });
      expect(group.get('name')?.value).toBe('Inicial');
    });

    it('should disable control when field.disabled is true', () => {
      const fields: FieldDefinition[] = [
        { key: 'name', type: 'text', label: 'Nome', disabled: true },
      ];
      const group = buildFormGroup(fields);
      expect(group.get('name')?.disabled).toBe(true);
    });
  });
});
