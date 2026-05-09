# Module: validators

**Path**: `packages/dynamic-form/src/lib/validators/`
**Package**: `@linkiez/primeng-dynamic-form`

## Responsibility

Schema and field validation logic. Returns typed `DynamicFormConfigError` objects
for configuration problems, and Angular `ValidatorFn[]` for runtime form control binding.
All functions are pure and side-effect free.

## Files

### `schema-version.validator.ts`

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `validateSchemaVersion` | `(schema: FormSchema) => DynamicFormConfigError \| null` | Returns `null` if `schemaVersion === "1.0"`, otherwise returns a typed error with recommendation |

Supported version constant: `"1.0"`.

### `schema-compatibility.validator.ts`

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `validateFieldCompatibility` | `(fields: FieldDefinition[]) => DynamicFormConfigError[]` | Detects unsupported field types, duplicate keys, and missing options on `select`/`radio` fields |

Iterates fields in declaration order; collects all errors (does not short-circuit).

### `validator-registry.ts`

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `resolveValidators` | `(fieldKey: string, rules: ValidationRule[]) => ValidatorResolutionResult` | Maps `ValidationRule[]` to Angular `ValidatorFn[]`; unknown rule names produce a `DynamicFormConfigError` |
| `ValidatorResolutionResult` | interface | `{ validators: ValidatorFn[], errors: DynamicFormConfigError[] }` |

Supported rules and their `params`:

| `name` | `params` | Angular equivalent |
|--------|----------|--------------------|
| `required` | — | `Validators.required` |
| `email` | — | `Validators.email` |
| `minLength` | `{ min: number }` | `Validators.minLength(min)` |
| `maxLength` | `{ max: number }` | `Validators.maxLength(max)` |
| `min` | `{ min: number }` | `Validators.min(min)` |
| `max` | `{ max: number }` | `Validators.max(max)` |
| `pattern` | `{ pattern: string \| RegExp }` | `Validators.pattern(pattern)` |
| `customSync` | `{ fn: ValidatorFn }` | applied directly; custom error key `customSync` |

Custom `message` on a rule wraps the resolved `ValidatorFn` to override the error object key with `customSync:{message}`.

### `control-validator.adapter.ts`

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `buildFormGroup` | `(fields: FieldDefinition[], initialValues?: Record<string, unknown>) => FormGroup` | Creates an Angular `FormGroup` from a list of `FieldDefinition`; each becomes a `FormControl` with validators and initial value |

Priority for initial value: `initialValues[key]` → `field.initialValue` → `null`.
Disabled state comes from `field.disabled ?? false`.

## Key Decisions

- **D4**: v1 supports only synchronous validators to ensure deterministic test behavior and predictable UX (see `research.md`).
- **D8**: `resolveValidators` separates config-time errors from runtime validators; component wires them independently.
- Validators are not cached — recreated on each `buildFormGroup` call (invoked at schema init and on schema input change).

---

### `dependency-chain.validator.ts`

Validates that an initiative dependency graph is acyclic and has no missing references.

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `validateDependencyChain` | `(nodes: DependencyNode[]) => DependencyChainValidationResult` | Returns `{ valid, cycles, missingDependencies }` after DFS traversal |
| `DependencyNode` | interface | `{ id: string, dependsOn: string[] }` |
| `DependencyChainValidationResult` | interface | `{ valid, cycles: string[][], missingDependencies: string[] }` |

### `hardening-gate.validator.ts`

Evaluates all hardening controls against submitted evidence.

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `validateHardeningGate` | `(controls, evidence) => HardeningGateResult` | Checks all blocking controls for missing or failing evidence; non-blocking controls do not affect `passed` |

### `release-readiness.validator.ts`

Derives release readiness from a gate result.

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `validateReleaseReadiness` | `(gateResult: HardeningGateResult) => ReleaseReadinessResult` | Returns `{ ready, blockers, warnings }` — blockers list each failed or missing control key |

---

### `prioritization.validator.ts`

Validates a list of initiatives before backlog prioritization (US2).

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `validatePrioritizationInput` | `(initiatives: InitiativeForPrioritization[]) => PrioritizationValidationResult` | Validates: list not empty, unique IDs, scores in range 1-5, `exposureScore === impact × likelihood`, `dependantCount ≥ 0` |
| `PrioritizationValidationResult` | interface | `{ valid: boolean, errors: string[] }` |

---

### `compatibility-impact.validator.ts`

Validates `CompatibilityImpact` descriptors for feature proposals (US3).

| Symbol | Signature | Description |
|--------|-----------|-------------|
| `validateCompatibilityImpact` | `(impact: CompatibilityImpact) => CompatibilityImpactValidationResult` | Fails if any of `apiBreaking`, `schemaVersionBreaking`, or `peerDependencyBreaking` is `true` but `migrationNotes` is absent; collects all violations |
| `CompatibilityImpactValidationResult` | interface | `{ valid: boolean, errors: string[] }` |
