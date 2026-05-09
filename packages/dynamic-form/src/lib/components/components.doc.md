# Module: components

**Path**: `packages/dynamic-form/src/lib/components/`
**Package**: `@linkiez/primeng-dynamic-form`

## Responsibility

Angular standalone components that form the public-facing UI layer of the library.
`DynamicFormComponent` is the main entry point; `FieldRendererComponent` is an
internal renderer used by the form, but is also exported for advanced consumer use.

---

## `DynamicFormComponent`

**Selector**: `pdf-dynamic-form`
**File**: `dynamic-form.component.ts`

### Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `schema` | `FormSchema` | ✅ | Schema declarativo do formulario |
| `config` | `DynamicFormConfiguration` | — | Configuracoes opcionais (botoes, layout, eventos) |
| `initialValues` | `Record<string, unknown>` | — | Valores iniciais por chave de campo |

### Outputs

| Output | Type | When emitted |
|--------|------|-------------|
| `formSubmit` | `FormSubmissionPayload` | Ao submit de formulario valido |
| `formChange` | `Record<string, unknown>` | A cada mudanca de valor, quando `config.emitOnChange = true` |
| `beforeSubmit` | `Record<string, unknown>` | Imediatamente antes de gerar o payload no submit valido |
| `afterReset` | `Record<string, unknown>` | Depois de executar `formGroup.reset()` |

### Lifecycle

- `ngOnInit` + `ngOnChanges` both call `initialize()` — handles first render and runtime schema swap.
- `ngOnDestroy` completes `destroy$` Subject to cancel all active `valueChanges` subscriptions.

### Key Behaviors

- **Schema errors**: if `parseAndValidateSchema` returns errors, a `.pdf-config-error` block is rendered instead of the form.
- **Submit blocking**: `onSubmit()` calls `formGroup.markAllAsTouched()` before validity check — forces validation display on untouched fields.
- **Reset**: `onReset()` calls `formGroup.reset()` to restore initial values.
- **Lifecycle hooks**: `onSubmit()` emite `beforeSubmit` com `getRawValue()` antes do payload; `onReset()` emite `afterReset` apos reset.
- **Layout class**: `formClass` is set to `pdf-form pdf-form--{layoutMode}` (e.g. `pdf-form--vertical`, `pdf-form--horizontal`).
- **Subscription cleanup**: `valueChanges` uses `takeUntil(destroy$)` pattern (see `research.md` D9).

### Template Structure

```
@if (configErrors.length > 0)
  <div class="pdf-config-error">…</div>
@else
  <form [formGroup] (ngSubmit)="onSubmit()" [class]="formClass">
    @for (field of visibleFields)
      <pdf-field-renderer [field] [formGroup] />
    @if showSubmitButton
      <div class="pdf-actions">
        <p-button type="submit" />
        @if showResetButton
          <p-button type="button" (onClick)="onReset()" />
```

---

## `FieldRendererComponent`

**Selector**: `pdf-field-renderer`
**File**: `field-renderer.component.ts`

> **Note**: Internal component used by `DynamicFormComponent`. Exported for consumers who need
> to build custom form layouts while reusing field rendering logic.

### Inputs

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `field` | `FieldDefinition` | ✅ | Campo a renderizar |
| `formGroup` | `FormGroup` | ✅ | FormGroup do formulario pai |

### Field Type → PrimeNG Mapping

| `FieldType` | PrimeNG Component | Wrapper |
|-------------|-------------------|---------|
| `text` | `pInputText` (directive) | `p-floatlabel` |
| `email` | `pInputText` (type="email") | `p-floatlabel` |
| `password` | `p-password` | `p-floatlabel` |
| `number` | `p-inputnumber` | `p-floatlabel` |
| `textarea` | `pTextarea` (directive) | `p-floatlabel` |
| `select` | `p-select` | — |
| `checkbox` | `p-checkbox` (binary) | `.pdf-field__checkbox` |
| `radio` | `p-radiobutton` (per option) | `.pdf-field__radio-group` |
| `date` | `p-datepicker` | `p-floatlabel` |
| `date-range` | `p-datepicker` (`selectionMode="range"`) | `p-floatlabel` |
| `file` | `p-fileupload` (`mode="basic"`, `customUpload=true`) | `.pdf-field__file` |
| `custom` | `pInputText` (fallback renderer) | `p-floatlabel` |

### Error Display

- Shows `<p-message severity="error">` when control is `invalid && (dirty || touched)`.
- Error message resolved via `getFirstErrorMessage(control.errors)` from `error-message.mapper.ts`.
- Container gets CSS class `pdf-field--error` when in error state.

## Key Decisions

- **D9**: `destroy$` + `takeUntil` pattern in `DynamicFormComponent` prevents memory leaks on schema re-init.
- **D10**: Dual init (ngOnInit + ngOnChanges → `initialize()`) supports both first-render and runtime schema swap.
- **D11**: `markAllAsTouched()` on submit ensures validators trigger on untouched fields before blocking.
- `FieldRendererComponent` uses `input.required<T>()` signal API (Angular 17+) — no `@Input()` decorators.
