import { NavigationBarColorOptions, Response } from '../../../types';
import { SugarThis } from '../../../types/private';

/**
 * 设置标题栏颜色
 * @param {NavigationBarColorOptions} options 标题栏颜色配置
 * @return {Promise<Response>}
 */
export default function call(
  this: SugarThis,
  options: NavigationBarColorOptions = {
    isFrontDark: true,
    backgroundColor: '#ffffff',
  },
): Promise<Response<object>> {
  if (!/^#[0-9a-f]{6}$/i.test(String(options.backgroundColor))) {
    throw new Error('标题栏背景色不符合十六进制格式');
  }
  return this.call(this.functionName, {
    frontColor: options.isFrontDark ? 'dark' : 'light',
    backgroundColor: options.backgroundColor,
  });
}
