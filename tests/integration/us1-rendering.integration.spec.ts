import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { DynamicFormComponent } from '@primeng-dynamic-form/core';
import type { FormSchema } from '@primeng-dynamic-form/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: true,
  imports: [DynamicFormComponent],
  template: `<pdf-dynamic-form [schema]="schema" />`,
})
class RenderingHostComponent {
  schema: FormSchema = {
    schemaVersion: '1.0',
    formId: 'rendering-test',
    fields: [
      { key: 'name', type: 'text', label: 'Nome' },
      { key: 'email', type: 'email', label: 'Email' },
      { key: 'pass', type: 'password', label: 'Senha' },
      { key: 'age', type: 'number', label: 'Idade' },
      { key: 'bio', type: 'textarea', label: 'Bio' },
      {
        key: 'role',
        type: 'select',
        label: 'Papel',
        options: [{ label: 'Admin', value: 'admin' }],
      },
      { key: 'agree', type: 'checkbox', label: 'Concordo' },
      {
        key: 'gender',
        type: 'radio',
        label: 'Gênero',
        options: [
          { label: 'Masculino', value: 'M' },
          { label: 'Feminino', value: 'F' },
        ],
      },
      { key: 'birth', type: 'date', label: 'Nascimento' },
    ],
  };
}

describe('Integration: US1 - Field type rendering', () => {
  let fixture: ComponentFixture<RenderingHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderingHostComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RenderingHostComponent);
    fixture.detectChanges();
  });

  it('should render all 9 field types without error', () => {
    const fields = fixture.nativeElement.querySelectorAll('pdf-field-renderer');
    expect(fields.length).toBe(9);
  });

  it('should render a text input for type=text', () => {
    const input = fixture.nativeElement.querySelector('input[id="name"]');
    expect(input).toBeTruthy();
  });

  it('should render an email input for type=email', () => {
    const input = fixture.nativeElement.querySelector('input[id="email"][type="email"]');
    expect(input).toBeTruthy();
  });

  it('should render a p-select for type=select', () => {
    const select = fixture.nativeElement.querySelector('p-select');
    expect(select).toBeTruthy();
  });

  it('should render a p-checkbox for type=checkbox', () => {
    const checkbox = fixture.nativeElement.querySelector('p-checkbox');
    expect(checkbox).toBeTruthy();
  });

  it('should render p-radiobutton items for type=radio', () => {
    const radios = fixture.nativeElement.querySelectorAll('p-radiobutton');
    expect(radios.length).toBe(2);
  });

  it('should not render hidden fields', async () => {
    const component = fixture.componentInstance;
    component.schema = {
      ...component.schema,
      fields: [
        { key: 'visible', type: 'text', label: 'Visível' },
        { key: 'hidden', type: 'text', label: 'Oculto', hidden: true },
      ],
    };
    fixture.detectChanges();
    const fields = fixture.nativeElement.querySelectorAll('pdf-field-renderer');
    expect(fields.length).toBe(1);
  });
});
