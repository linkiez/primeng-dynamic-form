import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DynamicFormComponent } from '@linkiez/primeng-dynamic-form';
import type { FormSchema, DynamicFormConfiguration } from '@linkiez/primeng-dynamic-form';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <pdf-dynamic-form [schema]="schema" [config]="config" (formChange)="onChange($event)" />
  `,
})
class ChangeEventHostComponent {
  schema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'change-test',
    fields: [{ key: 'name', type: 'text', label: 'Nome' }],
  };
  config: DynamicFormConfiguration = { emitOnChange: true };
  changeEvents: Record<string, unknown>[] = [];

  onChange(values: Record<string, unknown>): void {
    this.changeEvents.push(values);
  }
}

describe('Integration: US3 - formChange event', () => {
  let fixture: ComponentFixture<ChangeEventHostComponent>;
  let component: ChangeEventHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeEventHostComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeEventHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit formChange when emitOnChange=true and value changes', () => {
    const dynamicForm = fixture.debugElement.children[0].componentInstance as DynamicFormComponent;
    dynamicForm['formGroup'].setValue({ name: 'Novo Valor' });
    fixture.detectChanges();

    expect(component.changeEvents.length).toBeGreaterThan(0);
    expect(component.changeEvents.at(-1)?.['name']).toBe('Novo Valor');
  });

  it('should not emit formChange when emitOnChange=false', () => {
    component.config = { emitOnChange: false };
    fixture.detectChanges();

    const dynamicForm = fixture.debugElement.children[0].componentInstance as DynamicFormComponent;
    dynamicForm['formGroup'].setValue({ name: 'Test' });
    fixture.detectChanges();

    expect(component.changeEvents.length).toBe(0);
  });
});
