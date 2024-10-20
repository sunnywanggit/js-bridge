/**
 * 浏览器相关函数库
 */

const { userAgent } = window.navigator;

export const isIOS: boolean = /\(i[^;]+;( u;)? cpu.+mac os x/i.test(userAgent);

let isInApp: boolean = /BillionBottle/i.test(userAgent);

// 为了兼容iOS在iOS 10系统中设置UA有问题，这里做一层保护，如果在链接或cookie中有登录信息也认为在app内部
if (!isInApp) {
  const pattern: RegExp = /(memberId|token)=/;
  if (pattern.test(document.cookie) || pattern.test(window.location.href)) {
    isInApp = true;
  }
}

export const isBillionBottle: boolean = isInApp;
