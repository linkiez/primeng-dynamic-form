import { FormSchema, FieldDefinition } from '../models/dynamic-form.types';
import { validateSchemaVersion } from '../validators/schema-version.validator';
import { validateFieldCompatibility } from '../validators/schema-compatibility.validator';
import { DynamicFormConfigError } from '../models/error-codes';

export interface SchemaParseResult {
  schema: FormSchema;
  errors: DynamicFormConfigError[];
  warnings: DynamicFormConfigError[];
}

export function parseAndValidateSchema(raw: unknown): SchemaParseResult {
  if (!raw || typeof raw !== 'object') {
    throw new Error('FormSchema deve ser um objeto não-nulo.');
  }

  const schema = raw as FormSchema;
  const errors: DynamicFormConfigError[] = [];
  const warnings: DynamicFormConfigError[] = [];

  const versionError = validateSchemaVersion(schema);
  if (versionError) {
    errors.push(versionError);
  }

  if (!Array.isArray(schema.fields) || schema.fields.length === 0) {
    return { schema, errors, warnings };
  }

  const fieldErrors = validateFieldCompatibility(schema.fields);
  errors.push(...fieldErrors);

  return { schema, errors, warnings };
}

export function getVisibleFields(schema: FormSchema): FieldDefinition[] {
  return (schema.fields ?? []).filter((f) => !f.hidden);
}
