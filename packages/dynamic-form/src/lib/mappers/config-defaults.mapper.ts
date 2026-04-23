import { DynamicFormConfiguration } from '../models/dynamic-form.types';

const DEFAULT_CONFIG: Required<DynamicFormConfiguration> = {
  showSubmitButton: true,
  submitLabel: 'Enviar',
  showResetButton: false,
  resetLabel: 'Limpar',
  emitOnChange: false,
  layoutMode: 'vertical',
};

export function resolveConfig(config?: DynamicFormConfiguration): Required<DynamicFormConfiguration> {
  return config ? { ...DEFAULT_CONFIG, ...config } : { ...DEFAULT_CONFIG };
}
