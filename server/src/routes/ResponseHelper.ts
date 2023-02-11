import { Response } from "express";
import { ISearchResult } from "../entities/CommonTypes";
import { IResponce, ResponceCode } from "./ResponseTypes";

export class ResponseHelper {
  public static sendError(error: string | string[], res: Response) {
    let err:string;
    if (Array.isArray(error)) {
      err = error.join(';');
    } else {
      err = error
    }
    const send: IResponce<any>= {
      err,
      data: null,
      code: ResponceCode.err
    }
    res.send(send)
  }

  public static sendData(data: any, res: Response) {
    const send: IResponce<any>= {
      err: "",
      data,
      code: ResponceCode.success
    }
    res.send(send)
  }

  public static sendPageData<T>(result: ISearchResult<T>, res: Response) {
    if (result.errors.length > 0) {
      this.sendError(result.errors, res);
    } else {

      const send: IResponce<any>= {
        err: "",
        data: result.data,
        total: result.count,
        code: ResponceCode.success
      }
      res.send(send)
    }
  }
}