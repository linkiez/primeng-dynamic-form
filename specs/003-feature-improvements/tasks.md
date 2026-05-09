# Tasks: New Features and Improvements for @linkiez/primeng-dynamic-form

**Feature Branch**: `003-feature-improvements`
**Spec**: [spec.md](./spec.md)
**Plan**: [plan.md](./plan.md)
**Created**: 2026-05-09

---

## Phase 1: Setup & Research
- [X] T001 Research best practices for file upload in Angular/PrimeNG
- [X] T002 Research accessibility (WCAG 2.1 AA) for dynamic forms
- [X] T003 Research i18n strategies for Angular libraries
- [X] T004 Research extensibility patterns for event hooks in Angular forms

## Phase 2: Design & Contracts
- [X] T005 Design data model for new field types and event hooks in data-model.md
- [X] T006 Specify contract for file upload, date range, and custom widget fields in contracts/feature-improvements-contract.md
- [X] T007 Draft API for event hooks (beforeSubmit, afterReset) in contracts/feature-improvements-contract.md
- [X] T008 Document i18n and accessibility requirements for all new features in plan.md

## Phase 3: Implementation
- [X] T009 [P] Implement file upload field type in packages/dynamic-form/src/lib/components/field-renderer.component.ts
- [X] T010 [P] Implement date range field type in packages/dynamic-form/src/lib/components/field-renderer.component.ts
- [X] T011 [P] Implement custom widget field type in packages/dynamic-form/src/lib/components/field-renderer.component.ts
- [X] T012 [P] Add beforeSubmit and afterReset event hooks to dynamic-form.component.ts
- [X] T013 Integrate i18n mechanism for all user-facing text in packages/dynamic-form/src/lib/components/
- [X] T014 Integrate accessibility improvements (ARIA, keyboard navigation) in packages/dynamic-form/src/lib/components/
- [X] T015 Update documentation for new field types and hooks in README.md

## Phase 4: Testing & Validation
- [X] T016 [P] Write unit tests for new field types in tests/unit/
- [X] T017 [P] Write integration tests for event hooks in tests/integration/
- [X] T018 [P] Write accessibility and i18n tests in tests/integration/
- [X] T019 Validate accessibility with axe and Lighthouse
- [X] T020 Validate i18n with at least 2 locales

## Phase 5: Release & Polish
- [X] T021 Prepare release notes and migration guide in release-evidence.md
- [X] T022 Run full test suite and lint before release
- [X] T023 Build and publish new version to npm
- [X] T024 Update public API documentation

---

## Dependencies
- T009, T010, T011 depend on T005, T006
- T012 depends on T007
- T013, T014 depend on T008
- T016, T017, T018 depend on T009-T014
- T019, T020 depend on T014, T013
- T021-T024 depend on all previous tasks

## Parallel Execution
- T009, T010, T011 can be implemented in parallel after design
- T016, T017, T018 can be tested in parallel after implementation

## MVP Scope
- T009, T010, T012, T016, T017 (file upload, date range, event hooks, and their tests)

---

All tasks are mapped to specific files and phases for incremental, testable delivery.