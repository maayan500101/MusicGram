import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ORM } from '@ORM';

@ValidatorConstraint({ async: true })
export class UniqueOnDatabaseExistConstraint
  implements ValidatorConstraintInterface
{
  async validate(value: any, args: ValidationArguments) {
    return ORM.getRepository(args.targetName)
      .count({ where: { [args.property]: value } })
      .then((count) => count < 1);
  }
}

export function UniqueFieldValidator(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    validationOptions = {
      ...{ message: `${propertyName} must be unique` },
      ...validationOptions,
    };

    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueOnDatabaseExistConstraint,
    });
  };
}
