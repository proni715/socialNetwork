import { ValidationOptions, registerDecorator } from 'class-validator';
import { UserExistConstraint } from '../constraints/userExist';

export function IsUserExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsUserExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: UserExistConstraint,
    });
  };
}
