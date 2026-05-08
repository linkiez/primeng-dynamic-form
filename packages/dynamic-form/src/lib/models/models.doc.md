# Module: models

**Path**: `packages/dynamic-form/src/lib/models/`
**Package**: `@primeng-dynamic-form/core`

## Responsibility

Defines all domain types and error constants used across the library.
No runtime logic — pure TypeScript interfaces, type aliases, and constants.

## Files

### `dynamic-form.types.ts`

Core contract types exported in the public API.

| Symbol | Kind | Description |
|--------|------|-------------|
| `FieldType` | union type | 9 supported field types: `text`, `email`, `password`, `number`, `textarea`, `select`, `checkbox`, `radio`, `date` |
| `SUPPORTED_FIELD_TYPES` | readonly array | Runtime constant mirror of `FieldType` values |
| `ValidatorName` | union type | 8 built-in validator names: `required`, `minLength`, `maxLength`, `min`, `max`, `pattern`, `email`, `customSync` |
| `FieldOption` | interface | `{ label: string; value: string \| number \| boolean }` |
| `ValidationRule` | interface | `{ name, params?, message? }` — declarative rule per field |
| `UIHints` | interface | `{ tooltip?, ariaLabel?, ariaDescription? }` — accessibility hints |
| `LayoutConfig` | interface | `{ columns?, responsive? }` — field layout overrides |
| `SubmitConfig` | interface | `{ mode?, debounceMs? }` — submit behavior (reserved for future use in v1) |
| `FieldDefinition` | interface | Full field descriptor: key, type, label, options, validators, UIHints, etc. |
| `FormSchema` | interface | Root input: `{ schemaVersion, formId?, fields, layout?, submit? }` |
| `DynamicFormConfiguration` | interface | Component config: submit/reset buttons, labels, layoutMode, emitOnChange |
| `FormSubmissionPayload` | interface | Submit output: `{ valid, values, errors }` |

### `error-codes.ts`

Configuration error constants and their associated type.

| Symbol | Kind | Description |
|--------|------|-------------|
| `ERROR_CODES` | const object | 6 string codes: `missing_schema_version`, `unsupported_schema_version`, `unsupported_field_type`, `missing_field_options`, `duplicate_field_key`, `unsupported_validator` |
| `ErrorCode` | type | Union of `ERROR_CODES` values |
| `DynamicFormConfigError` | interface | `{ code, message, fieldKey?, recommendation? }` |

## Key Decisions

- **D2**: `schemaVersion` is mandatory on `FormSchema` starting at `"1.0"` to allow controlled schema evolution (see `research.md`).
- **D3**: `FieldType` is a closed union — unsupported types are treated as config errors, not silently dropped.
- Types are all exported via `public-api.ts` as `export type` to avoid UMD global conflicts in Angular builds.

---

### `roadmap.types.ts`

Shared domain types for the improvement planning model. No runtime logic.

| Symbol | Kind | Description |
|--------|------|-------------|
| `InitiativeCategory` | union type | `'hardening' \| 'improvement' \| 'feature'` |
| `InitiativePriority` | union type | `'P1' \| 'P2' \| 'P3'` |
| `RiskLevel` | union type | `'low' \| 'medium' \| 'high' \| 'critical'` |
| `InitiativeStatus` | union type | `'draft' \| 'ready' \| 'in-progress' \| 'blocked' \| 'done' \| 'validated'` |
| `RiskMetrics` | interface | `{ impactScore, likelihoodScore, exposureScore }` |
| `AcceptanceCriterion` | interface | `{ description, validated }` |
| `CompatibilityImpact` | interface | Breaking flags for API shape, schemaVersion and peer deps; optional `migrationNotes` |
| `ReadinessCheckResult` | interface | `{ ready: boolean, unmetCriteria: string[] }` |
| `PrioritizedEntry` | interface | `{ initiativeId: string, priorityScore: number, rank: number }` |

### `roadmap.enums.ts`

Runtime constants for planning enumeration values and scoring tables.

| Symbol | Kind | Description |
|--------|------|-------------|
| `INITIATIVE_STATUSES` | readonly array | All valid initiative status values |
| `RISK_LEVELS` | readonly array | All valid risk level values |
| `INITIATIVE_PRIORITIES` | readonly array | All valid priority values |
| `INITIATIVE_CATEGORIES` | readonly array | All valid category values |
| `RISK_EXPOSURE_BANDS` | readonly array | Maps exposure score ranges to `RiskLevel` labels |
| `PRIORITY_WEIGHTS` | readonly record | Numeric weight per priority: P1=3, P2=2, P3=1 |

---

### `hardening-control.model.ts`

Domain types and constants for the release hardening gate (US1).

| Symbol | Kind | Description |
|--------|------|-------------|
| `HardeningControl` | interface | `{ key, description, requiredEvidence: string[], blocking: boolean }` |
| `HardeningEvidence` | interface | `{ controlKey, passed, notes?, recordedAt }` — evidence record for one control |
| `HardeningGateResult` | interface | `{ passed, failedControls: string[], missingEvidence: string[] }` |
| `ReleaseReadinessResult` | interface | `{ ready, blockers: string[], warnings: string[] }` |
| `HARDENING_CONTROLS` | readonly array | 4 mandatory blocking controls: `lint`, `test-all`, `build`, `schema-compatibility` |
| `MANDATORY_GATE_KEYS` | readonly array | Keys of all blocking controls derived from `HARDENING_CONTROLS` |

---

### `initiative.model.ts`

Domain model types for planning initiatives (US2).

| Symbol | Kind | Description |
|--------|------|-------------|
| `Initiative` | interface | Full aggregate: id, title, category, priority, status, risk, dependsOn, dependantCount, acceptanceCriteria |
| `InitiativeForPrioritization` | interface | Minimal subset for backlog scoring: id, priority, risk, dependsOn, dependantCount |

---

### `risk-assessment.model.ts`

Risk assessment aggregate and helpers (US2).

| Symbol | Kind | Description |
|--------|------|-------------|
| `RiskAssessment` | interface | `{ initiativeId, metrics, level, mitigationNotes? }` — full risk assessment with derived level |
| `deriveRiskLevel` | function | Derives `RiskLevel` from `RiskMetrics.exposureScore` using `RISK_EXPOSURE_BANDS` |
| `buildRiskAssessment` | function | Factory: creates a `RiskAssessment` from metrics, computing the level automatically |

---

### `feature-proposal.model.ts`

Domain model for feature and improvement proposals (US3).

| Symbol | Kind | Description |
|--------|------|-------------|
| `FeatureProposal` | interface | `{ id, title, category, priority, description, compatibility: CompatibilityImpact, entryCriteria: string[], exitCriteria: string[] }` |

---

### `roadmap-slice.model.ts`

Time-bounded planning slice grouping feature proposals (US3).

| Symbol | Kind | Description |
|--------|------|-------------|
| `RoadmapSlice` | interface | `{ label: string, priority: InitiativePriority, proposals: FeatureProposal[] }` |
| `buildRoadmapSlice` | function | Factory: creates a `RoadmapSlice` from label, priority, and proposals list |
