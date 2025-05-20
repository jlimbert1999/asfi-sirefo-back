import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsUniqueItem(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUniqueItem',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any[], args: ValidationArguments) {
          const property = args.constraints[0];

          if (!Array.isArray(value)) return false;

          const itemValues = value.map((detail) => detail[property]);

          const uniqueValues = new Set(itemValues);
          const isUnique = itemValues.length === uniqueValues.size;

          return isUnique;
        },
        defaultMessage(args: ValidationArguments) {
          const property = args.constraints[0];
          return `All elements in '${args.property}' must have unique '${property}' values`;
        },
      },
    });
  };
}
