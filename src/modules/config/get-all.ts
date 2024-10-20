import { ConfigAllResult, Response } from '../../types';
import { SugarThis } from '../../types/private';

/**
 * 获取全部配置
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis): Promise<Response<ConfigAllResult>> {
  return this.call(this.functionName);
}
