import type { InitiativeForPrioritization } from '../models/initiative.model';

/** Result of validating a prioritization input list. */
export interface PrioritizationValidationResult {
  valid: boolean;
  errors: string[];
}

const SCORE_MIN = 1;
const SCORE_MAX = 5;

/**
 * Validates a list of initiatives for prioritization eligibility.
 *
 * Rules:
 * 1. List must not be empty.
 * 2. All `id` values must be unique.
 * 3. `impactScore` and `likelihoodScore` must each be between 1–5 (inclusive).
 * 4. `exposureScore` must equal `impactScore × likelihoodScore`.
 * 5. `dependantCount` must be ≥ 0.
 *
 * @param initiatives - Initiatives to validate.
 * @returns Validation result with list of error messages.
 */
export function validatePrioritizationInput(
  initiatives: InitiativeForPrioritization[],
): PrioritizationValidationResult {
  const errors: string[] = [];

  if (initiatives.length === 0) {
    errors.push('Backlog must not be empty');
    return { valid: false, errors };
  }

  const seenIds = new Set<string>();
  for (const item of initiatives) {
    if (seenIds.has(item.id)) {
      errors.push(`Duplicate initiative id: ${item.id}`);
    }
    seenIds.add(item.id);

    const { impactScore, likelihoodScore, exposureScore } = item.risk;

    if (impactScore < SCORE_MIN || impactScore > SCORE_MAX) {
      errors.push(`Initiative ${item.id}: impactScore must be between ${SCORE_MIN} and ${SCORE_MAX}`);
    }
    if (likelihoodScore < SCORE_MIN || likelihoodScore > SCORE_MAX) {
      errors.push(`Initiative ${item.id}: likelihoodScore must be between ${SCORE_MIN} and ${SCORE_MAX}`);
    }
    if (exposureScore !== impactScore * likelihoodScore) {
      errors.push(`Initiative ${item.id}: exposureScore must equal impactScore × likelihoodScore`);
    }
    if (item.dependantCount < 0) {
      errors.push(`Initiative ${item.id}: dependantCount must be >= 0`);
    }
  }

  return { valid: errors.length === 0, errors };
}
