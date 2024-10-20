/**
 * 链接相关函数库
 */

/**
 * 链接是否是内部统跳链接
 * @param {string} url
 * @return {boolean}
 */
export const isUrlInside = (url: string): boolean => /^\w+:\/\/\w+/.test(url);

/**
 * 链接是否是网页链接
 * @param {string} url
 * @return {boolean}
 */
export const isUrlHttp = (url: string): boolean => /^https?:\/\/\w+/.test(url);

/**
 * 链接路径是否合法
 * @param path
 */
export const isUrlPathLegal = (path: string): boolean => /^\/?(\w|-)+(\/(\w|-)+)*\/?$/.test(path);

/**
 * 链接全路径是否合法（包含query串）
 * @param fullPath
 */
export const isUrlFullPathLegal = (fullPath: string): boolean => /^\/?(\w|-)+(\/(\w|-)+)*\/?(\?.*)?$/.test(fullPath);

/**
 * 解析url
 * @param url
 * @return {{
 *   path: string, // 包含协议、域名、路径的链接
 *   query: { [key: string]: string }, // 链接中的query参数
 *   hash: string, // 链接的hash值
 * }}
 */
export const analyzeUrl = (url: string): {
  path: string,
  query: { [key: string]: string },
  hash: string,
} => {
  let tempUrl: string = url;
  // 解析hash串
  const hashIndex: number = tempUrl.indexOf('#');
  let hash: string = '';
  if (hashIndex > 0) {
    hash = tempUrl.substring(hashIndex + 1);
    tempUrl = tempUrl.substring(0, hashIndex);
  }
  // 解析参数串
  const searchIndex: number = tempUrl.indexOf('?');
  let search: string = '';
  if (searchIndex > 0) {
    search = tempUrl.substring(searchIndex + 1);
    tempUrl = tempUrl.substring(0, searchIndex);
  }
  // 解析参数
  const query: { [key: string]: string } = {};
  search.split('&').forEach((pair: string) => {
    const [key, value = ''] = pair.split('=');
    try {
      query[key] = decodeURIComponent(value);
    } catch (e) {
      query[key] = value;
    }
  });

  return {
    path: tempUrl,
    query,
    hash,
  };
};

/**
 * 在链接中增加query参数
 * @param {string} url
 * @param {object} params
 * @return {string}
 */
export const addQuery = (url: string, params: object): string => {
  const { path, query, hash } = analyzeUrl(url);
  Object.assign(query, params);
  // 根据url解析结果还原url
  let result: string = path;
  // 重新拼接参数
  const queryPairs: string[] = Object.keys(query).map((key) => `${key}=${encodeURIComponent(String(query[key]))}`);
  if (queryPairs) {
    result = `${result}?${queryPairs.join('&')}`;
  }
  // 重新拼接hash
  if (hash) {
    result = `${result}#${hash}`;
  }
  return result;
};
