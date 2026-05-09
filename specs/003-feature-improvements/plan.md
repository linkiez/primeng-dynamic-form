# Implementation Plan: New Features and Improvements for @linkiez/primeng-dynamic-form

**Feature Branch**: `003-feature-improvements`
**Spec**: [spec.md](./spec.md)
**Created**: 2026-05-09
**Status**: Draft

## Technical Context

- The project is an Angular 20 + PrimeNG 20 library for dynamic forms.
- Uses ng-packagr for build, Jest for tests, ESLint for linting.
- All new features must be compatible with existing API and not break current consumers.
- Accessibility and i18n are required for all new/updated controls.
- Event hooks must be implemented in a way that does not block or break form submission.
- File upload and custom widgets may require additional dependencies or security review.
- Documentation and tests are mandatory for all new features.

## Constitution Check

- [x] User stories are independent, testable, and prioritized.
- [x] TDD enforced: failing tests before implementation.
- [x] Accessibility/i18n are non-negotiable for public API.
- [x] Documentation required for all new features.
- [x] Security/privacy for file uploads/custom widgets considered.

## Gates

- Lint, test, and build must pass before merge.
- Accessibility and i18n audits required for new controls.
- All event hooks must be covered by integration tests.
- No critical issues in accessibility/i18n allowed at release.

## i18n and Accessibility Requirements

### i18n Requirements

- Library MUST keep i18n host-driven and framework-agnostic at API boundary.
- Library MUST provide default translation catalog and fallback resolution.
- PrimeNG runtime translation support MUST remain compatible through host-level `setTranslation`.
- Missing translations MUST degrade gracefully and never break rendering.

### Accessibility Requirements

- All new fields MUST expose explicit accessible naming and error associations.
- Keyboard-only navigation MUST support complete form completion and submission.
- File upload interactions MUST preserve native input semantics for assistive tech.
- Accessibility evidence MUST include automated checks and manual verification notes for core flows.

## Phase 0: Research

- Research best practices for file upload in Angular/PrimeNG.
- Review accessibility (WCAG 2.1 AA) for dynamic forms.
- Investigate i18n strategies for Angular libraries.
- Explore extensibility patterns for event hooks in Angular forms.

## Phase 1: Design & Contracts

- Define data model for new field types and event hooks.
- Specify contract for file upload, date range, and custom widget fields.
- Draft API for event hooks (beforeSubmit, afterReset).
- Document i18n and accessibility requirements for all new features.

### Design Deliverables

- Typed data model for specialized field definitions (`file`, `date-range`, `custom`).
- Hook contract and lifecycle semantics (`beforeSubmit`, `afterReset`).
- i18n resolution contract with fallback behavior.
- Accessibility acceptance checklist attached to feature validation.

## Phase 2: Implementation

- Implement new field types with tests and docs.
- Add event hooks to form component.
- Integrate i18n and accessibility improvements.
- Update documentation and public API references.

## Phase 3: Validation & Release

- Run full test suite and accessibility/i18n audits.
- Validate event hooks with integration tests.
- Prepare release notes and migration guide if needed.
- Release new version and update npm package.

## Dependencies & Risks

- File upload may require additional security/privacy review.
- Custom widgets may introduce third-party dependencies.
- i18n and accessibility require ongoing validation.
- Event hooks must not introduce breaking changes.

## Next Steps

1. Complete research and clarify any open questions.
2. Design data model and contracts for new features.
3. Implement features incrementally with TDD.
4. Validate, document, and release.
