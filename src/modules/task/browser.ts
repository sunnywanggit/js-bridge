import { Response, TaskBrowserOptions } from '../../types';
import { SugarThis } from '../../types/private';
import { isUrlInside } from '../../libs/url';

/**
 * 开始进行浏览任务
 * @param {object} params 浏览任务的配置
 * @return {Promise<Response>}
 */
export default function call(
  this: SugarThis,
  params: TaskBrowserOptions,
): Promise<Response<object>> {
  // 检查参数合法性
  const {
    routes, time, repeat, taskId, context, url,
  } = params;
  if (!routes || !routes.length || routes.some((route: string): boolean => !isUrlInside(route))) {
    throw new Error('请传入正确的统跳链接列表');
  }
  if (!(time >= 1)) {
    throw new Error('请传入正确的计时间隔次数');
  }
  if (!(repeat >= 1)) {
    throw new Error('请传入正确的计时间隔时长');
  }
  if (!taskId) {
    throw new Error('任务id不能为空');
  }
  if (!context || !/^\s*{}\s*$/.test(context)) {
    throw new Error('请传入正确的上下文');
  }
  if (!isUrlInside(url)) {
    throw new Error('请传入正确的回跳链接');
  }
  return this.call(this.functionName, params);
}
