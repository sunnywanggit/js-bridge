# 写问答编辑器功能说明

#### 功能细分

##### 统跳相关

| call函数功能名 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| router.replace | 替换式打开任意页面（原生/flutter/h5/外部app/小程序） | path: 页面路径<br>query?: 页面参数<br>hash?: 页面哈希 | -- |
| router.close | 关闭当前webview页面 | params: 任意map | 页面关闭传的参数是返回给上一个页面用的 |

##### 界面相关

| call函数功能名 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| ui.toast.show | 显示toast | text: 要提示的文字 | -- |
| ui.loading.show | 显示loading | text: 要提示的文字 | -- |
| ui.loading.hide | 隐藏loading | -- | -- |
| ui.loadingPage.hide | 隐藏loadingPage | -- | -- |

##### 编辑器相关

| call函数功能名 | 说明 | 参数 | 备注 |
| :--- | :--- | :--- | :--- |
| editor.updateStatus | 更新编辑状态 | type: 编辑器类型 ask/answer<br>data: 状态字段存放处，包含title/content/tags/publish/count/success | -- |
