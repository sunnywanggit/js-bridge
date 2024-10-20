/**
 * 返回结果处理库
 */
import { ErrorCode } from '../constants';
import { BridgeError } from '../types';

export const createError = (code: ErrorCode, message: string = ''): BridgeError => {
  const error: BridgeError = <BridgeError>(new Error(message));
  error.code = code;
  return error;
};
