import {
  IsArray,
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsNonEmptyArray(validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isNonEmptyArray',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!Array.isArray(value) || value.length === 0) {
            return false;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} should be a non-empty array`;
        },
      },
    });
  };
}
