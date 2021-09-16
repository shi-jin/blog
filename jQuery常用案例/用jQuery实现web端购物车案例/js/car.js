// 入口函数，等到页面加载完，再加载
$(function() {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了

    // 事件可以使用change，
    // 当全选按钮发生变化
    $(".checkall").change(function() {
        // 拿到状态
        // console.log($(this).prop("checked"));
        // prop可以设置属性
        // 当点击全选按钮后，三个小按钮j-checkbox和两个全选按钮checkall都要选中
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 背景颜色类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    });
    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    $(".j-checkbox").change(function() {
        // if(被选中的小的复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        // console.log($(".j-checkbox:checked").length);
        // $(".j-checkbox").length 这个是所有的小复选框的个数
        // j-checkbox:checked被选中的个数
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            // 让当前的商品添加 check-cart-item 背景颜色类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    // 3. 增减商品数量模块 首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    $(".increment").click(function() {
        // this+号就得到当前兄弟文本框的值n，val()小括号为空，就取到当前值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        // 每点一次+就把n的值传入兄弟itxt
        n++;
        $(this).siblings(".itxt").val(n);
        // 3. 计算小计模块 根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        // 当前商品的价格 p  
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        console.log(p);
        // 保留两位小数
        var price = (p * n).toFixed(2);
        // 小计模块 
        // toFixed(2) 可以让我们保留2位小数
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + price);
        // 当用户修改要计算总计
        getSum();
    });


    // decrement减少商品数量模块
    $(".decrement").click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // 如果n等于1就不再减了
        if (n == 1) {
            // 碰到return,后面的代码就不再执行
            return false;
        }
        // console.log(n);
        n--;
        $(this).siblings(".itxt").val(n);
        // var p = $(this).parent().parent().siblings(".p-price").html();
        // parents(".p-num") 返回指定的祖先元素
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        console.log(p);
        // 小计模块 
        // 保留两位小数
        // 
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        // 当用户修改要计算总计
        getSum();
    });


    //  4. 用户修改文本框的值 计算 小计模块  
    $(".itxt").change(function() {
        // 先得到文本框的里面的值 乘以 当前商品的单价 
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        // substr从第一个开始，就可以去掉人民币符号并截取到最后，并重新赋值
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        // 当用户修改要计算总计
        getSum();
    });
    // 5. 计算总计和总额模块
    // getSum();调用在前面，打开页面，会重新计算值
    getSum();

    function getSum() {
        var count = 0; // 计算总件数 
        var money = 0; // 计算总价钱
        // each为遍历，i为索引号, ele元素值
        // 
        // 拿到总件数
        $(".itxt").each(function(i, ele) {
            // parseInt转化为整数数值才能加减，val()拿到值加到count里
            count += parseInt($(ele).val());
        });

        $(".amount-sum em").text(count); //赋值进总件数


        // 小计
        $(".p-sum").each(function(i, ele) {
            // 去掉人民币符号从第一个元素开始取substr(1)，parseFloat转化为浮点型
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2)); //toFixed(2)保留两位小数
    }
    // 6. 删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action a").click(function() {
        // 删除的是当前的商品 
        $(this).parents(".cart-item").remove();
        // 删除后要重新计算总额总计
        getSum();
    });
    // (2) 删除选中的商品
    $(".remove-batch").click(function() {
        // 删除的是小的复选框选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        // 删除后要重新计算总额总计

        getSum();
    });
    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function() {
        $(".cart-item").remove();
        // 删除后要重新计算总额总计

        getSum();
    })
})