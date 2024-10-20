# 文章问答详情容器功能说明

#### 功能细分

##### 统跳相关

| call函数功能名 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| router.open | 打开任意页面（原生/flutter/h5/外部app/小程序） | path: 页面路径<br>query?: 页面参数<br>hash?: 页面哈希 | -- |

##### 图片相关

| call函数功能名 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| image.preview | 预览图片 | srcList: 图片base64或本地路径或链接列表<br>start: 开始从哪个下标预览<br>options: 预览的配置 | 预览配置详见src/types/index.d.ts的ImagePreviewOptions |

##### 配置相关

| call函数功能名 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| config.setHeight | 设置内容高度 | height: 详情内容的高度 | -- |
