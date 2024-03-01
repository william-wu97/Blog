---
title: 友情链接
aside: false
---

<script setup>
import { ref } from "vue";
import Link from "@/views/Link.vue";
import Comments from "@/components/Comments.vue";
import Checkbox from "@/components/Tags/Checkbox.vue";

// 添加友链勾选
const addLinkChecked = ref(false);
</script>

<Link />

# 友情链接申请

很高兴能和各位优秀的朋友们交流，本站友链目前采用**手动添加**，如果你想加入友链，可以在下方留言，我会在不忙的时候统一添加。

### 友链相关须知

- 为了友链相关页面和组件的统一性和美观性，可能会对你的部分信息进行缩短处理，例如昵称包含 `博客`、`XX的XX` 等内容或形式**将被简化**。
- 为了图片加载速度和内容安全性考虑，头像或其他信息中的图片均使用本站图床，**所以无法收到贵站自己的头像更新**，如果有迫切的更改信息需求，**请在本页的评论中评论说明**。

### 我的友链信息

- 名称：`無名小栈`
- 描述：`分享技术与科技生活`
- 地址：`https://blog.imsyy.top/`
- 头像：`https://pic.imgdb.cn/item/65bc52b0871b83018a06699d.png`
- 站点图片：`https://pic.imgdb.cn/item/65dc47009f345e8d030b65ba.png`

```yml
name: 無名小栈
desc: 分享技术与科技生活
url: https://blog.imsyy.top/
avatar: https://pic.imgdb.cn/item/65bc52b0871b83018a06699d.png
screenshot: https://pic.imgdb.cn/item/65dc47009f345e8d030b65ba.png
```

### 申请友链

- 我已添加 [無名小栈](https://blog.imsyy.top/) 的友情链接。
- 本站不添加 **采集站**、**纯搬运站点**、**论坛类站点** 等非 **个人博客** 类型的站点。
- 站点目前可以在 **中国大陆区域** 正常访问。
- 需要是独立域名，不接受 `github.io`、`vercel.app` 等第三方域名。
- 网站内容符合 **中国大陆法律法规**。

> 若申请时或日后有违反上述规定的站点，博主有权**自行删除且不进行通知！**

---

<Checkbox v-model="addLinkChecked">
  我已认真确认阅读上方要求，并希望添加友链
</Checkbox>

<Transition name="fade" mode="out-in">
  <Comments v-if="addLinkChecked" />
</Transition>