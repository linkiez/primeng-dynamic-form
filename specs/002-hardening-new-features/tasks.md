# Tasks: Melhorias, Hardening e Novas Features

**Input**: Design documents from `/specs/002-hardening-new-features/`
**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are REQUIRED for behavioral changes and must follow RED-GREEN-REFACTOR.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare planning artifacts and baseline quality workflow for execution.

- [X] T001 Create execution backlog skeleton in specs/002-hardening-new-features/backlog.md
- [X] T002 Create initiative intake template in specs/002-hardening-new-features/templates/initiative-template.md
- [X] T003 [P] Add quality-gate runbook for contributors in specs/002-hardening-new-features/quality-gate.md
- [X] T004 [P] Create release evidence log file in specs/002-hardening-new-features/release-evidence.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared domain artifacts required by all user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T005 Define shared roadmap domain types in packages/dynamic-form/src/lib/models/roadmap.types.ts
- [X] T006 [P] Define initiative status and risk enums in packages/dynamic-form/src/lib/models/roadmap.enums.ts
- [X] T007 [P] Create priority scoring utility mapper in packages/dynamic-form/src/lib/mappers/priority-score.mapper.ts
- [X] T008 [P] Create dependency-chain validator in packages/dynamic-form/src/lib/validators/dependency-chain.validator.ts
- [X] T009 Create readiness orchestration validator in packages/dynamic-form/src/lib/validators/initiative-readiness.validator.ts
- [X] T010 Register shared exports in packages/dynamic-form/src/public-api.ts
- [X] T011 Update shared model documentation in packages/dynamic-form/src/lib/models/models.doc.md
- [X] T012 Update shared mapper/validator docs in packages/dynamic-form/src/lib/mappers/mappers.doc.md and packages/dynamic-form/src/lib/validators/validators.doc.md

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Reforcar confiabilidade do pacote (Priority: P1) 🎯 MVP

**Goal**: Implement hardening controls with deterministic release readiness checks.

**Independent Test**: Execute hardening tests and verify readiness output includes mandatory quality/security/compatibility checks.

### Tests for User Story 1 (REQUIRED) ⚠️

- [X] T013 [P] [US1] Add contract test for hardening control contract in tests/contract/us1-hardening-controls.contract.spec.ts
- [X] T014 [P] [US1] Add integration test for release readiness journey in tests/integration/us1-release-readiness.integration.spec.ts
- [X] T015 [P] [US1] Add unit test for hardening gate validator in tests/unit/us1-hardening-gate.validator.spec.ts

### Implementation for User Story 1

- [X] T016 [US1] Implement hardening control model in packages/dynamic-form/src/lib/models/hardening-control.model.ts
- [X] T017 [US1] Implement hardening evidence mapper in packages/dynamic-form/src/lib/mappers/hardening-evidence.mapper.ts
- [X] T018 [US1] Implement hardening gate validator in packages/dynamic-form/src/lib/validators/hardening-gate.validator.ts
- [X] T019 [US1] Implement release readiness validator in packages/dynamic-form/src/lib/validators/release-readiness.validator.ts
- [X] T020 [US1] Export hardening APIs in packages/dynamic-form/src/public-api.ts
- [X] T021 [US1] Update hardening documentation in packages/dynamic-form/src/lib/validators/validators.doc.md and packages/dynamic-form/src/lib/models/models.doc.md

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Priorizar backlog de melhorias (Priority: P2)

**Goal**: Implement deterministic prioritization pipeline based on impact, risk and dependencies.

**Independent Test**: Validate that backlog items are sorted consistently by the configured priority strategy and dependency constraints.

### Tests for User Story 2 (REQUIRED) ⚠️

- [X] T022 [P] [US2] Add contract test for prioritization output contract in tests/contract/us2-prioritization.contract.spec.ts
- [X] T023 [P] [US2] Add integration test for prioritized backlog generation in tests/integration/us2-backlog-prioritization.integration.spec.ts
- [X] T024 [P] [US2] Add unit test for priority score mapper in tests/unit/us2-priority-score.mapper.spec.ts

### Implementation for User Story 2

- [X] T025 [US2] Implement initiative aggregate model in packages/dynamic-form/src/lib/models/initiative.model.ts
- [X] T026 [US2] Implement risk assessment model in packages/dynamic-form/src/lib/models/risk-assessment.model.ts
- [X] T027 [US2] Implement backlog prioritization mapper in packages/dynamic-form/src/lib/mappers/backlog-prioritization.mapper.ts
- [X] T028 [US2] Implement prioritization validator in packages/dynamic-form/src/lib/validators/prioritization.validator.ts
- [X] T029 [US2] Export prioritization APIs in packages/dynamic-form/src/public-api.ts
- [X] T030 [US2] Update prioritization documentation in packages/dynamic-form/src/lib/mappers/mappers.doc.md and packages/dynamic-form/src/lib/models/models.doc.md

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Definir escopo de novas features (Priority: P3)

**Goal**: Implement feature proposal and compatibility impact planning workflow.

**Independent Test**: Validate that feature proposals include acceptance criteria and compatibility impact with migration requirement when breaking.

### Tests for User Story 3 (REQUIRED) ⚠️

- [X] T031 [P] [US3] Add contract test for feature proposal contract in tests/contract/us3-feature-proposal.contract.spec.ts
- [X] T032 [P] [US3] Add integration test for roadmap slice planning flow in tests/integration/us3-roadmap-slice.integration.spec.ts
- [X] T033 [P] [US3] Add unit test for compatibility impact validator in tests/unit/us3-compatibility-impact.validator.spec.ts

### Implementation for User Story 3

- [X] T034 [US3] Implement feature proposal model in packages/dynamic-form/src/lib/models/feature-proposal.model.ts
- [X] T035 [US3] Implement roadmap slice model in packages/dynamic-form/src/lib/models/roadmap-slice.model.ts
- [X] T036 [US3] Implement compatibility impact validator in packages/dynamic-form/src/lib/validators/compatibility-impact.validator.ts
- [X] T037 [US3] Implement proposal-to-slice mapper in packages/dynamic-form/src/lib/mappers/proposal-slice.mapper.ts
- [X] T038 [US3] Export feature planning APIs in packages/dynamic-form/src/public-api.ts
- [X] T039 [US3] Update feature planning docs in packages/dynamic-form/src/lib/models/models.doc.md and packages/dynamic-form/src/lib/validators/validators.doc.md

**Checkpoint**: All user stories are independently functional and testable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize cross-story quality, docs and validation evidence.

- [X] T040 [P] Update feature docs index in specs/002-hardening-new-features/README.md
- [X] T041 [P] Update planning contract notes in specs/002-hardening-new-features/contracts/improvement-roadmap-contract.md
- [X] T042 Run full quality gates and record outputs in specs/002-hardening-new-features/release-evidence.md
- [X] T043 [P] Run quickstart validation and capture notes in specs/002-hardening-new-features/quickstart-validation.md
- [X] T044 Perform security hardening review checklist in specs/002-hardening-new-features/security-review.md
- [X] T045 [P] Verify paired documentation updates for all changed src files in packages/dynamic-form/src/lib/components/components.doc.md, packages/dynamic-form/src/lib/mappers/mappers.doc.md, packages/dynamic-form/src/lib/models/models.doc.md and packages/dynamic-form/src/lib/validators/validators.doc.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies, starts immediately.
- **Phase 2 (Foundational)**: Depends on Phase 1 and blocks all user stories.
- **Phase 3+ (User Stories)**: Depend on Phase 2 completion; execute in priority order for MVP (US1 -> US2 -> US3) or in parallel if staffed.
- **Phase 6 (Polish)**: Depends on completion of selected user stories.

### User Story Dependencies

- **US1 (P1)**: Starts after Foundational; no dependency on US2/US3.
- **US2 (P2)**: Starts after Foundational; independent but can reuse US1 artifacts.
- **US3 (P3)**: Starts after Foundational; independent but can reuse US1/US2 artifacts.

### Within Each User Story

- Tests MUST be authored first and fail before implementation.
- Models before mappers/validators.
- Mappers/validators before export wiring.
- Export wiring before docs update.

### Parallel Opportunities

- Setup tasks marked [P] can run together.
- Foundational tasks T006, T007, T008 can run together after T005.
- In each user story, test tasks marked [P] can run together.
- Model tasks in US3 (T034, T035) can run in parallel.
- Polish tasks T040, T041, T043, T045 can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Tests in parallel:
T013 tests/contract/us1-hardening-controls.contract.spec.ts
T014 tests/integration/us1-release-readiness.integration.spec.ts
T015 tests/unit/us1-hardening-gate.validator.spec.ts

# After model is ready, implementation split:
T017 packages/dynamic-form/src/lib/mappers/hardening-evidence.mapper.ts
T018 packages/dynamic-form/src/lib/validators/hardening-gate.validator.ts
```

---

## Implementation Strategy

### MVP First (US1 only)

1. Complete Phase 1 and Phase 2.
2. Deliver Phase 3 (US1) end-to-end.
3. Validate US1 independently with T013-T015 and release evidence.
4. Demo/review before starting US2.

### Incremental Delivery

1. Foundation baseline complete.
2. Deliver US1 (hardening) -> validate -> stabilize.
3. Deliver US2 (prioritization) -> validate -> stabilize.
4. Deliver US3 (feature scope) -> validate -> stabilize.
5. Run polish and finalize evidence.

### Parallel Team Strategy

1. Team aligns on Phase 1 and Phase 2.
2. After foundation: one developer per story stream (US1/US2/US3).
3. Shared reviewer validates contract consistency and documentation updates.

---

## Notes

- [P] tasks indicate no blocking dependency with concurrent tasks in the same phase.
- [USx] labels provide traceability from tasks to spec stories.
- Keep commits small and aligned to task IDs.
- Re-run quality gates after each completed story.
- Do not start implementation tasks before corresponding failing tests exist.
