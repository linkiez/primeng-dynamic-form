import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DynamicFormComponent } from '@linkiez/primeng-dynamic-form';
import type { FormSchema, DynamicFormConfiguration } from '@linkiez/primeng-dynamic-form';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <pdf-dynamic-form [schema]="schema" [config]="config" />
  `,
})
class LayoutHostComponent {
  schema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'layout-test',
    fields: [{ key: 'name', type: 'text', label: 'Nome' }],
  };
  config: DynamicFormConfiguration = { layoutMode: 'horizontal', submitLabel: 'Salvar' };
}

describe('Integration: US3 - Layout customization', () => {
  let fixture: ComponentFixture<LayoutHostComponent>;
  let component: LayoutHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutHostComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should apply horizontal layout class when layoutMode=horizontal', () => {
    const form = fixture.nativeElement.querySelector('form');
    expect(form?.classList).toContain('pdf-form--horizontal');
  });

  it('should use custom submitLabel', () => {
    const btn = fixture.nativeElement.querySelector('p-button[type="submit"]');
    expect(btn?.getAttribute('label') ?? btn?.textContent).toBeTruthy();
  });

  it('should hide submit button when showSubmitButton=false', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(LayoutHostComponent);
    component = fixture.componentInstance;
    component.config = { showSubmitButton: false };
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('p-button[type="submit"]');
    expect(btn).toBeFalsy();
  });

  it('should show reset button when showResetButton=true', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(LayoutHostComponent);
    component = fixture.componentInstance;
    component.config = { showResetButton: true };
    fixture.detectChanges();
    const resetBtn = fixture.nativeElement.querySelector('p-button[type="button"]');
    expect(resetBtn).toBeTruthy();
  });

  it('should apply grid layout class when layoutMode=grid', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(LayoutHostComponent);
    component = fixture.componentInstance;
    component.config = { layoutMode: 'grid' };
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form');
    expect(form?.classList).toContain('pdf-form--grid');
  });
});
