import { Response } from '../types';
import { SugarThis } from '../types/private';

/**
 * 原生埋点
 * @param {string} name 埋点名称
 * @param {object} params 埋点参数
 * @return {Promise<Response>}
 */
export default function call(
  this: SugarThis,
  name: string,
  params: object = {},
): Promise<Response<object>> {
  return this.call(this.functionName, {
    name,
    params,
  });
}
