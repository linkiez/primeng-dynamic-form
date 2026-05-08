import type { HardeningControl, HardeningEvidence } from '../models/hardening-control.model';

/** Index of evidence records keyed by `controlKey`. */
export type EvidenceIndex = Readonly<Record<string, HardeningEvidence>>;

/**
 * Builds an index of evidence records keyed by `controlKey`
 * for efficient lookup during gate validation.
 *
 * @param evidence - List of submitted evidence records.
 * @returns Index of evidence keyed by control key.
 */
export function indexEvidence(evidence: HardeningEvidence[]): EvidenceIndex {
  return Object.fromEntries(evidence.map((e) => [e.controlKey, e]));
}

/**
 * Filters the provided controls to those that have no corresponding
 * evidence entry in the index.
 *
 * @param controls - Full list of hardening controls to check.
 * @param index - Evidence index from {@link indexEvidence}.
 * @returns Controls with no evidence submitted.
 */
export function findMissingEvidence(
  controls: ReadonlyArray<HardeningControl>,
  index: EvidenceIndex,
): HardeningControl[] {
  return controls.filter((c) => !(c.key in index));
}

/**
 * Filters the provided controls to those that have evidence
 * with `passed === false`.
 *
 * @param controls - Full list of hardening controls to evaluate.
 * @param index - Evidence index from {@link indexEvidence}.
 * @returns Controls whose evidence indicates failure.
 */
export function findFailedControls(
  controls: ReadonlyArray<HardeningControl>,
  index: EvidenceIndex,
): HardeningControl[] {
  return controls.filter((c) => {
    const ev = index[c.key];
    return ev !== undefined && !ev.passed;
  });
}
