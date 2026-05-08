import type { InitiativePriority, RiskMetrics } from '../models/roadmap.types';
import { PRIORITY_WEIGHTS, RISK_EXPOSURE_BANDS } from '../models/roadmap.enums';

/** Input data required to compute a priority score for an initiative. */
export interface PriorityScoreInput {
  priority: InitiativePriority;
  risk: RiskMetrics;
  /** Number of other initiatives that depend on this one (0 = no dependants). */
  dependantCount: number;
}

/** Computed priority score for an initiative. */
export interface PriorityScoreResult {
  /** Final numeric score. Higher = more urgent. */
  score: number;
  /** Risk level band derived from the exposure score. */
  riskBand: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Resolves the risk level band from an exposure score.
 *
 * @param exposureScore - Computed as impactScore × likelihoodScore.
 * @returns The matching risk band label.
 */
function resolveRiskBand(exposureScore: number): 'low' | 'medium' | 'high' | 'critical' {
  const band = RISK_EXPOSURE_BANDS.find(
    (b) => exposureScore >= b.min && exposureScore <= b.max,
  );
  return band?.level ?? 'critical';
}

/**
 * Computes a deterministic priority score for a planning initiative.
 *
 * Formula: (priorityWeight × 4) + exposureScore + dependantCount
 *
 * - Priority weight: P1=3, P2=2, P3=1 (multiplied by 4 for range separation)
 * - Exposure: impactScore × likelihoodScore (max 25)
 * - Dependant count: direct bonus for blocking other work
 *
 * @param input - Initiative priority, risk metrics and dependant count.
 * @returns Score and risk band.
 */
export function computePriorityScore(input: PriorityScoreInput): PriorityScoreResult {
  const { priority, risk, dependantCount } = input;
  const priorityWeight = PRIORITY_WEIGHTS[priority];
  const exposureScore = risk.impactScore * risk.likelihoodScore;
  const score = priorityWeight * 4 + exposureScore + dependantCount;

  return {
    score,
    riskBand: resolveRiskBand(exposureScore),
  };
}
