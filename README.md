# h5和app交互工具

### 1、引入

* es6
```
import {
  call, // h5调用native功能
  router, // 统跳语法糖
} from '@bb/js-bridge';

call('router.open', { a: 1 }); // 进行桥接函数调用
router.open('bbn://xxx', { a: 1 }); // 打开原生页面（语法糖）
... // 其他语法糖可以参考下文

import jsBridge from '@bb/js-bridge';

jsBridge.call('router.open', { a: 1 }); // 进行桥接函数调用
jsBridge.router.open('bbn://xxx', { a: 1 }); // 打开原生页面（语法糖）
... // 其他语法糖可以参考下文
```

* commonJS
```
const jsBridge = require('@bb/js-bridge').default;

jsBridge.call('router.open', { a: 1 }); // 进行桥接函数调用
jsBridge.router.open('bbn://xxx', { a: 1 }); // 打开原生页面（语法糖）
... // 其他语法糖可以参考下文
```

### 2、返回结果

jsBridge的call函数或者语法糖函数调用都会返回一个promise，promise的then参数和catch参数都符合以下的ts接口
```
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
 * 原生返回结果
 */
export interface Response {
  code: ErrorCode,
  message: string,
  data: object,
}

/**
 * 原生返回错误
 */
export interface BridgeError extends Error {
  code: ErrorCode,
  message: string,
}
```
返回结果的拿取示例如下

```
jsBridge.router.open('xxx')
  .then((res: Response) => {
  })
  .catch((err: BridgeError) => {
  });
```

### 3、API

| 方法名 | 说明 | 参数 | 返回值 |
| :--- | :--- | :--- | :--- |
| call | 调用原生功能 | functionName: string, params?: object | Promise |

### 4、document全局事件

原生在进行某些操作之后会主动调用js的全局函数，js-bridge工具会自动将这些调用转换成全局document级别的事件。
事件触发后的事件实体`e`中会有一个属性`value`，参数就放在value中。
以下是会触发的事件列表：

| 事件名 | 说明 | 返回值 | 备注 |
| :--- | :--- | :--- | -- |
| onNativeBackClick | 原生返回按钮点击事件 | -- | -- |
| onNativeTitleBarRightClick | 导航栏右侧按钮点击事件 | -- | -- |
| onNativeTaskFinish | 任务完成事件 | taskId | -- |

### 5、语法糖

通常直接调用原生功能的方法是调用call函数，比如打开原生页面：`jsBridge.call('router.open', { url: 'xxx' }).then().catch()`。
js-bridge将这种复杂且需要配置功能名比如`router.open`的调用以语法糖的形式对外开放，比如`jsBridge.router.open(url: string)`。
语法糖将一些操作做了归类，将其写入了**ts描述文件**中，现代编辑器可以做到点语法智能联想属性名，比较方便。


语法糖调用对应的app功能名对应了调用路径，比如`jsBridge.router.open(url: string).then().catch()`就相当于`jsBridge.call('router.open', { url: 'xxx' }).then().catch()`。

#### 语法糖大模块

| 模块名 | 说明 |
| :--- | :--- |
| router | 统跳相关操作 |
| share | 分享相关操作 |
| image | 图片相关操作 |
| ui | ui相关操作 |
| config | 配置相关操作 |
| stat | 原生埋点 |
| task | 任务相关操作 |
| scan | 扫描相关操作 |

#### 语法糖功能细分

##### 统跳相关

| 点语法路径 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| router.open | 打开任意页面（原生/flutter/h5/外部app/小程序） | path: 页面路径<br>query?: 页面参数<br>hash?: 页面哈希 | -- |
| router.replace | 替换式打开任意页面（原生/flutter/h5/外部app/小程序） | path: 页面路径<br>query?: 页面参数<br>hash?: 页面哈希 | -- |
| router.close | 关闭当前webview页面 | params: 任意map | 页面关闭传的参数是返回给上一个页面用的 |

##### 分享相关

| 点语法路径 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| share.config | 对原生分享面板进行配置 | params: 配置信息 | -- |
| share.open | 主动打开原生分享面板 | -- | -- |
| share.wechat.friends.web | 微信分享网页至好友 | options: 分享参数 | 分享参数详见src/types/index.d.ts的ShareWechatWebOptions |
| share.wechat.friends.miniProgram | 微信分享小程序至好友 | options: 分享参数 | 分享参数详见src/types/index.d.ts的ShareWechatMiniProgramOptions |
| share.wechat.friends.image | 微信分享图片至好友 | options: 分享参数 | 分享参数详见src/types/index.d.ts的ShareWechatImageOptions |
| share.wechat.moments.web | 微信分享网页至朋友圈 | options: 分享参数 | 分享参数详见src/types/index.d.ts的ShareWechatWebOptions |
| share.wechat.moments.image | 微信分享图片至朋友圈 | options: 分享参数 | 分享参数详见src/types/index.d.ts的ShareWechatImageOptions |
| share.image | 分享图片至任意渠道 | src: 分享图数据源，可以是链接、base64<br>statEventId: 埋点id，可不传 | -- |

##### 图片相关

| 点语法路径 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| image.save | 保存图片至本地 | src: 图片base64或者链接 | -- |
| image.upload | 上传图片 | srcList: 图片base64或本地路径列表<br>scene: oss路径的场景值<br>options: 上传的配置 | 上传配置详见src/types/index.d.ts的ImageUploadOptions |
| image.preview | 预览图片 | srcList: 图片base64或本地路径或链接列表<br>start: 开始从哪个下标预览<br>options: 预览的配置 | 预览配置详见src/types/index.d.ts的ImagePreviewOptions |
| image.picker | 选择图片 | options: 选择的配置 | 选择配置详见src/types/index.d.ts的ImagePickerOptions |

##### ui相关

| 点语法路径 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| ui.navigationBar.setTitle | 设置标题栏标题 | title: 标题 | -- |
| ui.navigationBar.setColor | 设置标题栏颜色 | options: 颜色配置 | 颜色配置详见src/types/index.d.ts的NavigationBarColorOptions |

##### 配置相关

| 点语法路径 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| config.getAll | 获取全部配置 | -- | -- |

##### 原生埋点

| 点语法路径 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| stat | 通知原生进行埋点 | name: 埋点名称<br>params: 埋点信息 | -- |

##### 任务相关

| 点语法路径 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| task.browser | 开始浏览任务 | params: 任务的配置 | 任务配置详见src/types/index.d.ts的TaskBrowserOptions |

##### 扫描相关

| 点语法路径 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| scan.blind | 扫描盲盒二维码 | -- | -- |

### 6、jsBridge的ts描述参考

> 强烈推荐浏览src/types/index.d.ts

### 7、历史功能

#### 任务相关：oldTask.browser.start
| 功能 | 说明 | 参数示例 | 备注 |
| :--- | :--- | :--- | :--- |
| 打开浏览任务页面 | -- | {<br>&emsp;type: 'task',<br>&emsp;from: '活动来源',<br>&emsp;taskType: 'browser',<br>&emsp;taskId: 0, // 任务id<br>&emsp;time: 0, // 浏览时长(ms)<br>&emsp;page: '浏览页面名称(可以不传为全局页面)',<br>} | 活动来源可选值：<br>&emsp;activity-team(组队活动) |

#### 任务相关

| 点语法路径 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| oldTask.browser.start | 开始浏览任务 | taskId: 任务id<br>teamMemberId: 战队成员id<br>time: 浏览时长 | -- |
| oldTask.browser.getLeftTime | 获取浏览任务剩余时长 | taskId: 任务id<br>teamMemberId: 战队成员id | -- |
| oldTask.articleShare.start | 开始文章分享任务 | taskId: 任务id<br>teamMemberId: 战队成员id | -- |
