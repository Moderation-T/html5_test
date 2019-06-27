# iscroll&hammer


### iScroll 主要是滚动
> bounce  是否允许拖过了
> bounceTim 默认600ms 拖过的放手回到原处的时间
> scrollX bool 是否允许横向拖拽
> scrollY bool 是否允许纵向拖拽
> freeScroll  bool 是否允许自由滚动
> directionLockTreshold 方向锁定的阈值 默认是5
> startY
> startX
> disableMouse bool 是可用鼠标
> disablePointer bool -> touch + mouse
> disableTouch bool 是否可触摸
> mouseWheelSpeed 鼠标滚动速度
> inverWheelDirection 翻转鼠标滚轮方向
> - momentum bool 动量 物理引擎
>   - true——开启物理引擎，提高效果、性能降低
>   - false——极大提升性能，效果我觉得差不多      
    
> bounceEasing
> 
> probeType —— 探测的优先级 1低（定时探测拖拽） 2中（实时探测拖拽） 3高（实时探测所有运动——自动禁用transition）
> 
> 并没有什么用：
useTransform
useTransition
preventDefault
preventDefaultException
bindToWrapper     false
eventPassthrough  冒泡
HWCompositing
resizePolling
resizeScrollbars
snapThreshold

**IScroll事件**
> iscroll事件：
scroll
beforeScrollStart         手指按下去
scrollStart               第一次移动
scroll                    滚动中
scrollEnd                 手指抬起来 回到顶部才触发
scrollCancel              手指按下没动，就抬起来了
*zoomStart			缩放开始
*zoomEnd			缩放结束

```
  <script>
      window.onload = function() {
        let scroll = new IScroll('.parent', {
          //bounce: false
          bounceTime: 300,
          scrollX: true,
          scrollY: true,
          freeScroll: true,
        });
      };
    </script>
```

### Hammer 主要是手势

**hammer事件**
> **`hammer.on('',function(){})`**
> tap 点击  轻点 250mm之内 按下+抬起 click有延迟 tap更灵敏一点 
> press 点击 超过250mm 长按
> - swipe 滑动 快滑 超过300px/s
	- swipeleft
	- swiperight
> pan 滑动 按住慢慢滑
	- panleft 向左
	- panright 向右
	- panstart 滑动开始 超出一定距离才有反应
	- panmove 移动
	- panend 滑动结束
	- pancancel  取消滑动

 **`hammer.get('',funciotn(){})`**
```
// 旋转
<script>
 window.onload=function (){
   let oBox=document.querySelector('.box');
   let deg=0,old_deg;

   let hammer=new Hammer(oBox);

   hammer.get('rotate').set({enable: true});
   hammer.on('rotatestart', ev=>{
     old_deg=deg;
   });
   hammer.on('rotatemove', ev=>{
     deg=old_deg+ev.rotation;

     oBox.style.transfrom=`rotate(${deg}deg)`;
   });
   hammer.on('rotateend', ev=>{});
 };
</script>
```

```
// 缩放
 <script>
    window.onload=function (){
      let oBox=document.querySelector('.box');
      let scale=0,old_scale;

      let hammer=new Hammer(oBox);

      hammer.get('pinch').set({enable: true});
      hammer.on('pinchstart', ev=>{
        old_scale=scale;
      });
      hammer.on('pinchmove', ev=>{
        scale=old_scale*ev.scale;

        oBox.style.transform=`scale(${scale})`;
      });
      hammer.on('pinchend', ev=>{});
    };
    </script>
```
