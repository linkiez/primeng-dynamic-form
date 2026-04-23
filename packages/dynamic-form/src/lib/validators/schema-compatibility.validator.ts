import { FieldDefinition, SUPPORTED_FIELD_TYPES } from '../models/dynamic-form.types';
import { DynamicFormConfigError, ERROR_CODES } from '../models/error-codes';

export function validateFieldCompatibility(fields: FieldDefinition[]): DynamicFormConfigError[] {
  const errors: DynamicFormConfigError[] = [];
  const seenKeys = new Set<string>();

  for (const field of fields) {
    if (seenKeys.has(field.key)) {
      errors.push({
        code: ERROR_CODES.DUPLICATE_FIELD_KEY,
        message: `Chave de campo duplicada: "${field.key}".`,
        fieldKey: field.key,
        recommendation: 'Certifique-se de que cada campo possui uma chave única.',
      });
    } else {
      seenKeys.add(field.key);
    }

    if (!(SUPPORTED_FIELD_TYPES as readonly string[]).includes(field.type)) {
      errors.push({
        code: ERROR_CODES.UNSUPPORTED_FIELD_TYPE,
        message: `Tipo de campo "${field.type}" não é suportado na v1. Campo: "${field.key}".`,
        fieldKey: field.key,
        recommendation: `Use um dos tipos suportados: ${SUPPORTED_FIELD_TYPES.join(', ')}.`,
      });
    }

    if ((field.type === 'select' || field.type === 'radio') && (!field.options || field.options.length === 0)) {
      errors.push({
        code: ERROR_CODES.MISSING_FIELD_OPTIONS,
        message: `Campo "${field.key}" do tipo "${field.type}" requer a propriedade "options".`,
        fieldKey: field.key,
        recommendation: `Adicione um array "options" com pelo menos um item ao campo "${field.key}".`,
      });
    }
  }

  return errors;
}
