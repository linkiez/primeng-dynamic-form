import type { HardeningControl, HardeningEvidence, HardeningGateResult } from '../models/hardening-control.model';
import {
  indexEvidence,
  findMissingEvidence,
  findFailedControls,
} from '../mappers/hardening-evidence.mapper';

/**
 * Evaluates all hardening controls against the submitted evidence.
 *
 * A gate passes only when:
 * 1. No **blocking** control is missing evidence.
 * 2. No **blocking** control has evidence with `passed === false`.
 *
 * Non-blocking controls are checked for failures but do not affect `passed`.
 *
 * @param controls - The full list of hardening controls to evaluate.
 * @param evidence - Submitted evidence records.
 * @returns Gate result with pass/fail decision and diagnostics.
 */
export function validateHardeningGate(
  controls: ReadonlyArray<HardeningControl>,
  evidence: HardeningEvidence[],
): HardeningGateResult {
  const index = indexEvidence(evidence);
  const blockingControls = controls.filter((c) => c.blocking);

  const missingEvidence = findMissingEvidence(blockingControls, index).map((c) => c.key);
  const failedControls = findFailedControls(blockingControls, index).map((c) => c.key);

  return {
    passed: missingEvidence.length === 0 && failedControls.length === 0,
    failedControls,
    missingEvidence,
  };
}
