import type {
  InitiativeCategory,
  InitiativePriority,
  InitiativeStatus,
  RiskMetrics,
  AcceptanceCriterion,
} from './roadmap.types';

/** Full aggregate model for a planning initiative. */
export interface Initiative {
  id: string;
  title: string;
  category: InitiativeCategory;
  priority: InitiativePriority;
  status: InitiativeStatus;
  risk: RiskMetrics;
  /** IDs of initiatives that must be completed before this one starts. */
  dependsOn: string[];
  /** Number of initiatives that depend on this one completing. */
  dependantCount: number;
  acceptanceCriteria: AcceptanceCriterion[];
}

/** Minimal initiative data required for prioritization scoring. */
export interface InitiativeForPrioritization {
  id: string;
  priority: InitiativePriority;
  risk: RiskMetrics;
  dependsOn: string[];
  dependantCount: number;
}
