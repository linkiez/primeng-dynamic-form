# Implementation Plan: Melhorias, Hardening e Novas Features

**Branch**: `002-create-feature-branch` | **Date**: 2026-05-08 | **Spec**: /home/linkiez/Projetos/primeng-dynamic-form/specs/002-hardening-new-features/spec.md
**Input**: Feature specification from `/specs/002-hardening-new-features/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Estabelecer um plano executavel para evolucao do `@linkiez/primeng-dynamic-form` em tres frentes: hardening de release (qualidade, seguranca e compatibilidade), melhorias de DX/manutenibilidade, e novas features incrementais na API de schema. A abordagem prioriza MVP de confiabilidade (P1), depois backlog de melhorias (P2), e por fim adicao de features com criterio de aceite e impactos documentados (P3).

## Technical Context

**Language/Version**: TypeScript 5.8.x + Angular 20
**Primary Dependencies**: @angular/core@20, @angular/forms@20, primeng@20, rxjs@7.8, ng-packagr@20
**Storage**: N/A (biblioteca sem persistencia propria)
**Testing**: Jest 29 (unit/integration/contract) + Angular TestBed
**Target Platform**: Aplicacoes web Angular consumidoras do pacote NPM
**Project Type**: library (NPM package) com demo app de apoio
**Performance Goals**: manter renderizacao e validacao sem regressao perceptivel no fluxo atual; overhead adicional das novas features <= limite operacional do baseline local
**Constraints**: manter compatibilidade publica com schemaVersion `1.0` enquanto novas capacidades forem aditivas; sem segredos hardcoded; aderencia a lint e suite de testes
**Scale/Scope**: planejamento de 1 ciclo com entregas em fatias P1/P2/P3, cobrindo contracts, mappers, validators e componentes da biblioteca

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Spec-first chain is present (`spec.md` -> `plan.md` -> `tasks.md`) before implementation.
- [x] Test strategy is explicit and follows RED-GREEN-REFACTOR for behavioral changes.
- [x] User stories are independently testable and prioritized (MVP-first delivery).
- [x] Quality/security gates are defined (lint, tests, static checks, secret safety).
- [x] Documentation impact is captured (including paired `.doc.md` updates when `src/` changes).

Post-design re-check:
- [x] `research.md` resolve escolhas de hardening, priorizacao e features incrementais.
- [x] `data-model.md` define entidades de planejamento e estados de ciclo de vida.
- [x] `contracts/` define contrato operacional de entrada/saida para iniciativas do roadmap.
- [x] `quickstart.md` descreve fluxo pratico para aplicar o plano no repositorio.

## Project Structure

### Documentation (this feature)

```text
specs/002-hardening-new-features/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── improvement-roadmap-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
packages/
└── dynamic-form/
    ├── src/
    │   ├── lib/
    │   │   ├── components/
    │   │   ├── mappers/
    │   │   ├── models/
    │   │   └── validators/
    │   └── public-api.ts
    ├── package.json
    └── ng-package.json

tests/
├── unit/
├── integration/
└── contract/

.github/
└── workflows/
```

**Structure Decision**: O plano atuara sobre a biblioteca em `packages/dynamic-form/src/lib` e sua matriz de testes em `tests/`, com suporte de automacao em `.github/workflows`. Essa separacao preserva contrato publico do pacote, facilita validacao incremental e reduz risco de regressao em consumidores externos.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
