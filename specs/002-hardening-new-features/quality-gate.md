# Quality Gate Runbook

**Package**: `@linkiez/primeng-dynamic-form`
**Feature**: `002-hardening-new-features`

---

## Gate Definition

All gates must be **green** before a phase checkpoint is declared complete.

| Gate | Command | Pass Condition |
|------|---------|---------------|
| Lint | `npm run lint` | Exit code 0, zero errors |
| Tests (all) | `npm run test:all` | All suites pass, zero failures |
| Build | `npm run build` | Exit code 0, `dist/@linkiez/primeng-dynamic-form` emitted |
| Contract | `npm run test -- tests/contract` | All contract specs pass |

---

## Phase Checkpoints

### Phase 2 Checkpoint (Foundational)

Run before any user story begins:

```bash
npm run lint && npm run test:all && npm run build
```

Expected: No compilation errors on new `roadmap.types.ts`, `roadmap.enums.ts`, `priority-score.mapper.ts`, `dependency-chain.validator.ts`, `initiative-readiness.validator.ts`.

---

### Phase 3 Checkpoint (US1 — P1 Hardening)

TDD cycle: tests RED → implementation → tests GREEN.

```bash
# RED phase: these must fail before implementation
npm run test -- tests/contract/us1-hardening-controls.contract.spec.ts
npm run test -- tests/integration/us1-release-readiness.integration.spec.ts
npm run test -- tests/unit/us1-hardening-gate.validator.spec.ts

# GREEN phase: after implementation
npm run lint && npm run test:all && npm run build
```

---

### Phase 4 Checkpoint (US2 — P2 Prioritization)

```bash
# RED phase
npm run test -- tests/contract/us2-prioritization.contract.spec.ts
npm run test -- tests/integration/us2-backlog-prioritization.integration.spec.ts
npm run test -- tests/unit/us2-priority-score.mapper.spec.ts

# GREEN phase
npm run lint && npm run test:all && npm run build
```

---

### Phase 5 Checkpoint (US3 — P3 Feature Scope)

```bash
# RED phase
npm run test -- tests/contract/us3-feature-proposal.contract.spec.ts
npm run test -- tests/integration/us3-roadmap-slice.integration.spec.ts
npm run test -- tests/unit/us3-compatibility-impact.validator.spec.ts

# GREEN phase
npm run lint && npm run test:all && npm run build
```

---

### Phase 6 Checkpoint (Polish)

Final full gate:

```bash
npm run lint && npm run test:all && npm run build
```

Record output in `release-evidence.md`.

---

## Breaking Change Policy

- Changes that modify `schemaVersion` range or remove public API symbols are **breaking**.
- Breaking changes require `migrationNotes` in the initiative intake template.
- Breaking changes MUST NOT land in this feature without explicit sign-off.

---

## Gate Bypass Policy

**There is no gate bypass.** If a gate fails, fix the root cause before advancing the phase.
