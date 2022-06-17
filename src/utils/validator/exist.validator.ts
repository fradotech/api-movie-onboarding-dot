import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class ExistValidator implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments: ValidationArguments){
    let data = { [validationArguments.constraints[1]]: validationArguments.value }
    let isExist = await getConnection().getRepository(validationArguments.constraints[0]).findOne(data)
    if(isExist) return false
    return true
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} ${validationArguments.value} has been exist`
  }
}

export function IsExist(option: any, validationOption?: ValidationOptions){
  return function (object: any, propertyName: string){
    registerDecorator({
      name: 'isExist',
      target: object.constructor,
      propertyName,
      constraints: option,
      options: validationOption,
      validator: ExistValidator,
      async: true
    })
  }
}