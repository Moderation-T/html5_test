# canvas 基本图形


**基础用法**
```
<script>
    window.onload = function() {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      // 画路径
      context.beginPath();
      context.moveTo(100, 100);
      context.lineTo(200, 100);
      context.lineTo(200, 200);
      context.lineTo(100, 200);
      context.closePath();

      /*设置样式*/
      // 边颜色
      context.strokeStyle = '#09f';
      // 填充色
      context.fillStyle = 'pink';
      // 线宽
      context.lineWidth = 5;

      // 描边
      context.stroke();
      // 填充
      context.fill();

      // ***************************************

      // 画路径
      context.beginPath();
      context.moveTo(300, 100);
      context.lineTo(400, 100);
      context.lineTo(400, 200);
      context.lineTo(300, 200);
      context.closePath();

      /*设置样式*/
      // 边颜色
      context.strokeStyle = 'pink';
      // 填充色
      context.fillStyle = '#09f';
      // 线宽
      context.lineWidth = 5;

      // 描边
      context.stroke();
      // 填充
      context.fill();
    };
  </script>
```

**路径操作**
> 一切路径操作之前一定要`context.beginPath()`
这样会从新开始一条路径 否则后边的路径操作会覆盖前面的路径

路径操作
- context.beginPath(x,y)
- context.closePath(x,y) 闭合当前的路径 
- context.moveTo(x,y)
- context.lineTo(x,y)
- context.stroke(x,y)
- context.fill(x,y)


**矩形操作**
- context.rect(x, y, width, height) 路径操作
- context.strokeRect(x, y, width, height) 图形操作
- context.fillRect(x, y, width, height) 图形操作
- context.clearRect(x, y, width, height) 擦除操作
```
<script>
    window.onload = function() {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      context.strokeStyle = 'orange';
      context.rect(250, 100, 100, 100);
      context.stroke();

      context.strokeStyle = 'green';
      context.lineWidth = 5;
      context.strokeRect(100, 100, 100, 100);

      context.fillStyle = 'red';
      context.fillRect(100, 100, 100, 100);
    };
  </script>
```

> windows.onresize 响应式

**canvas特征**
- canvas 不会保存图形
	- 图形不能修改 —— 想修改只能擦了重画
	- 图形没有事件
- 速度极快

**requestAnimationFrame**
> 请求动画帧 系统给出的合理帧
人眼极限是60帧 也就是16ms走一帧速
```
<script>
    window.onload = function() {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      const next = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        left += 3;
        context.strokeRect(left, 100, 100, 100);
        requestAnimationFrame(next);
      };

      let left = 100;
      context.strokeStyle = 'blue';

      requestAnimationFrame(next);

      // 用 setInerval 显得 low 改用 requestAnimationFrame
      // setInterval(() => {
      //   context.clearRect(0, 0, canvas.width, canvas.height);

      //   left += 3;
      //   context.strokeRect(left, 100, 100, 100);
      // }, 1000);
    };
  </script>
```

**事件**
> 一切事件 都自己动手
```
// 判断鼠标是否在矩形内
<script>
    window.onload = function() {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      context.fillStyle = 'red';
      rectX = 100;
      rectY = 100;
      rectW = 100;
      rectH = 100;

      context.fillRect(rectX, rectY, rectW, rectH);

      canvas.addEventListener('mousemove', e => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        /* 获取鼠标位置的方法 1
          const mouseX = e.ClinetX.canvas.offsetLeft
          const mouseY = e.ClinetY.canvas.offsetTop
        */
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        if (mouseX > rectX && mouseX < rectX + rectW && mouseY > rectY && mouseY < rectY + rectH) {
          context.fillStyle = 'green';
        } else {
          context.fillStyle = 'red';
        }

        context.fillRect(rectX, rectY, rectW, rectH);
      });
    };
  </script>
```

**圆形**
arc(x, y, radius, startAngle, endAngle, anticlockwise)
> **anticlockwise** 顺时针还是逆时针 可选的Boolean值 ，如果为 true，逆时针绘制圆弧，反之，顺时针绘制。 
>  startAngle, endAngle 用的是弧度

```
// 判断鼠标是否在圆形内
/*
	就是判断鼠标到圆心的距离 是否小于圆形的半径 小于则在反之不在
*/

<script>
    window.onload = function() {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      // 圆形
      context.beginPath();
      const x = 100;
      const y = 100;
      const r = 50;
      context.arc(x, y, r, 0, 2 * Math.PI, false);
      context.strokeStyle = 'green';
      context.lineWidth = 5;
      context.stroke();

      canvas.addEventListener('mousemove', e => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        const a = mouseX - x;
        const b = mouseY - y;

        const c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

        if (c < r) {
          context.strokeStyle = 'red';
        } else {
          context.strokeStyle = 'green';
        }

        context.arc(x, y, r, 0, 2 * Math.PI, false);
        context.stroke();
      });
    };
  </script>

```

**做个饼图**
```
 <script>
    window.onload = function() {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      const toArc = angle => {
        return angle * (Math.PI / 180);
      };

      const score = {
        A: 5,
        B: 35,
        C: 11,
        D: 22,
      };

      const color = ['red', 'blue', 'green', 'yellow'];

      // 画饼封装
      const renderPie = (pieX, pieY, pieR, startAng, endAng, fillStyle) => {
        // pieX, pieY 原点坐标
        // pieR, 半径
        // startAng, endAng, 起始角度 结束角度
        // fillStyle 填充颜色

        const a = Math.sin(toArc(startAng)) * pieR;
        const b = Math.cos(toArc(startAng)) * pieR;
        const x1 = pieX + b;
        const y1 = pieY + a;
        context.beginPath();
        context.moveTo(pieX, pieY);
        context.lineTo(x1, y1);
        context.arc(pieX, pieY, pieR, toArc(startAng), toArc(endAng), false);
        context.closePath();
        context.fillStyle = fillStyle;
        context.stroke();
        context.fill();
      };

      let allScore = 0;
      let percentAngle = [];

      for (const key in score) {
        if ({}.hasOwnProperty.call(score, key)) {
          allScore += score[key];
        }
      }

      for (const key in score) {
        if ({}.hasOwnProperty.call(score, key)) {
          percentAngle.push({ [key]: 360 * (score[key] / allScore) });
        }
      }

      startAng = 0;
      console.log(percentAngle);

      percentAngle.map((angle, index) => {
        const endAng = startAng + angle[Object.keys(angle)[0]];
        renderPie(200, 200, 150, startAng, endAng, color[index]);
        startAng = endAng;
      });
    };
  </script>
```

**文字**
strokeText(string,x,y)
fillText(string,x)

**canvas的transform**
1. rotate
2. translate
3. scale


**图形旋转**
- context.cave()
- context.restore()
```
 <script>
    window.onload = function() {
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');

      let n = 1;
      const rectRotate = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.beginPath();
        context.save();
        context.strokeStyle = 'green';
        context.translate(150, 150);
        context.rotate(n * 15 * (Math.PI / 180));
        context.strokeRect(-50, -50, 100, 100);
        context.restore();

        context.beginPath();
        context.save();
        context.strokeStyle = 'blue';
        context.translate(150, 150);
        context.rotate(-(n - 1) * 10 * (Math.PI / 180));
        context.strokeRect(-50, -50, 100, 100);
        context.restore();
        n++;
        requestAnimationFrame(rectRotate);
      };

      requestAnimationFrame(rectRotate);

      // setInterval(rectRotate, 50);
    };
  </script>
```
