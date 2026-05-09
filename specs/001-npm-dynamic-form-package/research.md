# Research: Pacote NPM de Dynamic Form com PrimeNG

## Decision 1: Stack de biblioteca
- Decision: Implementar a biblioteca com Angular 20, PrimeNG 20 e TypeScript 5 para distribuicao via NPM.
- Rationale: O spec ja fixa compatibilidade v1 nessa matriz, reduzindo superficie de erro e complexidade de suporte.
- Alternatives considered:
  - Suportar multiplas versoes Angular/PrimeNG na v1: rejeitado por elevar custo de testes e risco de regressao.
  - Biblioteca agnostica de framework na v1: rejeitado por adiar entrega do valor principal do produto.

## Decision 2: Contrato de schema
- Decision: Exigir `schemaVersion` obrigatoria no `FormSchema`, iniciando em `1.0`.
- Rationale: Permite evolucao controlada do contrato e deteccao precoce de incompatibilidades.
- Alternatives considered:
  - Nao versionar schema: rejeitado por risco de quebra silenciosa em evolucoes futuras.
  - Versionar apenas pacote sem schema: rejeitado por nao diferenciar mudancas de contrato de dados.

## Decision 3: Escopo de tipos de campo v1
- Decision: Limitar v1 a `text`, `email`, `password`, `number`, `textarea`, `select`, `checkbox`, `radio`, `date`.
- Rationale: Cobertura alta para casos comuns com complexidade de implementacao controlada.
- Alternatives considered:
  - Incluir campos avancados (upload, rich text, autocomplete remoto): rejeitado por ampliar escopo da v1.
  - Incluir apenas 3-4 tipos basicos: rejeitado por reduzir utilidade pratica inicial.

## Decision 4: Modelo de validacao
- Decision: Adotar somente validacoes sincronas na v1 (regras built-in e callbacks sincronos).
- Rationale: Facilita previsibilidade, testes deterministas e aderencia ao principio test-first.
- Alternatives considered:
  - Validacao assincrona na v1: rejeitado por custo de orquestracao e risco de UX inconsistente.

## Decision 5: Contrato de submissao
- Decision: Padronizar payload de submit como `{ valid, values, errors }`.
- Rationale: Contrato simples para integracao, com semantica clara para fluxo de sucesso e falha.
- Alternatives considered:
  - Payload apenas com valores: rejeitado por exigir nova rodada de validacao no consumidor.
  - Payload altamente detalhado por controle interno: rejeitado por acoplamento desnecessario.

## Decision 6: Testes e qualidade
- Decision: Cobrir unit, integration e contract tests para o pacote, com RED-GREEN-REFACTOR em mudancas comportamentais.
- Rationale: Alinha com constituicao e reduz risco de regressao em biblioteca reutilizavel.
- Alternatives considered:
  - Somente testes unitarios: rejeitado por nao validar contrato externo do pacote.

## Decision 7: Distribuicao e consumo
- Decision: Publicar como biblioteca NPM com peer dependencies explicitas para Angular 20 e PrimeNG 20.
- Rationale: Evita duplicidade de runtime e falhas de versao no app consumidor.
- Alternatives considered:
  - Incluir Angular/PrimeNG como dependencies diretas: rejeitado por potencial conflito de versoes.

---

## Implementation Notes (v0.1.0)

### Toolchain
- **ng-packagr 20** via `ng-package.json` para build de biblioteca Angular; saida em `dist/@linkiez/primeng-dynamic-form`.
- **jest-preset-angular 14.4** + **Jest 29** com ambiente `jsdom`; setup via `setupZoneTestEnv()` de `jest-preset-angular/setup-env/zone`.
- **ESLint 9** com flat config em `eslint.config.mjs`; plugin `@typescript-eslint/eslint-plugin@8`.
- **TypeScript 5.8.x** — versao minima necessaria por exigencia de peer deps do `@angular-devkit/build-angular@20`.

### Estrutura de testes
- `tests/unit/` — validadores e mappers isolados, sem Angular TestBed.
- `tests/integration/` — componentes renderizados via `TestBed.createComponent`; `fixture.detectChanges()` para ciclo Angular.
- `tests/contract/` — shape de exports e tipos verificados estaticamente; garantia de estabilidade da API publica.

### Decisoes de implementacao descobertas durante desenvolvimento

**D8: Alias de modulo para testes**
- `tsconfig.spec.json` precisa de `paths: { "@linkiez/primeng-dynamic-form": ["packages/dynamic-form/src/public-api.ts"] }` para resolver o alias nos testes sem build previa.
- `jest.config.js` tambem precisa de `moduleNameMapper` correspondente.

**D9: Cleanup de subscricoes com Subject + takeUntil**
- `DynamicFormComponent` usa `Subject` (`destroy$`) + `takeUntil` para cancelar subscricao ao `valueChanges` no `ngOnDestroy`, evitando memory leaks em re-renders de schema.

**D10: Inicializacao dupla (ngOnInit + ngOnChanges)**
- Ambos os hooks chamam `initialize()` para cobrir o caso de inicializacao inicial e re-renderizacao quando o `@Input schema` muda em runtime.

**D11: Marcacao de controles invalidos no submit**
- `onSubmit()` chama `formGroup.markAllAsTouched()` antes de verificar validade, forcando exibicao de erros em campos nao tocados.

**D12: stringifyContentPathRegex no jest.config.js**
- Deve ser `String.raw\`\.html$\`` (string) e nao regex literal `/\.html$/`, caso contrario NgJestConfig lanca erro de tipo.
**D14: Pipeline de CI fora do escopo da v1**
- SC-004 exige "100% de sucesso em pipelines de validacao". Configurar um pipeline de CI (GitHub Actions, Jenkins, etc.) foi deliberadamente excluido do escopo da v1 para manter entrega enxuta.
- Validacao equivalente e feita localmente via `npm run test:all` + `npm run lint` + `npm pack --dry-run` conforme checklist de publicacao no README.
- A criacao do pipeline de CI fica como primeira tarefa da v1.1 ou de um ciclo de infraestrutura dedicado.
**D13: setupFilesAfterEnv no jest.config.js**
- A chave correta e `setupFilesAfterEnv` (nao `setupFilesAfterFramework`).

### Limitacoes conhecidas da v1
- Sem suporte a validacoes assincronas.
- Sem suporte a campos condicionais (mostrar/ocultar baseado em valores de outros campos).
- Sem suporte a upload de arquivos, rich text, ou autocomplete remoto.
- Sem theming dinamico — consumidor deve customizar via CSS no app host.
