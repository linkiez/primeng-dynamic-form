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
          />
        }
        @case ('checkbox') {
          <div class="pdf-field__checkbox">
            <p-checkbox
              [inputId]="field().key"
              [formControl]="fieldControl"
              [binary]="true"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
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
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
      }

      @if (hasError && errorMessage) {
        <p-message severity="error" [text]="errorMessage" />
      }
    </div>
  `,
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
}
