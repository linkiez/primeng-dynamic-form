import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DynamicFormComponent } from '@primeng-dynamic-form/core';
import type { FormSchema, FormSubmissionPayload } from '@primeng-dynamic-form/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <pdf-dynamic-form [schema]="schema" (formSubmit)="onSubmit($event)" />
  `,
})
class ValidationHostComponent {
  schema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'validation-test',
    fields: [
      {
        key: 'email',
        type: 'email',
        label: 'Email',
        validators: [{ name: 'required' }, { name: 'email' }],
      },
      {
        key: 'name',
        type: 'text',
        label: 'Nome',
        validators: [{ name: 'required' }, { name: 'minLength', params: { min: 3 } }],
      },
    ],
  };
  lastPayload?: FormSubmissionPayload;
  submitCount = 0;

  onSubmit(payload: FormSubmissionPayload): void {
    this.lastPayload = payload;
    this.submitCount++;
  }
}

describe('Integration: US2 - Validation flow', () => {
  let fixture: ComponentFixture<ValidationHostComponent>;
  let component: ValidationHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationHostComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not emit formSubmit when form is invalid on submit', () => {
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.submitCount).toBe(0);
  });

  it('should mark controls as touched when invalid submit is attempted', () => {
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    const dynamicForm = fixture.debugElement.children[0].componentInstance as DynamicFormComponent;
    expect(dynamicForm['formGroup'].touched).toBe(true);
  });

  it('should emit formSubmit with valid payload when form is valid', async () => {
    const form = fixture.nativeElement.querySelector('form');
    const dynamicForm = fixture.debugElement.children[0].componentInstance as DynamicFormComponent;

    dynamicForm['formGroup'].setValue({ email: 'valid@test.com', name: 'João' });
    fixture.detectChanges();

    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    expect(component.submitCount).toBe(1);
    expect(component.lastPayload?.valid).toBe(true);
    expect(component.lastPayload?.values['email']).toBe('valid@test.com');
  });
});
