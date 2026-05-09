/**
 * Unit test: Hardening Gate Validator (US1)
 *
 * Validates deterministic hardening gate evaluation logic.
 */
import {
  validateHardeningGate,
  HARDENING_CONTROLS,
  MANDATORY_GATE_KEYS,
} from '@linkiez/primeng-dynamic-form';
import type { HardeningControl, HardeningEvidence } from '@linkiez/primeng-dynamic-form';

function makeEvidence(overrides: Partial<HardeningEvidence>[] = []): HardeningEvidence[] {
  const base = MANDATORY_GATE_KEYS.map((key) => ({
    controlKey: key,
    passed: true,
    notes: '',
    recordedAt: '2026-01-01T00:00:00.000Z',
  }));
  for (const override of overrides) {
    const idx = base.findIndex((e) => e.controlKey === override.controlKey);
    if (idx >= 0) {
      base[idx] = { ...base[idx], ...override };
    }
  }
  return base;
}

describe('validateHardeningGate', () => {
  it('should return passed=true when all blocking controls have passing evidence', () => {
    const result = validateHardeningGate(HARDENING_CONTROLS, makeEvidence());
    expect(result.passed).toBe(true);
    expect(result.failedControls).toEqual([]);
    expect(result.missingEvidence).toEqual([]);
  });

  it('should return passed=false when a blocking control has passed=false', () => {
    const evidence = makeEvidence([{ controlKey: 'lint', passed: false }]);
    const result = validateHardeningGate(HARDENING_CONTROLS, evidence);
    expect(result.passed).toBe(false);
    expect(result.failedControls).toContain('lint');
  });

  it('should report missingEvidence for blocking controls with no evidence entry', () => {
    const evidence = makeEvidence().filter((e) => e.controlKey !== 'test-all');
    const result = validateHardeningGate(HARDENING_CONTROLS, evidence);
    expect(result.passed).toBe(false);
    expect(result.missingEvidence).toContain('test-all');
  });

  it('should not fail for non-blocking controls with failing evidence', () => {
    const nonBlockingControl: HardeningControl = {
      key: 'optional-perf-check',
      description: 'Optional performance gate',
      requiredEvidence: ['perf-report'],
      blocking: false,
    };
    const controls = [...HARDENING_CONTROLS, nonBlockingControl];
    const evidence = makeEvidence([{ controlKey: 'optional-perf-check', passed: false }]);
    const result = validateHardeningGate(controls, evidence);
    expect(result.failedControls).not.toContain('optional-perf-check');
  });

  it('should collect all failures, not short-circuit on the first', () => {
    const evidence = makeEvidence([
      { controlKey: 'lint', passed: false },
      { controlKey: 'build', passed: false },
    ]);
    const result = validateHardeningGate(HARDENING_CONTROLS, evidence);
    expect(result.failedControls).toContain('lint');
    expect(result.failedControls).toContain('build');
  });
});
