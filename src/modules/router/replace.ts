import { Response } from '../../types';
import { SugarThis } from '../../types/private';
import { createRouterUrl } from '../../libs/router';
import { isUrlInside } from '../../libs/url';

/**
 * 统跳（替换式）
 * @param {string} path
 * @param {object|undefined} query
 * @param {string|undefined} hash
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis, path: string, query: object = {}, hash = ''): Promise<Response<object>> {
  if (!isUrlInside(path)) {
    throw new Error('统跳链接不正确');
  }
  return this.call(this.functionName, {
    url: createRouterUrl(path, query, hash),
  });
}
