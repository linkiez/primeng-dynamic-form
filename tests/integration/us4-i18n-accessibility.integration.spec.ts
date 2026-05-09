import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicFormComponent } from '@linkiez/primeng-dynamic-form';
import type { DynamicFormConfiguration, FormSchema } from '@linkiez/primeng-dynamic-form';

@Component({
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <pdf-dynamic-form [schema]="schema" [config]="config" />
  `,
})
class I18nAccessibilityHostComponent {
  schema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'i18n-a11y-form',
    fields: [
      {
        key: 'name',
        type: 'text',
        label: 'Nome padrao',
        i18nKey: 'profile.name',
        ui: {
          ariaDescription: 'Digite seu nome completo',
        },
      },
    ],
  };

  config: DynamicFormConfiguration = {
    showResetButton: true,
    locale: 'en-US',
    fallbackLocale: 'pt-BR',
    translations: {
      'pt-BR': {
        'form.submitLabel': 'Enviar',
        'form.resetLabel': 'Limpar',
        'profile.name.label': 'Nome',
        'profile.name.placeholder': 'Digite o nome',
      },
      'en-US': {
        'form.submitLabel': 'Submit',
        'form.resetLabel': 'Reset',
        'profile.name.label': 'Name',
        'profile.name.placeholder': 'Type your name',
      },
    },
  };
}

describe('Integration: US4 - i18n and accessibility', () => {
  let fixture: ComponentFixture<I18nAccessibilityHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [I18nAccessibilityHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(I18nAccessibilityHostComponent);
    fixture.detectChanges();
  });

  it('should translate field label and action buttons based on locale', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const labels = Array.from(
      nativeElement.querySelectorAll('label') as NodeListOf<HTMLLabelElement>,
    ).map((label) => label.textContent?.trim());

    expect(labels).toContain('Name');
    expect(fixture.nativeElement.textContent).toContain('Submit');
    expect(fixture.nativeElement.textContent).toContain('Reset');
  });

  it('should wire aria-describedby to description text for field accessibility', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    const input = nativeElement.querySelector('input[id="name"]') as HTMLInputElement;
    const descriptionId = input.getAttribute('aria-describedby');

    expect(descriptionId).toBe('name_description');

    const descriptionElement = nativeElement.querySelector(`#${descriptionId}`);
    expect(descriptionElement).toBeTruthy();
    expect(descriptionElement?.textContent).toContain('Digite seu nome completo');
  });

  it('should fallback to pt-BR when active locale key is missing', () => {
    fixture.destroy();
    fixture = TestBed.createComponent(I18nAccessibilityHostComponent);
    const host = fixture.componentInstance;
    host.config = {
      ...host.config,
      locale: 'es-ES',
    };

    fixture.detectChanges();

    const nativeElement = fixture.nativeElement as HTMLElement;
    const labels = Array.from(
      nativeElement.querySelectorAll('label') as NodeListOf<HTMLLabelElement>,
    ).map((label) => label.textContent?.trim());

    expect(labels).toContain('Nome');
    expect(fixture.nativeElement.textContent).toContain('Enviar');
    expect(fixture.nativeElement.textContent).toContain('Limpar');
  });
});
