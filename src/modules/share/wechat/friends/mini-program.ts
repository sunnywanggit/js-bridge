import { Response, ShareWechatMiniProgramOptions } from '../../../../types';
import { SugarThis } from '../../../../types/private';
import { fillImageSrc } from '../../../../libs/share';
import { addQuery, isUrlFullPathLegal } from '../../../../libs/url';

/**
 * 微信分享小程序至好友
 * @param {ShareWechatMiniProgramOptions} options 分享参数的配置
 * @return {Promise<Response>}
 */
export default function call(
  this: SugarThis,
  options: ShareWechatMiniProgramOptions,
): Promise<Response<object>> {
  if (!options.title) {
    throw new Error('分享标题未设置');
  }
  if (!isUrlFullPathLegal(options.path)) {
    throw new Error('小程序路径错误');
  }
  if (!options.thumbImageSrc) {
    throw new Error('分享缩略图未设置');
  }

  const params: { [key: string]: string | number } = {
    scene: 0, // 场景 0-微信好友 1-朋友圈
    mediaType: 'miniProgram', // 消息类型 webpage-网页 image-图片 miniProgram-小程序
    title: options.title,
    path: addQuery(options.path, options.query || {}),
  };
  fillImageSrc(params, options.thumbImageSrc, 'thumbImage');
  return this.call('share.wechat', params);
}
