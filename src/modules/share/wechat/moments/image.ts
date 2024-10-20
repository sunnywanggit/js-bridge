import { Response, ShareWechatImageOptions } from '../../../../types';
import { SugarThis } from '../../../../types/private';
import { fillImageSrc } from '../../../../libs/share';

/**
 * 微信分享图片至朋友圈
 * @param {ShareWechatImageOptions} options 分享参数的配置
 * @return {Promise<Response>}
 */
export default function call(
  this: SugarThis,
  options: ShareWechatImageOptions,
): Promise<Response<object>> {
  if (!options.imageSrc) {
    throw new Error('分享图片未设置');
  }

  const params: { [key: string]: string | number } = {
    scene: 1, // 场景 0-微信好友 1-朋友圈
    mediaType: 'image', // 消息类型 webpage-网页 image-图片 miniProgram-小程序
    title: options.title || '',
  };
  fillImageSrc(params, options.imageSrc, 'image');
  return this.call('share.wechat', params);
}
