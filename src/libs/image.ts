/**
 * 图片处理函数库
 */
import { ImageSourceType } from '../constants';

/**
 * 从图片源数据中获取信息
 * @param src
 * @return {{
 *   src: string, // 图片数据源（链接/base64）
 *   type: ImageSourceType, // 图片来源类型
 * }}
 */
export const getInfoFromSrc = (src: string): {
  src: string,
  type: ImageSourceType,
} => {
  // 网络图片
  if (/^https?:\/\//.test(src)) {
    return {
      src,
      type: ImageSourceType.remote,
    };
  }
  // base64图片
  return {
    src: src.replace(/^.+,/, ''),
    type: ImageSourceType.base64,
  };
};
