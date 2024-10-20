import { ImagePickedItem, ImagePickerOptions, Response } from '../../types';
import { SugarThis } from '../../types/private';

/**
 * 选择图片
 * @param {ImagePickerOptions} options 选择配置
 * @return {Promise<Response>}
 */
export default function call(this: SugarThis, options: ImagePickerOptions = {
  fromAlbum: true,
  fromCamera: true,
  maxCount: 1,
}): Promise<Response<ImagePickedItem[]>> {
  if (!options.fromAlbum && !options.fromCamera) {
    throw new Error('图片选择来源至少需要一个');
  }
  if (!(Number(options.maxCount) >= 1)) {
    throw new Error('最大选择数量异常');
  }

  const sourceTypes: string[] = [];
  if (options.fromAlbum) {
    sourceTypes.push('album');
  }
  if (options.fromCamera) {
    sourceTypes.push('camera');
  }
  return new Promise((resolve, reject) => {
    this.call(this.functionName, {
      sourceTypes,
      mediaTypes: ['image'], // 可选择的媒体类型 image/video/voice
      count: options.maxCount,
      compressed: !!options.compressed,
    }).then((res: Response<ImagePickedItem[]>) => {
      // 对返回内容中的base64串做特殊处理，加上前缀
      res.data.forEach((item: ImagePickedItem) => {
        // eslint-disable-next-line no-param-reassign
        item.base64 = (/png$/i.test(item.path) ? 'data:image/png;base64,' : 'data:image/jpg;base64,') + item.base64;
      });
      resolve(res);
    }).catch(reject);
  });
}
