import type { InitiativeCategory, InitiativePriority, CompatibilityImpact } from './roadmap.types';

/** A concrete proposal for a new feature or improvement. */
export interface FeatureProposal {
  id: string;
  title: string;
  category: InitiativeCategory;
  priority: InitiativePriority;
  description: string;
  compatibility: CompatibilityImpact;
  /** Conditions that must be met before work can start. */
  entryCriteria: string[];
  /** Measurable conditions that confirm the feature is done. */
  exitCriteria: string[];
}
