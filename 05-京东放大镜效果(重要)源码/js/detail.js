//注意 : 页面执行完之后再加载代码load
window.addEventListener('load', function() {
    // 获取图片详情事件源
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1. 当我们鼠标经过 preview_img 就显示 mask 遮挡层 和 big 大盒子
    // 鼠标经过时mouseover
    preview_img.addEventListener('mouseover', function() {
            // 显示'block
            mask.style.display = 'block';
            big.style.display = 'block';
        })
        //  当我们鼠标离开'mouseout preview_img 隐藏 mask 遮挡层 和 big 大盒子

    preview_img.addEventListener('mouseout', function() {
            mask.style.display = 'none';
            big.style.display = 'none';
        })
        // 2. 鼠标移动的时候，让黄色的盒子跟着鼠标来走
    preview_img.addEventListener('mousemove', function(e) {
        // (1). 先计算出鼠标在盒子内的坐标  =页面坐标-盒子外侧坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        // (2) 减去盒子高度 300的一半 是 150 就是我们mask 盒子中心的最终 left 和top值了
        // (3) 我们mask盒子中心 移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // (4) 如果x 坐标小于了0 就让他停在0 的位置
        // 遮挡层的最大移动距离=左边框图片的宽度-盒子的宽度
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        // 因为是正方形 X,Y都一样,maskMax也一样
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        // 赋值操作
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 3. 大图片的移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层的最大移动距离
        //获取 大图
        var bigIMg = document.querySelector('.bigImg');
        // 大图片最大移动距离=大图宽度-大盒子宽度
        var bigMax = bigIMg.offsetWidth - big.offsetWidth;
        // 大图片的移动距离 X Y
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        //大图坐标,负值引起大图和小图移动的方向相反
        bigIMg.style.left = -bigX + 'px';
        bigIMg.style.top = -bigY + 'px';

    })

})