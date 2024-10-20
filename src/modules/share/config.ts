import { Response } from '../../types';
import { SugarThis } from '../../types/private';

/**
 * 自定义原生分享面板的功能按钮
 * @param {object} params 分享面板的配置
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis, params: object): Promise<Response<object>> {
  return this.call(this.functionName, params);
}
