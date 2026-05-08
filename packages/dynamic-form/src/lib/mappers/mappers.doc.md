# Module: mappers

**Path**: `packages/dynamic-form/src/lib/mappers/`
**Package**: `@primeng-dynamic-form/core`

## Responsibility

Pure transformation functions: schema parsing, submission payload building,
error message resolution, and configuration defaults merging.
No Angular dependencies except `submission-payload.mapper.ts` (uses `FormGroup`).

## Files

### `schema.mapper.ts`

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `parseAndValidateSchema` | `(raw: unknown) => SchemaParseResult` | Casts `raw` to `FormSchema`, runs version and field compatibility validators, returns `{ schema, errors, warnings }` |
| `getVisibleFields` | `(schema: FormSchema) => FieldDefinition[]` | Filters fields where `hidden !== true` |
| `SchemaParseResult` | interface | `{ schema: FormSchema, errors: DynamicFormConfigError[], warnings: DynamicFormConfigError[] }` |

Throws synchronously if `raw` is not a non-null object (guard only).

### `submission-payload.mapper.ts`

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `buildSubmissionPayload` | `(formGroup: FormGroup) => FormSubmissionPayload` | Builds `{ valid, values, errors }` from a live `FormGroup`; errors are keyed by control name |

`values` includes disabled controls (`getRawValue()`).
`errors` is `Record<string, string[]>` — each entry is a list of Angular `ValidationErrors` keys for that control.

### `error-message.mapper.ts`

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `resolveErrorMessage` | `(errorKey: string, errorValue: unknown) => string` | Returns a human-readable pt_BR message for a given Angular validation error key + value |
| `getFirstErrorMessage` | `(errors: ValidationErrors \| null) => string \| null` | Picks the first error from an Angular `ValidationErrors` map and returns its resolved message |

Supported error keys: `required`, `email`, `minlength`, `maxlength`, `min`, `max`, `pattern`, `customSync`.
Falls back to `"Campo inválido."` for unknown keys.
Uses explicit `as number` type assertions for `requiredLength`/`actualLength` to satisfy lint rules.

### `config-defaults.mapper.ts`

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `resolveConfig` | `(config?: DynamicFormConfiguration) => Required<DynamicFormConfiguration>` | Merges caller config over defaults; always returns a fully-specified config object |

Default values:

| Property | Default |
|----------|---------|
| `showSubmitButton` | `true` |
| `submitLabel` | `'Enviar'` |
| `showResetButton` | `false` |
| `resetLabel` | `'Limpar'` |
| `emitOnChange` | `false` |
| `layoutMode` | `'vertical'` |

## Key Decisions

- **D5**: Submission payload uses `{ valid, values, errors }` contract — consumer never needs to re-validate (see `research.md`).
- `getVisibleFields` is the single point of truth for field visibility; used by `DynamicFormComponent` to build the `FormGroup` and render the template.
- `resolveConfig` creates a new object each call (immutable defaults — no shared reference mutation risk).

---

### `priority-score.mapper.ts`

Deterministic priority scoring for planning initiatives.

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `computePriorityScore` | `(input: PriorityScoreInput) => PriorityScoreResult` | Scores an initiative using `(priorityWeight × 4) + exposureScore + dependantCount` |
| `PriorityScoreInput` | interface | `{ priority, risk: RiskMetrics, dependantCount }` |
| `PriorityScoreResult` | interface | `{ score: number, riskBand: RiskLevel }` |

Formula: `(PRIORITY_WEIGHTS[priority] × 4) + (impact × likelihood) + dependantCount`.

---

### `hardening-evidence.mapper.ts`

Transforms raw evidence lists into indexed structures for gate evaluation.

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `indexEvidence` | `(evidence: HardeningEvidence[]) => EvidenceIndex` | Builds a `Record<controlKey, HardeningEvidence>` for O(1) lookup |
| `findMissingEvidence` | `(controls, index) => HardeningControl[]` | Returns controls with no evidence entry in the index |
| `findFailedControls` | `(controls, index) => HardeningControl[]` | Returns controls whose evidence has `passed === false` |
| `EvidenceIndex` | type | `Readonly<Record<string, HardeningEvidence>>` |

---

### `backlog-prioritization.mapper.ts`

Sorts and ranks a list of initiatives into a prioritized backlog (US2).

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `prioritizeBacklog` | `(initiatives: InitiativeForPrioritization[]) => PrioritizedBacklog` | Scores all entries via `computePriorityScore`, sorts DESC, assigns sequential `rank` |
| `PrioritizedBacklog` | interface | `{ entries: PrioritizedEntry[] }` — sorted entries with rank numbers |

---

### `proposal-slice.mapper.ts`

Maps feature proposals to a filtered roadmap slice (US3).

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `mapProposalsToSlice` | `(label, priority, proposals) => ProposalSliceMappingResult` | Validates each proposal's compatibility; includes only valid ones in the slice; returns rejected list with errors |
| `ProposalSliceMappingResult` | interface | `{ slice: RoadmapSlice, rejected: Array<{ proposal, errors }> }` |
