import { Response, ShareWechatWebOptions } from '../../../../types';
import { SugarThis } from '../../../../types/private';
import { fillImageSrc } from '../../../../libs/share';
import { addQuery, isUrlHttp } from '../../../../libs/url';

/**
 * 微信分享网页至朋友圈
 * @param {ShareWechatWebOptions} options 分享参数的配置
 * @return {Promise<Response>}
 */
export default function call(
  this: SugarThis,
  options: ShareWechatWebOptions,
): Promise<Response<object>> {
  if (!options.title) {
    throw new Error('分享标题未设置');
  }
  if (!isUrlHttp(options.url)) {
    throw new Error('分享链接错误');
  }
  if (!options.thumbImageSrc) {
    throw new Error('分享缩略图未设置');
  }

  const params: { [key: string]: string | number } = {
    scene: 1, // 场景 0-微信好友 1-朋友圈
    mediaType: 'webpage', // 消息类型 webpage-网页 image-图片 miniProgram-小程序
    title: options.title,
    url: addQuery(options.url, options.query || {}),
  };
  fillImageSrc(params, options.thumbImageSrc, 'thumbImage');
  return this.call('share.wechat', params);
}
