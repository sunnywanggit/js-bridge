/**
 * 字符串处理函数库
 */

// 单词字符源
const wordLetterSource: string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

/**
 * 获取随机字符组成的单词
 * @param {number} length 单词长度
 * @return {string} 单词
 */
export const getRandomWord = (length: number = 5): string => {
  let result: string = '';
  for (let i: number = 0; i < length; i += 1) {
    result += wordLetterSource.charAt(Math.floor(Math.random() * wordLetterSource.length));
  }
  return result;
};
