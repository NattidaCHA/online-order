import { ResponseDetail } from './common-response';

export interface GrowthResponse {
  response: ResponseDetail;
  data: GrowthData;
}

export interface GrowthData {
  total:string;
  year: string[];
  totalPc: number[];
}
