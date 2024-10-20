/**
 * ios插件
 */
import { Response } from '../types';
import {
  Call,
  Init,
  ResponseHandler,
} from '../types/private';

interface Bridge {
  callHandler: (functionName: string, params: object, callback: ResponseHandler) => void;
}

interface SetupCallback {
  (bridge: Bridge): void;
}

declare global {
  interface Window {
    WebViewJavascriptBridge: Bridge,
    WVJBCallbacks: SetupCallback[],
    setupWebViewJavascriptBridge: (callback: SetupCallback) => void;
  }
}

let util: Bridge;

/**
 * 进行ios桥接的初始化
 * @return {Promise<void>>}
 */
const init: Init = () => new Promise((resolve: () => void) => {
  window.setupWebViewJavascriptBridge = (callback: SetupCallback) => {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge);
      return;
    }
    if (window.WVJBCallbacks) {
      window.WVJBCallbacks.push(callback);
      return;
    }
    window.WVJBCallbacks = [callback];
    const WVJBIframe: HTMLIFrameElement = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    });
  };
  window.setupWebViewJavascriptBridge((bridge: Bridge) => {
    util = bridge;
    resolve();
  });
});

/**
 * 调用ios功能
 * @param {string} functionName
 * @param {object} params
 * @return {Promise<void>}
 */
const call: Call = (functionName: string, params: object = {}) => new Promise((resolve) => {
  util.callHandler(functionName, params, (res: Response<any>) => {
    resolve(res);
  });
});

export default {
  init,
  call,
};
