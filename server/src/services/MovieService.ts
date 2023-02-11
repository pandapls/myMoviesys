import { Movie } from '../entities/Movie';
import { IMovie } from '../db/MovieSchema';
import { MovieModel } from '../db/db';
import { SearchCondition } from '../entities/SearchCondition';
import { ISearchResult } from '../entities/CommonTypes';

export class MovieService {

  public static async add(movie: Movie): Promise<IMovie | string[]> {
    // 1. 转换类型
    movie = Movie.transform(movie);
    // 2. 数据验证
    const validateResult = await movie.baseVaildator();
    if (validateResult.length > 0) {
      return validateResult
    }
    // 3. 添加到数据库
    return await MovieModel.create(movie);
  }

  public static async updata(id: string, movie: Movie): Promise<string[] | boolean>{
        // 1. 转换类型
        movie = Movie.transform(movie);
        // 2. 数据验证
        const validateResult = await movie.baseVaildator(true);
        if (validateResult.length > 0) {
          return validateResult
        }
        // 3. 添加到数据库
        const result = await MovieModel.updateOne({_id: id}, movie);
        console.log(result, 'reslit');
        
        return result.modifiedCount > 0;
  }

  public static async delet(id: string): Promise<boolean>{

    const result = await MovieModel.deleteOne({_id: id});
    return result.deletedCount > 0 ? true : false
  }

  public static async findById(id: string): Promise<IMovie | null>{

    return await MovieModel.findById(id);
  }

  /**
   * @description: 
   * @param {*} condition page limit key
   * @return {*}
   */  
  public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>>{
    // 1. 转换类型
    const searchObj = SearchCondition.transform(condition);
    // 2. 数据验证
    const validateResult = await searchObj.baseVaildator(true);

    // 查询数据
    const result = await MovieModel
      .find({
        name: { $regex: new RegExp(searchObj.key) },
      })
      .skip((searchObj.page -1) * searchObj.limit)
      .limit(searchObj.limit);

    // 查询总数
    const count = await MovieModel.find({
      name: { $regex: new RegExp(searchObj.key) },
    }).countDocuments();
    return { data: result, count, errors: validateResult }
  }

}
