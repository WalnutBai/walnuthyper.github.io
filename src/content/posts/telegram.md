---
title: 电报类软件解锁订阅教程
published: 2026-01-03
tags: [安卓逆向, 教程]
category: 逆向工程
draft: false
---
## 工具需求
- MT管理器 或者 NP管理器 或任意反编译工具

## 1. 推荐第三方电报客户端

**Cherrygram** 是一个功能全面、未进行代码混淆的第三方电报客户端，反编译后可直接查看Premium相关代码，属于第三方电报客户端中的第一梯队。

::github{repo="arsLan4k1390/Cherrygram"}

## 2. 适用范围

本教程仅适用于**未混淆**的官方和第三方电报类软件。

## 3. 查找 Premium 相关资源

1. 打开 MT 管理器中的 **Arsc 编辑器**
2. 选择「搜索资源值」，资源类型设置为「字符串」
3. 直接搜索关键词 `Thank you`

## 4. 获取 Premium 资源 ID

1. 找到包含以下内容的字符串资源：

   ```
   Thank you for subscribing to **Telegram Premium**.
   Here’s what is now unlocked.
   ```

2. 长按该资源并复制其 ID（注意：不同版本的应用ID可能不同）

## 5. 定位 Premium 校验代码

1. 退出 Arsc 编辑器
2. 返回 APK 查看界面，全选 dex 文件，选择以 `Dex++` 方式打开
3. 使用刚才复制的 ID 进行搜索，搜索类型选择「代码」

4. 找到类似以下格式的结果：

   ```
   .field public static final TelegramPremiumSubscribedSubtitle:I = 0x7f0f24e7
   ```

5. 找到匹配结果后，点击编辑器顶部的导航按钮（指南针图标）
6. 长按当前方法，选择「查找所有调用处」
7. 从多个结果中判断，Premium 状态判断代码通常位于 `org.telegram.ui` 包下的类中

## 6. 修改 Premium 状态判断

1. 从刚才的搜索结果中进入调用处所在的类
2. 找到调用 `isPremium` 方法的代码，长按该方法名可跳转到 `isPremium` 方法的实现
3. 在 `isPremium` 方法中找到以下类似代码行：

   ```smali
   iget-boolean v0, v0, Lorg/telegram/tgnet/TLRPC$Y1;->premium:Z
   ```

4. 添加代码将其修改为强制返回 Premium 状态：

   ```smali
   const/4 v0, 0x1  # 强制返回 true，即 Premium 状态
   ```

5. 保存修改并退出编辑器，最后重新签名 APK

## 7. 原理简介

本教程的核心原理是通过修改应用内部的Premium状态判断逻辑来实现功能解锁。

1. **Premium状态存储机制**：
   - 电报类应用通常会在用户数据结构（如 `TLRPC$Y1` 类）中用一个布尔字段（`premium:Z`）来标识用户是否为Premium订阅者

2. **状态判断流程**：
   - 应用在需要访问Premium功能时，会调用 `isPremium` 等方法检查该布尔字段的值
   - 根据返回结果决定是否允许使用高级功能

3. **修改原理**：
   - 通过反编译工具定位到 `isPremium` 方法的具体实现
   - 将原本读取用户实际Premium状态的代码（`iget-boolean` 指令）替换为直接返回 `true` 的指令（`const/4 v0, 0x1`）
   - 从而强制应用认为当前用户始终处于Premium订阅状态

4. **注意事项**：
   - 这种修改仅在本地生效，不会影响应用的服务器端逻辑
   - 不会真正获得官方Premium订阅的服务器端权益（如更大的文件上传限制等）
   - 但可以解锁基于客户端判断的Premium功能