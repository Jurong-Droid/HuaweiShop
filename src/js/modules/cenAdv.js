define(['jquery'], function ($) {

    var $adv_imgs = $('.slider').find('.center_list')
    var $adv_dots = $('.slider').find('.center_pagination');

    //渲染banner数据设置方法
    function cenAdvInit(data) {
        //console.log(data)
        let center_adv = data.center_adv;
        let tmp = `
            ${
                center_adv.map((v, i) => {

                if (i == 0) {
                    return `<li class="center_current"><a href="${v.advLink}"><img src="${v.advUrl}"></a></li>`;
                }
                else {
                    return `<li><a href="${v.advLink}"><img src="${v.advUrl}"></a></li>`;
                }


            }).join('')
            }
        `;

        let tmp2 = `
            ${
                center_adv.map((v, i) => {
                if (i == 0) {
                    return `<li class="center_bullet add"></li>`;
                }
                else {
                    return `<li class="center_bullet"></li>`;
                }
            }).join('')
            }
        `;

        $adv_imgs.html(tmp);
        $adv_dots.html(tmp2);
        advSwiper();

    }

     //原生JS图片轮播
     function advSwiper() {
        var currentIndex = 0;
        var len = document.querySelector('.center_list').childElementCount

        function slideTo(index) {
            if (index === len) {
                index = currentIndex = 0;
            }

            if (index === -1) {
                index = currentIndex = len - 1;
            }

            document.querySelector('.add').className = 'center_bullet';
            document.querySelector('.center_pagination li:nth-of-type(' + (index + 1) + ')').className = 'center_bullet add'

            document.querySelector('.center_current').className = '';
            document.querySelector('.center_list li:nth-of-type(' + (index + 1) + ')').className = 'center_current'
        }


        var dots = document.querySelectorAll('.center_bullet')
        for (var i = 0; i < dots.length; i++) {
            dots[i].index = i;
            dots[i].onmouseover = function () {
                currentIndex = this.index
                slideTo(currentIndex)
            }
        }

        document.querySelector('.slider').onmouseover = function () {
            stop()
        }

        return false
    }

      return {
        cenAdvInit
    };
})





