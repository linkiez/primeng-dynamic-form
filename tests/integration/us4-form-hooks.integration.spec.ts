import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from '@linkiez/primeng-dynamic-form';
import type {
  DynamicFormConfiguration,
  FormSchema,
  FormSubmissionPayload,
} from '@linkiez/primeng-dynamic-form';

@Component({
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <pdf-dynamic-form
      [schema]="schema"
      [config]="config"
      (beforeSubmit)="onBeforeSubmit($event)"
      (afterReset)="onAfterReset($event)"
      (formSubmit)="onSubmit($event)"
    />
  `,
})
class HookEventsHostComponent {
  schema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'hook-events-form',
    fields: [{ key: 'name', type: 'text', label: 'Nome' }],
  };

  config: DynamicFormConfiguration = {
    showResetButton: true,
  };

  beforeSubmitEvents: Record<string, unknown>[] = [];
  afterResetEvents: Record<string, unknown>[] = [];
  submitEvents: FormSubmissionPayload[] = [];

  onBeforeSubmit(event: Record<string, unknown>): void {
    this.beforeSubmitEvents.push(event);
  }

  onAfterReset(event: Record<string, unknown>): void {
    this.afterResetEvents.push(event);
  }

  onSubmit(event: FormSubmissionPayload): void {
    this.submitEvents.push(event);
  }
}

describe('Integration: US4 - Form lifecycle hooks', () => {
  let fixture: ComponentFixture<HookEventsHostComponent>;
  let host: HookEventsHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HookEventsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HookEventsHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit beforeSubmit and formSubmit on successful submit', () => {
    const dynamicForm = fixture.debugElement.children[0].componentInstance as DynamicFormComponent;

    dynamicForm['formGroup'].setValue({ name: 'Fabio' });
    dynamicForm['onSubmit']();

    expect(host.beforeSubmitEvents).toHaveLength(1);
    expect(host.submitEvents).toHaveLength(1);
    expect(host.beforeSubmitEvents[0]?.['name']).toBe('Fabio');
  });

  it('should emit afterReset when reset is triggered', () => {
    const dynamicForm = fixture.debugElement.children[0].componentInstance as DynamicFormComponent;

    dynamicForm['formGroup'].setValue({ name: 'Value before reset' });
    dynamicForm['onReset']();

    expect(host.afterResetEvents).toHaveLength(1);
  });
});
