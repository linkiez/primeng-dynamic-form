/**
 * Unit test: Compatibility Impact Validator (US3)
 *
 * Tests all validation rules for CompatibilityImpact.
 */
import { validateCompatibilityImpact } from '@linkiez/primeng-dynamic-form';
import type { CompatibilityImpact } from '@linkiez/primeng-dynamic-form';

describe('validateCompatibilityImpact', () => {
  it('should pass when no breaking flags are set', () => {
    const impact: CompatibilityImpact = {
      apiBreaking: false,
      schemaVersionBreaking: false,
      peerDependencyBreaking: false,
    };
    const result = validateCompatibilityImpact(impact);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should fail when apiBreaking=true and migrationNotes is missing', () => {
    const impact: CompatibilityImpact = {
      apiBreaking: true,
      schemaVersionBreaking: false,
      peerDependencyBreaking: false,
    };
    const result = validateCompatibilityImpact(impact);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'apiBreaking: migrationNotes is required when a breaking change is declared',
    );
  });

  it('should fail when schemaVersionBreaking=true and migrationNotes is missing', () => {
    const impact: CompatibilityImpact = {
      apiBreaking: false,
      schemaVersionBreaking: true,
      peerDependencyBreaking: false,
    };
    const result = validateCompatibilityImpact(impact);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'schemaVersionBreaking: migrationNotes is required when a breaking change is declared',
    );
  });

  it('should fail when peerDependencyBreaking=true and migrationNotes is missing', () => {
    const impact: CompatibilityImpact = {
      apiBreaking: false,
      schemaVersionBreaking: false,
      peerDependencyBreaking: true,
    };
    const result = validateCompatibilityImpact(impact);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain(
      'peerDependencyBreaking: migrationNotes is required when a breaking change is declared',
    );
  });

  it('should collect all errors when multiple breaking flags are set without notes', () => {
    const impact: CompatibilityImpact = {
      apiBreaking: true,
      schemaVersionBreaking: true,
      peerDependencyBreaking: true,
    };
    const result = validateCompatibilityImpact(impact);
    expect(result.valid).toBe(false);
    expect(result.errors).toHaveLength(3);
  });

  it('should pass when all breaking flags are set and migrationNotes is provided', () => {
    const impact: CompatibilityImpact = {
      apiBreaking: true,
      schemaVersionBreaking: true,
      peerDependencyBreaking: true,
      migrationNotes: 'Full migration guide in CHANGELOG.md',
    };
    const result = validateCompatibilityImpact(impact);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should pass when migrationNotes is provided but no breaking flags are set', () => {
    const impact: CompatibilityImpact = {
      apiBreaking: false,
      schemaVersionBreaking: false,
      peerDependencyBreaking: false,
      migrationNotes: 'Not needed but included anyway.',
    };
    const result = validateCompatibilityImpact(impact);
    expect(result.valid).toBe(true);
  });
});
