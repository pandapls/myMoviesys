import 'reflect-metadata';
import express from 'express';
import router from './routes/MovieRoute';
import UploadRouter from './routes/UploadRoute';
function getRandom(min: number, max: number) {
  const dec = max - min;
  return Math.floor(Math.random() * dec + min)
}
const app = express();

app.use("/upload", express.static("public/upload"))

// 配置中间件，用于解析请求消息体中的json格式数据
app.use(express.json());

app.use("/api", router);
// 文件上传
// 通常情况下，服务器会提供一个统一的api接口 用于处理上传文件
app.use("/api/upload", UploadRouter)

app.listen(3001, () => {
  console.log('服务开启');
  
})