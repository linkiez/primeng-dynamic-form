import type { InitiativePriority } from './roadmap.types';
import type { FeatureProposal } from './feature-proposal.model';

/** A time-bounded slice of the roadmap grouping related feature proposals. */
export interface RoadmapSlice {
  /** Human-readable label, e.g. "Q3-2026". */
  label: string;
  /** Priority tier assigned to this planning slice. */
  priority: InitiativePriority;
  /** Proposals included in this slice. */
  proposals: FeatureProposal[];
}

/**
 * Factory function to create a {@link RoadmapSlice}.
 *
 * @param label - Quarter or release label, e.g. "Q3-2026".
 * @param priority - Priority tier for the slice.
 * @param proposals - Feature proposals to include.
 * @returns A new {@link RoadmapSlice} object.
 */
export function buildRoadmapSlice(
  label: string,
  priority: InitiativePriority,
  proposals: FeatureProposal[],
): RoadmapSlice {
  return { label, priority, proposals };
}
