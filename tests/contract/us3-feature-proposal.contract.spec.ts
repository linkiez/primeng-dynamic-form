/**
 * Contract test: Feature Proposal (US3)
 *
 * Validates that all required US3 symbols are exported from the public API.
 */
import type {
  FeatureProposal,
  RoadmapSlice,
  CompatibilityImpactValidationResult,
} from '@primeng-dynamic-form/core';

import {
  validateCompatibilityImpact,
  buildRoadmapSlice,
} from '@primeng-dynamic-form/core';

describe('US3: Feature Proposal Contract', () => {
  describe('FeatureProposal type', () => {
    it('should be usable as a full proposal object', () => {
      const proposal: FeatureProposal = {
        id: 'FP-001',
        title: 'Dynamic schema versioning',
        category: 'feature',
        priority: 'P2',
        description: 'Allow schema consumers to declare target schema version.',
        compatibility: {
          apiBreaking: false,
          schemaVersionBreaking: false,
          peerDependencyBreaking: false,
        },
        entryCriteria: ['spec approved', 'plan merged'],
        exitCriteria: ['tests pass', 'docs updated'],
      };
      expect(proposal.id).toBe('FP-001');
      expect(proposal.compatibility.apiBreaking).toBe(false);
    });
  });

  describe('RoadmapSlice type', () => {
    it('should hold a list of proposals and a label', () => {
      const slice: RoadmapSlice = {
        label: 'Q3-2026',
        proposals: [],
        priority: 'P2',
      };
      expect(slice.label).toBe('Q3-2026');
      expect(slice.proposals).toEqual([]);
    });
  });

  describe('validateCompatibilityImpact', () => {
    it('should be a function', () => {
      expect(typeof validateCompatibilityImpact).toBe('function');
    });

    it('should return { valid, errors } shape', () => {
      const result: CompatibilityImpactValidationResult = validateCompatibilityImpact({
        apiBreaking: false,
        schemaVersionBreaking: false,
        peerDependencyBreaking: false,
      });
      expect(result).toHaveProperty('valid');
      expect(result).toHaveProperty('errors');
      expect(Array.isArray(result.errors)).toBe(true);
    });
  });

  describe('buildRoadmapSlice', () => {
    it('should be a function', () => {
      expect(typeof buildRoadmapSlice).toBe('function');
    });

    it('should return a RoadmapSlice', () => {
      const slice = buildRoadmapSlice('Q1-2027', 'P1', []);
      expect(slice.label).toBe('Q1-2027');
      expect(slice.priority).toBe('P1');
      expect(slice.proposals).toEqual([]);
    });
  });
});
