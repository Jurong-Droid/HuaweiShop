define(['jquery'], function ($) {

    var $banner_imgs = $('.banner_box').find('.list')
    var $banner_dots = $('.banner_box').find('.pagination');

    //渲染banner数据设置方法
    function bannerInit(data) {
        // console.log(data)
        let banner_list = data.banner_list;
        let tmp = `
            ${
            banner_list.map((v, i) => {

                if (i == 0) {
                    return `<li class="current"><a href="${v.imgLink}"><img src="${v.imgUrl}"></a></li>`;
                }
                else {
                    return `<li><a href="${v.imgLink}"><img src="${v.imgUrl}"></a></li>`;
                }


            }).join('')
            }
        `;

        let tmp2 = `
            ${
            banner_list.map((v, i) => {
                if (i == 0) {
                    return `<li class="bullet focus"></li>`;
                }
                else {
                    return `<li class="bullet"></li>`;
                }
            }).join('')
            }
        `;

        $banner_imgs.html(tmp);
        $banner_dots.html(tmp2);
        swiper();
    }

    //原生JS图片轮播
    function swiper() {
        var currentIndex = 0;
        var len = document.querySelector('.list').childElementCount

        function slideTo(index) {
            if (index === len) {
                index = currentIndex = 0;
            }

            if (index === -1) {
                index = currentIndex = len - 1;
            }

            document.querySelector('.focus').className = 'bullet';
            document.querySelector('.pagination li:nth-of-type(' + (index + 1) + ')').className = 'bullet focus'

            document.querySelector('.current').className = '';
            document.querySelector('.list li:nth-of-type(' + (index + 1) + ')').className = 'current'
        }

        function slideNext() {
            currentIndex++
            slideTo(currentIndex)
        }

        function slidePrev() {
            currentIndex--
            slideTo(currentIndex)
        }

        //事件绑定
        document.querySelector('.prev').onclick = slidePrev
        document.querySelector('.next').onclick = slideNext

        var dots = document.querySelectorAll('.bullet')
        for (var i = 0; i < dots.length; i++) {
            dots[i].index = i;
            dots[i].onmouseover = function () {
                currentIndex = this.index
                slideTo(currentIndex)
            }
        }

        document.querySelector('.banner_box').onmouseover = function () {
            stop()
        }

        document.querySelector('.banner_box').onmouseout = function () {
            auto()
        }

        //自动
        var id;
        function auto() {
            // setInterval(slideNext, 3000)
            id = setInterval(function () {
                slideNext()
            }, 3000)
        }

        function stop() {
            clearInterval(id)
        }
        auto()
        stop()
        return false
    }

    return {
        bannerInit
    };
})





