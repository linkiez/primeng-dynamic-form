import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidationRule, ValidatorName } from '../models/dynamic-form.types';
import { DynamicFormConfigError, ERROR_CODES } from '../models/error-codes';

export interface ValidatorResolutionResult {
  validators: ValidatorFn[];
  errors: DynamicFormConfigError[];
}

const SUPPORTED_VALIDATORS: readonly ValidatorName[] = [
  'required',
  'minLength',
  'maxLength',
  'min',
  'max',
  'pattern',
  'email',
  'customSync',
];

export function resolveValidators(
  fieldKey: string,
  rules: ValidationRule[] = [],
): ValidatorResolutionResult {
  const validators: ValidatorFn[] = [];
  const errors: DynamicFormConfigError[] = [];

  for (const rule of rules) {
    if (!SUPPORTED_VALIDATORS.includes(rule.name)) {
      errors.push({
        code: ERROR_CODES.UNSUPPORTED_VALIDATOR,
        message: `Validador "${rule.name}" não é suportado na v1. Campo: "${fieldKey}".`,
        fieldKey,
        recommendation: `Use um dos validadores suportados: ${SUPPORTED_VALIDATORS.join(', ')}.`,
      });
      continue;
    }

    const validator = buildValidator(rule);
    if (validator) {
      validators.push(validator);
    }
  }

  return { validators, errors };
}

function buildValidator(rule: ValidationRule): ValidatorFn | null {
  switch (rule.name) {
    case 'required':
      return wrapWithMessage(Validators.required, rule.message, 'required');

    case 'email':
      return wrapWithMessage(Validators.email, rule.message, 'email');

    case 'minLength': {
      const min = (rule.params?.['min'] as number) ?? (rule.params?.['minLength'] as number);
      if (min == null) return null;
      return wrapWithMessage(Validators.minLength(min), rule.message, 'minlength');
    }

    case 'maxLength': {
      const max = (rule.params?.['max'] as number) ?? (rule.params?.['maxLength'] as number);
      if (max == null) return null;
      return wrapWithMessage(Validators.maxLength(max), rule.message, 'maxlength');
    }

    case 'min': {
      const min = rule.params?.['min'] as number;
      if (min == null) return null;
      return wrapWithMessage(Validators.min(min), rule.message, 'min');
    }

    case 'max': {
      const max = rule.params?.['max'] as number;
      if (max == null) return null;
      return wrapWithMessage(Validators.max(max), rule.message, 'max');
    }

    case 'pattern': {
      const pattern = rule.params?.['pattern'] as string | RegExp;
      if (!pattern) return null;
      return wrapWithMessage(Validators.pattern(pattern), rule.message, 'pattern');
    }

    case 'customSync': {
      const fn = rule.params?.['fn'] as ValidatorFn;
      if (typeof fn !== 'function') return null;
      return fn;
    }

    default:
      return null;
  }
}

function wrapWithMessage(
  validator: ValidatorFn,
  message: string | undefined,
  errorKey: string,
): ValidatorFn {
  if (!message) return validator;

  return (control: AbstractControl): ValidationErrors | null => {
    const result = validator(control);
    if (result?.[errorKey]) {
      return { [errorKey]: { ...result[errorKey], message } };
    }
    return result;
  };
}
