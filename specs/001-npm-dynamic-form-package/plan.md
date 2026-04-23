# Implementation Plan: Pacote NPM de Dynamic Form com PrimeNG

**Branch**: `001-create-npm-package` | **Date**: 2026-04-11 | **Spec**: /home/linkiez/Projetos/primeng-dynamic-form/specs/001-npm-dynamic-form-package/spec.md
**Input**: Feature specification from `/specs/001-npm-dynamic-form-package/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Criar uma biblioteca NPM reutilizavel para Angular 20 + PrimeNG 20 que renderiza
formularios declarativos por schema, aplica validacoes sincronas e emite payload
padronizado de submissao. O plano adota escopo v1 enxuto: tipos de campo definidos,
`schemaVersion` obrigatoria `1.0`, contrato publico explicitado e cobertura de testes
unitarios, integracao e contrato para reduzir risco de regressao em consumo externo.

## Technical Context

**Language/Version**: TypeScript 5.x + Angular 20
**Primary Dependencies**: @angular/core, @angular/common, primeng@20, rxjs
**Storage**: N/A (biblioteca sem persistencia propria)
**Testing**: Angular TestBed/Jasmine (unit), integracao em app consumidor, contract tests do contrato publico
**Target Platform**: Aplicacoes web Angular 20 (desktop/mobile web)
**Project Type**: library (NPM package)
**Performance Goals**: renderizacao inicial de formulario simples em <200ms em ambiente local de referencia; validacao sincrona por evento sem travamento perceptivel
**Constraints**: compatibilidade oficial v1 restrita a Angular 20 + PrimeNG 20; sem validacao assincrona; sem segredos hardcoded
**Scale/Scope**: v1 com 1 componente principal, 9 tipos de campo, contrato de schema 1.0 e payload `{ valid, values, errors }`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Spec-first chain is present (`spec.md` -> `plan.md` -> `tasks.md`) before implementation.
- [x] Test strategy is explicit and follows RED-GREEN-REFACTOR for behavioral changes.
- [x] User stories are independently testable and prioritized (MVP-first delivery).
- [x] Quality/security gates are defined (lint, tests, static checks, secret safety).
- [x] Documentation impact is captured (including paired `.doc.md` updates when `src/` changes).

Post-design re-check:
- [x] `research.md` define escolhas e alternativas para stack, contrato e validacao.
- [x] `data-model.md` define entidades, regras e transicoes esperadas.
- [x] `contracts/` define contrato publico de consumo.
- [x] `quickstart.md` define fluxo minimo de uso e validacao.

## Project Structure

### Documentation (this feature)

```text
specs/001-npm-dynamic-form-package/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
```text
packages/
└── dynamic-form/
  ├── src/
  │   ├── lib/
  │   │   ├── components/
  │   │   ├── models/
  │   │   ├── validators/
  │   │   └── mappers/
  │   └── public-api.ts
  ├── package.json
  ├── ng-package.json
  └── README.md

tests/
├── unit/
├── integration/
└── contract/
```

**Structure Decision**: Estrutura de biblioteca dedicada em `packages/dynamic-form`
com testes em `tests/` separados por responsabilidade (unit/integration/contract).
Essa organizacao reduz acoplamento, favorece publicacao NPM e suporta evolucao por
contrato sem depender de aplicacao host no mesmo pacote.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
