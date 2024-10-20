import { Response } from './index';

/**
 * 返回结果处理函数
 */
export interface ResponseHandler {
  (response: Response<any>): void;
}

/**
 * 桥接初始化函数
 */
export interface Init {
  (): Promise<void>;
}

/**
 * 原生功能调用函数
 */
export interface Call {
  (functionName: string, params?: object): Promise<Response<any>>;
}

/**
 * 原生事件
 */
export interface NativeEvent extends Event {
  value: any[],
}

/**
 * 语法糖函数中的this
 */
export interface SugarThis {
  functionName: string,
  call: Call,
}

/**
 * 语法糖函数
 */
export interface SugarFunction extends Function {
  (this: SugarThis, ...argv: any[]): Promise<Response<any>>;
}

/**
 * 语法糖集合
 */
interface Sugar {
  [key: string]: Sugar | SugarFunction;
}
