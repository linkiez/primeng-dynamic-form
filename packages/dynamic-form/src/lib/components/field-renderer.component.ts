import { Component, input } from '@angular/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { InputPassword } from 'primeng/inputpassword';
import { InputNumber } from 'primeng/inputnumber';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { AutoComplete } from 'primeng/autocomplete';
import { CascadeSelect } from 'primeng/cascadeselect';
import { Checkbox } from 'primeng/checkbox';
import { RadioButton } from 'primeng/radiobutton';
import { Listbox } from 'primeng/listbox';
import { SelectButton } from 'primeng/selectbutton';
import { ToggleButton } from 'primeng/togglebutton';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { InputColor } from 'primeng/inputcolor';
import { InputMask } from 'primeng/inputmask';
import { InputOtp } from 'primeng/inputotp';
import { InputTags } from 'primeng/inputtags';
import { DatePicker } from 'primeng/datepicker';
import { Slider } from 'primeng/slider';
import { Knob } from 'primeng/knob';
import { Rating } from 'primeng/rating';
import { TreeSelect } from 'primeng/treeselect';
import { Bind } from 'primeng/bind';
import { FileUpload } from 'primeng/fileupload';
import { FloatLabel } from 'primeng/floatlabel';
import { FieldDefinition } from '../models/dynamic-form.types';
import { getFirstErrorMessage } from '../mappers/error-message.mapper';

@Component({
  selector: 'pdf-field-renderer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputText,
    InputPassword,
    InputNumber,
    Textarea,
    Select,
    AutoComplete,
    CascadeSelect,
    Checkbox,
    RadioButton,
    Listbox,
    SelectButton,
    ToggleButton,
    ToggleSwitch,
    InputColor,
    InputMask,
    InputOtp,
    InputTags,
    DatePicker,
    Slider,
    Knob,
    Rating,
    TreeSelect,
    Bind,
    FileUpload,
    FloatLabel,
],
  template: `
    <div class="pdf-field" [class.pdf-field--error]="hasError">
      @switch (field().type) {
        @case ('text') {
          <p-floatlabel variant="on">
            <input
              pInputText
              [pBind]="field().componentProps"
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
              [pBind]="field().componentProps"
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
            <input
              pInputText
              pInputPassword
              [pBind]="field().componentProps"
              [id]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [mask]="componentProp('toggleMask', true)"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
        @case ('number') {
          <p-floatlabel variant="on">
            <p-inputnumber
              [pBind]="field().componentProps"
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
              [pBind]="field().componentProps"
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
            [pBind]="field().componentProps"
            [inputId]="field().key"
            [formControl]="fieldControl"
            [options]="field().options ?? []"
            optionLabel="label"
            optionValue="value"
            [filter]="componentProp('filter', false)"
            [showClear]="componentProp('showClear', false)"
            [variant]="componentProp('variant', undefined)"
            [panelStyle]="componentProp('panelStyle', undefined)"
            [placeholder]="field().placeholder ?? field().label"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('autocomplete') {
          <p-autocomplete
            [pBind]="field().componentProps"
            [inputId]="field().key"
            [formControl]="fieldControl"
            [suggestions]="field().options ?? []"
            optionLabel="label"
            optionValue="value"
            [placeholder]="field().placeholder ?? field().label"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('cascadeselect') {
          <p-cascadeselect
            [pBind]="field().componentProps"
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
              [pBind]="field().componentProps"
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
                  [pBind]="field().componentProps"
                  [inputId]="field().key + '_' + option.value"
                  [value]="option.value"
                  [formControl]="fieldControl"
                />
                <label [for]="field().key + '_' + option.value">{{ option.label }}</label>
              </div>
            }
          </div>
        }
        @case ('multiselect') {
          <p-select
            [pBind]="field().componentProps"
            [inputId]="field().key"
            [formControl]="fieldControl"
            [options]="field().options ?? []"
            optionLabel="label"
            optionValue="value"
            [multiple]="true"
            [placeholder]="field().placeholder ?? field().label"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('listbox') {
          <p-listbox
            [pBind]="field().componentProps"
            [formControl]="fieldControl"
            [options]="field().options ?? []"
            optionLabel="label"
            optionValue="value"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('selectbutton') {
          <p-selectbutton
            [pBind]="field().componentProps"
            [formControl]="fieldControl"
            [options]="field().options ?? []"
            optionLabel="label"
            optionValue="value"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('togglebutton') {
          <p-togglebutton
            [pBind]="field().componentProps"
            [formControl]="fieldControl"
            onLabel="Sim"
            offLabel="Nao"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('toggleswitch') {
          <p-toggleswitch
            [pBind]="field().componentProps"
            [inputId]="field().key"
            [formControl]="fieldControl"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
          <label [for]="field().key">{{ field().label }}</label>
        }
        @case ('colorpicker') {
          <p-inputcolor
            [pBind]="field().componentProps"
            [formControl]="fieldControl"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('inputmask') {
          <p-inputmask
            [pBind]="field().componentProps"
            [id]="field().key"
            [formControl]="fieldControl"
              [mask]="componentProp('mask', field().placeholder ?? '9999-9999')"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('inputotp') {
          <p-inputotp
            [pBind]="field().componentProps"
            [formControl]="fieldControl"
              [length]="componentProp('length', 6)"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('inputtags') {
          <p-inputtags
            [pBind]="field().componentProps"
            [formControl]="fieldControl"
            [placeholder]="field().placeholder ?? field().label"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('editor') {
          <textarea
            pTextarea
            [pBind]="field().componentProps"
            [id]="field().key"
            [formControl]="fieldControl"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
            rows="6"
          ></textarea>
          <label [for]="field().key">{{ field().label }}</label>
        }
        @case ('date') {
          <p-floatlabel variant="on">
            <p-datepicker
              [pBind]="field().componentProps"
              [inputId]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [showIcon]="componentProp('showIcon', false)"
              [showButtonBar]="componentProp('showButtonBar', false)"
              [dateFormat]="componentProp('dateFormat', 'dd/mm/yy')"
              [view]="componentProp('view', 'date')"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
        @case ('date-range') {
          <p-floatlabel variant="on">
            <p-datepicker
              [pBind]="field().componentProps"
              [inputId]="field().key"
              [formControl]="fieldControl"
              [placeholder]="field().placeholder ?? ''"
              [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
              [showIcon]="componentProp('showIcon', false)"
              [showButtonBar]="componentProp('showButtonBar', false)"
              [selectionMode]="componentProp('selectionMode', 'range')"
              [dateFormat]="componentProp('dateFormat', 'dd/mm/yy')"
              [attr.aria-describedby]="ariaDescribedBy"
            />
            <label [for]="field().key">{{ field().label }}</label>
          </p-floatlabel>
        }
        @case ('slider') {
          <label [for]="field().key">{{ field().label }}</label>
          <p-slider
            [pBind]="field().componentProps"
            [formControl]="fieldControl"
            [min]="componentProp('min', 0)"
            [max]="componentProp('max', 100)"
            [step]="componentProp('step', 1)"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('knob') {
          <p-knob
            [pBind]="field().componentProps"
            [formControl]="fieldControl"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
          <label [for]="field().key">{{ field().label }}</label>
        }
        @case ('rating') {
          <p-rating
            [pBind]="field().componentProps"
            [formControl]="fieldControl"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('treeselect') {
          <p-treeselect
            [pBind]="field().componentProps"
            [inputId]="field().key"
            [formControl]="fieldControl"
            [options]="field().options ?? []"
            [placeholder]="field().placeholder ?? field().label"
            [attr.aria-label]="field().ui?.ariaLabel ?? field().label"
            [attr.aria-describedby]="ariaDescribedBy"
          />
        }
        @case ('file') {
          <div class="pdf-field__file">
            <label [for]="field().key" class="pdf-field__file-label">{{ field().label }}</label>
            <p-fileupload
              [pBind]="field().componentProps"
              [name]="field().key"
              [mode]="componentProp('mode', 'basic')"
              [customUpload]="componentProp('customUpload', true)"
              [auto]="componentProp('auto', false)"
              [chooseLabel]="componentProp('chooseLabel', field().label)"
              [showUploadButton]="componentProp('showUploadButton', false)"
              [showCancelButton]="componentProp('showCancelButton', false)"
              [multiple]="componentProp('multiple', field().multiple ?? false)"
              [accept]="componentProp('accept', field().accept ?? '')"
              [maxFileSize]="componentProp('maxFileSize', field().maxFileSizeBytes)"
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
              [pBind]="field().componentProps"
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
          <p class="p-error text-xs pdf-field__error">
            <small>{{ errorMessage }}</small>
          </p>
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

      .pdf-field__error {
        display: block;
        margin-top: 4px;
        margin-bottom: 0;
      }

      .pdf-field__error small {
        color: var(--p-error-color);
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

  protected componentProp<T>(name: string, fallback: T): T {
    const value = this.field().componentProps?.[name];
    return value === undefined ? fallback : (value as T);
  }

  protected get hasError(): boolean {
    const control = this.fieldControl;
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  protected get errorMessage(): string | null {
    const control = this.fieldControl;
    if (!control?.errors) return null;
    return getFirstErrorMessage(control.errors, this.field().label);
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
    const multiple = this.componentProp('multiple', this.field().multiple ?? false);
    const value = multiple ? files : files[0] ?? null;

    this.fieldControl.setValue(value);
    this.fieldControl.markAsDirty();
    this.fieldControl.markAsTouched();
  }
}
