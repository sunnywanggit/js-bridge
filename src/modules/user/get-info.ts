import { Response, UserInfoResult } from '../../types';
import { SugarThis } from '../../types/private';

/**
 * 获取用户信息
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis): Promise<Response<UserInfoResult>> {
  return this.call(this.functionName);
}
