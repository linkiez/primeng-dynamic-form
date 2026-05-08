import type { InitiativePriority } from '../models/roadmap.types';
import type { FeatureProposal } from '../models/feature-proposal.model';
import type { RoadmapSlice } from '../models/roadmap-slice.model';
import { buildRoadmapSlice } from '../models/roadmap-slice.model';
import { validateCompatibilityImpact } from '../validators/compatibility-impact.validator';

/** Result of mapping proposals to a roadmap slice. */
export interface ProposalSliceMappingResult {
  slice: RoadmapSlice;
  /** Proposals excluded due to compatibility validation failures. */
  rejected: Array<{ proposal: FeatureProposal; errors: string[] }>;
}

/**
 * Maps a list of feature proposals into a {@link RoadmapSlice}, filtering out
 * proposals that fail compatibility impact validation.
 *
 * @param label - Label for the roadmap slice.
 * @param priority - Priority tier for the slice.
 * @param proposals - Candidate proposals to include.
 * @returns A slice containing only valid proposals, and a list of rejected ones.
 */
export function mapProposalsToSlice(
  label: string,
  priority: InitiativePriority,
  proposals: FeatureProposal[],
): ProposalSliceMappingResult {
  const valid: FeatureProposal[] = [];
  const rejected: ProposalSliceMappingResult['rejected'] = [];

  for (const proposal of proposals) {
    const result = validateCompatibilityImpact(proposal.compatibility);
    if (result.valid) {
      valid.push(proposal);
    } else {
      rejected.push({ proposal, errors: result.errors });
    }
  }

  return {
    slice: buildRoadmapSlice(label, priority, valid),
    rejected,
  };
}
