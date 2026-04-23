import { resolveConfig } from '../../packages/dynamic-form/src/lib/mappers/config-defaults.mapper';
import type { DynamicFormConfiguration } from '@primeng-dynamic-form/core';

describe('Unit: US3 - Config defaults', () => {
  it('should return all defaults when no config is provided', () => {
    const resolved = resolveConfig();
    expect(resolved.showSubmitButton).toBe(true);
    expect(resolved.submitLabel).toBe('Enviar');
    expect(resolved.showResetButton).toBe(false);
    expect(resolved.resetLabel).toBe('Limpar');
    expect(resolved.emitOnChange).toBe(false);
    expect(resolved.layoutMode).toBe('vertical');
  });

  it('should override defaults with provided values', () => {
    const config: DynamicFormConfiguration = {
      submitLabel: 'Salvar',
      showResetButton: true,
      layoutMode: 'horizontal',
    };
    const resolved = resolveConfig(config);
    expect(resolved.submitLabel).toBe('Salvar');
    expect(resolved.showResetButton).toBe(true);
    expect(resolved.layoutMode).toBe('horizontal');
    expect(resolved.showSubmitButton).toBe(true);
  });

  it('should not mutate the original config', () => {
    const config: DynamicFormConfiguration = { submitLabel: 'Go' };
    const resolved = resolveConfig(config);
    resolved.submitLabel = 'Changed';
    expect(config.submitLabel).toBe('Go');
  });

  it('should support all three layout modes', () => {
    const modes: DynamicFormConfiguration['layoutMode'][] = ['vertical', 'horizontal', 'grid'];
    for (const mode of modes) {
      const resolved = resolveConfig({ layoutMode: mode });
      expect(resolved.layoutMode).toBe(mode);
    }
  });

  it('should return a Required<DynamicFormConfiguration> with no undefined values', () => {
    const resolved = resolveConfig();
    const values = Object.values(resolved);
    values.forEach((v) => expect(v).not.toBeUndefined());
  });
});
