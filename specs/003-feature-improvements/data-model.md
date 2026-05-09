# Data Model: New Features and Improvements for @linkiez/primeng-dynamic-form

**Feature Branch**: `003-feature-improvements`
**Created**: 2026-05-09

## Entities

### BaseFieldDefinition
- key: string
- type: 'text' | 'number' | 'date' | 'date-range' | 'file' | 'custom'
- label: string
- placeholder?: string
- helpText?: string
- defaultValue?: unknown
- validators?: Array<{ name: string; args?: Record<string, unknown> }>
- i18nKey?: string
- ariaDescriptionId?: string
- hidden?: boolean

### FileFieldDefinition (extends BaseFieldDefinition)
- type: 'file'
- accept?: string
- multiple?: boolean
- maxFileSizeBytes?: number
- maxFiles?: number
- uploadMode: 'manual' | 'instant'
- payloadStrategy: 'metadata-only' | 'inline-base64' | 'opaque-reference'

### DateRangeFieldDefinition (extends BaseFieldDefinition)
- type: 'date-range'
- minDate?: string (ISO-8601)
- maxDate?: string (ISO-8601)
- includeTime?: boolean
- outputFormat: 'iso' | 'unix-ms'

### CustomFieldDefinition (extends BaseFieldDefinition)
- type: 'custom'
- widgetType: string
- widgetConfig?: Record<string, unknown>
- fallbackTemplate?: string

### HookEventName
- 'beforeSubmit' | 'afterReset'

### FormHookContext
- formId: string
- timestamp: string (ISO-8601)
- locale: string
- values: Record<string, unknown>
- visibleFieldKeys: string[]

### HookExecutionResult
- status: 'ok' | 'error'
- errorMessage?: string

### TranslationCatalog
- locale: string
- entries: Record<string, string>
- fallbackLocale?: string

## Relationships
- A form schema contains multiple `BaseFieldDefinition` entries and concrete specializations (`file`, `date-range`, `custom`).
- Hook events are dispatched at form-level lifecycle boundaries with `FormHookContext`.
- `TranslationCatalog` resolves labels, placeholders, help text, and validation errors.

## State Transitions
- Field definitions can be added/removed dynamically before form initialization.
- Locale can switch at runtime; resolved UI text is recalculated from catalog + fallback.
- Hook handlers run per lifecycle event, produce `HookExecutionResult`, and never block core submit/reset flow.

## Validation Rules

- `file.accept` MUST use valid MIME list or extensions.
- `file.maxFileSizeBytes` and `file.maxFiles` MUST be positive numbers.
- `date-range.minDate` MUST be less than or equal to `date-range.maxDate` when both are provided.
- `custom.widgetType` MUST map to a registered renderer.
