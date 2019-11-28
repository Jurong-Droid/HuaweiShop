define([
    'jquery',
    '../server/main',
    './modules/swiper',
    './modules/adv',
    './modules/down_list',
    './modules/hot',
    './modules/recommendation',
    './modules/cenAdv',
    './modules/goods',
    './modules/nav',
    './modules/input',

], function (
    $,
    { getBannerData, getAdvData, getHotData, getHotItemData, getRecommendationData, getcenAdvData, getGoodsData, getNavsData },
    { bannerInit },
    { advInit },
    { moreBrill },
    { hotInit },
    { RecommendationInit, SwiperInit },
    { cenAdvInit },
    { goodsInit },
    { navInit },
    { moreInput },
) {

    //搜索框下拉菜单
    moreInput();

    //banner数据操作
    getBannerData().then(function (res) {
        bannerInit(res);
    });

    //头部广告数据操作
    getAdvData().then(function (res) {
        advInit(res);
    })

    //热门推荐数据操作
    getHotData().then(function (res) {
        hotInit(res);
    })

    //中间广告
    getcenAdvData().then(function (res) {
        cenAdvInit(res);
    })

    //精品热销数据操作
    getRecommendationData()
        .then(function (res) {
            RecommendationInit(res);
        })
        .then(function () {
            SwiperInit();
        });

    //首页banner导航数据添加
    //手机导航
    getNavsData('phoneNav').then(function (res) {
        navInit('phoneNav', res);
    });

    //笔记本导航
    getNavsData('bookNav').then(function (res) {
        navInit('bookNav', res);
    });

    //首页手机列表操作
    getGoodsData('phone').then(function (res) {
        goodsInit('phone', res);
    });

    //首页笔记本列表操作
    getGoodsData('book').then(function (res) {
        goodsInit('book', res);
    });

    //首页平板列表操作
    getGoodsData('pad').then(function (res) {
        goodsInit('pad', res);
    });

    //首页所有下拉菜单，获取元素传参数即可
    window.onload = function () {
        //更多精彩
        var none = document.querySelector('li.more_brilliant')
        var block = document.querySelector('.more_brilliant ul.more_brilliant_list')
        moreBrill(none, block)
        //客户服务
        var none1 = document.querySelector('li.service')
        var block1 = document.querySelector('.service ul.service_list')
        moreBrill(none1, block1)
        //网站导航
        var none2 = document.querySelector('li.header_right_nav')
        var block2 = document.querySelector('li.header_right_nav .header_right_navlist')
        moreBrill(none2, block2)
        //手机版
        var none3 = document.querySelector('li.nav_phone')
        var block3 = document.querySelector('li.nav_phone .nav_phone_list')
        moreBrill(none3, block3)
        //购物车下拉
        var noneCart = document.querySelector('.header_right li.cart')
        var blockCart = document.querySelector('.cart_hover')
        moreBrill(noneCart, blockCart)
        //手机导航
        var noneNav = document.querySelector('#nav .nav_phone')
        var blockNav = document.querySelector('#phoneNav')
        moreBrill(noneNav, blockNav)
        //笔记本&平板导航
        var noneNav = document.querySelector('#nav .nav_book')
        var blockNav = document.querySelector('#bookNav')
        moreBrill(noneNav, blockNav)
        //智能穿戴导航
        var noneNav = document.querySelector('#nav .nav_watch')
        var blockNav = document.querySelector('#watchNav')
        moreBrill(noneNav, blockNav)
    }

    scrollFont();
    //首页公告文字滚动
    function scrollFont() {
        var speed = 80
        // 向上滚动
        var demo = document.getElementById("demo");
        var demo2 = document.getElementById("demo2");
        var demo1 = document.getElementById("demo1");
        demo2.innerHTML = demo1.innerHTML
        function Marquee() {
            if (demo.scrollTop >= demo1.offsetHeight) {
                demo.scrollTop = 0;
            }
            else {
                demo.scrollTop = demo.scrollTop + 1;
            }
        }
        var MyMar = setInterval(Marquee, speed)
        demo.onmouseover = function () { clearInterval(MyMar) }
        demo.onmouseout = function () { MyMar = setInterval(Marquee, speed) }
    }

    scrollTop();
    //返回顶部设置方法
    function scrollTop() {
        $(function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 800) {
                    $(".swkc_scroll").fadeIn();
                } else {
                    $(".swkc_scroll").fadeOut();
                }
            });
            $(".swkc_scroll").click(function () {
                if ($(window).scrollTop() > 0) {
                    $("html,body").stop().animate({ scrollTop: 0 }, 600);
                }
            });
        })
    }

    scrollFloor()
    //楼层切换设置方法

    function scrollFloor() {
        $(function () {
            //1.楼梯什么时候显示，800px scroll--->scrollTop
            $(window).on('scroll', function () {
                var $scroll = $(this).scrollTop();
                if ($scroll >= 800) {
                    $('#loutinav').fadeIn();
                } else {
                    $('#loutinav').fadeOut();
                }

                //4.拖动滚轮，对应的楼梯样式进行匹配
                $('.product_wrap').each(function () {
                    var $loutitop = $('.product_wrap').eq($($li).index()).offset().top + 400;
                    var $li = $('#loutinav').find('li')
                    //console.log($loutitop);
                    if ($loutitop > $scroll) {//楼层的top大于滚动条的距离
                        $li.removeClass('active');
                        $li.eq($(this).index()).addClass('active');
                        return false;//中断循环
                    }
                });
            });
            //2.获取每个楼梯的offset().top,点击楼梯让对应的内容模块移动到对应的位置  offset().left

            var $loutili = $('#loutinav li').not('.last');
            $loutili.on('click', function () {
                $(this).addClass('active').siblings('li').removeClass('active');
                var $loutitop = $('.product_wrap').eq($(this).index()).offset().top;
                //获取每个楼梯的offsetTop值
                $('html,body').animate({//$('html,body')兼容问题body属于chrome
                    scrollTop: $loutitop
                })
            });
            //3.回到顶部
            $('.last').on('click', function () {
                $('html,body').animate({//$('html,body')兼容问题body属于chrome
                    scrollTop: 0
                })
            });

        })
    }

});
