import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Subject, takeUntil } from 'rxjs';
import {
  DynamicFormConfiguration,
  FieldDefinition,
  FormSchema,
  FormSubmissionPayload,
} from '../models/dynamic-form.types';
import { buildFormGroup } from '../validators/control-validator.adapter';
import { buildSubmissionPayload } from '../mappers/submission-payload.mapper';
import { resolveConfig } from '../mappers/config-defaults.mapper';
import { resolveTranslation } from '../mappers/i18n.mapper';
import { parseAndValidateSchema } from '../mappers/schema.mapper';
import { DynamicFormConfigError } from '../models/error-codes';
import { FieldRendererComponent } from './field-renderer.component';

@Component({
  selector: 'pdf-dynamic-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Button, FieldRendererComponent],
  template: `
    @if (configErrors.length > 0) {
      <div role="alert" class="pdf-config-error">
        @for (error of configErrors; track error.code) {
          <p class="pdf-config-error__message">{{ error.message }}</p>
        }
      </div>
    } @else {
      <form [formGroup]="formGroup" (ngSubmit)="onSubmit()" [class]="formClass">
        @for (field of visibleFields; track field.key) {
          <pdf-field-renderer [field]="field" [formGroup]="formGroup" />
        }

        @if (resolvedConfig.showSubmitButton) {
          <div class="pdf-actions">
            <p-button
              type="submit"
              [label]="resolvedConfig.submitLabel"
            />
            @if (resolvedConfig.showResetButton) {
              <p-button
                type="button"
                [label]="resolvedConfig.resetLabel"
                severity="secondary"
                (onClick)="onReset()"
              />
            }
          </div>
        }
      </form>
    }
  `,
  styles: [
    `
      .pdf-form {
        display: grid;
        gap: 1rem;
      }

      .pdf-form--horizontal {
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
        align-items: start;
      }

      .pdf-form--horizontal .pdf-actions {
        grid-column: 1 / -1;
      }

      .pdf-actions {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
      }

      .pdf-config-error {
        display: grid;
        gap: 0.5rem;
      }
    `,
  ],
})
export class DynamicFormComponent implements OnDestroy {
  private schemaInput?: FormSchema;
  private configInput?: DynamicFormConfiguration;
  private initialValuesInput?: Record<string, unknown>;

  @Input({ required: true })
  set schema(value: FormSchema) {
    this.schemaInput = value;
    this.tryInitialize();
  }

  get schema(): FormSchema {
    return this.schemaInput as FormSchema;
  }

  @Input()
  set config(value: DynamicFormConfiguration | undefined) {
    this.configInput = value;
    this.tryInitialize();
  }

  get config(): DynamicFormConfiguration | undefined {
    return this.configInput;
  }

  @Input()
  set initialValues(value: Record<string, unknown> | undefined) {
    this.initialValuesInput = value;
    this.tryInitialize();
  }

  get initialValues(): Record<string, unknown> | undefined {
    return this.initialValuesInput;
  }

  @Output() readonly formSubmit = new EventEmitter<FormSubmissionPayload>();
  @Output() readonly formChange = new EventEmitter<Record<string, unknown>>();
  @Output() readonly beforeSubmit = new EventEmitter<Record<string, unknown>>();
  @Output() readonly afterReset = new EventEmitter<Record<string, unknown>>();

  protected formGroup!: FormGroup;
  protected resolvedConfig!: Required<DynamicFormConfiguration>;
  protected visibleFields: FieldDefinition[] = [];
  protected configErrors: DynamicFormConfigError[] = [];
  protected formClass = 'pdf-form pdf-form--vertical';

  private readonly destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private tryInitialize(): void {
    if (!this.schemaInput) {
      return;
    }

    this.initialize();
  }

  private initialize(): void {
    if (!this.schemaInput) {
      return;
    }

    const schema = this.schemaInput;
    this.destroy$.next();

    this.resolvedConfig = resolveConfig(this.configInput);
    this.resolvedConfig.submitLabel = resolveTranslation({
      key: 'form.submitLabel',
      fallbackText: this.resolvedConfig.submitLabel,
      locale: this.resolvedConfig.locale,
      fallbackLocale: this.resolvedConfig.fallbackLocale,
      translations: this.resolvedConfig.translations,
    });
    this.resolvedConfig.resetLabel = resolveTranslation({
      key: 'form.resetLabel',
      fallbackText: this.resolvedConfig.resetLabel,
      locale: this.resolvedConfig.locale,
      fallbackLocale: this.resolvedConfig.fallbackLocale,
      translations: this.resolvedConfig.translations,
    });
    this.formClass = `pdf-form pdf-form--${this.resolvedConfig.layoutMode}`;

    const { errors } = parseAndValidateSchema(schema);
    this.configErrors = errors;

    if (errors.length > 0) return;

    this.visibleFields = schema.fields
      .filter((f) => !f.hidden)
      .map((field) => {
        const labelKey = field.i18nKey ? `${field.i18nKey}.label` : `fields.${field.key}.label`;
        const placeholderKey = field.i18nKey
          ? `${field.i18nKey}.placeholder`
          : `fields.${field.key}.placeholder`;

        return {
          ...field,
          label: resolveTranslation({
            key: labelKey,
            fallbackText: field.label,
            locale: this.resolvedConfig.locale,
            fallbackLocale: this.resolvedConfig.fallbackLocale,
            translations: this.resolvedConfig.translations,
          }),
          placeholder: resolveTranslation({
            key: placeholderKey,
            fallbackText: field.placeholder ?? '',
            locale: this.resolvedConfig.locale,
            fallbackLocale: this.resolvedConfig.fallbackLocale,
            translations: this.resolvedConfig.translations,
          }),
        };
      });
    this.formGroup = buildFormGroup(this.visibleFields, this.initialValuesInput);

    if (this.resolvedConfig.emitOnChange) {
      this.formGroup.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((values) => this.formChange.emit(values as Record<string, unknown>));
    }
  }

  protected onSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    this.beforeSubmit.emit(this.formGroup.getRawValue() as Record<string, unknown>);
    const payload = buildSubmissionPayload(this.formGroup);
    this.formSubmit.emit(payload);
  }

  protected onReset(): void {
    this.formGroup.reset();
    this.afterReset.emit(this.formGroup.getRawValue() as Record<string, unknown>);
  }
}
