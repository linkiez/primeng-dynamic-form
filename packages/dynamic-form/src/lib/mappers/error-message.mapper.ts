export function resolveErrorMessage(errorKey: string, errorValue: unknown): string {
  if (errorValue && typeof errorValue === 'object') {
    const v = errorValue as Record<string, unknown>;
    if (v['message'] && typeof v['message'] === 'string') return v['message'];
  }

  switch (errorKey) {
    case 'required':
      return 'Este campo é obrigatório.';
    case 'email':
      return 'Formato de email inválido.';
    case 'minlength':
      return `Mínimo de ${(errorValue as Record<string, unknown>)['requiredLength'] as number} caracteres.`;
    case 'maxlength':
      return `Máximo de ${(errorValue as Record<string, unknown>)['requiredLength'] as number} caracteres.`;
    case 'min':
      return `Valor mínimo: ${(errorValue as Record<string, unknown>)['min'] as number}.`;
    case 'max':
      return `Valor máximo: ${(errorValue as Record<string, unknown>)['max'] as number}.`;
    case 'pattern':
      return 'Formato inválido.';
  }

  return `Valor inválido (${errorKey}).`;
}

export function getFirstErrorMessage(errors: Record<string, unknown> | null): string | null {
  if (!errors) return null;
  const entries = Object.entries(errors);
  if (entries.length === 0) return null;
  const [firstKey, firstValue] = entries[0];
  return resolveErrorMessage(firstKey, firstValue);
}
