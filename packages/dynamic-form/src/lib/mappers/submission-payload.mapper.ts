import { FormGroup } from '@angular/forms';
import { FormSubmissionPayload } from '../models/dynamic-form.types';
import { resolveErrorMessage } from './error-message.mapper';

export function buildSubmissionPayload(formGroup: FormGroup): FormSubmissionPayload {
  const valid = formGroup.valid;
  const values: Record<string, unknown> = {};
  const errors: Record<string, string[]> = {};

  for (const [key, control] of Object.entries(formGroup.controls)) {
    values[key] = control.value;

    if (control.errors) {
      errors[key] = Object.entries(control.errors).map(([errorKey, errorValue]) =>
        resolveErrorMessage(errorKey, errorValue),
      );
    }
  }

  return { valid, values, errors };
}
