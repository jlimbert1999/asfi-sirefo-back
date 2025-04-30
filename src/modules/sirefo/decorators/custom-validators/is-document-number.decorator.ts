import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsDocumentNumber(
  validExtensions: string[],
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDocumentNumber',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const { documentType } = args.object as any;
          if (documentType === 5) return true;
          const term = value.toLowerCase();
          return !validExtensions.some((ex) => term.toLowerCase().includes(ex.toLowerCase()));
        },
        defaultMessage() {
          return 'Document number must not contain extension text';
        },
      },
    });
  };
}
