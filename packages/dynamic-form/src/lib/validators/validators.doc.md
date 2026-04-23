# Module: validators

**Path**: `packages/dynamic-form/src/lib/validators/`
**Package**: `@primeng-dynamic-form/core`

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
