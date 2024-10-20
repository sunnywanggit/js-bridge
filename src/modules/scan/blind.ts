import { Response, ScanBlindResult } from '../../types';
import { SugarThis } from '../../types/private';

/**
 * 扫描盲盒二维码
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis): Promise<Response<ScanBlindResult>> {
  return this.call(this.functionName);
}
