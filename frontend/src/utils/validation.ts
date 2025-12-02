type ValidationRule = {
  required?: boolean;
  min?: number; // for min string length or numeric
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null; // return null if ok or error message
  message?: string; // default message override
};

export type ValidationSchema = Record<string, ValidationRule>;

export function validate(data: Record<string, any>, schema: ValidationSchema) {
  const errors: Record<string, string[]> = {};
  let valid = true;

  for (const [key, rule] of Object.entries(schema)) {
    const value = data[key];
    const fieldErrors: string[] = [];

    if (rule.required && (value === undefined || value === null || value === '')) {
      fieldErrors.push(rule.message || 'This field is required');
    } else if (value !== undefined && value !== null && value !== '') {
      if (rule.min !== undefined) {
        if (typeof value === 'string' && value.length < rule.min) {
          fieldErrors.push(rule.message || `Minimum ${rule.min} characters required`);
        }
        if (typeof value === 'number' && value < rule.min) {
          fieldErrors.push(rule.message || `Value must be >= ${rule.min}`);
        }
      }
      if (rule.max !== undefined) {
        if (typeof value === 'string' && value.length > rule.max) {
          fieldErrors.push(rule.message || `Maximum ${rule.max} characters allowed`);
        }
        if (typeof value === 'number' && value > rule.max) {
          fieldErrors.push(rule.message || `Value must be <= ${rule.max}`);
        }
      }
      if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        fieldErrors.push(rule.message || `Invalid format`);
      }
      if (rule.custom) {
        const customMessage = rule.custom(value);
        if (customMessage) fieldErrors.push(customMessage);
      }
    }

    if (fieldErrors.length) {
      valid = false;
      errors[key] = fieldErrors;
    }
  }

  return { valid, errors };
}

export function validateField(value: any, rule: ValidationRule) {
  const result = validate({ value }, { value: rule });
  return result;
}

export default validate;
