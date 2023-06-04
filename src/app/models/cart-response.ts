import { ResponseDetail } from './common-response';
import { ShowRecord } from './product-list';

export interface CartResponse {
  response: ResponseDetail;
  data: Cart;
}

export interface Cart {
  _id: string;
  status: string;
  cart: Product[];
  create_date: Date;
  update_date: Date;
}

export interface Product {
  _id: string;
  totalPc: number;
  amount: number;
  update_date: Date;
}

export interface CartLitsResponse {
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
  itemList: Cart[];
}
