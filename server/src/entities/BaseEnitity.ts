import { ClassConstructor, plainToInstance } from 'class-transformer';
import {  validate } from 'class-validator';

export abstract class BaseEnitity{

  // 将字面量转换成class类
  protected static baseTransform<T> (cls: ClassConstructor<T>, plainObject: object): T {
    if (plainObject instanceof cls) {
      return plainObject;
    }
    return plainToInstance(cls, plainObject);
  }

  // 校验
  public async baseVaildator(_skipMissingProperties = false): Promise<string[]> {  
    const errs = await validate(this, {skipMissingProperties : _skipMissingProperties});
    const temp = errs.map((e) => {
        if (e.constraints ){
          return Object.values(e.constraints);
        }
        
    })
    const result: string[] = []
    temp.forEach(i => {
      if (i) {
        result.push(...i)
      }
    })
    
    return result;
  }
}