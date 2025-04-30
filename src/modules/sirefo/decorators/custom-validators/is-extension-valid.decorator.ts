import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsExtensionValid(
  validExtensions: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isExtensionValid',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const { documentType } = args.object as any;

          // Puede ser vacío si tipoDocumento es 1, 2, 3 o 4
          if (!value) return [1, 2, 3, 4].includes(documentType);

          // Solo puede ser "PE" si tipoDocumento es 2 o 5
          if (value === 'PE' && ![2, 5].includes(documentType)) {
            return false;
          }
          return validExtensions.includes(value);
        },
        defaultMessage() {
          return 'Invalid extension for the provided document type.';
        },
      },
    });
  };
}
