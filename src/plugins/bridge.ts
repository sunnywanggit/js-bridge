/**
 * 桥接插件
 */
import {
  BridgeError,
  Response,
} from '../types';
import { Call } from '../types/private';
import { ErrorCode } from '../constants';
import { isBillionBottle, isIOS } from '../libs/browser';
import android from '../registers/android';
import ios from '../registers/ios';
import { createError } from '../libs/response';

/**
 * 请求缓存
 */
interface CallCache {
  functionName: string,
  params: object,
  resolve: (value: Response<any>) => void,
  reject: (reason: BridgeError) => void,
}

// 桥接是否初始化完毕
let isBridgeInitialized: boolean = false;

/**
 * 打印错误
 * @param functionName
 * @param params
 * @param err
 */
const logError = (functionName: string, params: object, err: BridgeError): void => {
  const logs = [
    `【${functionName}: ${JSON.stringify(params)}】`,
    `【${err.code}: ${err.message}】`,
  ];
  if (err.code < 100) {
    // 代码错误强行打印
    window.console.error(...logs);
  } else {
    // 其他错误警告处理
    window.console.warn(...logs);
  }
};

/**
 * 手动执行桥接函数
 * @param {CallCache} callCache 请求缓存
 */
const execute = async (callCache: CallCache) => {
  const {
    functionName, params, resolve, reject,
  } = callCache;
  try {
    let res: Response<any>;
    if (isIOS) {
      res = await ios.call(functionName, params);
    } else {
      res = await android.call(functionName, params);
    }
    if (res.code === 0) {
      resolve(res);
      return;
    }
    throw createError(res.code, res.message);
  } catch (err) {
    if (typeof err.code !== 'number' || Number.isNaN(err.code)) {
      err.code = ErrorCode.ERROR_UNCAUGHT;
    }
    logError(functionName, params, err);
    reject(err);
  }
};

const callQueue: CallCache[] = [];

// app内部自动开始初始化
if (isBillionBottle) {
  let initPromise: Promise<void>;
  if (isIOS) {
    initPromise = ios.init();
  } else {
    initPromise = android.init();
  }
  initPromise.then(() => {
    isBridgeInitialized = true;
    // 初始化成功后遍历调用缓存数组重新执行调用
    callQueue.forEach((callCache: CallCache) => {
      execute(callCache);
    });
  }).catch((err) => {
    window.console.error(`桥接初始化失败: ${err.message}`);
  });
}

/**
 * 调用原生功能
 * @param {string} functionName 功能名
 * @param {object|undefined} params 参数
 * @return {Promise<Response>} 调用结果
 */
const call: Call = (
  functionName: string,
  params: object = {},
): Promise<Response<any>> => new Promise((resolve, reject) => {
  const callCache: CallCache = {
    functionName,
    params,
    resolve,
    reject,
  };

  // 不在原生端执行直接返回系统取消
  if (!isBillionBottle) {
    const err: BridgeError = createError(ErrorCode.CANCEL_BY_SYSTEM, '非百瓶APP，操作取消');
    logError(functionName, params, err);
    throw err;
  }
  // 桥接未初始化完毕时将请求放入缓存队列，等待初始化完毕后执行
  if (!isBridgeInitialized) {
    callQueue.push(callCache);
    return;
  }

  // 校验都通过后直接调用
  execute(callCache);
});

export default {
  call,
};
