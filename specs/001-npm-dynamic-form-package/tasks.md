# Tasks: Pacote NPM de Dynamic Form com PrimeNG

**Input**: Design documents from `/specs/001-npm-dynamic-form-package/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are REQUIRED for behavioral changes and must follow RED-GREEN-REFACTOR.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Library source: `packages/dynamic-form/src/`
- Tests: `tests/unit/`, `tests/integration/`, `tests/contract/`
- Feature docs: `specs/001-npm-dynamic-form-package/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize package layout, toolchain, and baseline quality configuration

- [x] T001 Create package folder structure in packages/dynamic-form/src/lib/{components,models,validators,mappers}
- [x] T002 Create base package manifest in packages/dynamic-form/package.json
- [x] T003 [P] Create ng-packagr config in packages/dynamic-form/ng-package.json
- [x] T004 [P] Create library TypeScript config in packages/dynamic-form/tsconfig.lib.json
- [x] T005 [P] Create test TypeScript config in packages/dynamic-form/tsconfig.spec.json
- [x] T006 Create public exports barrel in packages/dynamic-form/src/public-api.ts
- [x] T007 [P] Create eslint config for library and tests in eslint.config.mjs (root, ESLint v9 flat config)
- [x] T008 [P] Create test runner scripts and placeholders in tests/package.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Implement core contract and runtime infrastructure required by all user stories

**CRITICAL**: No user story work should start before this phase is complete

- [x] T009 Define core domain types (FormSchema, FieldDefinition, FieldType, ValidationRule, FormSubmissionPayload) in packages/dynamic-form/src/lib/models/dynamic-form.types.ts
- [x] T010 Implement schema parser and normalization helpers in packages/dynamic-form/src/lib/mappers/schema.mapper.ts
- [x] T011 Implement schema version validation (`schemaVersion = 1.0`) in packages/dynamic-form/src/lib/validators/schema-version.validator.ts
- [x] T012 [P] Implement unsupported field detection and configuration error model in packages/dynamic-form/src/lib/validators/schema-compatibility.validator.ts
- [x] T013 [P] Implement shared error codes/messages map in packages/dynamic-form/src/lib/models/error-codes.ts
- [x] T014 Implement synchronous validator registry (required, minLength, maxLength, min, max, pattern, email, customSync) in packages/dynamic-form/src/lib/validators/validator-registry.ts
- [x] T015 Implement payload builder for `{ valid, values, errors }` in packages/dynamic-form/src/lib/mappers/submission-payload.mapper.ts
- [x] T016 Configure peer dependency enforcement for Angular 20 and PrimeNG 20 in packages/dynamic-form/package.json
- [x] T017 Add base contract test harness for exported API in tests/contract/dynamic-form-package.contract.spec.ts
- [x] T018 Add base integration host app test scaffold in tests/integration/dynamic-form-host.integration.spec.ts

**Checkpoint**: Foundation ready for independent user story implementation

---

## Phase 3: User Story 1 - Publicar pacote reutilizavel (Priority: P1) 🎯 MVP

**Goal**: Deliver installable NPM package with schema-driven form rendering and submission

**Independent Test**: Install package in a clean Angular 20 app, render supported schema, submit form, and receive valid payload

### Tests for User Story 1 (REQUIRED for behavioral changes)

- [x] T019 [P] [US1] Add contract test for exported entry points and component symbols in tests/contract/us1-entrypoints.contract.spec.ts
- [x] T020 [P] [US1] Add integration test for rendering supported field types in tests/integration/us1-rendering.integration.spec.ts
- [x] T021 [US1] Add unit test for payload emission on submit in tests/unit/us1-submit-payload.spec.ts

### Implementation for User Story 1

- [x] T022 [P] [US1] Implement DynamicFormComponent skeleton with standalone setup in packages/dynamic-form/src/lib/components/dynamic-form.component.ts
- [x] T023 [P] [US1] Implement field renderer map for supported PrimeNG components in packages/dynamic-form/src/lib/components/field-renderer.component.ts
- [x] T024 [US1] Implement form creation from schema definitions in packages/dynamic-form/src/lib/components/dynamic-form.component.ts
- [x] T025 [US1] Wire submit output to payload mapper in packages/dynamic-form/src/lib/components/dynamic-form.component.ts
- [x] T026 [US1] Export component and core types in packages/dynamic-form/src/public-api.ts
- [x] T027 [US1] Add package README installation and minimal usage in packages/dynamic-form/README.md

**Checkpoint**: MVP package install/render/submit flow is independently functional

---

## Phase 4: User Story 2 - Configurar validacoes declarativas (Priority: P2)

**Goal**: Enable declarative synchronous validation rules with clear field-level errors

**Independent Test**: Use schema with mixed validation rules and verify error behavior and submit blocking

### Tests for User Story 2 (REQUIRED for behavioral changes)

- [x] T028 [P] [US2] Add unit tests for validator registry behavior per rule in tests/unit/us2-validator-registry.spec.ts
- [x] T029 [P] [US2] Add integration test for invalid-to-valid correction flow in tests/integration/us2-validation-flow.integration.spec.ts
- [x] T030 [US2] Add contract test for validation error payload shape in tests/contract/us2-errors-payload.contract.spec.ts

### Implementation for User Story 2

- [x] T031 [P] [US2] Implement declarative validator-to-form-control binding in packages/dynamic-form/src/lib/validators/control-validator.adapter.ts
- [x] T032 [US2] Implement field error message resolver in packages/dynamic-form/src/lib/mappers/error-message.mapper.ts
- [x] T033 [US2] Integrate validation pipeline into component lifecycle in packages/dynamic-form/src/lib/components/dynamic-form.component.ts
- [x] T034 [US2] Implement submit blocking for invalid form state in packages/dynamic-form/src/lib/components/dynamic-form.component.ts
- [x] T035 [US2] Document supported sync validators and examples in packages/dynamic-form/README.md

**Checkpoint**: Declarative validation is independently functional and testable

---

## Phase 5: User Story 3 - Personalizar apresentacao e extensibilidade (Priority: P3)

**Goal**: Provide configurable layout, labels, hints, and optional change events without changing package internals

**Independent Test**: Configure layout and behavior options in schema/config and verify visual/behavioral customization

### Tests for User Story 3 (REQUIRED for behavioral changes)

- [x] T036 [P] [US3] Add unit tests for layout/config defaults in tests/unit/us3-config-defaults.spec.ts
- [x] T037 [P] [US3] Add integration test for configurable labels/layout in tests/integration/us3-layout-customization.integration.spec.ts
- [x] T038 [US3] Add integration test for `formChange` emission when enabled in tests/integration/us3-change-event.integration.spec.ts

### Implementation for User Story 3

- [x] T039 [P] [US3] Implement DynamicFormConfiguration defaults resolver in packages/dynamic-form/src/lib/mappers/config-defaults.mapper.ts
- [x] T040 [US3] Apply layout mode and UI hints in renderer/component in packages/dynamic-form/src/lib/components/field-renderer.component.ts
- [x] T041 [US3] Implement optional `formChange` output behavior in packages/dynamic-form/src/lib/components/dynamic-form.component.ts
- [x] T042 [US3] Add customization examples to package docs in packages/dynamic-form/README.md

**Checkpoint**: Customization capabilities are independently functional and testable

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Consolidate quality, docs, packaging, and release readiness

- [x] T043 [P] Add semver and migration notes policy section in packages/dynamic-form/README.md
- [x] T044 [P] Add feature-level implementation notes in specs/001-npm-dynamic-form-package/research.md
- [x] T045 Run lint/static checks and fix findings in packages/dynamic-form/.eslintrc.json
- [x] T046 Run full test suites and stabilize flaky tests in tests/
- [x] T047 Validate quickstart end-to-end and adjust docs in specs/001-npm-dynamic-form-package/quickstart.md
- [x] T048 Package dry-run and publish checklist in packages/dynamic-form/README.md

---

## Dependencies & Execution Order

### Phase Dependencies

- Setup (Phase 1): starts immediately
- Foundational (Phase 2): depends on Setup completion and blocks all user stories
- User Stories (Phases 3-5): depend on Foundational completion
- Polish (Phase 6): depends on completion of all target user stories

### User Story Dependencies

- US1 (P1): starts after Foundational; defines MVP and base package flow
- US2 (P2): starts after Foundational; depends logically on US1 component flow for integration
- US3 (P3): starts after Foundational; can run in parallel with US2 after US1 skeleton is stable

### Within Each User Story

- Write tests first and confirm they fail
- Implement models/mappers/validators before component wiring
- Integrate and then update docs for the story

### Parallel Opportunities

- Setup tasks marked [P]: T003, T004, T005, T007, T008
- Foundational tasks marked [P]: T012, T013
- US1 parallel tasks: T019, T020, T022, T023
- US2 parallel tasks: T028, T029, T031
- US3 parallel tasks: T036, T037, T039

---

## Parallel Example: User Story 1

```bash
# Parallel test authoring for US1
Task: "T019 [US1] contract entrypoints"
Task: "T020 [US1] integration rendering"

# Parallel implementation for US1 base components
Task: "T022 [US1] dynamic-form component skeleton"
Task: "T023 [US1] field renderer map"
```

---

## Implementation Strategy

### MVP First (US1)

1. Complete Phase 1 and Phase 2
2. Deliver Phase 3 (US1) end-to-end
3. Validate install/render/submit in clean consumer app
4. Demo/publish internal prerelease

### Incremental Delivery

1. Add US2 validation depth after MVP is stable
2. Add US3 customization and extensibility
3. Finalize polish and release checklist

### Team Parallel Strategy

1. Engineer A: Setup + Foundational core types/validators
2. Engineer B: US1 rendering and packaging
3. Engineer C: US2 validation and US3 customization after foundation checkpoint

---

## Notes

- All tasks follow required checklist format.
- Story labels are used only in story phases.
- Paths are explicit for direct execution by implementation agents.
- TDD sequencing is embedded in each user story phase.
