1. 构建DOM树
2. 样式计算
  - cssom
  - 标准化属性和值 为计算值
  - 计算每个节点的具体样式
3. Layout Tree 布局阶段  计算可见元素的位置
  - 创建布局树
  - 布局计算  计算布局树中坐标位置
4. Layer Tree 分层树
5. 图层绘制
  - 对每个图层进行绘制
  - 主线程将绘制命令提交给合成线程
6. 珊格化操作
  - 优先处理视口附近的土块
  - 快速珊格化
7. 合成和显示
  - 浏览器将页面绘制到内存中，显示到屏幕上