import { Response } from '../../../types';
import { SugarThis } from '../../../types/private';

/**
 * 设置标题栏标题
 * @param {string} title 标题内容
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis, title: string = ''): Promise<Response<object>> {
  return this.call(this.functionName, {
    title,
  });
}
