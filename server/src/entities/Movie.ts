import { ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseEnitity } from './BaseEnitity'

export class Movie extends BaseEnitity{

  public static transform (plainObject: object): Movie {
    return super.baseTransform(Movie, plainObject);
  }
  
  @IsNotEmpty({ message: '电影名称不可以为空' })
  @Type(() => String)
  public name: string;

  @IsNotEmpty( { message: '电影类型不可以为空' } )
  @ArrayMinSize(1, { message: '电影类型至少有一个' })
  @IsArray({ message: '电影类型必须是数组' })
  @Type(() => String)
  public types: string[]

  @IsNotEmpty( { message: '上映地区不可以为空' } )
  @ArrayMinSize(1, { message: '上映地区至少有一个' })
  @IsArray({ message: '上映地区必须是数组' })
  @Type(() => String)
  public areas: string[];

  @IsNotEmpty({ message: '电影时长不可以为空' })
  @IsInt({ message: '时长必须是整数'})
  @Min(1, { message: '时长最小一分钟' })
  @Max(9999, { message: '时长最多9999分钟' })
  @Type(() => Number)
  public timeLong: number;

  @IsNotEmpty({ message : '是否可以热映不可以为空' })
  @Type(() => Boolean)
  public isHot: boolean;

  @IsNotEmpty({ message : '是否即将上映不可以为空' })
  @Type(() => Boolean)
  public isComing: boolean;

  @IsNotEmpty({ message : '是否为经典影片不可以为空' })
  @Type(() => Boolean)
  public isClaic: boolean;

  // 简介
  public description?: string;

  // 海报图片
  public poster?: string;

}