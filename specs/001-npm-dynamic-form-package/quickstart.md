# Quickstart: Pacote NPM Dynamic Form

## Prerequisites
- Node.js 20+
- Angular CLI 20+
- PrimeNG 20 instalado no app consumidor

## 1. Instalar o pacote

```bash
npm install @linkiez/primeng-dynamic-form
```

## 2. Importar no componente consumidor

```ts
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
      console.error('Formulario invalido', payload.errors);
      return;
    }

    console.log('Dados validos', payload.values);
  }
}
```

## 3. Validar comportamentos esperados
- Renderiza campos declarados em `schema.fields`.
- Exibe erros de validacao para regras sincronas.
- Emite payload padronizado `{ valid, values, errors }`.

## 4. Testes recomendados
```bash
npm run test
npm run test:integration
npm run test:contract
npm run test:all       # roda todos os suites de uma vez
```

## 5. Limites da v1
- Compatibilidade oficial: Angular 20 + PrimeNG 20.
- Validacoes assincronas nao suportadas.
- Tipos suportados: text, email, password, number, textarea, select, checkbox, radio, date.
