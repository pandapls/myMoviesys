export interface IResponce<T> {
  code: number,
  err: string,
  data: T[] | null,
  total?: number
}

export enum ResponceCode {
  success = 200,
  notDefind = 404,
  err = 500
}