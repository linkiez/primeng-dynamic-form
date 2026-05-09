import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DynamicFormComponent } from '@linkiez/primeng-dynamic-form';
import type { FormSchema, FormSubmissionPayload } from '@linkiez/primeng-dynamic-form';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <pdf-dynamic-form [schema]="schema" (formSubmit)="onSubmit($event)" />
  `,
})
class TestHostComponent {
  schema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'integration-test',
    fields: [{ key: 'name', type: 'text', label: 'Nome' }],
  };
  lastPayload?: FormSubmissionPayload;

  onSubmit(payload: FormSubmissionPayload): void {
    this.lastPayload = payload;
  }
}

describe('Integration: DynamicFormComponent host rendering', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the form element', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should render a pdf-field-renderer for each schema field', () => {
    const fields = fixture.nativeElement.querySelectorAll('pdf-field-renderer');
    expect(fields.length).toBe(1);
  });

  it('should render the submit button by default', () => {
    const btn = fixture.nativeElement.querySelector('p-button[type="submit"]');
    expect(btn).toBeTruthy();
  });

  it('should display config error panel when schema version is invalid', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    component.schema = { schemaVersion: '2.0', formId: 'test', fields: [] };
    fixture.detectChanges();
    const errorPanel = fixture.nativeElement.querySelector('.pdf-config-error');
    expect(errorPanel).toBeTruthy();
  });
});
