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
