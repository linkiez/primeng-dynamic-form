/**
 * Integration test: Release Readiness Journey (US1)
 *
 * Validates the end-to-end flow: collect evidence → run gate → produce readiness result.
 */
import {
  validateHardeningGate,
  validateReleaseReadiness,
  HARDENING_CONTROLS,
  MANDATORY_GATE_KEYS,
} from '@linkiez/primeng-dynamic-form';
import type { HardeningEvidence } from '@linkiez/primeng-dynamic-form';

function buildPassingEvidence(): HardeningEvidence[] {
  return MANDATORY_GATE_KEYS.map((key) => ({
    controlKey: key,
    passed: true,
    notes: `Gate ${key} passed`,
    recordedAt: new Date().toISOString(),
  }));
}

describe('US1: Release Readiness Integration', () => {
  describe('validateHardeningGate', () => {
    it('should pass when all mandatory controls have passing evidence', () => {
      const evidence = buildPassingEvidence();
      const result = validateHardeningGate(HARDENING_CONTROLS, evidence);
      expect(result.passed).toBe(true);
      expect(result.failedControls).toHaveLength(0);
      expect(result.missingEvidence).toHaveLength(0);
    });

    it('should fail when a blocking control has failing evidence', () => {
      const evidence = buildPassingEvidence().map((e) =>
        e.controlKey === 'lint' ? { ...e, passed: false } : e,
      );
      const result = validateHardeningGate(HARDENING_CONTROLS, evidence);
      expect(result.passed).toBe(false);
      expect(result.failedControls).toContain('lint');
    });

    it('should report missing evidence for controls with no evidence entry', () => {
      const evidence = buildPassingEvidence().filter((e) => e.controlKey !== 'build');
      const result = validateHardeningGate(HARDENING_CONTROLS, evidence);
      expect(result.passed).toBe(false);
      expect(result.missingEvidence).toContain('build');
    });
  });

  describe('validateReleaseReadiness', () => {
    it('should be ready when the gate passes', () => {
      const evidence = buildPassingEvidence();
      const gateResult = validateHardeningGate(HARDENING_CONTROLS, evidence);
      const readiness = validateReleaseReadiness(gateResult);
      expect(readiness.ready).toBe(true);
      expect(readiness.blockers).toHaveLength(0);
    });

    it('should not be ready when the gate has failed controls', () => {
      const evidence = buildPassingEvidence().map((e) =>
        e.controlKey === 'test-all' ? { ...e, passed: false } : e,
      );
      const gateResult = validateHardeningGate(HARDENING_CONTROLS, evidence);
      const readiness = validateReleaseReadiness(gateResult);
      expect(readiness.ready).toBe(false);
      expect(readiness.blockers.length).toBeGreaterThan(0);
    });

    it('should not be ready when there is missing evidence for blocking controls', () => {
      const evidence = buildPassingEvidence().filter((e) => e.controlKey !== 'schema-compatibility');
      const gateResult = validateHardeningGate(HARDENING_CONTROLS, evidence);
      const readiness = validateReleaseReadiness(gateResult);
      expect(readiness.ready).toBe(false);
    });
  });
});
