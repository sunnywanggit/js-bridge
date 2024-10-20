/**
 * 错误码
 */
export enum ErrorCode {
  // < 0 执行错误
  ERROR_UNCAUGHT = -1, // 代码执行错误

  // 执行成功
  SUCCESS = 0,

  // 100~199 操作取消
  CANCEL_BY_USER = 100, // 用户取消
  CANCEL_BY_SYSTEM = 101, // 系统取消

  // 200~299 操作等待中
  WAIT_FINISH = 200, // 操作进行中（比如异步支付中或者异步发布中）
}

/**
 * 图片源头类型
 */
export enum ImageSourceType {
  local, // 本地图片
  remote, // 网络图片
  base64, // base64图片
}
