export function resolveErrorMessage(
  errorKey: string,
  errorValue: unknown,
  fieldName = 'Campo',
): string {
  if (errorValue && typeof errorValue === 'object') {
    const v = errorValue as Record<string, unknown>;
    if (v['message'] && typeof v['message'] === 'string') return v['message'];
  }

  switch (errorKey) {
    case 'required':
      return `${fieldName} é obrigatório`;
    case 'email':
      return `${fieldName} deve ter um formato de email válido`;
    case 'minlength':
      return `${fieldName} deve ter pelo menos ${(errorValue as Record<string, unknown>)['requiredLength'] as number} caracteres`;
    case 'maxlength':
      return `${fieldName} deve ter no máximo ${(errorValue as Record<string, unknown>)['requiredLength'] as number} caracteres`;
    case 'min':
      return `${fieldName} deve ser no mínimo ${(errorValue as Record<string, unknown>)['min'] as number}`;
    case 'max':
      return `${fieldName} deve ser no máximo ${(errorValue as Record<string, unknown>)['max'] as number}`;
    case 'pattern':
      return `${fieldName} não atende ao formato exigido`;
  }

  return `${fieldName} é inválido`;
}

export function getFirstErrorMessage(
  errors: Record<string, unknown> | null,
  fieldName = 'Campo',
): string | null {
  if (!errors) return null;
  const entries = Object.entries(errors);
  if (entries.length === 0) return null;
  const [firstKey, firstValue] = entries[0];
  return resolveErrorMessage(firstKey, firstValue, fieldName);
}
