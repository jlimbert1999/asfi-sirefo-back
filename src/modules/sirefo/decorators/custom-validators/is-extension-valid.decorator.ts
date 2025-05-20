import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isExtensionValid', async: false })
export class IsExtensionValid implements ValidatorConstraintInterface {
  validate(value: string | null | undefined, args: ValidationArguments) {
    const { documentType } = args.object as any;
    const validExtensions: string[] = args.constraints;
    if (!value) return [1, 2, 3, 4].includes(documentType);
    if (documentType === 5) return value === 'PE';
    if (value === 'PE') return [2, 5].includes(documentType);
    return validExtensions.includes(value);
  }

  defaultMessage(args: ValidationArguments) {
    return `La extension ${args.value ?? '(Nulo)'} para el tipo de documento ${args.object['documentType']} no es valida`;
  }
}
