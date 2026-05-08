# Feature 002: Hardening, Improvements and New Features

**Branch**: `002-create-feature-branch`
**Status**: implementation complete — pending final gate recording

## Overview

This feature establishes the planning infrastructure for `@primeng-dynamic-form/core`
release hardening, backlog prioritization, and feature lifecycle governance across three
independently deliverable user stories.

## User Stories

| ID | Story | Gate |
|----|-------|------|
| US1 | Release Hardening Gate | lint + test-all + build + schema-compatibility |
| US2 | Backlog Prioritization | deterministic scoring + validation |
| US3 | Feature Proposal Lifecycle | compatibility impact + roadmap slice |

## Artifacts

| Artifact | Purpose |
|----------|---------|
| [spec.md](spec.md) | Feature requirements and acceptance criteria |
| [plan.md](plan.md) | Technical plan, tech stack, file structure |
| [tasks.md](tasks.md) | All 45 implementation tasks |
| [data-model.md](data-model.md) | Domain entities and lifecycle states |
| [research.md](research.md) | Technical decisions and constraints |
| [quickstart.md](quickstart.md) | Step-by-step execution guide |
| [backlog.md](backlog.md) | Execution backlog (I-001, I-002, I-003) |
| [quality-gate.md](quality-gate.md) | Gate runbook with per-phase checkpoint commands |
| [release-evidence.md](release-evidence.md) | Captured gate output per phase |
| [contracts/improvement-roadmap-contract.md](contracts/improvement-roadmap-contract.md) | Input/output contract for roadmap initiatives |

## New Public API Symbols

### US1 — Release Hardening Gate

| Symbol | Module |
|--------|--------|
| `HardeningControl` | `hardening-control.model.ts` |
| `HardeningEvidence` | `hardening-control.model.ts` |
| `HardeningGateResult` | `hardening-control.model.ts` |
| `ReleaseReadinessResult` | `hardening-control.model.ts` |
| `HARDENING_CONTROLS` | `hardening-control.model.ts` |
| `MANDATORY_GATE_KEYS` | `hardening-control.model.ts` |
| `validateHardeningGate` | `hardening-gate.validator.ts` |
| `validateReleaseReadiness` | `release-readiness.validator.ts` |

### US2 — Backlog Prioritization

| Symbol | Module |
|--------|--------|
| `InitiativeForPrioritization` | `initiative.model.ts` |
| `PrioritizedBacklog` | `backlog-prioritization.mapper.ts` |
| `prioritizeBacklog` | `backlog-prioritization.mapper.ts` |
| `validatePrioritizationInput` | `prioritization.validator.ts` |
| `computePriorityScore` | `priority-score.mapper.ts` |

### US3 — Feature Proposal Lifecycle

| Symbol | Module |
|--------|--------|
| `FeatureProposal` | `feature-proposal.model.ts` |
| `RoadmapSlice` | `roadmap-slice.model.ts` |
| `buildRoadmapSlice` | `roadmap-slice.model.ts` |
| `validateCompatibilityImpact` | `compatibility-impact.validator.ts` |
| `mapProposalsToSlice` | `proposal-slice.mapper.ts` |

## Quality Gate Summary

All gates must pass before this feature is marked `validated`:

```sh
npm run lint
npm run test:all
npm run build
```

See [quality-gate.md](quality-gate.md) for the full runbook.
See [release-evidence.md](release-evidence.md) for recorded outputs.
