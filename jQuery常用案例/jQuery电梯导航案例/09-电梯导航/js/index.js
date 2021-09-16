// 入口函数
$(function() {
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 添加 current
    // 节流阀  互斥锁 
    var flag = true;
    // 1.显示隐藏电梯导航
    var toolTop = $(".recommend").offset().top;
    toggleTool();

    // 封装为一个函数
    function toggleTool() {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        };
    }

    // 页面滚动
    $(window).scroll(function() {
        toggleTool();
        // 3. 页面滚动到某个内容区域，左侧电梯导航小li相应添加和删除current类名，

        // 节流阀  互斥锁 只要是true时才会添加颜色类

        if (flag) {
            $(".floor .w").each(function(i, ele) {
                // 文档被卷去的头部>= 里面每一个元素offset的值
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    // i是索引号
                    console.log(i);
                    // eq(i)选择第i个，增加类
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();

                }
            })
        }



    });
    // 2. 点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function() {
        // 刚点击的时候节流阀关闭，不在切换其他区域颜色
        flag = false;
        console.log($(this).index());
        // 当我们每次点击小li 就需要计算出页面要去往的位置 
        // 选出对应索引号的内容区的盒子 计算它的.offset().top
        var current = $(".floor .w").eq($(this).index()).offset().top;
        // 页面动画滚动效果
        $("body, html").stop().animate({
            scrollTop: current //目标位置

        }, function() {
            // 当动画执行完，页面滚动到目标位置之后开启节流阀又可以换颜色了
            flag = true;
        });
        // 点击之后，让当前的小li 添加current 类名 ，姐妹移除current类名
        $(this).addClass("current").siblings().removeClass();
    })
})