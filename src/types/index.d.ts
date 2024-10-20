import { ErrorCode } from '../constants';

/**
 * 原生返回结果
 */
export interface Response<T> {
  code: ErrorCode,
  message: string,
  data: T,
}

/**
 * 原生返回错误
 */
export interface BridgeError extends Error {
  code: ErrorCode,
  message: string,
}

/**
 * 直接调用原生功能
 * @param functionName 原生功能名
 * @param params 调用参数
 * @return {Promise<Response>}
 */
interface Call extends Function {
  (functionName: string, params?: object): Promise<Response<any>>,
}

export const call: Call;

/**
 * 统跳相关模块
 */
interface Router {
  /**
   * 关闭当前webview页面
   * @param params 返回给上个页面的参数
   * @return {Promise<Response>}
   */
  close: (params?: object) => Promise<Response<object>>,
  /**
   * 开启新的页面（原生/flutter/web/外部app/小程序）
   * @param path 页面路径
   * @param query 页面参数
   * @param hash 页面哈希
   * @return {Promise<Response>}
   */
  open: (
    path: string,
    query?: { [key: string]: any },
    hash?: string,
  ) => Promise<Response<object>>,
  /**
   * 替换式开启新的页面（原生/flutter/web/外部app/小程序）
   * @param path 页面路径
   * @param query 页面参数
   * @param hash 页面哈希
   * @return {Promise<Response>}
   */
  replace: (
    path: string,
    query?: { [key: string]: any },
    hash?: string,
  ) => Promise<Response<object>>,
}

export const router: Router;

/**
 * 微信分享网页消息需要的配置信息
 */
export interface ShareWechatWebOptions {
  title: string, // 分享标题
  thumbImageSrc: string, // 分享缩略图数据源，可以是链接、base64，会自动检测
  description?: string, // 分享描述
  url: string, // 网页链接
  query?: object, // 分享链接参数，将会自动拼接在路径后面
}

/**
 * 微信分享小程序消息需要的配置信息
 */
export interface ShareWechatMiniProgramOptions {
  title: string, // 分享标题
  thumbImageSrc: string, // 分享缩略图数据源，可以是链接、base64，会自动检测
  path: string, // 小程序路径
  query?: object, // 小程序参数，将会自动拼接在路径后面
}

/**
 * 微信分享图片需要的配置信息
 */
export interface ShareWechatImageOptions {
  title?: string, // 分享标题
  imageSrc: string, // 分享图数据源，可以是链接、base64，会自动检测
}

/**
 * 分享相关模块
 */
interface Share {
  /**
   * 自定义原生分享面板的功能按钮
   * @param {object} params 分享面板的配置
   * @return {Promise<Response>}
   */
  config: (params: object) => Promise<Response<object>>,
  /**
   * 主动打开分享面板
   * @return {Promise<Response>}
   */
  open: () => Promise<Response<object>>,
  /**
   * 微信分享
   */
  wechat: {
    /**
     * 分享至微信好友
     */
    friends: {
      /**
       * 微信分享网页至好友
       * @param {ShareWechatWebOptions} options 分享参数的配置
       * @return {Promise<Response>}
       */
      web: (options: ShareWechatWebOptions) => Promise<Response<object>>,
      /**
       * 微信分享小程序至好友
       * @param {ShareWechatMiniProgramOptions} options 分享参数的配置
       * @return {Promise<Response>}
       */
      miniProgram: (options: ShareWechatMiniProgramOptions) => Promise<Response<object>>,
      /**
       * 微信分享图片至好友
       * @param {ShareWechatImageOptions} options 分享参数的配置
       * @return {Promise<Response>}
       */
      image: (options: ShareWechatImageOptions) => Promise<Response<object>>,
    },
    /**
     * 分享至朋友圈
     */
    moments: {
      /**
       * 微信分享网页至朋友圈
       * @param {ShareWechatWebOptions} options 分享参数的配置
       * @return {Promise<Response>}
       */
      web: (options: ShareWechatWebOptions) => Promise<Response<object>>,
      /**
       * 微信分享图片至朋友圈
       * @param {ShareWechatImageOptions} options 分享参数的配置
       * @return {Promise<Response>}
       */
      image: (options: ShareWechatImageOptions) => Promise<Response<object>>,
    },
  },
  /**
   * 分享图片至任意平台
   * @param {string} src 分享图数据源，可以是链接、base64，会自动检测
   * @param {string} statEventId 埋点id
   * @return {Promise<Response>}
   */
  image: (src: string, statEventId?: string) => Promise<Response<object>>,
}

export const share: Share;

/**
 * 图片上传需要的配置信息
 */
export interface ImageUploadOptions {
  compressed?: boolean, // 是否需要压缩
}

/**
 * 图片预览需要的配置信息
 */
export interface ImagePreviewOptions {
  showDelete?: boolean, // 是否显示删除按钮
  showDownload?: boolean, // 是否显示保存至本地按钮
}

/**
 * 图片选择需要的配置信息
 */
export interface ImagePickerOptions {
  fromAlbum?: boolean, // 是否以相册作为来源
  fromCamera?: boolean, // 是否以相机作为来源
  maxCount?: number, // 最多选择几张图片
  compressed?: boolean, // 选择完成后是否压缩
}

/**
 * 图片上传结果单条信息
 */
export interface ImageUploadedItem {
  url: string, // 图片上传后的链接
  path: string, // 图片上传前在本地的路径
}

/**
 * 图片预览返回结果
 */
export interface ImagePreviewResult {
  deleteIndexList: Array<number>, // 被删除的图片的下标数组
}

/**
 * 图片选择结果单条信息
 */
export interface ImagePickedItem {
  path: string, // 本地文件路径
  base64: string, // 图片base64内容
  size: number, // 文件大小（B）
  width: number, // 图片宽度
  height: number, // 图片高度
}

/**
 * 图片相关模块
 */
interface Image {
  /**
   * 保存图片至本地
   * @param {string} src 图片链接或者base64
   * @return {Promise<Response>}
   */
  save: (src: string) => Promise<Response<object>>,
  /**
   * 上传图片
   * @param {string[]} srcList 图片base64集合
   * @param {string} scene 上传路径的场景值，将会直接体现在上传后的链接中
   * @param {ImageUploadOptions} options 上传配置
   * @return {Promise<Response>}
   */
  upload: (srcList: string[], scene: string, options?: ImageUploadOptions)
    => Promise<Response<ImageUploadedItem[]>>,
  /**
   * 预览图片
   * @param {string[]} srcList 图片base64或网络路径集合
   * @param {number} start 第一张显示的图片的下标
   * @param {ImagePreviewOptions} options 预览配置
   * @return {Promise<Response>}
   */
  preview: (
    srcList: string[], start?: number, options?: ImagePreviewOptions,
  ) => Promise<Response<ImagePreviewResult>>,
  /**
   * 选择图片
   * @param {ImagePickerOptions} options 选择配置
   * @return {Promise<Response>}
   */
  picker: (options?: ImagePickerOptions) => Promise<Response<ImagePickedItem[]>>,
}

export const image: Image;

/**
 * 标题栏颜色的配置
 */
export interface NavigationBarColorOptions {
  isFrontDark?: boolean, // 字体及图标颜色是否是暗色
  backgroundColor?: string, // 标题栏背景颜色，十六进制色
}

/**
 * ui相关模块
 */
interface Ui {
  /**
   * 导航栏配置模块
   */
  navigationBar: {
    /**
     * 设置标题栏标题
     * @param {string} title 标题内容
     * @return {Promise<Response>}
     */
    setTitle: (title: string) => Promise<Response<object>>,
    /**
     * 设置标题栏颜色
     * @param {NavigationBarColorOptions} options 标题栏颜色配置
     * @return {Promise<Response>}
     */
    setColor: (options?: NavigationBarColorOptions) => Promise<Response<object>>,
  },
}

export const ui: Ui;

/**
 * 所有配置结果
 */
export interface ConfigAllResult {
  isNoticeOpen: boolean, // 通知是否打开
}

/**
 * 配置相关模块
 */
interface Config {
  /**
   * 获取全部配置
   * @return {Promise<Response>}
   */
  getAll: () => Promise<Response<ConfigAllResult>>,
}

export const config: Config;

/**
 * 原生埋点
 * @param {string} name 埋点名称
 * @param {object} params 埋点参数
 * @return {Promise<Response>}
 */
interface Stat extends Function {
  (name: string, params: object): Promise<Response<object>>,
}

export const stat: Stat;

/**
 * 浏览任务的配置
 */
export interface TaskBrowserOptions {
  routes: string[], // 统跳链接列表
  time: number, // 计时间隔次数
  repeat: number, // 计时间隔持续时间（秒）
  taskId: number | string, // 任务id
  context: string, // 任务信息接口返回的上下文信息，是json字符串
  url: string, // 任务结束后的回跳链接
}

/**
 * 任务相关模块
 */
interface Task {
  /**
   * 开始进行浏览任务
   * @param {TaskBrowserOptions} params 浏览任务的配置
   * @return {Promise<Response>}
   */
  browser: (params: TaskBrowserOptions) => Promise<Response<object>>,
}

export const task: Task;

/**
 * 扫描盲盒结果
 */
export interface ScanBlindResult {
  alcoholId: number // 酒id
}

/**
 * 扫描模块
 */
interface Scan {
  /**
   * 扫描盲盒二维码
   * @return {Promise<Response>}
   */
  blind: () => Promise<Response<ScanBlindResult>>,
}

export const scan: Scan;

/**
 * 用户信息查询结果
 */
export interface UserInfoResult {
  memberId?: string, // 用户id
  token?: string, // 登录标识
  nickname?: string, // 昵称
  avatarUrl?: string, // 头像
}

/**
 * 用户相关模块
 */
interface User {
  /**
   * 获取用户信息
   * @return {Promise<Response>}
   */
  getInfo: () => Promise<Response<UserInfoResult>>,
}

export const user: User;

interface JsBridge {
  call: Call,
  router: Router,
  share: Share,
  image: Image,
  ui: Ui,
  config: Config,
  stat: Stat,
  task: Task,
  scan: Scan,
  user: User,
}

declare const jsBridge: JsBridge;
export default jsBridge;
