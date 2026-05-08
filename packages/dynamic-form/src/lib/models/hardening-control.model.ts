/** Domain model and constants for hardening controls. */

/** A single hardening control that must be satisfied before release. */
export interface HardeningControl {
  /** Unique key identifying this control. */
  key: string;
  /** Human-readable description of the control. */
  description: string;
  /** List of evidence artifact names required to satisfy this control. */
  requiredEvidence: string[];
  /** Whether a failure blocks the release gate. */
  blocking: boolean;
}

/** Evidence record for a single hardening control. */
export interface HardeningEvidence {
  /** Key of the control this evidence corresponds to. */
  controlKey: string;
  /** Whether the control passed. */
  passed: boolean;
  /** Optional notes or command output summary. */
  notes?: string;
  /** ISO 8601 timestamp when the evidence was recorded. */
  recordedAt: string;
}

/** Result of evaluating all hardening controls against collected evidence. */
export interface HardeningGateResult {
  /** Whether all blocking controls passed. */
  passed: boolean;
  /** Keys of blocking controls that failed. */
  failedControls: string[];
  /** Keys of blocking controls for which no evidence was submitted. */
  missingEvidence: string[];
}

/** Final release readiness output after gate evaluation. */
export interface ReleaseReadinessResult {
  /** Whether the package is ready for release. */
  ready: boolean;
  /** Descriptions of blocking issues that prevent release. */
  blockers: string[];
  /** Non-blocking warnings. */
  warnings: string[];
}

/**
 * The mandatory hardening controls that MUST pass before a release.
 *
 * | Key | Description |
 * |-----|-------------|
 * | `lint` | ESLint must pass with zero errors |
 * | `test-all` | Full test suite must pass with zero failures |
 * | `build` | ng-packagr build must succeed |
 * | `schema-compatibility` | Schema compatibility validator must report no errors |
 */
export const HARDENING_CONTROLS: ReadonlyArray<HardeningControl> = [
  {
    key: 'lint',
    description: 'ESLint must pass with zero errors',
    requiredEvidence: ['lint-output'],
    blocking: true,
  },
  {
    key: 'test-all',
    description: 'Full test suite must pass (unit + integration + contract)',
    requiredEvidence: ['test-output'],
    blocking: true,
  },
  {
    key: 'build',
    description: 'ng-packagr build must succeed with no errors',
    requiredEvidence: ['build-output'],
    blocking: true,
  },
  {
    key: 'schema-compatibility',
    description: 'Schema compatibility validator must report zero errors',
    requiredEvidence: ['compatibility-report'],
    blocking: true,
  },
];

/** Keys of the mandatory blocking controls. */
export const MANDATORY_GATE_KEYS: ReadonlyArray<string> = HARDENING_CONTROLS
  .filter((c) => c.blocking)
  .map((c) => c.key);
