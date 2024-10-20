/**
 * 路由模块函数库
 */

/**
 * 根据路由路径、入参和hash生成一个路由链接
 * @param {string} path
 * @param {object} query
 * @param {string} hash
 * @return {string}
 */
export function createRouterUrl(path: string, query: { [key: string]: any }, hash: string): string {
  const searchItemList: string[] = [];
  Object.keys(query).forEach((key) => {
    const value: any = query[key];
    // 过滤空值的情况
    if (!value && value !== '' && value !== 0 && value !== false) {
      return;
    }
    // 过滤对象的情况
    if (typeof value === 'object') {
      if (!Array.isArray(value)) {
        return;
      }
      // 只允许简单类型数组拼接
      if (value.some((item: any) => !['number', 'string', 'boolean'].includes(typeof item))) {
        return;
      }
      const encodedValue: string[] = value.map((item: any) => encodeURIComponent(String(item)));
      searchItemList.push(`${key}=[${encodedValue.join(',')}]`);
      return;
    }
    searchItemList.push(`${key}=${encodeURIComponent(value)}`);
  });
  return `${path}${searchItemList.length ? `?${searchItemList.join('&')}` : ''}${hash ? `#${hash}` : ''}`;
}
