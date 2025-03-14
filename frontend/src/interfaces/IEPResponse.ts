export default interface IEPResponse<T> {
  isSuccess: boolean;
  data: T;
  message: string;
}

export interface IEPSimpleResponse {
  isSuccess: boolean;
  message: string;
}
