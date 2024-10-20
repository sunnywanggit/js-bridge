import { ImagePreviewOptions, ImagePreviewResult, Response } from '../../types';
import { ImageSourceType } from '../../constants';
import { SugarThis } from '../../types/private';
import { getInfoFromSrc } from '../../libs/image';

/**
 * 预览图片
 * @param {string[]} srcList 图片base64或网络路径集合
 * @param {number} start 第一张显示的图片的下标
 * @param {ImagePreviewOptions} options 预览配置
 * @return {Promise<Response>}
 */
export default function call(
  this: SugarThis,
  srcList: string[],
  start: number = 0,
  options: ImagePreviewOptions = {
    showDownload: true,
  },
): Promise<Response<ImagePreviewResult>> {
  if (!srcList) {
    throw new Error('图片链接或者base64未设置');
  }
  if (srcList.some((src: string) => !src || typeof src !== 'string')) {
    throw new Error('图片链接或base64不正确');
  }

  // 根据图片数据源集合计算最终给原生的图片数据列表
  const imageList: { type: string, value: string }[] = srcList.map((src) => {
    const info: { src: string, type: ImageSourceType } = getInfoFromSrc(src);
    let type: string;
    switch (info.type) {
      case ImageSourceType.remote:
        type = 'remoteUrl';
        break;
      default:
        type = 'base64';
        break;
    }
    return {
      type,
      value: info.src,
    };
  });
  return this.call(this.functionName, {
    type: 'image',
    mediaList: imageList,
    start,
    showDelete: !!options.showDelete,
    showDownload: !!options.showDownload,
  });
}
