/**
 * Contract test: Hardening Controls Contract
 *
 * Verifies that the public API exports the hardening control structures
 * and that the mandatory quality/security/compatibility gates are defined.
 */
import type {
  HardeningControl,
  HardeningEvidence,
  HardeningGateResult,
  ReleaseReadinessResult,
} from '@linkiez/primeng-dynamic-form';
import {
  HARDENING_CONTROLS,
  MANDATORY_GATE_KEYS,
} from '@linkiez/primeng-dynamic-form';

describe('Hardening Controls Contract', () => {
  describe('HARDENING_CONTROLS constant', () => {
    it('should be exported from the package', () => {
      expect(HARDENING_CONTROLS).toBeDefined();
    });

    it('should be a readonly array of HardeningControl objects', () => {
      expect(Array.isArray(HARDENING_CONTROLS)).toBe(true);
      expect(HARDENING_CONTROLS.length).toBeGreaterThan(0);
    });

    it('each control should have a key, description, and requiredEvidence array', () => {
      for (const control of HARDENING_CONTROLS) {
        expect(typeof control.key).toBe('string');
        expect(typeof control.description).toBe('string');
        expect(Array.isArray(control.requiredEvidence)).toBe(true);
        expect(typeof control.blocking).toBe('boolean');
      }
    });
  });

  describe('MANDATORY_GATE_KEYS constant', () => {
    it('should be exported from the package', () => {
      expect(MANDATORY_GATE_KEYS).toBeDefined();
    });

    it('should include quality, security, and compatibility gate keys', () => {
      expect(MANDATORY_GATE_KEYS).toContain('lint');
      expect(MANDATORY_GATE_KEYS).toContain('test-all');
      expect(MANDATORY_GATE_KEYS).toContain('build');
      expect(MANDATORY_GATE_KEYS).toContain('schema-compatibility');
    });
  });

  describe('HardeningControl type shape', () => {
    it('should satisfy the expected contract shape', () => {
      const sample: HardeningControl = {
        key: 'lint',
        description: 'ESLint must pass with zero errors',
        requiredEvidence: ['lint-output'],
        blocking: true,
      };
      expect(sample.key).toBe('lint');
      expect(sample.blocking).toBe(true);
    });
  });

  describe('HardeningEvidence type shape', () => {
    it('should satisfy the expected contract shape', () => {
      const sample: HardeningEvidence = {
        controlKey: 'lint',
        passed: true,
        notes: 'No errors found',
        recordedAt: new Date().toISOString(),
      };
      expect(sample.controlKey).toBe('lint');
      expect(sample.passed).toBe(true);
    });
  });

  describe('HardeningGateResult type shape', () => {
    it('should satisfy the expected contract shape', () => {
      const sample: HardeningGateResult = {
        passed: true,
        failedControls: [],
        missingEvidence: [],
      };
      expect(sample.passed).toBe(true);
    });
  });

  describe('ReleaseReadinessResult type shape', () => {
    it('should satisfy the expected contract shape', () => {
      const sample: ReleaseReadinessResult = {
        ready: false,
        blockers: ['lint gate not passed'],
        warnings: [],
      };
      expect(sample.ready).toBe(false);
      expect(sample.blockers).toHaveLength(1);
    });
  });
});
