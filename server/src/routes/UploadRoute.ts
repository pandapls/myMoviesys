import express from "express";
import multer from "multer";
import path from "path";
import { ResponseHelper } from "./ResponseHelper";

const router = express.Router();
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../../public/upload"),
  filename(_, file, cb){
    const uniqueSuffix =  Math.round(Math.random() * 1E9)
    const extname = path.extname(file.originalname)
    cb(null, `${uniqueSuffix}${extname}`)
  }
})

const upload = multer(
  { 
    storage, 
    limits: {
      fieldSize: 1024 * 1024
    },
    fileFilter(req, file, cb) {
      const extname = path.extname(file.originalname)
      if (['.png', '.jpg', 'jpeg', '.bmp', '.gif'].includes(extname)) {
        cb(null, true);
      } else {
        cb(new Error("图片类型错误"));
      }
    }
  }
).single('file')
router.post("/", (req, res) => {
  // console.log(req);
  upload(req, res, err => {
    console.log(err);
    
    if (err) {
      ResponseHelper.sendError(err.message, res)
    } else {
      const url = `/upload/${req.file?.filename}`
      ResponseHelper.sendData(url, res);
    } 
  })
})

export default router;