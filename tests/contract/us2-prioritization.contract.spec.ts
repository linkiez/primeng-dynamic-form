/**
 * Contract test: Prioritization Output Contract (US2)
 *
 * Verifies that the public API exports the prioritization structures
 * and that the output contract shape is stable.
 */
import type {
  InitiativeForPrioritization,
  PrioritizedBacklog,
} from '@primeng-dynamic-form/core';
import {
  prioritizeBacklog,
  validatePrioritizationInput,
} from '@primeng-dynamic-form/core';

describe('Prioritization Output Contract', () => {
  const baseInitiative: InitiativeForPrioritization = {
    id: 'I-001',
    priority: 'P1',
    risk: { impactScore: 4, likelihoodScore: 3, exposureScore: 12 },
    dependsOn: [],
    dependantCount: 0,
  };

  describe('prioritizeBacklog', () => {
    it('should be exported from the package', () => {
      expect(typeof prioritizeBacklog).toBe('function');
    });

    it('should return a PrioritizedBacklog with sorted entries', () => {
      const result = prioritizeBacklog([baseInitiative]);
      expect(result).toBeDefined();
      expect(Array.isArray(result.entries)).toBe(true);
      expect(result.entries).toHaveLength(1);
    });

    it('each entry should have initiativeId, priorityScore, and rank', () => {
      const result = prioritizeBacklog([baseInitiative]);
      const entry = result.entries[0];
      expect(typeof entry.initiativeId).toBe('string');
      expect(typeof entry.priorityScore).toBe('number');
      expect(typeof entry.rank).toBe('number');
    });

    it('should sort multiple initiatives by priorityScore descending', () => {
      const low: InitiativeForPrioritization = {
        id: 'I-003',
        priority: 'P3',
        risk: { impactScore: 1, likelihoodScore: 1, exposureScore: 1 },
        dependsOn: [],
        dependantCount: 0,
      };
      const result = prioritizeBacklog([low, baseInitiative]);
      expect(result.entries[0].initiativeId).toBe('I-001');
      expect(result.entries[1].initiativeId).toBe('I-003');
    });
  });

  describe('validatePrioritizationInput', () => {
    it('should be exported from the package', () => {
      expect(typeof validatePrioritizationInput).toBe('function');
    });

    it('should return valid=true for a valid initiative list', () => {
      const result = validatePrioritizationInput([baseInitiative]);
      expect(result.valid).toBe(true);
    });
  });

  describe('PrioritizedBacklog type shape', () => {
    it('should satisfy the expected contract shape', () => {
      const sample: PrioritizedBacklog = {
        entries: [{ initiativeId: 'I-001', priorityScore: 24, rank: 1 }],
      };
      expect(sample.entries).toHaveLength(1);
    });
  });
});
