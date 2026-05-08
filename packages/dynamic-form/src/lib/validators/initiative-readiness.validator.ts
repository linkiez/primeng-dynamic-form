import type {
  InitiativeCategory,
  InitiativePriority,
  InitiativeStatus,
  ReadinessCheckResult,
} from '../models/roadmap.types';

/** Minimal initiative descriptor needed for readiness evaluation. */
export interface InitiativeReadinessInput {
  id: string;
  category: InitiativeCategory;
  priority: InitiativePriority;
  status: InitiativeStatus;
  /** Human-readable entry criteria that must be satisfied. */
  entryCriteria: string[];
  /** Criteria that have been verified as met. */
  satisfiedCriteria: string[];
  /** IDs of initiatives this one depends on. */
  dependsOn: string[];
  /** IDs of dependency initiatives that are in `done` or `validated` status. */
  completedDependencies: string[];
}

/**
 * Validates whether a planning initiative meets all readiness conditions
 * required to transition from `draft` or `ready` to `in-progress`.
 *
 * Rules:
 * 1. Status must be `draft` or `ready` (cannot re-evaluate already started work).
 * 2. All `entryCriteria` must appear in `satisfiedCriteria`.
 * 3. All `dependsOn` IDs must appear in `completedDependencies`.
 * 4. P1 initiatives are unconditionally prioritised — an empty entry criteria
 *    list is accepted for P1.
 *
 * @param initiative - Initiative input for readiness evaluation.
 * @returns Readiness check result with list of unmet criteria.
 */
export function validateInitiativeReadiness(
  initiative: InitiativeReadinessInput,
): ReadinessCheckResult {
  const unmetCriteria: string[] = [];

  if (initiative.status !== 'draft' && initiative.status !== 'ready') {
    return { ready: false, unmetCriteria: [`Status "${initiative.status}" cannot transition to in-progress via readiness check`] };
  }

  for (const criterion of initiative.entryCriteria) {
    if (!initiative.satisfiedCriteria.includes(criterion)) {
      unmetCriteria.push(criterion);
    }
  }

  for (const depId of initiative.dependsOn) {
    if (!initiative.completedDependencies.includes(depId)) {
      unmetCriteria.push(`Dependency not completed: ${depId}`);
    }
  }

  return {
    ready: unmetCriteria.length === 0,
    unmetCriteria,
  };
}
