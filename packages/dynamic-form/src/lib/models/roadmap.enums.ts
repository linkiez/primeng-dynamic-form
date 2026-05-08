/** Enumerations for roadmap initiative planning. */

/**
 * Lifecycle status transitions for a planning initiative.
 *
 * Valid transitions:
 * draft → ready → in-progress → done → validated
 * Any status → blocked
 * blocked → in-progress (on unblock)
 */
export const INITIATIVE_STATUSES = [
  'draft',
  'ready',
  'in-progress',
  'blocked',
  'done',
  'validated',
] as const;

/** Risk exposure bands for impact and likelihood scoring. */
export const RISK_LEVELS = ['low', 'medium', 'high', 'critical'] as const;

/** Priority tiers for backlog sorting. */
export const INITIATIVE_PRIORITIES = ['P1', 'P2', 'P3'] as const;

/** Initiative categories aligned with the planning contract. */
export const INITIATIVE_CATEGORIES = [
  'hardening',
  'improvement',
  'feature',
] as const;

/**
 * Maps risk exposure score ranges to {@link RiskLevel} labels.
 *
 * Exposure = impactScore × likelihoodScore (range 1–25).
 *
 * | Band | Range |
 * |------|-------|
 * | low | 1–4 |
 * | medium | 5–9 |
 * | high | 10–19 |
 * | critical | 20–25 |
 */
export const RISK_EXPOSURE_BANDS: ReadonlyArray<{
  readonly level: (typeof RISK_LEVELS)[number];
  readonly min: number;
  readonly max: number;
}> = [
  { level: 'low', min: 1, max: 4 },
  { level: 'medium', min: 5, max: 9 },
  { level: 'high', min: 10, max: 19 },
  { level: 'critical', min: 20, max: 25 },
];

/**
 * Numeric weights for each priority tier used in the priority scoring formula.
 * Higher weight = higher urgency.
 */
export const PRIORITY_WEIGHTS: Readonly<Record<(typeof INITIATIVE_PRIORITIES)[number], number>> = {
  P1: 3,
  P2: 2,
  P3: 1,
};
