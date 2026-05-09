import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { DatePicker } from 'primeng/datepicker';
import { FileUpload } from 'primeng/fileupload';
import { FloatLabel } from 'primeng/floatlabel';
import { Message } from 'primeng/message';
import { FieldDefinition } from '../models/dynamic-form.types';
import { getFirstErrorMessage } from '../mappers/error-message.mapper';

@Component({
  selector: 'pdf-field-renderer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputText,
    Password,
    InputNumber,
    Textarea,
    Select,
    Checkbox,
    RadioButton,
    DatePicker,
    FileUpload,
    FloatLabel,
    Message,
  ],
  template: `
    <div class="pdf-field" [class.pdf-field--error]="hasError">
      @switch (field().type) {
        @case ('text') {
          <p-floatlabel variant="on">
            <input
              pInputText
              [id]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
        @case ('email') {
          <p-floatlabel variant="on">
            <input
              pInputText
              type="email"
              [id]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
        @case ('password') {
          <p-floatlabel variant="on">
            <p-password
              [inputId]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [feedback]="false"
              [toggleMask]="true"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
        @case ('number') {
          <p-floatlabel variant="on">
            <p-inputnumber
              [inputId]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
        @case ('textarea') {
          <p-floatlabel variant="on">
            <textarea
              pTextarea
              [id]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [attr.aria-describedby]="ariaDescribedBy"
              rows="3"
            ></textarea>
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
        @case ('select') {
          <p-select
            [inputId]="field().key"
            [formControl]="fieldControl"
            [options]="field().options ?? []"
            optionLabel="label"
            optionValue="value"
            [placeholder]="field().placeholder ?? field().label"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('checkbox') {
          <div class="pdf-field__checkbox">
            <p-checkbox
              [inputId]="field().key"
              [formControl]="fieldControl"
              [binary]="true"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key" class="pdf-field__checkbox-label">
              {{ field().label }}
            </label>
          </div>
        }
        @case ('radio') {
          <div
            class="pdf-field__radio-group"
            role="radiogroup"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          >
            <span class="pdf-field__radio-label">{{ field().label }}</span>
            @for (option of field().options ?? []; track option.value) {
              <div class="pdf-field__radio-item">
                <p-radiobutton
                  [inputId]="field().key + '_' + option.value"
                  [value]="option.value"
                  [formControl]="fieldControl"
                />
                <label [for]="field().key + '_' + option.value">{{ option.label }}</label>
              </div>
            }
          </div>
        }
        @case ('date') {
          <p-floatlabel variant="on">
            <p-datepicker
              [inputId]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              dateFormat="dd/mm/yy"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
        @case ('date-range') {
          <p-floatlabel variant="on">
            <p-datepicker
              [inputId]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              selectionMode="range"
              dateFormat="dd/mm/yy"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
        @case ('file') {
          <div class="pdf-field__file">
            <label [for]="field().key" class="pdf-field__file-label">{{ field().label }}</label>
            <p-fileupload
              [name]="field().key"
              mode="basic"
              [customUpload]="true"
              [auto]="false"
              [chooseLabel]="field().label"
              [showUploadButton]="false"
              [showCancelButton]="false"
              [multiple]="field().multiple ?? false"
              [accept]="field().accept ?? ''"
              [maxFileSize]="field().maxFileSizeBytes"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [attr.aria-describedby]="ariaDescribedBy"
              (onSelect)="onFileSelect($event)"
            />
          </div>
        }
        @case ('custom') {
          <p-floatlabel variant="on">
            <input
              pInputText
              [id]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
      }

      @if (descriptionText) {
        <span [id]="descriptionId" class="pdf-visually-hidden">{{ descriptionText }}</span>
      }

      @if (hasError && errorMessage) {
        <div [id]="errorId" aria-live="assertive" role="alert">
          <p-message severity="error" [text]="errorMessage" />
        </div>
      }
    </div>
  `,
  styles: [
    `
      .pdf-field {
        display: grid;
        gap: 0.5rem;
      }

      .pdf-field__checkbox {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .pdf-field__radio-group {
        display: grid;
        gap: 0.5rem;
      }

      .pdf-field__radio-item {
        display: flex;
        gap: 0.5rem;
        align-items: center;
      }

      .pdf-field__file {
        display: grid;
        gap: 0.5rem;
      }

      .pdf-field__file-label {
        font-size: 0.95rem;
      }

      .pdf-visually-hidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }
    `,
  ],
})
export class FieldRendererComponent {
  readonly field = input.required<FieldDefinition>();
  readonly formGroup = input.required<FormGroup>();

  protected get fieldControl(): FormControl<unknown> {
    return this.formGroup().get(this.field().key) as FormControl<unknown>;
  }

  protected get hasError(): boolean {
    const control = this.fieldControl;
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  protected get errorMessage(): string | null {
    const control = this.fieldControl;
    if (!control?.errors) return null;
    return getFirstErrorMessage(control.errors);
  }

  protected get descriptionId(): string {
    return this.field().ui?.ariaDescriptionId ?? `${this.field().key}_description`;
  }

  protected get descriptionText(): string | undefined {
    return this.field().ui?.ariaDescription;
  }

  protected get errorId(): string {
    return `${this.field().key}_error`;
  }

  protected get ariaDescribedBy(): string | null {
    const tokens: string[] = [];
    if (this.descriptionText) {
      tokens.push(this.descriptionId);
    }
    if (this.hasError && this.errorMessage) {
      tokens.push(this.errorId);
    }

    return tokens.length > 0 ? tokens.join(' ') : null;
  }

  protected onFileSelect(event: unknown): void {
    const payload = event as { files?: File[] };
    const files = payload.files ?? [];
    const value = this.field().multiple ? files : files[0] ?? null;

    this.fieldControl.setValue(value);
    this.fieldControl.markAsDirty();
    this.fieldControl.markAsTouched();
  }
}
