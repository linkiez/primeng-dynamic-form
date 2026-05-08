import type { RiskLevel, RiskMetrics } from './roadmap.types';
import { RISK_EXPOSURE_BANDS } from './roadmap.enums';

/** Full risk assessment for a planning initiative. */
export interface RiskAssessment {
  initiativeId: string;
  metrics: RiskMetrics;
  level: RiskLevel;
  mitigationNotes?: string;
}

/**
 * Derives the {@link RiskLevel} label from computed exposure metrics.
 *
 * @param metrics - Risk metrics including `exposureScore`.
 * @returns The matching risk level label.
 */
export function deriveRiskLevel(metrics: RiskMetrics): RiskLevel {
  const band = RISK_EXPOSURE_BANDS.find(
    (b) => metrics.exposureScore >= b.min && metrics.exposureScore <= b.max,
  );
  return band?.level ?? 'critical';
}

/**
 * Creates a {@link RiskAssessment} from raw metrics by computing the risk level.
 *
 * @param initiativeId - ID of the initiative being assessed.
 * @param metrics - Raw impact, likelihood, and exposure scores.
 * @param mitigationNotes - Optional mitigation description.
 * @returns Full risk assessment with derived level.
 */
export function buildRiskAssessment(
  initiativeId: string,
  metrics: RiskMetrics,
  mitigationNotes?: string,
): RiskAssessment {
  return {
    initiativeId,
    metrics,
    level: deriveRiskLevel(metrics),
    mitigationNotes,
  };
}
