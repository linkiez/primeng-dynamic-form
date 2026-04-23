import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { FieldDefinition } from '../models/dynamic-form.types';
import { resolveValidators } from './validator-registry';

export function buildFormGroup(
  fields: FieldDefinition[],
  initialValues?: Record<string, unknown>,
): FormGroup {
  const controls: Record<string, AbstractControl> = {};

  for (const field of fields) {
    const initialValue = initialValues?.[field.key] ?? field.initialValue ?? null;
    const { validators } = resolveValidators(field.key, field.validators);

    controls[field.key] = new FormControl<unknown>(
      { value: initialValue, disabled: field.disabled ?? false },
      validators,
    );
  }

  return new FormGroup(controls);
}
