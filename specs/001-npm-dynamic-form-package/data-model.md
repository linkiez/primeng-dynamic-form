# Data Model: Pacote NPM de Dynamic Form com PrimeNG

## Entity: FormSchema
- Description: Contrato raiz do formulario declarativo.
- Fields:
  - `schemaVersion: string` (required, default expected `1.0`)
  - `formId: string` (required)
  - `title?: string`
  - `fields: FieldDefinition[]` (required, min 1)
  - `layout?: LayoutConfig`
  - `submit?: SubmitConfig`
- Validation rules:
  - `schemaVersion` MUST be `1.0` na v1.
  - `fields` MUST conter somente tipos suportados na v1.

## Entity: FieldDefinition
- Description: Definicao de um campo renderizavel.
- Fields:
  - `key: string` (required, unique no formulario)
  - `type: FieldType` (required)
  - `label: string` (required)
  - `placeholder?: string`
  - `initialValue?: unknown`
  - `options?: FieldOption[]` (required para `select` e `radio`)
  - `validators?: ValidationRule[]`
  - `ui?: UIHints`
  - `disabled?: boolean`
  - `hidden?: boolean`
- Validation rules:
  - `key` MUST ser unico.
  - `options` MUST existir quando `type` e `select` ou `radio`.
  - `initialValue` SHOULD ser compativel com o `type`.

## Entity: ValidationRule
- Description: Regra sincrona de validacao por campo/formulario.
- Fields:
  - `name: ValidatorName` (required)
  - `params?: Record<string, unknown>`
  - `message?: string`
- Supported names (v1):
  - `required`
  - `minLength`
  - `maxLength`
  - `min`
  - `max`
  - `pattern`
  - `email`
  - `customSync`

## Entity: DynamicFormConfiguration
- Description: Configuracoes opcionais de comportamento e extensao.
- Fields:
  - `showSubmitButton?: boolean`
  - `submitLabel?: string`
  - `showResetButton?: boolean`
  - `resetLabel?: string`
  - `emitOnChange?: boolean`
  - `layoutMode?: 'vertical' | 'horizontal' | 'grid'`

## Entity: FormSubmissionPayload
- Description: Resultado padronizado de submissao.
- Fields:
  - `valid: boolean`
  - `values: Record<string, unknown>`
  - `errors: Record<string, string[]>`
- Validation rules:
  - Quando `valid = true`, `errors` SHOULD estar vazio.
  - Quando `valid = false`, `errors` MUST conter pelo menos uma chave.

## Supporting Types

### Enum: FieldType
- `text`
- `email`
- `password`
- `number`
- `textarea`
- `select`
- `checkbox`
- `radio`
- `date`

### Entity: FieldOption
- `label: string` (required)
- `value: string | number | boolean` (required)

### Entity: LayoutConfig
- `columns?: 1 | 2 | 3 | 4`
- `responsive?: boolean`

### Entity: SubmitConfig
- `mode?: 'emit' | 'callback'`
- `debounceMs?: number`

### Entity: UIHints
- `tooltip?: string`
- `ariaLabel?: string`
- `ariaDescription?: string`

## State Transitions
- `idle` -> `editing`: primeiro input do usuario.
- `editing` -> `invalid`: ao validar e detectar erro.
- `editing` -> `valid`: ao validar sem erro.
- `valid` -> `submitted`: submit emitido com `valid=true`.
- `invalid` -> `editing`: usuario corrige valores.
