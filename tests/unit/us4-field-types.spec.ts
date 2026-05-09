import { SUPPORTED_FIELD_TYPES, type FormSchema } from '@linkiez/primeng-dynamic-form';
import { parseAndValidateSchema } from '../../packages/dynamic-form/src/lib/mappers/schema.mapper';
import { ERROR_CODES } from '../../packages/dynamic-form/src/lib/models/error-codes';

describe('Unit: US4 - Extended field types', () => {
  it('should include file, date-range and custom in supported field types', () => {
    expect(SUPPORTED_FIELD_TYPES).toContain('file');
    expect(SUPPORTED_FIELD_TYPES).toContain('date-range');
    expect(SUPPORTED_FIELD_TYPES).toContain('custom');
  });

  it('should accept schema with file, date-range and custom fields', () => {
    const schema: FormSchema = {
      schemaVersion: '1.0',
      formId: 'extended-types',
      fields: [
        { key: 'attachments', type: 'file', label: 'Anexos' },
        { key: 'period', type: 'date-range', label: 'Periodo' },
        { key: 'extraWidget', type: 'custom', label: 'Widget' },
      ],
    };

    const result = parseAndValidateSchema(schema);
    const unsupported = result.errors.find(
      (error) => error.code === ERROR_CODES.UNSUPPORTED_FIELD_TYPE,
    );

    expect(unsupported).toBeUndefined();
  });
});
