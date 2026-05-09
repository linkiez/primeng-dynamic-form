# Research: New Features and Improvements for @linkiez/primeng-dynamic-form

**Feature Branch**: `003-feature-improvements`
**Created**: 2026-05-09

## Research Tasks

### 1. File Upload in Angular/PrimeNG
- PrimeNG `FileUpload` offers mature support for validation, queue management, custom upload flow, and multiple lifecycle events.
- The component exposes useful events for integration in a dynamic form pipeline: `onSelect`, `uploadHandler`, `onUpload`, `onError`, `onRemove`, and `onClear`.
- In library context, prefer custom upload mode and delegate transport to host app infrastructure to avoid forcing backend assumptions.
- Security baseline for public API: file type whitelist, size limits, optional antivirus step on backend, and safe error propagation to form-level errors.

### 2. Accessibility (WCAG 2.1 AA) for Dynamic Forms
- PrimeNG guidance confirms WCAG 2.1 AA direction and recommends semantic controls first, ARIA only where needed.
- `FileUpload` uses a hidden native file input for screen-reader compatibility and keyboard behavior.
- Form-level baseline: all fields must have accessible name/label relation, proper error announcement, and full keyboard operation.
- Validation strategy: automated checks (axe + Lighthouse) and manual screen-reader verification for key form flows.

### 3. i18n Strategies for Angular Libraries
- PrimeNG supports static and runtime translation through `providePrimeNG({ translation })` and runtime updates via `setTranslation`.
- For a reusable library, avoid hard dependency on `ngx-translate`; expose translation input/config contract and allow host app to plug any i18n engine.
- Fallback strategy: default locale dictionary bundled by library plus safe fallback-to-key when a translation entry is missing.
- Runtime locale switch should be reflected without re-creating the form schema when possible.

### 4. Event Hooks in Angular Forms
- In Angular 20, prefer modern component APIs and standalone patterns.
- For public extensibility, use explicit form-level outputs for lifecycle points (`beforeSubmit`, `afterReset`) and keep payloads typed.
- Hook execution must be failure-isolated: errors are captured and surfaced as diagnostics, but do not block core submit/reset behavior unless explicitly configured.
- Contract tests must validate hook order, payload shape, and non-blocking behavior under hook failures.

## Decision Log

- File upload will use PrimeNG `FileUpload` in custom upload mode with adapter mapping into form submission payload.
- Accessibility acceptance requires keyboard support, screen-reader label/error semantics, and audit evidence.
- i18n strategy will be host-driven with library-level translation contract and fallback dictionary.
- Event hooks will be implemented as typed outputs with non-blocking error isolation.

## Alternatives Considered

- For i18n: hard-coupling to `ngx-translate` was rejected to preserve library portability.
- For event hooks: blocking hooks were rejected because they increase failure blast radius in host apps.
- For file upload: fully custom uploader was rejected due higher maintenance and accessibility risk.

## Research Outcome

- T001 completed: file upload integration model defined.
- T002 completed: WCAG-oriented accessibility baseline and validation approach defined.
- T003 completed: i18n architecture and fallback strategy defined.
- T004 completed: lifecycle hook extensibility and resilience strategy defined.
