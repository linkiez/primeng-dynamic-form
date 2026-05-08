# Initiative Intake Template

**Usage**: Copy this file to `backlog/<id>-<slug>.md` and fill in all fields before starting work.

---

## Identity

| Field | Value |
|-------|-------|
| **ID** | I-XXX |
| **Title** | _Short imperative title_ |
| **Category** | `hardening` \| `improvement` \| `feature` |
| **Priority** | P1 \| P2 \| P3 |
| **Risk Level** | `low` \| `medium` \| `high` \| `critical` |

---

## Entry Criteria

_List all conditions that MUST be true before this initiative can start._

- [ ] Phase 2 (Foundational) is complete
- [ ] Contract in `contracts/improvement-roadmap-contract.md` reviewed
- [ ] Dependency on prior initiative(s): _list IDs or "none"_

---

## Problem Statement

_One paragraph: what is the problem, who is affected, and what is the measurable impact if unresolved?_

---

## Acceptance Criteria

_Testable criteria. Numbered list. Each criterion maps to at least one test._

1.
2.
3.

---

## Compatibility Impact

| Aspect | Breaking? | Notes |
|--------|-----------|-------|
| `schemaVersion` | No / Yes | |
| Public API shape | No / Yes | |
| Peer dependency range | No / Yes | |

> **If any row is "Yes"**: `migrationNotes` field below is REQUIRED.

## Migration Notes

_Required only when compatibility impact is breaking._

---

## Exit Criteria

_Conditions that MUST be true before this initiative is marked `done`._

- [ ] All acceptance criteria validated by tests (unit + integration + contract where applicable)
- [ ] `npm run lint && npm run test:all && npm run build` passes
- [ ] `*.doc.md` updated for every `src/` file modified
- [ ] Evidence recorded in `release-evidence.md`

---

## Status History

| Timestamp | From | To | Notes |
|-----------|------|----|-------|
| — | — | draft | Created |
