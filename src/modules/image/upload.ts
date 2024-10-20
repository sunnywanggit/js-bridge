import { ImageUploadedItem, ImageUploadOptions, Response } from '../../types';
import { SugarThis } from '../../types/private';
import { getInfoFromSrc } from '../../libs/image';
import { ImageSourceType } from '../../constants';

/**
 * 上传图片
 * @param {string[]} srcList 图片base64集合
 * @param {string} scene 上传路径的场景值，将会直接体现在上传后的链接中
 * @param {ImageUploadOptions} options 上传配置
 * @return {Promise<Response>}
 */
export default function call(
  this: SugarThis,
  srcList: string[],
  scene: string,
  options: ImageUploadOptions = {
    compressed: true,
  },
): Promise<Response<ImageUploadedItem[]>> {
  if (!srcList) {
    throw new Error('图片base64未设置');
  }
  if (srcList.some((src: string) => !src || typeof src !== 'string')) {
    throw new Error('图片base64不正确');
  }
  if (!scene) {
    throw new Error('场景值未设置');
  }

  const finalSrcList: string[] = srcList.map((src: string) => {
    const info: { type: ImageSourceType, src: string } = getInfoFromSrc(src);
    return info.src;
  });
  return this.call(this.functionName, {
    imageList: finalSrcList,
    scene,
    compressed: !!options.compressed,
  });
}
