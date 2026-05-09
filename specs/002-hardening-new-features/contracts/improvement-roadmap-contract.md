# Contract: Improvement and Hardening Roadmap

## Scope
Contrato operacional para definir, priorizar e promover iniciativas de hardening, melhorias e novas features no projeto `@linkiez/primeng-dynamic-form`.

## Input Contract
Cada iniciativa aceita no roadmap MUST conter:
- `id` unico
- `title`
- `category` (`hardening` | `improvement` | `feature`)
- `priority` (`P1` | `P2` | `P3`)
- `description`
- `dependencies`
- `riskLevel`
- `entryCriteria`
- `exitCriteria`

## Prioritization Contract
- Itens `P1` MUST ser tratados antes de `P2` e `P3`.
- Itens com `riskLevel=high` MUST possuir mitigacoes explicitas antes de `in-progress`.
- Iniciativas sem `exitCriteria` mensuravel MUST permanecer em `draft`.

## Quality Gate Contract
Uma iniciativa so pode transicionar para `validated` quando:
- `npm run lint` passar no escopo impactado.
- `npm run test:all` passar no escopo impactado.
- `npm run build` passar para o pacote.
- Impacto de compatibilidade e migracao (quando aplicavel) estiver documentado.

## Compatibility Contract
- Mudancas aditivas no contrato publico podem manter `schemaVersion` atual.
- Mudancas quebradoras MUST documentar migracao e estrategia de versionamento.

## Documentation Contract
- Mudancas em `src/` MUST atualizar `*.doc.md` pareado no mesmo conjunto de alteracoes.
- `spec.md`, `plan.md` e `tasks.md` MUST permanecer consistentes com escopo vigente.

## Output Contract
Cada iniciativa concluida deve produzir:
- Status final (`validated` ou `blocked` com justificativa)
- Evidencias de gate (lint/test/build)
- Resumo de risco residual
- Referencia aos artefatos/documentos atualizados

## Rejection Rules
Uma iniciativa MUST ser rejeitada para execucao quando:
- Nao possui prioridade definida.
- Nao possui criterios de entrada e saida verificaveis.
- Tem dependencia critica nao resolvida.
- Apresenta risco de seguranca sem mitigacao proposta.

---

## Implementation Notes (feature/002)

### US1 — Release Hardening Gate
- `validateHardeningGate(controls, evidence)` evaluates all blocking controls.
- `validateReleaseReadiness(gateResult)` derives `{ ready, blockers, warnings }`.
- Non-blocking controls contribute to `warnings` only.

### US2 — Backlog Prioritization
- `validatePrioritizationInput(initiatives)` rejects: empty list, duplicate IDs,
	scores outside 1-5, `exposureScore !== impact × likelihood`, negative `dependantCount`.
- `prioritizeBacklog(initiatives)` sorts by priority score DESC (stable), ranks from 1.
- Formula: `(PRIORITY_WEIGHTS[priority] × 4) + exposureScore + dependantCount`.

### US3 — Feature Proposal Lifecycle
- `validateCompatibilityImpact(impact)` requires `migrationNotes` when any breaking flag is set.
- `buildRoadmapSlice(label, priority, proposals)` groups proposals into a time-bounded slice.
- `mapProposalsToSlice(label, priority, proposals)` filters proposals by compatibility
	validity before inclusion.
