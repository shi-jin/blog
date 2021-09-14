//页面全部加载完后再执行函数
window.addEventListener('load', function() {
    // 如果显示1，说明js没问题
    // alert(1);
    // 1. 获取左右按钮，轮播图大盒子，元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    // 2. 鼠标经过focus 就显示左右按钮，关闭定时器
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null; // 清空定时器变量
    });
    // 2. 鼠标离开focus 就隐藏左右按钮，就开启定时器

    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            //手动调用点击事件，就开启定时器
            arrow_r.click();
        }, 2000);
    });
    // 3. 动态获取focus里面的ul,生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    // for循环遍历ul.children.length
    for (var i = 0; i < ul.children.length; i++) {
        //3.4 创建一个小li ，创建一个节点
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号 通过自定义属性来做 
        li.setAttribute('index', i);
        // 3.3 把小li插入到ol 里面，动态生成小圆圈，插入节点
        ol.appendChild(li);
        // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件，要写在for循环里面
        li.addEventListener('click', function() {
            // 干掉所有人 把所有的小li 清除 current 类名，选中所以li,并清空类名
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下我自己  当前的小li 设置current 类名
            this.className = 'current';
            // 5. 点击小圆圈，移动图片 当然移动的是 ul 
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            // 当我们点击了某个小li 就拿到当前小li 的索引号
            var index = this.getAttribute('index');
            // 防止bug:当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 防止bug:当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            // 也可以连写
            // num = circle = index;
            console.log(focusWidth);
            console.log(index);
            //利用 animate移动ul, ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值

            animate(ul, -index * focusWidth);
        })
    }
    // 把ol里面的第一个小li设置类名为 current，ol里面第一个li变成白色
    ol.children[0].className = 'current';
    // 6. 克隆第一张图片(li)放到ul 最后面  true深克隆
    var first = ul.children[0].cloneNode(true);
    // appendChild加到ul里面
    ul.appendChild(first);
    // 7. 点击右侧按钮， 图片滚动一张，全局变量，写在外面
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀，防止用户点击太快，图片显示不完整，等第一张图片播放完，再播放第二张
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            // 没点一次，就增加
            num++;
            // animate(obj, target,callback )     图片宽度focusWidth，当动画执行完后打开节流阀
            animate(ul, -num * focusWidth, function() {
                flag = true; // 打开节流阀
            });
            // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });

    // 9. 左侧按钮做法
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
            circle--;
            // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    });

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    }
    // 10. 自动播放轮播图
    var timer = setInterval(function() {
        //手动调用点击事件,和右边的按钮功能相同，每隔两秒切换
        arrow_r.click();
    }, 2000);

})