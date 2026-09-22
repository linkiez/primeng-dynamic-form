import { SUPPORTED_FIELD_TYPES, type FormSchema } from '@linkiez/primeng-dynamic-form';
import { parseAndValidateSchema } from '../../packages/dynamic-form/src/lib/mappers/schema.mapper';
import { ERROR_CODES } from '../../packages/dynamic-form/src/lib/models/error-codes';

describe('Unit: US4 - Extended field types', () => {
  it('should expose every supported PrimeNG form control type', () => {
    const expectedTypes = [
      'text',
      'email',
      'password',
      'number',
      'textarea',
      'select',
      'autocomplete',
      'cascadeselect',
      'checkbox',
      'radio',
      'multiselect',
      'listbox',
      'selectbutton',
      'togglebutton',
      'toggleswitch',
      'colorpicker',
      'inputmask',
      'inputotp',
      'inputtags',
      'editor',
      'date',
      'date-range',
      'slider',
      'knob',
      'rating',
      'treeselect',
      'file',
      'custom',
    ];

    expect(SUPPORTED_FIELD_TYPES).toEqual(expectedTypes);
  });

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

  it('should accept PrimeNG component properties in the field schema', () => {
    const schema: FormSchema = {
      schemaVersion: '1.0',
      formId: 'component-properties',
      fields: [
        {
          key: 'status',
          type: 'select',
          label: 'Status',
          options: [{ label: 'Ativo', value: 'active' }],
          componentProps: {
            showClear: true,
            filter: true,
            variant: 'filled',
            panelStyle: { maxHeight: '20rem' },
          },
        },
        {
          key: 'period',
          type: 'date-range',
          label: 'Periodo',
          componentProps: {
            showIcon: true,
            showButtonBar: true,
            dateFormat: 'dd/mm/yy',
            selectionMode: 'range',
          },
        },
      ],
    };

    expect(parseAndValidateSchema(schema).errors).toHaveLength(0);
  });
});
