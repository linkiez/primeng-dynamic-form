# Quickstart: Validation Scenarios (feature/002)

**Package**: `@primeng-dynamic-form/core`
**Feature**: `002-hardening-new-features`

This guide provides copy-paste examples for each new API introduced in feature/002.

---

## US1 — Release Hardening Gate

### Check if all controls pass

```typescript
import {
  HARDENING_CONTROLS,
  validateHardeningGate,
  validateReleaseReadiness,
} from '@primeng-dynamic-form/core';
import type { HardeningEvidence } from '@primeng-dynamic-form/core';

const evidence: HardeningEvidence[] = [
  { controlKey: 'lint',                 passed: true,  recordedAt: new Date() },
  { controlKey: 'test-all',            passed: true,  recordedAt: new Date() },
  { controlKey: 'build',               passed: true,  recordedAt: new Date() },
  { controlKey: 'schema-compatibility', passed: true,  recordedAt: new Date() },
];

const gateResult = validateHardeningGate(HARDENING_CONTROLS, evidence);
const readiness  = validateReleaseReadiness(gateResult);

console.log(readiness.ready);    // true
console.log(readiness.blockers); // []
```

### Fail case — missing build evidence

```typescript
const partialEvidence: HardeningEvidence[] = [
  { controlKey: 'lint',     passed: true, recordedAt: new Date() },
  { controlKey: 'test-all', passed: true, recordedAt: new Date() },
  // 'build' and 'schema-compatibility' missing
];

const gate     = validateHardeningGate(HARDENING_CONTROLS, partialEvidence);
const readiness = validateReleaseReadiness(gate);

console.log(readiness.ready);    // false
console.log(readiness.blockers); // ['Missing evidence: build', 'Missing evidence: schema-compatibility']
```

---

## US2 — Backlog Prioritization

### Prioritize a mixed backlog

```typescript
import {
  validatePrioritizationInput,
  prioritizeBacklog,
} from '@primeng-dynamic-form/core';
import type { InitiativeForPrioritization } from '@primeng-dynamic-form/core';

const initiatives: InitiativeForPrioritization[] = [
  {
    id: 'I-001',
    priority: 'P1',
    risk: { impactScore: 5, likelihoodScore: 5, exposureScore: 25 },
    dependsOn: [],
    dependantCount: 2,
  },
  {
    id: 'I-002',
    priority: 'P2',
    risk: { impactScore: 3, likelihoodScore: 3, exposureScore: 9 },
    dependsOn: ['I-001'],
    dependantCount: 0,
  },
];

const validation = validatePrioritizationInput(initiatives);
if (!validation.valid) throw new Error(validation.errors.join(', '));

const backlog = prioritizeBacklog(initiatives);
backlog.entries.forEach((e) => {
  console.log(`#${e.rank} ${e.initiativeId} — score ${e.priorityScore}`);
});
// #1 I-001 — score 39
// #2 I-002 — score 13
```

---

## US3 — Feature Proposal Lifecycle

### Validate compatibility and build a roadmap slice

```typescript
import {
  validateCompatibilityImpact,
  buildRoadmapSlice,
  mapProposalsToSlice,
} from '@primeng-dynamic-form/core';
import type { FeatureProposal } from '@primeng-dynamic-form/core';

const proposals: FeatureProposal[] = [
  {
    id: 'FP-001',
    title: 'Tooltip support',
    category: 'feature',
    priority: 'P3',
    description: 'Add tooltip rendering via UIHints.',
    compatibility: { apiBreaking: false, schemaVersionBreaking: false, peerDependencyBreaking: false },
    entryCriteria: ['spec approved'],
    exitCriteria: ['tests pass'],
  },
  {
    id: 'FP-002',
    title: 'Breaking rename',
    category: 'improvement',
    priority: 'P1',
    description: 'Rename fieldKey to name.',
    compatibility: {
      apiBreaking: true,
      schemaVersionBreaking: true,
      peerDependencyBreaking: false,
      migrationNotes: 'Consumers must rename all fieldKey usages to name.',
    },
    entryCriteria: ['migration guide ready'],
    exitCriteria: ['changelog updated'],
  },
];

// Option A: validate + build manually
proposals.forEach((p) => {
  const result = validateCompatibilityImpact(p.compatibility);
  if (!result.valid) console.warn(`${p.id} rejected:`, result.errors);
});

// Option B: map with auto-filtering
const { slice, rejected } = mapProposalsToSlice('Q3-2026', 'P2', proposals);
console.log(`Slice '${slice.label}' has ${slice.proposals.length} proposals`);
console.log(`Rejected: ${rejected.length}`);
```
