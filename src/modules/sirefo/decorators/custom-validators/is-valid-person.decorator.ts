import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, Validate } from 'class-validator';

@ValidatorConstraint({ name: 'isValidPerson', async: false })
export class IsValidPersonConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const { documentType, firstName, paternalLastName, maternalLastName } = args.object as any;
    const isLegal = [1, 3].includes(documentType);
    if (isLegal) return !firstName && !paternalLastName && !maternalLastName;
    if (!firstName || (!paternalLastName && !maternalLastName)) return false;
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const { documentType } = args.object as any;
    return [1, 3].includes(documentType)
      ? 'Los nombres y apellidos deben estar vacíos para personas jurídicas.'
      : 'Nombre y al menos un apellido son requeridos para personas naturales.';
  }
}
