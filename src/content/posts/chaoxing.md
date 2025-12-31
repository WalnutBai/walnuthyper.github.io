---
title: 学习通APK修改全教程
published: 2025-12-31
tags: [安卓逆向, 教程]
category: AndroidReverse
draft: false
---

# 学习通APK修改全教程

本教程涵盖学习通APK脱壳、功能修改、反检测、考试增强等全流程操作，适配6.x系列版本。

## 1，脱壳
脱壳网站56.al，获得dex
AndroidManifest.xml：
```xml
application下name：“com.secneo.apkwrapper.AW”改“com.chaoxing.mobile.AppApplication”，
android:appComponentFactory="com.secneo.apkwrapper.AP"改为“androidx.core.app.CoreComponentFactory”并删除最后provider，添加“android:debuggable="true"”后面调试用。
```
原dex有库需导入，classes重命名+1塞回包。（否则云盘闪退）
删除特征文件：
```
assets/meta-data/manifest.mf
assets/meta-data/rsa.pub
assets/meta-data/rsa.sig
lib/arm64-v8a/libDexHelper-x86.so
lib/arm64-v8a/libDexHelper.so
```
操作不要签名，最后普通一键去除签名校验。
注：必须去签，位置签到时百度地图sdk会校验应用签名，校验失败无法位置签到！普通去签即可，无需原包过签。

## 2，视频快进+倍速
com.chaoxing.mobile.player.course.CourseVideoPlayer：
清空：setCanTraceAfter、setCanSpeed方法
最新版无效，待更新。

## 3，自定义倍速
arsc++编辑下列内容：
```xml
<string-array name="video_speed_float">
    <item>0.5</item>
    <item>1.0</item>
    <item>1.5</item>
    <item>2.0</item>
    <item>2.5</item>
    <item>3.0</item>
</string-array>
<string-array name="video_speed_string">
    <item>0.5x</item>
    <item>1.0x</item>
    <item>1.5x</item>
    <item>2.0x</item>
    <item>2.5x</item>
    <item>3.0x</item>
</string-array>
<string-array name="video_speeds_chose">
    <item>0.5x</item>
    <item>1.0x</item>
    <item>1.5x</item>
    <item>2.0x</item>
    <item>2.5x</item>
    <item>3.0x</item>
</string-array>
```
    
## 4，去考试小窗检测
“com.chaoxing.mobile.webapp.table.ProtocolTable_Impl”删除有关“CLIENT_SNAPSHOT”代码
但其实清空字符串“版本过低,无法截屏”所在方法即可，上述是调用处。

## 5，去下线弹窗
清空字符串“你的学习通账号于%s在%s设备上登录。若非本人操作，则密码可能已经泄露，请尽快登录学习通修改密码。”所在方法。

## 6，去更新
清空“检查版本升级失败”所在方法
6.1.5暂未找到，不过有不再提醒，懒得改。

## 7，修改默认为我学的课
通用法：类名“CourseListViewModel”，找“return this.a”方法调用处，找类似下面方法代码修改。
6.4.8法：找字符串“我学的课”id，查找调用处，找到下列代码：（搜“course_study_list”）
```java
private void ja() {
    if (this.C == null) {
        this.T = LayoutInflater.from(getContext()).inflate(R.layout.toolbar_title_radio_group_item, (ViewGroup) null, false);
        this.e.getTitleLayoutParent().addView(this.T);
        this.U = (RadioGroup) this.T.findViewById(R.id.rgTabs);
        this.V = (RadioButton) this.T.findViewById(R.id.rb_01);
        this.W = (RadioButton) this.T.findViewById(R.id.rb_02);
        this.V.setText(getString(R.string.course_teach_list));
        this.W.setText(getString(R.string.course_study_list));
        this.U.setOnCheckedChangeListener(this.U0);
        if (this.X.f() == 1) {//别if了，goto
            this.U.check(R.id.rb_01);//我教的课
            return;
        } else {
            this.U.check(R.id.rb_02);//我学的课
            return;
        }
    }
    this.e.getTitleView().setText(((FolderInfo) this.C.getContents()).getFolderName());
}
```

## 8，去开屏广告
“com.chaoxing.mobile.activity.SplashActivity”转java，搜全词匹配“ad”
得：Ad a = this.f.a(this);，跳转a方法清空代码，即return null。

## 9，手动去除签名校验、去把其他设备挤下线，去虚拟机检测
清空方法，类名“com.chaoxing.libencrypt.Encrypt”，方法“native_init”，注意删除“native”修饰符。

```smali
.method public static native native_init(Landroid/content/Context;)V
.end method
```
改为
```smali
.method public static native_init(Landroid/content/Context;)V
    .registers 1

    return-void
.end method
```

## 10，始终显示“转发”，为浏览器考试做铺垫
算法助手打开“监听onclick”，找到回调类，查找构造方法调用处，类“WebAppViewerFragment”，定位“null”，删除下面if

## 11，去除root提示
清空“你的手机已经获得ROOT权限，存在安全风险！”所在方法

## 12，内置浏览器标题添加打开浏览器事件
确保已修改10，算法助手抓点击事件，onclick跳转，分析
搜索“geturl”，仿照写smali，类“WebAppViewerFragment”，搜索“GroupReportActivity”定位“举报”事件，调用openURL，最后修改“举报”文本（arsc++搜“topic_Report”）
事例：（注意寄存器个数）
```smali
.method private e(Ljava/lang/String;Ljava/lang/String;)V
    .registers 7
    #仿写调用geturl
    iget-object v0, p0, Lcom/chaoxing/mobile/webapp/ui/WebAppViewerFragment;->r:Lcom/chaoxing/mobile/webapp/WebViewerParams;

    invoke-virtual {v0}, Lcom/chaoxing/mobile/webapp/WebViewerParams;->getUrl()Ljava/lang/String;

    move-result-object v0
    #调用openURL
    invoke-direct {p0, v0}, Lcom/chaoxing/mobile/webapp/ui/WebAppViewerFragment;->openURL(Ljava/lang/String;)V
    return-void
.end method
```

openURL的smali：
```smali
.method private openURL(Ljava/lang/String;)V
    .registers 4
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "(",
            "Ljava/lang/String;",
            ")V"
        }
    .end annotation

    .prologue
    .line 231
    new-instance v0, Landroid/content/Intent;

    const-string v1, "android.intent.action.VIEW"

    invoke-direct {v0, v1}, Landroid/content/Intent;-><init>(Ljava/lang/String;)V

    .line 232
    invoke-static {p1}, Landroid/net/Uri;->parse(Ljava/lang/String;)Landroid/net/Uri;

    move-result-object v1

    invoke-virtual {v0, v1}, Landroid/content/Intent;->setData(Landroid/net/Uri;)Landroid/content/Intent;

    .line 233
    invoke-virtual {p0, v0}, 粘贴当前类名->startActivity(Landroid/content/Intent;)V
#补全上述代码
    return-void
.end method
```

## 13，学习通网页可调试：
“AndroidManifest.xml”在“<application”添加
```xml
android:debuggable="true"
```
类“WebAppViewerFragment”找到执行js的那个函数，第一行添加：
```smali
const/4 v0, 0x1

invoke-static {v0}, Landroid/webkit/WebView;->setWebContentsDebuggingEnabled(Z)V
```

## 14，学习通考试、测验增强：
dex++，找到类似以下的字符串，替换：
```javascript
(function(){ var name; try{ name = document.getElementById('activity-name').innerText.replace(/(^\s+)|(\s+$)/, '');}catch(e){} if(name) { androidjsbridge.getTitle(name); } try{if(!document.querySelector('.copyStyle')){const a=document.createElement('style');a.textContent='*{user-select:text!important;-webkit-user-select:text!important;-webkit-touch-callout:default!important;-khtml-user-select:text!important;-moz-user-select:text!important;-ms-user-select:text!important;}';a.className='copyStyle';document.head.appendChild(a);}editors.forEach(a=>{a&&a.ueditor&&(a.ueditor.__allListeners.beforepaste=null)});document.querySelectorAll('.mask_div').forEach(a=>a.remove());closeMonitor()}catch(e){console.log(e)}})()
```

上述代码的功能：在原js基础上添加，允许复制（css），填空题允许粘贴（移除监听器），删除水印，关闭切屏监控。
教程见：https://bbs.binmt.cc/thread-150946-1-1.html

## 15，学习通多签（未尝试，理论可行）
搜“CLIENT_DEVICE_FLAG”，找是“name=”的类，字符串定位“^(0{16,64})$”，滑动最下面，找类似下面，方法以上全删。
  :cond_27
  :goto_27

添加生成随机id字符串函数：
```smali
.method public static randomS()Ljava/lang/String;
    .registers 5

    .prologue
    .line 26
    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    .line 27
    const-string v2, "0123456789abcdefghijklmnopqrstuvwxyz"

    .line 28
    new-instance v3, Ljava/util/Random;

    invoke-direct {v3}, Ljava/util/Random;-><init>()V

    .line 29
    const/4 v0, 0x0

    :goto_d
    const/16 v4, 0x10

    if-ge v0, v4, :cond_23

    .line 30
    invoke-virtual {v2}, Ljava/lang/String;->length()I

    move-result v4

    invoke-virtual {v3, v4}, Ljava/util/Random;->nextInt(I)I

    move-result v4

    .line 31
    invoke-virtual {v2, v4}, Ljava/lang/String;->charAt(I)C

    move-result v4

    invoke-virtual {v1, v4}, Ljava/lang/StringBuilder;->append(C)Ljava/lang/StringBuilder;

    .line 29
    add-int/lit8 v0, v0, 0x1

    goto :goto_d

    .line 33
    :cond_23
    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    return-object v0
.end method
```

原方法添加调用：
```smali
invoke-static {}, 当前类名->randomS()Ljava/lang/String;

move-result-object p1
```

## 999，学习通数据迁移
可将原版数据迁移至修改版，避免聊天记录丢失。
方法：
1，原版设置选择“备份（迁移至鸿蒙）”，在Download/chaoxing下生成数据包。
2，对修改包进行“功能”-“注入文件提供器”，安装后mt“添加本地存储”
3，将数据包“com.chaoxing.mobile/ce/”解压至data/data
注：新版（6.4.8）聊天记录被加密，不能恢复给旧版（6.1.5）。版本差距过大可能也无法恢复，请自行修改>=导出时学习通版本的学习通apk。