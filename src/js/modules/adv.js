
define(['jquery'], function($) {

    var $adv = $('#advertising')
    //渲染头部广告数据方法
    function advInit(data){
        //console.log(data)
        let adv_box = data.adv_box;
        let tmp = `
            ${
                adv_box.map((v, i) => {

                    return `<a href="javascript:;">
                                <img src="${v.imgUrl}">
                            </a>
                            <button>×</button>
                    `;

            }).join('')
            }
        `;

        $adv.html(tmp);
        delAdv()
    }

    //首页广告点击隐藏设置方法
    var $advBox = $('#advertising');
    
    function delAdv(){
        $('#advertising').find('button').click(function(){
            $advBox.css('display','none')
        })
    }

    return{
        delAdv,
        advInit
    }

});

