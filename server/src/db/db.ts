import Mongoose from "mongoose";
import MovieModel from './MovieSchema';
Mongoose.set('strictQuery', true);
Mongoose.connect("mongodb://127.0.0.1:27017/moviedb").then(res => {
  console.log('链接数据库成功');
});

export { MovieModel };