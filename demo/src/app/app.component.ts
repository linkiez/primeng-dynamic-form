import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from 'primeng/tabs';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Divider } from 'primeng/divider';
import { Message } from 'primeng/message';
import {
  DynamicFormComponent,
  FormSchema,
  FormSubmissionPayload,
  DynamicFormConfiguration,
} from '@primeng-dynamic-form/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Card,
    Tag,
    Divider,
    Message,
    DynamicFormComponent,
  ],
  template: `
    <!-- ══ Header ══ -->
    <header class="site-header">
      <div class="container">
        <div class="header-content">
          <div class="header-brand">
            <span class="header-icon">⚡</span>
            <div>
              <h1 class="header-title">primeng-dynamic-form</h1>
              <p class="header-subtitle">Formulários declarativos para Angular 20 + PrimeNG 20</p>
            </div>
          </div>
          <div class="header-badges">
            <p-tag value="v0.1.0" severity="info" />
            <p-tag value="Angular 20" severity="success" />
            <p-tag value="PrimeNG 20" severity="warn" />
          </div>
        </div>
      </div>
    </header>

    <!-- ══ Hero ══ -->
    <section class="hero-section">
      <div class="container">
        <p class="hero-lead">
          Renderize formulários complexos a partir de um <strong>schema JSON declarativo</strong>.
          Validações sincronas, payload padronizado e configuração sem alterar o núcleo do pacote.
        </p>

        <div class="hero-install">
          <pre><code>npm install &#64;primeng-dynamic-form/core</code></pre>
        </div>

        <div class="hero-features">
          @for (feature of features; track feature.icon) {
            <div class="feature-chip">
              <span>{{ feature.icon }}</span>
              <span>{{ feature.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <p-divider />

    <!-- ══ Quick Start ══ -->
    <section class="doc-section">
      <div class="container">
        <h2 class="section-title">Quick Start</h2>
        <p class="section-lead">Configure o módulo e insira o componente em qualquer template Angular.</p>

        <div class="qs-steps">
          <!-- Step 1 -->
          <div class="qs-step">
            <div class="qs-step-header">
              <span class="qs-step-number">1</span>
              <span class="qs-step-label">Importe no componente</span>
            </div>
            <pre>{{ importSnippet }}</pre>
          </div>

          <!-- Step 2 -->
          <div class="qs-step">
            <div class="qs-step-header">
              <span class="qs-step-number">2</span>
              <span class="qs-step-label">Defina o schema</span>
            </div>
            <pre>{{ schemaSnippet }}</pre>
          </div>

          <!-- Step 3 -->
          <div class="qs-step">
            <div class="qs-step-header">
              <span class="qs-step-number">3</span>
              <span class="qs-step-label">Use no template</span>
            </div>
            <pre>{{ templateSnippet }}</pre>
          </div>
        </div>
      </div>
    </section>

    <p-divider />

    <!-- ══ Live Demo ══ -->
    <section class="doc-section">
      <div class="container">
        <h2 class="section-title">Demonstração ao Vivo</h2>
        <p class="section-lead">Interaja com os formulários abaixo. O payload de submissão é exibido em tempo real.</p>

        <p-tabs [value]="0">
          <p-tablist>
            <p-tab [value]="0">Formulário Básico</p-tab>
            <p-tab [value]="1">Validações Declarativas</p-tab>
            <p-tab [value]="2">Layout e Configuração</p-tab>
          </p-tablist>

          <p-tabpanels>

            <!-- Tab 1: Basic Form -->
            <p-tabpanel [value]="0">
              <div class="demo-grid">
                <div>
                  <p-card header="Formulário de Contato">
                    <div class="demo-form-wrapper">
                      <pdf-dynamic-form
                        [schema]="basicSchema"
                        (formSubmit)="onBasicSubmit($event)"
                      />
                    </div>
                  </p-card>
                </div>
                <div>
                  <p-card header="Schema JSON">
                    <pre>{{ basicSchemaCode }}</pre>
                  </p-card>
                  @if (basicPayload()) {
                    <p-card header="Payload Recebido" styleClass="mt-3">
                      <pre class="payload-box">{{ basicPayload() | json }}</pre>
                    </p-card>
                  }
                </div>
              </div>
            </p-tabpanel>

            <!-- Tab 2: Validation -->
            <p-tabpanel [value]="1">
              <div class="demo-grid">
                <div>
                  <p-card header="Formulário com Validações">
                    <p-message
                      severity="info"
                      text="Tente enviar com campos inválidos para ver os erros em tempo real."
                      styleClass="mb-3"
                    />
                    <div class="demo-form-wrapper">
                      <pdf-dynamic-form
                        [schema]="validationSchema"
                        (formSubmit)="onValidationSubmit($event)"
                      />
                    </div>
                  </p-card>
                </div>
                <div>
                  <p-card header="Schema JSON">
                    <pre>{{ validationSchemaCode }}</pre>
                  </p-card>
                  @if (validationPayload()) {
                    <p-card header="Payload Recebido" styleClass="mt-3">
                      <pre class="payload-box">{{ validationPayload() | json }}</pre>
                    </p-card>
                  }
                </div>
              </div>
            </p-tabpanel>

            <!-- Tab 3: Config -->
            <p-tabpanel [value]="2">
              <div class="demo-grid">
                <div>
                  <p-card header="Formulário Customizado">
                    <div class="demo-form-wrapper">
                      <pdf-dynamic-form
                        [schema]="configSchema"
                        [config]="customConfig"
                        (formSubmit)="onConfigSubmit($event)"
                        (formChange)="onFormChange($event)"
                      />
                    </div>
                  </p-card>
                  @if (changePayload()) {
                    <p-card header="Último formChange" styleClass="mt-3">
                      <pre class="payload-box">{{ changePayload() | json }}</pre>
                    </p-card>
                  }
                </div>
                <div>
                  <p-card header="Configuração">
                    <pre>{{ configSchemaCode }}</pre>
                  </p-card>
                  @if (configPayload()) {
                    <p-card header="Payload Recebido" styleClass="mt-3">
                      <pre class="payload-box">{{ configPayload() | json }}</pre>
                    </p-card>
                  }
                </div>
              </div>
            </p-tabpanel>

          </p-tabpanels>
        </p-tabs>
      </div>
    </section>

    <p-divider />

    <!-- ══ Field Types ══ -->
    <section class="doc-section">
      <div class="container">
        <h2 class="section-title">Tipos de Campo Suportados (v1)</h2>
        <p-card>
          <table class="doc-table">
            <thead>
              <tr>
                <th>type</th>
                <th>Componente PrimeNG</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              @for (field of fieldTypes; track field.type) {
                <tr>
                  <td><code>{{ field.type }}</code></td>
                  <td><code>{{ field.component }}</code></td>
                  <td>{{ field.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </p-card>
      </div>
    </section>

    <p-divider />

    <!-- ══ Validators ══ -->
    <section class="doc-section">
      <div class="container">
        <h2 class="section-title">Validadores Sincronos (v1)</h2>
        <p-card>
          <table class="doc-table">
            <thead>
              <tr>
                <th>name</th>
                <th>Parâmetro</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              @for (v of validators; track v.name) {
                <tr>
                  <td><code>{{ v.name }}</code></td>
                  <td><code>{{ v.param }}</code></td>
                  <td>{{ v.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </p-card>
      </div>
    </section>

    <p-divider />

    <!-- ══ API Reference ══ -->
    <section class="doc-section">
      <div class="container">
        <h2 class="section-title">API Reference</h2>

        <h3 class="subsection-title">DynamicFormComponent</h3>
        <p-card styleClass="mb-4">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Propriedade</th>
                <th>Tipo</th>
                <th>Obrigatório</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              @for (prop of componentProps; track prop.name) {
                <tr>
                  <td><code>{{ prop.name }}</code></td>
                  <td><code>{{ prop.type }}</code></td>
                  <td>
                    @if (prop.required) {
                      <p-tag value="sim" severity="danger" />
                    } @else {
                      <p-tag value="não" severity="secondary" />
                    }
                  </td>
                  <td>{{ prop.description }}</td>
                </tr>
              }
            </tbody>
          </table>
        </p-card>

        <h3 class="subsection-title">FormSchema</h3>
        <p-card>
          <pre>{{ formSchemaInterface }}</pre>
        </p-card>
      </div>
    </section>

    <!-- ══ Footer ══ -->
    <footer class="site-footer">
      <div class="container">
        <p>
          <strong>&#64;primeng-dynamic-form/core</strong> v0.1.0 &nbsp;·&nbsp;
          Angular 20 + PrimeNG 20 &nbsp;·&nbsp;
          Licença MIT
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      /* ── Header ── */
      .site-header {
        background: var(--p-primary-color);
        color: #fff;
        padding: 1.25rem 0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1rem;
      }

      .header-brand {
        display: flex;
        align-items: center;
        gap: 0.875rem;
      }

      .header-icon {
        font-size: 2rem;
        line-height: 1;
      }

      .header-title {
        margin: 0;
        font-size: 1.375rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #fff;
      }

      .header-subtitle {
        margin: 0;
        font-size: 0.8rem;
        opacity: 0.85;
        color: rgba(255, 255, 255, 0.9);
      }

      .header-badges {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
      }

      /* ── Hero ── */
      .hero-section {
        padding: 2.5rem 0 2rem;
        background: linear-gradient(
          180deg,
          var(--p-primary-50) 0%,
          var(--p-surface-50) 100%
        );
      }

      .hero-lead {
        font-size: 1.125rem;
        color: var(--p-text-muted-color);
        max-width: 680px;
        margin: 0 0 1.5rem;
      }

      .hero-install {
        display: inline-block;
        margin-bottom: 1.5rem;

        pre {
          display: inline-block;
          padding: 0.75rem 1.25rem;
          font-size: 1rem;
          border-radius: 8px;
          margin: 0;
        }
      }

      .hero-features {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .feature-chip {
        display: flex;
        align-items: center;
        gap: 0.375rem;
        background: var(--p-surface-0);
        border: 1px solid var(--p-surface-200);
        border-radius: 20px;
        padding: 0.3rem 0.75rem;
        font-size: 0.8rem;
        color: var(--p-text-color);
        font-weight: 500;
      }

      /* ── Sections ── */
      .section-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--p-text-color);
        margin: 0 0 0.375rem;
      }

      .section-lead {
        color: var(--p-text-muted-color);
        margin: 0 0 1.75rem;
        font-size: 0.95rem;
      }

      .subsection-title {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 1.5rem 0 0.75rem;
        color: var(--p-text-color);
      }

      /* ── Quick Start steps ── */
      .qs-steps {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
      }

      .qs-step-header {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        margin-bottom: 0.625rem;
      }

      .qs-step-number {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: var(--p-primary-color);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: 700;
        flex-shrink: 0;
      }

      .qs-step-label {
        font-weight: 600;
        font-size: 0.9rem;
        color: var(--p-text-color);
      }

      /* ── Footer ── */
      .site-footer {
        background: var(--p-surface-100);
        border-top: 1px solid var(--p-surface-200);
        padding: 1.5rem 0;
        text-align: center;
        font-size: 0.875rem;
        color: var(--p-text-muted-color);
        margin-top: 2rem;
      }

      /* ── Misc ── */
      .mt-3 {
        margin-top: 1rem;
      }

      .mb-3 {
        margin-bottom: 1rem;
      }

      .mb-4 {
        margin-bottom: 1.5rem;
      }
    `,
  ],
})
export class AppComponent {
  // ── Signals para payloads ──
  basicPayload = signal<FormSubmissionPayload | null>(null);
  validationPayload = signal<FormSubmissionPayload | null>(null);
  configPayload = signal<FormSubmissionPayload | null>(null);
  changePayload = signal<FormSubmissionPayload | null>(null);

  // ── Feature chips ──
  features = [
    { icon: '📋', label: '9 tipos de campo' },
    { icon: '✅', label: 'Validações sincronas' },
    { icon: '📦', label: 'Payload padronizado' },
    { icon: '🎨', label: 'Layout configurável' },
    { icon: '🔒', label: 'Peer deps explícitas' },
    { icon: '🧪', label: '64 testes passando' },
  ];

  // ── Basic schema ──
  basicSchema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'basic-contact-form',
    fields: [
      { key: 'name', type: 'text', label: 'Nome completo', validators: [{ name: 'required' }] },
      { key: 'email', type: 'email', label: 'E-mail', validators: [{ name: 'required' }, { name: 'email' }] },
      { key: 'message', type: 'textarea', label: 'Mensagem' },
    ],
  };

  basicSchemaCode = `const schema: FormSchema = {
  schemaVersion: '1.0',
  formId: 'contact-form',
  fields: [
    { key: 'name',    type: 'text',     label: 'Nome completo',
      validators: [{ name: 'required' }] },
    { key: 'email',   type: 'email',    label: 'E-mail',
      validators: [{ name: 'required' }, { name: 'email' }] },
    { key: 'message', type: 'textarea', label: 'Mensagem' },
  ],
};`;

  // ── Validation schema ──
  validationSchema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'validation-demo-form',
    fields: [
      {
        key: 'username',
        type: 'text',
        label: 'Nome de usuário',
        validators: [
          { name: 'required' },
          { name: 'minLength', params: { min: 3 } },
          { name: 'maxLength', params: { max: 20 } },
          { name: 'pattern', params: { pattern: '^[a-z0-9_]+$' } },
        ],
      },
      {
        key: 'password',
        type: 'password',
        label: 'Senha',
        validators: [
          { name: 'required' },
          { name: 'minLength', params: { min: 8 } },
        ],
      },
      {
        key: 'age',
        type: 'number',
        label: 'Idade',
        validators: [
          { name: 'min', params: { min: 18 } },
          { name: 'max', params: { max: 120 } },
        ],
      },
    ],
  };

  validationSchemaCode = `const schema: FormSchema = {
  schemaVersion: '1.0',
  formId: 'validation-demo',
  fields: [
    {
      key: 'username', type: 'text', label: 'Usuário',
      validators: [
        { name: 'required' },
        { name: 'minLength', params: { min: 3 } },
        { name: 'maxLength', params: { max: 20 } },
        { name: 'pattern',   params: { pattern: '^[a-z0-9_]+$' } },
      ],
    },
    {
      key: 'password', type: 'password', label: 'Senha',
      validators: [
        { name: 'required' },
        { name: 'minLength', params: { min: 8 } },
      ],
    },
    {
      key: 'age', type: 'number', label: 'Idade',
      validators: [
        { name: 'min', params: { min: 18 } },
        { name: 'max', params: { max: 120 } },
      ],
    },
  ],
};`;

  // ── Config schema ──
  configSchema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'preferences-form',
    fields: [
      {
        key: 'country',
        type: 'select',
        label: 'País',
        validators: [{ name: 'required' }],
        options: [
          { value: 'BR', label: 'Brasil' },
          { value: 'PT', label: 'Portugal' },
          { value: 'US', label: 'Estados Unidos' },
        ],
      },
      {
        key: 'newsletter',
        type: 'checkbox',
        label: 'Receber newsletter',
      },
      {
        key: 'plan',
        type: 'radio',
        label: 'Plano',
        validators: [{ name: 'required' }],
        options: [
          { value: 'free', label: 'Grátis' },
          { value: 'pro', label: 'Pro' },
        ],
      },
    ],
  };

  customConfig: DynamicFormConfiguration = {
    submitLabel: 'Salvar Preferências',
    showResetButton: true,
    resetLabel: 'Restaurar',
    emitOnChange: true,
    layoutMode: 'vertical',
  };

  configSchemaCode = `const config: DynamicFormConfiguration = {
  submitLabel: 'Salvar Preferências',
  showResetButton: true,
  resetLabel: 'Restaurar',
  emitOnChange: true,
  layoutMode: 'vertical',
};

// No template:
// <pdf-dynamic-form
//   [schema]="schema"
//   [config]="config"
//   (formSubmit)="onSubmit($event)"
//   (formChange)="onFormChange($event)"
// />`;

  // ── Quick Start snippets ──
  importSnippet = `import { DynamicFormComponent } from '@primeng-dynamic-form/core';

@Component({
  standalone: true,
  imports: [DynamicFormComponent],
  ...
})
export class MyComponent { }`;

  schemaSnippet = `import type { FormSchema, FormSubmissionPayload } from '@primeng-dynamic-form/core';

schema: FormSchema = {
  schemaVersion: '1.0',
  formId: 'my-form',
  fields: [
    { key: 'name',  type: 'text',  label: 'Nome',
      validators: [{ name: 'required' }] },
    { key: 'email', type: 'email', label: 'Email',
      validators: [{ name: 'required' }, { name: 'email' }] },
  ],
};

onSubmit(payload: FormSubmissionPayload) {
  console.log(payload); // { valid, values, errors }
}`;

  templateSnippet = `<pdf-dynamic-form
  [schema]="schema"
  (formSubmit)="onSubmit($event)"
/>`;

  // ── Field Types table ──
  fieldTypes = [
    { type: 'text', component: 'InputText', description: 'Campo de texto simples' },
    { type: 'email', component: 'InputText (type=email)', description: 'E-mail com validação de formato' },
    { type: 'password', component: 'Password', description: 'Campo de senha com toggle de visibilidade' },
    { type: 'number', component: 'InputNumber', description: 'Entrada numérica com formatação' },
    { type: 'textarea', component: 'Textarea', description: 'Texto de múltiplas linhas' },
    { type: 'select', component: 'Select', description: 'Lista suspensa de opções' },
    { type: 'checkbox', component: 'Checkbox', description: 'Seleção booleana' },
    { type: 'radio', component: 'RadioButton', description: 'Seleção exclusiva de opções' },
    { type: 'date', component: 'DatePicker', description: 'Seletor de data' },
  ];

  // ── Validators table ──
  validators = [
    { name: 'required', param: '—', description: 'Campo obrigatório' },
    { name: 'minLength', param: '{ min: number }', description: 'Comprimento mínimo da string' },
    { name: 'maxLength', param: '{ max: number }', description: 'Comprimento máximo da string' },
    { name: 'min', param: '{ min: number }', description: 'Valor numérico mínimo' },
    { name: 'max', param: '{ max: number }', description: 'Valor numérico máximo' },
    { name: 'pattern', param: '{ pattern: string }', description: 'Expressão regular (regex)' },
    { name: 'email', param: '—', description: 'Formato de e-mail válido' },
    { name: 'customSync', param: '{ fn: (v) => string | null }', description: 'Função de validação síncrona customizada' },
  ];

  // ── Component props table ──
  componentProps = [
    { name: '[schema]', type: 'FormSchema', required: true, description: 'Schema declarativo do formulário' },
    { name: '[config]', type: 'DynamicFormConfiguration', required: false, description: 'Configurações opcionais de layout e comportamento' },
    { name: '[initialValues]', type: 'Record<string, unknown>', required: false, description: 'Valores iniciais para pré-preencher o formulário' },
    { name: '(formSubmit)', type: 'EventEmitter<FormSubmissionPayload>', required: false, description: 'Emitido ao enviar o formulário válido' },
    { name: '(formChange)', type: 'EventEmitter<FormSubmissionPayload>', required: false, description: 'Emitido a cada mudança (requer emitOnChange: true)' },
  ];

  // ── FormSchema interface ──
  formSchemaInterface = `interface FormSchema {
  schemaVersion: string;    // '1.0' na v1
  formId: string;           // identificador único do formulário
  title?: string;
  fields: FieldDefinition[];
  layout?: LayoutConfig;
}

interface FieldDefinition {
  key: string;              // identificador único do campo
  type: FieldType;          // ver tabela de tipos
  label: string;            // rótulo exibido
  placeholder?: string;
  initialValue?: unknown;
  options?: FieldOption[];  // para select, radio
  validators?: ValidationRule[];
  ui?: UIHints;
  hidden?: boolean;
  disabled?: boolean;
}

interface ValidationRule {
  name: ValidatorName;      // ver tabela de validadores
  params?: Record<string, unknown>;
  message?: string;         // mensagem customizada
}

interface FormSubmissionPayload {
  valid: boolean;
  values: Record<string, unknown>;
  errors: Record<string, string[]>;
}`;

  // ── Handlers ──
  onBasicSubmit(payload: FormSubmissionPayload): void {
    this.basicPayload.set(payload);
  }

  onValidationSubmit(payload: FormSubmissionPayload): void {
    this.validationPayload.set(payload);
  }

  onConfigSubmit(payload: FormSubmissionPayload): void {
    this.configPayload.set(payload);
  }

  onFormChange(payload: FormSubmissionPayload): void {
    this.changePayload.set(payload);
  }
}
