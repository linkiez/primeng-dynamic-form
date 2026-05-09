/**
 * Integration test: Roadmap Slice Planning Flow (US3)
 *
 * End-to-end: compose feature proposals → validate compatibility → build roadmap slice.
 */
import {
  validateCompatibilityImpact,
  buildRoadmapSlice,
} from '@linkiez/primeng-dynamic-form';
import type { FeatureProposal, RoadmapSlice } from '@linkiez/primeng-dynamic-form';

const nonBreakingProposal: FeatureProposal = {
  id: 'FP-001',
  title: 'Add tooltip support',
  category: 'feature',
  priority: 'P3',
  description: 'Render tooltips on field labels using UIHints.',
  compatibility: {
    apiBreaking: false,
    schemaVersionBreaking: false,
    peerDependencyBreaking: false,
  },
  entryCriteria: ['spec reviewed'],
  exitCriteria: ['tests pass'],
};

const breakingProposalWithNotes: FeatureProposal = {
  id: 'FP-002',
  title: 'Rename fieldKey to name',
  category: 'improvement',
  priority: 'P1',
  description: 'Breaking rename for clarity.',
  compatibility: {
    apiBreaking: true,
    schemaVersionBreaking: true,
    peerDependencyBreaking: false,
    migrationNotes: 'Consumers must rename all fieldKey usages to name.',
  },
  entryCriteria: ['migration guide ready'],
  exitCriteria: ['build passes', 'changelog updated'],
};

const breakingProposalMissingNotes: FeatureProposal = {
  id: 'FP-003',
  title: 'Remove deprecated validators',
  category: 'hardening',
  priority: 'P2',
  description: 'Remove deprecated sync validator entries.',
  compatibility: {
    apiBreaking: true,
    schemaVersionBreaking: false,
    peerDependencyBreaking: false,
    // migrationNotes intentionally omitted
  },
  entryCriteria: ['deprecation cycle done'],
  exitCriteria: ['tests pass'],
};

describe('US3: Roadmap Slice Planning Integration', () => {
  describe('validateCompatibilityImpact', () => {
    it('should pass a fully non-breaking proposal', () => {
      const result = validateCompatibilityImpact(nonBreakingProposal.compatibility);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should pass a breaking proposal that has migrationNotes', () => {
      const result = validateCompatibilityImpact(breakingProposalWithNotes.compatibility);
      expect(result.valid).toBe(true);
    });

    it('should fail a breaking proposal without migrationNotes', () => {
      const result = validateCompatibilityImpact(breakingProposalMissingNotes.compatibility);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('buildRoadmapSlice', () => {
    it('should group valid proposals into a slice', () => {
      const slice: RoadmapSlice = buildRoadmapSlice('Q3-2026', 'P3', [
        nonBreakingProposal,
      ]);
      expect(slice.label).toBe('Q3-2026');
      expect(slice.proposals).toHaveLength(1);
      expect(slice.proposals[0].id).toBe('FP-001');
    });

    it('should include breaking proposals when migrationNotes are provided', () => {
      const slice = buildRoadmapSlice('Q4-2026', 'P1', [
        nonBreakingProposal,
        breakingProposalWithNotes,
      ]);
      expect(slice.proposals).toHaveLength(2);
    });

    it('should produce an empty slice when no proposals are given', () => {
      const slice = buildRoadmapSlice('Q1-2027', 'P2', []);
      expect(slice.proposals).toHaveLength(0);
    });
  });
});
