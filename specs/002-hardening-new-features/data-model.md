# Data Model: Melhorias, Hardening e Novas Features

## Entity: Initiative
- Description: Item de backlog planejado para hardening, melhoria tecnica ou nova feature.
- Fields:
  - `id: string` (required, unique)
  - `title: string` (required)
  - `category: 'hardening' | 'improvement' | 'feature'` (required)
  - `priority: 'P1' | 'P2' | 'P3'` (required)
  - `owner?: string`
  - `description: string` (required)
  - `dependencies: string[]` (default `[]`)
  - `riskLevel: 'low' | 'medium' | 'high'` (required)
  - `status: InitiativeStatus` (required)
  - `entryCriteria: string[]` (required)
  - `exitCriteria: string[]` (required)
- Validation rules:
  - `priority` MUST align with matrix de impacto/risco.
  - `exitCriteria` MUST ser mensuravel e verificavel.

## Entity: HardeningControl
- Description: Controle obrigatorio para aprovacao de release.
- Fields:
  - `key: string` (required, unique)
  - `name: string` (required)
  - `description: string` (required)
  - `requiredEvidence: string[]` (required)
  - `appliesTo: string[]` (required, ex.: `library`, `workflow`, `tests`)
  - `blocking: boolean` (default `true`)
- Validation rules:
  - Se `blocking = true`, ausencia de evidencia MUST impedir promote para release.

## Entity: FeatureProposal
- Description: Proposta de nova funcionalidade com impacto esperado no produto.
- Fields:
  - `proposalId: string` (required, unique)
  - `name: string` (required)
  - `problemStatement: string` (required)
  - `expectedValue: string` (required)
  - `acceptanceCriteria: string[]` (required)
  - `compatibilityImpact: 'none' | 'additive' | 'breaking'` (required)
  - `migrationNotes?: string[]`
  - `linkedInitiatives: string[]` (required)
- Validation rules:
  - `compatibilityImpact = 'breaking'` MUST incluir `migrationNotes`.
  - Nesta rodada, propostas aprovadas SHOULD ser `none` ou `additive`.

## Entity: RoadmapSlice
- Description: Fatia incremental de execucao com valor autonomo.
- Fields:
  - `sliceId: string` (required, unique)
  - `name: string` (required)
  - `goal: string` (required)
  - `targetPriority: 'P1' | 'P2' | 'P3'` (required)
  - `initiativeIds: string[]` (required)
  - `successMetrics: string[]` (required)
  - `readyForExecution: boolean` (required)
- Validation rules:
  - `initiativeIds` MUST conter iniciativas independentes e testaveis.
  - `readyForExecution` so pode ser `true` quando todos os `entryCriteria` forem satisfeitos.

## Supporting Types

### Enum: InitiativeStatus
- `draft`
- `ready`
- `in-progress`
- `blocked`
- `done`
- `validated`

### Entity: RiskAssessment
- `initiativeId: string` (required)
- `impactScore: number` (required, 1..5)
- `likelihoodScore: number` (required, 1..5)
- `exposureScore: number` (derived = `impactScore * likelihoodScore`)
- `mitigations: string[]` (required)

## State Transitions
- `draft` -> `ready`: criterios de entrada preenchidos e dependencias resolvidas.
- `ready` -> `in-progress`: item selecionado para sprint.
- `in-progress` -> `blocked`: risco/impedimento invalida continuidade.
- `blocked` -> `in-progress`: mitigacao aplicada e dependencia liberada.
- `in-progress` -> `done`: implementacao concluida.
- `done` -> `validated`: testes e gates de qualidade aprovados.
