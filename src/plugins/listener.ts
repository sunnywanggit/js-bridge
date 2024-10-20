/**
 * 原生事件监听
 */
import { NativeEvent } from '../types/private';

// 事件队列以及触发的事件名
const eventQueue: {
  [nativeName: string]: string,
} = {
  onNativeRouterBack: 'onNativeBackClick', // 原生返回按钮点击事件
  onNativeHeaderShare: 'onNativeTitleBarRightClick', // 标题栏右侧按钮点击事件
  onNativeTaskFinish: 'onNativeTaskFinish', // 活动任务完成事件
};

// 在全局注入原生事件执行函数（不可改）
Object.keys(eventQueue).forEach((nativeName: string) => {
  Object.defineProperty(window, nativeName, {
    configurable: false,
    enumerable: false,
    writable: false,
    value(...argv: any[]) {
      const event: NativeEvent = <NativeEvent>document.createEvent('HTMLEvents');
      event.initEvent(eventQueue[nativeName], true, true);
      event.value = argv;
      document.dispatchEvent(event);
    },
  });
});
