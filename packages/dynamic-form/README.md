# @linkiez/primeng-dynamic-form

Angular 22 + PrimeNG 22 library for schema-driven dynamic forms.

## Installation

```bash
npm install @linkiez/primeng-dynamic-form
```

**Peer dependencies** (must be installed in your project):
- `@angular/common` ^22.1.0
- `@angular/core` ^22.1.0
- `@angular/forms` ^22.1.0
- `primeng` ^22.1.1

## Quick Start

```typescript
import { Component } from '@angular/core';
import { DynamicFormComponent, FormSchema, FormSubmissionPayload } from '@linkiez/primeng-dynamic-form';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <pdf-dynamic-form
      [schema]="schema"
      (formSubmit)="onSubmit($event)"
    />
  `,
})
export class ExampleComponent {
  protected schema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'user-profile',
    fields: [
      { key: 'name', type: 'text', label: 'Nome', validators: [{ name: 'required' }] },
      { key: 'email', type: 'email', label: 'Email', validators: [{ name: 'email' }] },
    ],
  };

  protected onSubmit(payload: FormSubmissionPayload): void {
    if (!payload.valid) {
      console.error('Formulário inválido', payload.errors);
      return;
    }
    console.log('Dados válidos', payload.values);
  }
}
```

## Supported Field Types

| Type       | PrimeNG Component  |
|------------|--------------------|
| `text`     | `pInputText`       |
| `email`    | `pInputText`       |
| `password` | `p-password`       |
| `number`   | `p-inputnumber`    |
| `textarea` | `pTextarea`        |
| `select`   | `p-select`         |
| `autocomplete` | `p-autocomplete` |
| `cascadeselect` | `p-cascadeselect` |
| `checkbox` | `p-checkbox`       |
| `radio`    | `p-radiobutton`    |
| `multiselect` | `p-multiselect` |
| `listbox` | `p-listbox` |
| `selectbutton` | `p-selectbutton` |
| `togglebutton` | `p-togglebutton` |
| `toggleswitch` | `p-toggleswitch` |
| `colorpicker` | `p-colorpicker` |
| `inputmask` | `p-inputmask` |
| `inputotp` | `p-inputotp` |
| `inputtags` | `p-inputtags` |
| `editor` | `p-editor` |
| `date`     | `p-datepicker`     |
| `date-range` | `p-datepicker` (range mode) |
| `slider` | `p-slider` |
| `knob` | `p-knob` |
| `rating` | `p-rating` |
| `treeselect` | `p-treeselect` |
| `file`     | `p-fileupload`     |
| `custom`   | fallback renderer (`pInputText`) |

## Validation

## PrimeNG Component Configuration

Every field accepts `componentProps`. Supported component inputs are forwarded through explicit bindings in the renderer; `pBind` also applies compatible host attributes such as `class`, `style`, and custom DOM attributes.

```typescript
fields: [
  {
    key: 'status',
    type: 'select',
    label: 'Status',
    options: [
      { label: 'Ativo', value: 'active' },
      { label: 'Inativo', value: 'inactive' },
    ],
    componentProps: {
      filter: true,
      showClear: true,
      variant: 'filled',
      panelStyle: { maxHeight: '20rem' },
    },
  },
  {
    key: 'birthday',
    type: 'date',
    label: 'Nascimento',
    componentProps: {
      showIcon: true,
      showButtonBar: true,
      dateFormat: 'dd/mm/yy',
      view: 'month',
    },
  },
  {
    key: 'score',
    type: 'slider',
    label: 'Pontuação',
    componentProps: { min: 0, max: 100, step: 5 },
  },
  {
    key: 'phone',
    type: 'inputmask',
    label: 'Telefone',
    componentProps: { mask: '(99) 99999-9999', slotChar: '_' },
  },
],
```

The renderer maps the documented properties above to the corresponding PrimeNG inputs. Other host attributes can also be supplied through `componentProps`; unsupported component inputs require a renderer mapping before they can affect a PrimeNG `InputSignal`.

Declare synchronous validators in the schema. Supported validators (v1):

| Name         | Description                            | Params                       |
|--------------|----------------------------------------|------------------------------|
| `required`   | Field must have a value                | —                            |
| `email`      | Must be a valid email format           | —                            |
| `minLength`  | Minimum string length                  | `{ min: number }`            |
| `maxLength`  | Maximum string length                  | `{ max: number }`            |
| `min`        | Minimum numeric value                  | `{ min: number }`            |
| `max`        | Maximum numeric value                  | `{ max: number }`            |
| `pattern`    | Regex pattern match                    | `{ pattern: string \| RegExp }` |
| `customSync` | Custom synchronous validator function  | `{ fn: ValidatorFn }`        |

### Example

```typescript
fields: [
  {
    key: 'username',
    type: 'text',
    label: 'Usuário',
    validators: [
      { name: 'required' },
      { name: 'minLength', params: { min: 3 }, message: 'Mínimo 3 caracteres.' },
      { name: 'maxLength', params: { max: 20 } },
      { name: 'pattern', params: { pattern: '^[a-zA-Z0-9_]+$' }, message: 'Somente letras, números e _' },
    ],
  },
],
```

## Configuration

The optional `[config]` input allows customizing behavior and layout:

```typescript
import { DynamicFormConfiguration } from '@linkiez/primeng-dynamic-form';

config: DynamicFormConfiguration = {
  showSubmitButton: true,    // default: true
  submitLabel: 'Enviar',     // default: 'Enviar'
  showResetButton: true,     // default: false
  resetLabel: 'Limpar',      // default: 'Limpar'
  emitOnChange: true,        // default: false — emit formChange on each value change
  layoutMode: 'horizontal',  // default: 'vertical' | 'horizontal' | 'grid'
  locale: 'en-US',
  fallbackLocale: 'pt-BR',
  translations: {
    'pt-BR': {
      'form.submitLabel': 'Enviar',
      'form.resetLabel': 'Limpar',
      'fields.name.label': 'Nome',
    },
    'en-US': {
      'form.submitLabel': 'Submit',
      'form.resetLabel': 'Reset',
      'fields.name.label': 'Name',
    },
  },
};
```

### Template

```html
<pdf-dynamic-form
  [schema]="schema"
  [config]="config"
  [initialValues]="{ name: 'Padrão' }"
  (formSubmit)="onSubmit($event)"
  (formChange)="onValueChange($event)"
  (beforeSubmit)="onBeforeSubmit($event)"
  (afterReset)="onAfterReset($event)"
/>
```

## API Reference

### `DynamicFormComponent`

**Selector**: `pdf-dynamic-form`

| Input           | Type                       | Required | Description                               |
|-----------------|----------------------------|----------|-------------------------------------------|
| `schema`        | `FormSchema`               | ✅       | Declarative form schema                   |
| `config`        | `DynamicFormConfiguration` | ❌       | Behavioral and layout configuration       |
| `initialValues` | `Record<string, unknown>`  | ❌       | Pre-populated field values                |

| Output       | Type                                       | Description                                        |
|--------------|--------------------------------------------|----------------------------------------------------|
| `formSubmit` | `EventEmitter<FormSubmissionPayload>`      | Emitted on valid form submission                   |
| `formChange` | `EventEmitter<Record<string, unknown>>`    | Emitted on each value change (if `emitOnChange=true`) |
| `beforeSubmit` | `EventEmitter<Record<string, unknown>>`  | Emitted right before payload generation on valid submit |
| `afterReset` | `EventEmitter<Record<string, unknown>>`    | Emitted right after form reset |

### `FormSubmissionPayload`

```typescript
interface FormSubmissionPayload {
  valid: boolean;
  values: Record<string, unknown>;
  errors: Record<string, string[]>;  // field key → array of error messages
}
```

## Versioning and Migration

- This package follows **Semantic Versioning**.
- **Breaking changes** to the public API require a major version bump.
- **Schema changes** (e.g., new `schemaVersion`) are documented with migration notes in `CHANGELOG.md`.
- Compatibility is limited to Angular 22 + PrimeNG 22.

## v1 Limitations

- Only Angular 22 + PrimeNG 22 officially supported.
- Only synchronous validators (async validation is out of v1 scope).
- Supported field types are listed in the table above.
- `schemaVersion` must be `"1.0"`.

## Publish Checklist

Before publishing a new version to NPM:

1. **Tests** — all suites must pass:
   ```bash
   npm run test:all
   ```

2. **Lint** — zero errors:
   ```bash
   npm run lint
   ```

3. **Bump version** — update `packages/dynamic-form/package.json` following SemVer:
   - `patch` for bug fixes
   - `minor` for new backward-compatible features
   - `major` for breaking API changes

4. **Build** — compile the library:
   ```bash
   npm run build
   ```

5. **Dry-run** — verify package contents from the `dist/` folder:
   ```bash
   cd dist/@linkiez/primeng-dynamic-form
   npm pack --dry-run
   ```

6. **Publish**:
   ```bash
   npm publish --access public
   ```

7. **Tag the release**:
   ```bash
  git tag v1.0.x
  git push origin v1.0.x
   ```
