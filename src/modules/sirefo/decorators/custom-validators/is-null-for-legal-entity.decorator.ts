import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
export function IsNullForLegalEntity(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isNullForLegalEntity',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const { documentType } = args.object as any;
          if ([1, 3].includes(documentType)) return value === null || value === '';
          if (args.property === 'maternalLastName') {
            return true;
          }
          return typeof value === 'string' && (value !== '' || value !== undefined);
        },
        defaultMessage(args: ValidationArguments) {
          const { documentType } = args.object as any;

          return [1, 3].includes(documentType)
            ? `${args.property} must be empty for legal entities (document types 1 or 3).`
            : `${args.property} must be a string`;
        },
      },
    });
  };
}
