import { Response } from '../../types';
import { SugarThis } from '../../types/private';

/**
 * 主动打开分享面板
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis): Promise<Response<object>> {
  return this.call(this.functionName);
}
