/**
 * 安卓插件
 */
import { Response } from '../types';
import {
  Call,
  Init,
  ResponseHandler,
} from '../types/private';
import { getRandomWord } from '../libs/string';

interface Bridge {
  [functionName: string]: (json: string, callback: string) => void;
}

declare global {
  interface Window {
    _dsbridge: Bridge,
    [functionName: string]: ResponseHandler | any,
  }
}

let util: Bridge;

/**
 * 进行安卓桥接的初始化
 * 因为安卓桥接形式比较简单，会主动注入一个全局对象至文档中，因此这里只需取出这个全局对象即可
 * @return {Promise<void>}
 */
const init: Init = (): Promise<void> => new Promise((resolve) => {
  // 开始轮询检测桥接对象
  const detect = () => {
    const { _dsbridge: bridge } = window;
    if (bridge) {
      util = bridge;
      resolve();
      return;
    }
    setTimeout(detect, 1000);
  };
  detect();
});

/**
 * 调用安卓功能
 * @param functionName
 * @param params
 * @return {Promise<void>}
 */
const call: Call = (functionName: string, params: object = {}) => new Promise((resolve) => {
  // 安卓不支持定义名为xxx.xxx的函数，因此将.全部替换为下划线
  const adaptFunctionName: string = functionName.replace(/\./g, '_');
  // 安卓回调函数名称
  const callbackFunctionName = `bridge_callback_${Date.now()}_${getRandomWord()}`;
  // 将回调函数注入全局以供安卓回调
  window[callbackFunctionName] = (res: Response<any>) => {
    delete window[callbackFunctionName];
    resolve(res);
  };
  util[adaptFunctionName](JSON.stringify(params), callbackFunctionName);
});

export default {
  init,
  call,
};
