import { Response } from '../../types';
import { SugarThis } from '../../types/private';
import { fillImageSrc } from '../../libs/share';

/**
 * 分享图片至任意平台
 * @param {string} src 分享图数据源，可以是链接、base64，会自动检测
 * @param {string} statEventId 埋点id
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis, src: string, statEventId: string = ''): Promise<Response<object>> {
  if (!src) {
    throw new Error('分享图片未设置');
  }

  const params: { [key: string]: string | number } = {
    statEventId,
  };
  fillImageSrc(params, src, 'image');
  return this.call(this.functionName, params);
}
