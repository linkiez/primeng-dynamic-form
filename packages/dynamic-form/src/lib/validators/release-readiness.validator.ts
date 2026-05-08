import type { HardeningGateResult, ReleaseReadinessResult } from '../models/hardening-control.model';

/**
 * Derives a {@link ReleaseReadinessResult} from a completed {@link HardeningGateResult}.
 *
 * A release is ready when the gate passed (no failed or missing blocking controls).
 * Each failed or missing control produces a blocker message.
 *
 * @param gateResult - Result from {@link validateHardeningGate}.
 * @returns Release readiness result with blockers and warnings.
 */
export function validateReleaseReadiness(
  gateResult: HardeningGateResult,
): ReleaseReadinessResult {
  const blockers: string[] = [];

  for (const key of gateResult.failedControls) {
    blockers.push(`Blocking control failed: ${key}`);
  }

  for (const key of gateResult.missingEvidence) {
    blockers.push(`Missing evidence for blocking control: ${key}`);
  }

  return {
    ready: gateResult.passed,
    blockers,
    warnings: [],
  };
}
