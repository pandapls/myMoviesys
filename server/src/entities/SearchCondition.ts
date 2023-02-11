import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";
import { BaseEnitity } from "./BaseEnitity";

export class SearchCondition extends BaseEnitity{

  public static transform(plainObject: object): SearchCondition {
    return super.baseTransform(SearchCondition, plainObject)
  }

  // 页码
  @Min(1, { message: '页码最小为1'})
  @IsInt({ message : '页码必须是整数' })
  @Type(() => Number)
  public page: number = 1;

  // 页容量
  @IsInt({ message: '页容量必须是整数' })
  @Min(1, { message: '页容量最小为1' })
  @Type(() => Number)
  public limit: number  = 10;

  // 查询关键字
  @Type(() => String)
  public key: string = '';
}