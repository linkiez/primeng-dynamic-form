/**
 * Unit test: Priority Score Mapper (US2)
 *
 * Validates deterministic scoring formula.
 */
import { computePriorityScore } from '@linkiez/primeng-dynamic-form';
import type { PriorityScoreInput } from '@linkiez/primeng-dynamic-form';

describe('computePriorityScore', () => {
  it('should compute P1 high-risk score correctly', () => {
    const input: PriorityScoreInput = {
      priority: 'P1',
      risk: { impactScore: 5, likelihoodScore: 5, exposureScore: 25 },
      dependantCount: 2,
    };
    // (3 × 4) + 25 + 2 = 39
    const result = computePriorityScore(input);
    expect(result.score).toBe(39);
    expect(result.riskBand).toBe('critical');
  });

  it('should compute P3 low-risk score correctly', () => {
    const input: PriorityScoreInput = {
      priority: 'P3',
      risk: { impactScore: 1, likelihoodScore: 1, exposureScore: 1 },
      dependantCount: 0,
    };
    // (1 × 4) + 1 + 0 = 5
    const result = computePriorityScore(input);
    expect(result.score).toBe(5);
    expect(result.riskBand).toBe('low');
  });

  it('should assign riskBand=low for exposure 1-4', () => {
    const input: PriorityScoreInput = {
      priority: 'P2',
      risk: { impactScore: 2, likelihoodScore: 2, exposureScore: 4 },
      dependantCount: 0,
    };
    const result = computePriorityScore(input);
    expect(result.riskBand).toBe('low');
  });

  it('should assign riskBand=high for exposure 10-19', () => {
    const input: PriorityScoreInput = {
      priority: 'P1',
      risk: { impactScore: 4, likelihoodScore: 3, exposureScore: 12 },
      dependantCount: 0,
    };
    const result = computePriorityScore(input);
    expect(result.riskBand).toBe('high');
  });

  it('should include dependantCount in the score', () => {
    const withDeps: PriorityScoreInput = {
      priority: 'P2',
      risk: { impactScore: 2, likelihoodScore: 2, exposureScore: 4 },
      dependantCount: 5,
    };
    const withoutDeps: PriorityScoreInput = {
      ...withDeps,
      dependantCount: 0,
    };
    const delta = computePriorityScore(withDeps).score - computePriorityScore(withoutDeps).score;
    expect(delta).toBe(5);
  });

  it('P1 should always score higher than P3 given identical risk and dependants', () => {
    const base = {
      risk: { impactScore: 3, likelihoodScore: 3, exposureScore: 9 },
      dependantCount: 1,
    };
    const p1 = computePriorityScore({ ...base, priority: 'P1' });
    const p3 = computePriorityScore({ ...base, priority: 'P3' });
    expect(p1.score).toBeGreaterThan(p3.score);
  });
});
