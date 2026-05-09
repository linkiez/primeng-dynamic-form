# Contract: Feature Improvements for @linkiez/primeng-dynamic-form

**Feature Branch**: `003-feature-improvements`
**Created**: 2026-05-09

## FieldType Contract
- Library MUST support new field types: file, date-range, custom widget
- Each field type MUST support validation, i18n, and accessibility
- File upload MUST integrate with form payload and support file type/size limits

### File Field API Contract
- Input schema keys: `accept`, `multiple`, `maxFileSizeBytes`, `maxFiles`, `uploadMode`, `payloadStrategy`.
- On select/upload error, component MUST expose standardized validation errors in existing error pipeline.
- Submission payload MUST keep deterministic shape per selected `payloadStrategy`.

### Date-Range Field API Contract
- Input schema keys: `minDate`, `maxDate`, `includeTime`, `outputFormat`.
- Output value MUST be stable and documented for both empty and partial ranges.

### Custom Field API Contract
- Input schema keys: `widgetType`, `widgetConfig`, `fallbackTemplate`.
- Unknown `widgetType` MUST fail gracefully with actionable config error.

## EventHook Contract
- Form MUST expose beforeSubmit and afterReset hooks
- Hooks MUST be non-blocking (errors logged, do not prevent submission)
- Hooks MUST be documented and covered by integration tests

### Hook Event Semantics
- `beforeSubmit` receives final normalized values before payload mapping.
- `afterReset` runs after controls return to default/initial values.
- Hook context MUST include: `formId`, `timestamp`, `locale`, and current values.
- Hook execution errors MUST emit diagnostics without throwing uncaught errors to host app.

## i18n Contract
- All user-facing text MUST be translatable
- Library MUST provide fallback for missing translations
- At least 2 locales MUST be supported out of the box

### i18n Resolution Rules
- Resolution order: current locale key -> fallback locale key -> original text/key.
- Locale updates MUST reflect in rendered labels and validation messages without remounting the component.
- Host app MAY provide PrimeNG runtime translations through `setTranslation` and library text map via input/config.

## Accessibility Contract
- All controls MUST meet WCAG 2.1 AA
- Accessibility MUST be validated with automated tools (axe, Lighthouse)
- Keyboard navigation and ARIA attributes MUST be present

### Accessibility Acceptance Rules
- Every control MUST expose accessible name (label or ARIA association).
- Validation errors MUST be announced and associated with affected control.
- Interactive controls MUST be reachable via keyboard in logical order.
- File upload MUST preserve screen-reader compatibility via native file input semantics.

## Documentation & Testing
- All new features MUST be documented in README and API docs
- Tests MUST cover new field types, hooks, and i18n/accessibility

### Minimum Test Matrix
- Contract tests: schema compatibility and payload shape for `file`, `date-range`, and `custom`.
- Integration tests: hook sequencing, hook failures, runtime locale updates.
- Accessibility checks: automated audit baseline for main interaction flows.
