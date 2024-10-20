import { Response } from '../../types';
import { SugarThis } from '../../types/private';
import { fillImageSrc } from '../../libs/share';

/**
 * 保存图片至本地
 * @param {string} src 图片链接或者base64
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis, src: string): Promise<Response<object>> {
  if (!src) {
    throw new Error('图片链接或者base64未设置');
  }

  const params = {};
  fillImageSrc(params, src, 'image');
  return this.call(this.functionName, params);
}
