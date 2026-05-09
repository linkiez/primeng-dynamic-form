/**
 * Integration test: Prioritized Backlog Generation (US2)
 *
 * Validates end-to-end: input a mixed list → get a consistently ranked backlog.
 */
import {
  prioritizeBacklog,
  validatePrioritizationInput,
} from '@linkiez/primeng-dynamic-form';
import type { InitiativeForPrioritization } from '@linkiez/primeng-dynamic-form';

const initiatives: InitiativeForPrioritization[] = [
  {
    id: 'I-P2-low',
    priority: 'P2',
    risk: { impactScore: 1, likelihoodScore: 1, exposureScore: 1 },
    dependsOn: [],
    dependantCount: 0,
  },
  {
    id: 'I-P1-high',
    priority: 'P1',
    risk: { impactScore: 5, likelihoodScore: 5, exposureScore: 25 },
    dependsOn: [],
    dependantCount: 2,
  },
  {
    id: 'I-P3-medium',
    priority: 'P3',
    risk: { impactScore: 3, likelihoodScore: 3, exposureScore: 9 },
    dependsOn: ['I-P1-high'],
    dependantCount: 0,
  },
];

describe('US2: Backlog Prioritization Integration', () => {
  it('should produce a valid prioritized backlog from mixed initiatives', () => {
    const validation = validatePrioritizationInput(initiatives);
    expect(validation.valid).toBe(true);

    const backlog = prioritizeBacklog(initiatives);
    expect(backlog.entries).toHaveLength(3);
  });

  it('should rank P1-high-risk first', () => {
    const backlog = prioritizeBacklog(initiatives);
    expect(backlog.entries[0].initiativeId).toBe('I-P1-high');
    expect(backlog.entries[0].rank).toBe(1);
  });

  it('should rank P2-low last', () => {
    const backlog = prioritizeBacklog(initiatives);
    const last = backlog.entries[backlog.entries.length - 1];
    expect(last.initiativeId).toBe('I-P2-low');
  });

  it('ranks should be sequential starting at 1', () => {
    const backlog = prioritizeBacklog(initiatives);
    const ranks = backlog.entries.map((e) => e.rank);
    expect(ranks).toEqual([1, 2, 3]);
  });

  it('should produce consistent results when called twice with the same input', () => {
    const first = prioritizeBacklog(initiatives);
    const second = prioritizeBacklog(initiatives);
    expect(first.entries.map((e) => e.initiativeId)).toEqual(
      second.entries.map((e) => e.initiativeId),
    );
  });

  it('should reject invalid input (negative impact score)', () => {
    const invalid: InitiativeForPrioritization[] = [
      {
        id: 'bad',
        priority: 'P1',
        risk: { impactScore: -1, likelihoodScore: 3, exposureScore: -3 },
        dependsOn: [],
        dependantCount: 0,
      },
    ];
    const result = validatePrioritizationInput(invalid);
    expect(result.valid).toBe(false);
  });
});
