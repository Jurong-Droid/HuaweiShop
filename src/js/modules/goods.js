define(['jquery'],function($){

    function goodsInit(type , data){
        console.log( type , data );
        var $parent = $(`#${type}`);
        var tmp = `
        <div class="product">
            <h2>${data.title}</h2>
            <ul class="product_items">
                ${
                    data.goods_list.map((v,i)=>{
                        return `
                      
                                <li>
                                    <a href="./detail.html?type=${type}&id=${v.goodsId}" target="_blank">
                                        <div><img src="../static/hot_item_right.png" data-src="${v.goodsImg}" alt=""></div>
                                        <h3>${v.goodsName}</h3>
                                        <p>${v.goodsDescribe}</p>
                                        <span>¥${v.goodsPrice}</span>
                                    </a>
                                </li>
                        `;
                    }).join('')//.repeat(3)
                }
            </ul>
            </div>
        `;
        $parent.html(tmp);
    }

    //图片懒加载设置方法
    $(document).scroll(showImg);


    function showImg(){

        var viewH = $(window).height();
        var scrollT = $(document).scrollTop();

        $('img').each(function(i,elem){
            if( $(elem).offset().top <= viewH + scrollT ){   //说明这张图进入可视区了
                var imgSrc = $(elem).attr('data-src');
                $(elem).attr('src' , imgSrc);
            }
        });

    }

    return {
        goodsInit
    }

});