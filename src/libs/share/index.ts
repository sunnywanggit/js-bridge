/**
 * 分享相关函数库
 */

import { getInfoFromSrc } from '../image';
import { ImageSourceType } from '../../constants';

/**
 * 将图片源融合进对象中
 * @param params
 * @param src 图片源 链接、base64
 * @param imageKeyPrefix 融合进入的图片属性名的前缀
 */
export const fillImageSrc = (
  params: { [key: string]: any }, src: string,
  imageKeyPrefix: string,
): void => {
  // eslint-disable-next-line no-param-reassign
  params[`${imageKeyPrefix}Url`] = '';
  // eslint-disable-next-line no-param-reassign
  params[`${imageKeyPrefix}Data`] = '';
  // eslint-disable-next-line no-param-reassign
  params[`${imageKeyPrefix}Path`] = '';
  const info: { src: string, type: ImageSourceType } = getInfoFromSrc(src);
  switch (info.type) {
    case ImageSourceType.remote:
      // eslint-disable-next-line no-param-reassign
      params[`${imageKeyPrefix}Url`] = info.src;
      break;
    default:
      // eslint-disable-next-line no-param-reassign
      params[`${imageKeyPrefix}Data`] = info.src;
      break;
  }
};
