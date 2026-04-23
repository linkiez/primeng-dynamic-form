# Feature Specification: Pacote NPM de Dynamic Form com PrimeNG

**Feature Branch**: `001-create-npm-package`
**Created**: 2026-04-11
**Status**: Draft
**Input**: User description: "quero criar um package para npm de um componente de dynamic form que usa componentes do prime ng"

## Clarifications

### Session 2026-04-11

- Q: Qual matriz de compatibilidade da v1? -> A: Angular 20 + PrimeNG 20 apenas.
- Q: Quais tipos de campo entram na v1? -> A: text, email, password, number, textarea, select, checkbox, radio e date.
- Q: Como versionar o contrato de schema? -> A: `schemaVersion` obrigatoria iniciando em `1.0`.
- Q: Qual contrato de payload de submissao? -> A: `{ valid, values, errors }` com mapa de erros por campo.
- Q: Validacao assincrona entra na v1? -> A: Nao; apenas validacoes sincronas na primeira versao.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Publicar pacote reutilizavel (Priority: P1)

Como desenvolvedor frontend, quero instalar um pacote NPM de dynamic form para renderizar formularios com schema declarativo usando componentes PrimeNG, reduzindo retrabalho entre projetos.

**Why this priority**: Entrega o valor central da feature (pacote reutilizavel) e habilita uso imediato em outros projetos.

**Independent Test**: Pode ser testado instalando o pacote em um projeto limpo, passando um schema simples e validando renderizacao e submissao do formulario sem dependencias de outras historias.

**Acceptance Scenarios**:

1. **Given** um projeto consumidor sem o pacote instalado, **When** o desenvolvedor instala o pacote e importa o componente principal, **Then** o formulario baseado em schema e renderizado corretamente com componentes PrimeNG suportados.
2. **Given** um schema com campos obrigatorios e opcionais, **When** o usuario final interage e envia o formulario, **Then** o resultado contem apenas os valores validos e mensagens de erro claras para campos invalidos.

---

### User Story 2 - Configurar validacoes declarativas (Priority: P2)

Como desenvolvedor frontend, quero declarar validacoes no schema para padronizar regras de negocio sem escrever logica repetida em cada tela.

**Why this priority**: Complementa o valor do pacote com comportamento necessario para uso real em formularios de producao.

**Independent Test**: Pode ser testado com um schema contendo multiplas regras de validacao e verificando comportamento de erros e bloqueio de envio.

**Acceptance Scenarios**:

1. **Given** um schema com regras de tamanho minimo, obrigatoriedade e formato, **When** o usuario preenche valores invalidos, **Then** o formulario exibe erros por campo e impede submissao.
2. **Given** um schema com regras validas, **When** o usuario corrige os dados e envia, **Then** o formulario aceita submissao e retorna payload consistente.

---

### User Story 3 - Personalizar apresentacao e extensibilidade (Priority: P3)

Como desenvolvedor frontend, quero customizar labels, dicas, layout e eventos para adaptar o dynamic form a diferentes contextos sem alterar o nucleo do pacote.

**Why this priority**: Aumenta adocao e longevidade do pacote em cenarios variados apos a entrega do MVP funcional.

**Independent Test**: Pode ser testado criando configuracoes de layout e callbacks customizados e verificando que o comportamento final respeita a configuracao declarada.

**Acceptance Scenarios**:

1. **Given** um schema com configuracoes visuais e eventos customizados, **When** o formulario e renderizado e utilizado, **Then** a interface e os eventos refletem a configuracao definida.

### Edge Cases

- Schema vazio: o componente deve renderizar estado vazio sem erro de runtime e bloquear submissao.
- Tipo de campo nao suportado: o pacote deve ignorar o campo invalido e registrar erro descritivo de configuracao.
- Versao incompativel de Angular/PrimeNG: o pacote deve falhar na instalacao com mensagem clara de peer dependency.
- Configuracoes opcionais ausentes: o pacote deve aplicar defaults seguros sem quebrar renderizacao.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O sistema MUST disponibilizar um pacote distribuivel via NPM com um componente principal de dynamic form reutilizavel.
- **FR-002**: O sistema MUST aceitar schema declarativo para definir campos, regras de validacao e metadados de exibicao.
- **FR-003**: O sistema MUST renderizar campos com componentes PrimeNG compativeis de forma consistente.
- **FR-004**: O sistema MUST validar dados de formulario conforme regras declaradas antes da submissao.
- **FR-005**: O sistema MUST fornecer payload de submissao padronizado para integracao com aplicacoes consumidoras.
- **FR-006**: O sistema MUST fornecer mensagens de erro compreensiveis por campo e por formulario.
- **FR-007**: O sistema MUST permitir extensao por configuracao (eventos, layout e comportamento) sem alterar codigo interno do pacote.
- **FR-008**: O sistema MUST documentar contrato de uso, entradas e saidas para adopcao por equipes diferentes.
- **FR-009**: O sistema MUST manter compatibilidade de uso entre versoes menores, com orientacao de migracao quando houver quebra.
- **FR-010**: O sistema MUST suportar oficialmente Angular 20 e PrimeNG 20 na v1, com peer dependencies explicitadas no pacote.
- **FR-011**: O sistema MUST suportar na v1 os tipos de campo `text`, `email`, `password`, `number`, `textarea`, `select`, `checkbox`, `radio` e `date`.
- **FR-012**: O sistema MUST exigir a propriedade `schemaVersion` no `FormSchema`, iniciando com valor `1.0`.
- **FR-013**: O sistema MUST emitir no submit um payload padronizado no formato `{ valid, values, errors }`.
- **FR-014**: O sistema MUST limitar a v1 a validacoes sincronas (built-in e callbacks sincronos), sem validacao assincrona.

### Constitution Alignment *(mandatory)*

- **CA-001**: This feature MUST map to independently testable user stories with explicit priority.
- **CA-002**: Behavioral changes MUST define failing-first test expectations before implementation.
- **CA-003**: Compatibility impacts and migration notes MUST be documented when behavior changes.
- **CA-004**: Security constraints for secrets and sensitive data handling MUST be explicit.
- **CA-005**: Documentation updates required by scope (including paired `.doc.md` in `src/`, when applicable) MUST be listed.

### Key Entities *(include if feature involves data)*

- **FormSchema**: Define estrutura declarativa do formulario, incluindo campos, ordem, regras e metadados de exibicao.
- **FieldDefinition**: Representa cada campo do formulario com tipo suportado na v1, chave, estado inicial e opcoes de validacao.
- **ValidationRule**: Representa regra declarativa de validacao aplicavel a um campo ou ao formulario completo.
- **FormSubmissionPayload**: Representa resultado consolidado da submissao no formato `{ valid: boolean, values: Record<string, unknown>, errors: Record<string, string[]> }`.
- **DynamicFormConfiguration**: Representa configuracoes opcionais de comportamento, layout, eventos e extensibilidade.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Pelo menos 90% dos desenvolvedores participantes conseguem instalar e renderizar um formulario basico em ate 15 minutos usando apenas a documentacao do pacote. *(v1: metrica pos-lancamento — avaliada por feedback da equipe apos adocao inicial; fora do escopo de CI)*
- **SC-002**: Pelo menos 95% dos cenarios de validacao definidos no schema sao refletidos corretamente na interface e no bloqueio/liberacao de submissao durante testes de aceite. *(v1: validado pela suite de testes de integracao e validacao — `npm run test:all`; cobertura dos 8 tipos de validadores verificada em `tests/unit/us2-validator-registry.spec.ts`)*
- **SC-003**: O pacote permite implementacao do fluxo principal de formulario em no maximo 30% do codigo anteriormente necessario em comparacao com implementacao manual equivalente. *(v1: metrica pos-lancamento — avaliada comparativamente apos adocao; fora do escopo de CI)*
- **SC-004**: A taxa de sucesso de execucao do exemplo de integracao em ambiente limpo e de 100% nos pipelines de validacao do pacote. *(v1: validado manualmente via `npm run test:all` + `npm pack --dry-run`; pipeline de CI esta fora do escopo da v1 — ver research.md D8)*

## Assumptions

- O publico inicial do pacote sao times frontend que ja utilizam PrimeNG em projetos web.
- O escopo inicial considera publicacao do pacote com um componente principal de dynamic form e configuracoes declarativas essenciais.
- O pacote sera consumido por projetos com ambiente de build compativel com distribuicao de bibliotecas frontend via NPM.
- A compatibilidade oficial inicial cobre Angular 20 e PrimeNG 20.
- Validacoes assincronas ficam fora do escopo da primeira versao.
- Suporte a componentes altamente customizados ou integrações de UI fora do contrato inicial ficam fora do escopo da primeira versao.
- A documentacao minima de uso, contratos e exemplos sera entregue junto com o pacote para viabilizar adocao.
