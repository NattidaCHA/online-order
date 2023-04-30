import { ResponseDetail } from './common-response';

export interface ActualTargetResponse {
  response: ResponseDetail;
  data: ActualTargetData;
}

export interface ActualTargetData {
  actual: number[];
  target: number[];
  total: string;
  year: string[];
}
