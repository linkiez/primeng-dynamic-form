# Contract: Dynamic Form Package Public API

## Scope
Contrato publico de consumo do pacote NPM para Angular 20 + PrimeNG 20.

## Package Entry Points
- `@linkiez/primeng-dynamic-form`

## Exposed Types
- `FormSchema`
- `FieldDefinition`
- `ValidationRule`
- `DynamicFormConfiguration`
- `FormSubmissionPayload`
- `FieldType`

## Exposed Components
- `DynamicFormComponent` — selector: `pdf-dynamic-form`
- `FieldRendererComponent` — selector: `pdf-field-renderer` (internal, exported for advanced layout consumers)

## Component Inputs
- `schema: FormSchema` (required)
- `config?: DynamicFormConfiguration`
- `initialValues?: Record<string, unknown>`

## Component Outputs
- `formSubmit: EventEmitter<FormSubmissionPayload>`
- `formChange: EventEmitter<Record<string, unknown>>` (emitido quando `emitOnChange=true`)

## Validation Contract
- V1 suporta apenas validacoes sincronas.
- Tipos de regra aceitos: `required`, `minLength`, `maxLength`, `min`, `max`, `pattern`, `email`, `customSync`.
- Regras nao suportadas devem produzir erro de configuracao deterministico.

## Schema Contract
- `schema.schemaVersion` e obrigatoria e deve ser `1.0` na v1.
- Campo com `type` fora da lista suportada deve ser tratado como erro de configuracao.

## Submission Payload Contract
```ts
export interface FormSubmissionPayload {
  valid: boolean;
  values: Record<string, unknown>;
  errors: Record<string, string[]>;
}
```

## Compatibility Contract
- Peer dependencies obrigatorias:
  - `@angular/core@^20`
  - `@angular/common@^20`
  - `primeng@^20`

## Error Contract
- Erros de configuracao devem ser reportados com mensagem clara contendo:
  - `field key` (quando aplicavel)
  - tipo de erro (`unsupported_field_type`, `missing_schema_version`, etc)
  - acao recomendada

## Versioning and Breaking Changes
- Mudancas incompativeis no contrato publico exigem major version do pacote.
- Mudancas incompativeis de schema devem atualizar `schemaVersion` e documentar migracao.
