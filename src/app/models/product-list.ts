import { ResponseDetail } from './common-response';

export interface ProductLitsResponse {
  response: ResponseDetail;
  data: PaginationResponse;
  error?: Error;
}

export interface PaginationResponse {
  pageno: number;
  pageSize: number;
  totalPage: number;
  totalRecord: number;
  isNextPage: boolean;
  showRecord: ShowRecord;
  itemList: ProductDetail[];
}

export interface ProductDetail {
  _id: string;
  totalPc: string;
}

export interface ShowRecord {
  qnty: number;
  first: number;
  last: number;
}

export interface Error {
  message: string;
}

export interface Total {
  response: ResponseDetail;
  data: TotalDetail;
}

export interface TotalDetail {
  total: string;
}
