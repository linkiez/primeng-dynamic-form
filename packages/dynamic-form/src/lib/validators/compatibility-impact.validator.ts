import type { CompatibilityImpact } from '../models/roadmap.types';

/** Result of validating a {@link CompatibilityImpact} descriptor. */
export interface CompatibilityImpactValidationResult {
  valid: boolean;
  errors: string[];
}

const BREAKING_FIELDS: ReadonlyArray<keyof CompatibilityImpact> = [
  'apiBreaking',
  'schemaVersionBreaking',
  'peerDependencyBreaking',
];

const MISSING_NOTES_MSG = 'migrationNotes is required when a breaking change is declared';

/**
 * Validates a {@link CompatibilityImpact} descriptor.
 *
 * Rule: any field set to `true` in `apiBreaking`, `schemaVersionBreaking`,
 * or `peerDependencyBreaking` requires `migrationNotes` to be present.
 *
 * @param impact - Compatibility impact descriptor to validate.
 * @returns Validation result with a list of error messages.
 */
export function validateCompatibilityImpact(
  impact: CompatibilityImpact,
): CompatibilityImpactValidationResult {
  const errors: string[] = [];

  for (const field of BREAKING_FIELDS) {
    if (impact[field] === true && !impact.migrationNotes) {
      errors.push(`${String(field)}: ${MISSING_NOTES_MSG}`);
    }
  }

  return { valid: errors.length === 0, errors };
}
