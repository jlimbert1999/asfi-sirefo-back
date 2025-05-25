import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsAutoConclusionValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isAutoConclusionValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any[], args: ValidationArguments) {
          if (!Array.isArray(value)) return false;
          if (args.object['processType'] === 'R') return true;
          return value.every((item: any) => !!item['autoConclusion']);
        },
        defaultMessage() {
          return `La auto conclusion es obligatoria para una solicitud de SUSPENSION`;
        },
      },
    });
  };
}
