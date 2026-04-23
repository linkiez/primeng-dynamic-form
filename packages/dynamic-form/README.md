# @primeng-dynamic-form/core

Angular 20 + PrimeNG 20 library for schema-driven dynamic forms.

## Installation

```bash
npm install @primeng-dynamic-form/core
```

**Peer dependencies** (must be installed in your project):
- `@angular/common` ^20.0.0
- `@angular/core` ^20.0.0
- `@angular/forms` ^20.0.0
- `primeng` ^20.0.0

## Quick Start

```typescript
import { Component } from '@angular/core';
import { DynamicFormComponent, FormSchema, FormSubmissionPayload } from '@primeng-dynamic-form/core';

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
| `checkbox` | `p-checkbox`       |
| `radio`    | `p-radiobutton`    |
| `date`     | `p-datepicker`     |

## Validation

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
import { DynamicFormConfiguration } from '@primeng-dynamic-form/core';

config: DynamicFormConfiguration = {
  showSubmitButton: true,    // default: true
  submitLabel: 'Enviar',     // default: 'Enviar'
  showResetButton: true,     // default: false
  resetLabel: 'Limpar',      // default: 'Limpar'
  emitOnChange: true,        // default: false — emit formChange on each value change
  layoutMode: 'horizontal',  // default: 'vertical' | 'horizontal' | 'grid'
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
- v1 compatibility is limited to Angular 20 + PrimeNG 20.

## v1 Limitations

- Only Angular 20 + PrimeNG 20 officially supported.
- Only synchronous validators (async validation is out of v1 scope).
- Supported field types: `text`, `email`, `password`, `number`, `textarea`, `select`, `checkbox`, `radio`, `date`.
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
   cd dist/@primeng-dynamic-form/core
   npm pack --dry-run
   ```

6. **Publish**:
   ```bash
   npm publish --access public
   ```

7. **Tag the release**:
   ```bash
   git tag v0.x.x
   git push origin v0.x.x
   ```
