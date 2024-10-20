import { Response } from '../../types';
import { SugarThis } from '../../types/private';

/**
 * 关闭webview
 * @param {object} params 传给上个页面的参数
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis, params: object = {}): Promise<Response<object>> {
  return this.call(this.functionName, params);
}
