import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isDocumentNumber', async: false })
export class IsDocumentNumber implements ValidatorConstraintInterface {
  validate(value: string | null | undefined, args: ValidationArguments) {
    if(!value) return false
    const { documentType } = args.object as any;
    const validExtensions: string[] = args.constraints;
    if (documentType === 5) {
      return (
        /^\d+$/.test(value) || // solo números
        /^E\d+$/.test(value) || // E123456
        /^E-\d+$/.test(value) // E-123456
      );
    }
    const term = value.toLowerCase();
    return !validExtensions.some((ex) => term.toLowerCase().includes(ex.toLowerCase()));
  }

  defaultMessage() {
    return 'El número de documento es inválido (contiene extensión o formato incorrecto)';
  }
}
