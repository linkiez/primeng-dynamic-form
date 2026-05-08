# Research: Melhorias, Hardening e Novas Features

## Decision 1: Hardening como trilha P1 obrigatoria
- Decision: Tratar hardening de release como trilha P1 obrigatoria antes de expandir features.
- Rationale: Reduz risco de regressao e protege consumidores externos do pacote durante evolucao.
- Alternatives considered:
  - Evoluir features antes de hardening: rejeitado por aumentar probabilidade de quebra em producao.
  - Hardening parcial por modulo: rejeitado por nao cobrir risco sistemico de release.

## Decision 2: Gate de qualidade unico para release
- Decision: Definir gate minimo com lint + test:all + build da lib + validacao de contrato publico.
- Rationale: Um gate unico e objetivo reduz ambiguidade operacional e padroniza criterio de pronto.
- Alternatives considered:
  - Gate apenas com testes unitarios: rejeitado por nao validar integracao e contrato.
  - Gate orientado apenas por checklist manual: rejeitado por baixa confiabilidade e auditabilidade.

## Decision 3: Priorizacao por impacto, risco e dependencia
- Decision: Classificar iniciativas em P1/P2/P3 usando matriz de impacto x risco x dependencia.
- Rationale: Melhora previsibilidade e permite entrega incremental mantendo foco no MVP.
- Alternatives considered:
  - Priorizacao ad-hoc por urgencia percebida: rejeitado por volatilidade de escopo.
  - Priorizacao apenas por esforco: rejeitado por ignorar risco e valor ao usuario.

## Decision 4: Features novas devem ser aditivas no schema v1.0
- Decision: Limitar novas features da rodada a mudancas aditivas, sem quebra de schemaVersion `1.0`.
- Rationale: Preserva compatibilidade com consumidores existentes e reduz custo de migracao.
- Alternatives considered:
  - Introduzir schemaVersion 2.0 nesta rodada: rejeitado por aumentar custo de rollout e migracao.
  - Permitir mudancas quebradoras pontuais: rejeitado por risco alto de regressao de integracao.

## Decision 5: Contrato de planejamento explicito
- Decision: Formalizar contrato de iniciativa (entrada, estado e criterios de saida) em `contracts/`.
- Rationale: Cria linguagem unica entre manutencao, QA e revisao tecnica para governanca do backlog.
- Alternatives considered:
  - Registrar criterios apenas em tasks: rejeitado por perder rastreabilidade entre ciclos.
  - Sem contrato formal: rejeitado por aumentar ambiguidade de aceite.

## Decision 6: Test-first por tipo de risco
- Decision: Exigir RED-GREEN-REFACTOR para mudancas comportamentais e mapear testes por tipo (unit/integration/contract).
- Rationale: Aderencia a constituicao e deteccao precoce de regressao funcional e de API.
- Alternatives considered:
  - Testes apenas ao final do ciclo: rejeitado por elevar custo de correcao tardia.
  - Cobertura somente de integracao: rejeitado por baixo isolamento para diagnostico.

## Decision 7: Atualizacao de documentacao como parte do Definition of Done
- Decision: Incluir atualizacao de `*.doc.md` em mudancas de `src/` e manter spec/plan/tasks sincronizados.
- Rationale: Garante continuidade de contexto e reduz retrabalho em futuras iteracoes.
- Alternatives considered:
  - Documentacao postergada: rejeitado por perda de contexto e aumento de debt.

## Resolved Clarifications
- Nao ha marcadores `NEEDS CLARIFICATION` no spec atual.
- Escopo confirmado: planejamento e governanca de execucao (nao implementacao direta nesta fase).
- Plataforma e stack confirmadas com base no repositorio atual (Angular 20 + PrimeNG 20 + Jest).
