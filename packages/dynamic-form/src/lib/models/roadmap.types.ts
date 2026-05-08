/** Shared roadmap domain types for the improvement planning model. */

/** Category of a planning initiative. */
export type InitiativeCategory = 'hardening' | 'improvement' | 'feature';

/** Priority tier aligned with the planning contract. */
export type InitiativePriority = 'P1' | 'P2' | 'P3';

/** Risk exposure level for a planning initiative. */
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

/** Lifecycle status for a planning initiative. */
export type InitiativeStatus =
  | 'draft'
  | 'ready'
  | 'in-progress'
  | 'blocked'
  | 'done'
  | 'validated';

/** Snapshot of risk metrics computed for an initiative. */
export interface RiskMetrics {
  /** Impact score 1–5: severity if the risk materialises. */
  impactScore: number;
  /** Likelihood score 1–5: probability of the risk materialising. */
  likelihoodScore: number;
  /** Computed exposure: impactScore × likelihoodScore. */
  exposureScore: number;
}

/** Acceptance criterion for a planning initiative. */
export interface AcceptanceCriterion {
  /** Short description of the criterion. */
  description: string;
  /** Whether this criterion has been validated. */
  validated: boolean;
}

/** Compatibility impact descriptor for a feature proposal. */
export interface CompatibilityImpact {
  /** Whether the change affects the public API shape. */
  apiBreaking: boolean;
  /** Whether `schemaVersion` must be incremented. */
  schemaVersionBreaking: boolean;
  /** Whether peer dependency ranges change. */
  peerDependencyBreaking: boolean;
  /** Required migration steps when any breaking flag is true. */
  migrationNotes?: string;
}

/** Result produced by a readiness check. */
export interface ReadinessCheckResult {
  /** Whether the initiative satisfies all entry criteria. */
  ready: boolean;
  /** List of unmet criteria descriptions. */
  unmetCriteria: string[];
}

/** Scored and ranked backlog entry. */
export interface PrioritizedEntry {
  initiativeId: string;
  priorityScore: number;
  rank: number;
}
