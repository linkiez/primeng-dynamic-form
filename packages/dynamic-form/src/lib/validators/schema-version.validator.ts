import { FormSchema } from '../models/dynamic-form.types';
import { DynamicFormConfigError, ERROR_CODES } from '../models/error-codes';

const SUPPORTED_VERSION = '1.0';

export function validateSchemaVersion(schema: FormSchema): DynamicFormConfigError | null {
  if (!schema.schemaVersion) {
    return {
      code: ERROR_CODES.MISSING_SCHEMA_VERSION,
      message: 'A propriedade schemaVersion é obrigatória no FormSchema.',
      recommendation: `Adicione "schemaVersion": "${SUPPORTED_VERSION}" ao seu schema.`,
    };
  }

  if (schema.schemaVersion !== SUPPORTED_VERSION) {
    return {
      code: ERROR_CODES.UNSUPPORTED_SCHEMA_VERSION,
      message: `schemaVersion "${schema.schemaVersion}" não é suportada. Versão esperada: "${SUPPORTED_VERSION}".`,
      recommendation: `Atualize schemaVersion para "${SUPPORTED_VERSION}".`,
    };
  }

  return null;
}
