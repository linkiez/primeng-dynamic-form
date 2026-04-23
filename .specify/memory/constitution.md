<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
	- Template Principle 1 -> I. Specification-First Delivery
	- Template Principle 2 -> II. Test-First Engineering (NON-NEGOTIABLE)
	- Template Principle 3 -> III. Incremental and Traceable Delivery
	- Template Principle 4 -> IV. Quality and Security Gates
	- Template Principle 5 -> V. Documentation and Context Continuity
- Added sections:
	- Implementation Standards
	- Workflow and Review Expectations
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ⚠ pending: .specify/templates/constitution-template.md (left generic by design)
- Deferred TODOs:
	- None
-->

# PrimeNG Dynamic Form Constitution

## Core Principles

### I. Specification-First Delivery
Every change MUST start with an explicit specification and implementation plan before
coding begins. The minimum required artifact chain is: `spec.md` -> `plan.md` ->
`tasks.md` -> implementation. This rule exists to keep scope auditable and to prevent
silent requirement drift.

### II. Test-First Engineering (NON-NEGOTIABLE)
All behavioral changes MUST follow RED-GREEN-REFACTOR. A failing test MUST be written
before production code, then implementation MUST be the minimum needed to pass.
Unit, integration, and contract coverage MUST be selected according to risk and must
be documented in the plan. This rule protects correctness and supports safe refactors.

### III. Incremental and Traceable Delivery
Work MUST be delivered in independently testable user-story slices, prioritizing the
MVP first (P1 before P2/P3). Branch naming MUST follow configured conventions and each
task MUST map to a specific story or shared foundation step. This rule ensures progress
can be validated and shipped incrementally.

### IV. Quality and Security Gates
No change may be merged unless quality and security gates pass for impacted scope:
lint/static checks, tests, and secret-safety review. Hardcoded credentials are
forbidden. Any compatibility break MUST be explicitly documented with migration guidance.
This rule reduces regressions and security incidents.

### V. Documentation and Context Continuity
Implementation decisions, assumptions, and operational workflows MUST remain discoverable.
When source code under `src/` exists and is changed, its paired `.doc.md` MUST be
updated in the same change set. Reusable decisions and conventions SHOULD be recorded
in project memory to avoid repeated rediscovery.

## Implementation Standards

- Code identifiers and technical documentation in code MUST use en_US.
- User-facing interface text SHOULD use pt_BR unless a feature explicitly requires
	another locale.
- Type-safe development is required: `any` usage MUST be justified and minimized.
- Security-sensitive values MUST be referenced via environment/secret management,
	never hardcoded.

## Workflow and Review Expectations

- Planning gate: Constitution check MUST pass before implementation starts.
- Delivery gate: each user story MUST define independent acceptance scenarios.
- Review gate: pull requests MUST include evidence of tests run and impacted checks.
- Documentation gate: changed behavior MUST be reflected in specs/plans/tasks and,
	when applicable, in paired `.doc.md` files.

## Governance

This constitution supersedes conflicting local conventions for feature delivery.
Amendments require: (1) explicit rationale, (2) update of dependent templates,
and (3) semantic version bump justification.

Versioning policy:
- MAJOR: backward-incompatible governance or principle removals/redefinitions.
- MINOR: new principle/section or materially expanded mandatory guidance.
- PATCH: wording clarifications, typo fixes, or non-semantic refinements.

Compliance review expectations:
- Every plan MUST include a Constitution Check.
- Every tasks file MUST preserve test-first ordering when tests are required.
- Violations MUST be documented in the plan's Complexity Tracking table with rationale.

**Version**: 1.0.0 | **Ratified**: 2026-04-11 | **Last Amended**: 2026-04-11
