define([
    'jquery' , 
    '../server/main' , 
    './modules/cartStorage' ,
    './modules/down_list' ,
],function(
    $ , 
    { getDetailData } , 
    { addCartStorage } ,
    { moreBrill }
    ){

   var type = window.location.search.match(/type=([^&]+)/)[1];
   var id = window.location.search.match(/id=([^&]+)/)[1];
   var $detail = $('#detail');
   var $detailGoods = $('#detailGoods');

   //console.log(type , id);

   getDetailData(type , id).then((res)=>{
        detailInit(res);
   });

   
   function detailInit(data){
        var tmp = `
            <div class="detail_gallery l">
                <div class="detail_gallery_normal">
                    <img src="${data.photoNormal}" alt="">
                    <span></span>
                </div>
                <div class="detail_gallery_large">
                    <img src="${data.photoLarge}" alt="">
                </div>
            </div>
            <div class="detail_message l">
                <h2>${data.goodsName}</h2>
                <p>价 格 <span class="detail_message_price">¥${data.goodsPrice}.00</span></p>
                <p>选择颜色 
                    ${
                        data.chooseColor.map((v,i)=>{
                            if(i==0){
                                return `<span class="detail_message_box active">${v}</span>`;
                            }
                            else{
                                return `<span class="detail_message_box">${v}</span>`;
                            }
                        }).join('')
                    }
                </p>
                <div class="detail_message_btn clearfix">
                    <div class="detail_message_num l">
                        <input type="text" value="1">
                        <span>+</span>
                        <span>-</span>
                    </div>
                    <div class="detail_message_cart l"><a href="javascript:;">加入购物车</a></div>
                    <div class="detail_message_computed l"><a href="cart.html">立即下单</a></div>
                </div>
            </div>
        `;
        var tmp2 = `
            <h3>-- 商品详情 --</h3>
            ${
                data.goodsInfo.map((v,i)=>{
                    return `<img src="${v}" alt="">`;
                }).join('')
            }
        `;
        $detail.html(tmp);
        $detailGoods.html(tmp2);
        magnifier();
        chooseColor();
        chooseNumber();
        addCart(data);
   }

   
   //放大镜
   function magnifier(){
        let $detail_gallery_normal = $detail.find('.detail_gallery_normal');
        let $detail_gallery_large = $detail.find('.detail_gallery_large');
        var $largeImg = $detail_gallery_large.find('img');

        $detail_gallery_normal.hover(function(ev){
            let $span = $(this).find('span');
            $span.css({
                left : ev.pageX - $(this).offset().left - $span.width()/2,
                top : ev.pageY - $(this).offset().top - $span.height()/2
            });
            $span.show();
            $detail_gallery_large.show();
        },function(){
            let $span = $(this).find('span');
            $span.hide();
            $detail_gallery_large.hide();
        }).mousemove(function(ev){

            let $span = $(this).find('span');
            let L = ev.pageX - $(this).offset().left - $span.width()/2;
            let T = ev.pageY - $(this).offset().top - $span.height()/2;4

            if(L<0){
                L = 0;
            }
            else if(L > $(this).width() - $span.width()){
                L = $(this).width() - $span.width();
            }
            if(T<0){
                T = 0;
            }
            else if(T > $(this).height() - $span.height()){
                T = $(this).height() - $span.height();
            }

            $span.css({
                left : L,
                top : T
            });

            let scaleX = L / ($(this).width() - $span.width());  //0~1
            let scaleY = T / ($(this).height() - $span.height());  //0~1

            
            $largeImg.css({
                left : - scaleX * ( $largeImg.width() - $detail_gallery_large.width() ),
                top : - scaleY * ( $largeImg.height() - $detail_gallery_large.height() )
            });

        });

   }
   //选择商品颜色
   function chooseColor(){
        var $detail_message_box = $detail.find('.detail_message_box');
        $detail_message_box.click(function(){
            $(this).addClass('active').siblings().removeClass('active');
        });    
   }
   //选择商品个数
   function chooseNumber(){
        var $detail_message_num = $detail.find('.detail_message_num');
        var $input = $detail_message_num.find('input');
        var $span = $detail_message_num.find('span');
        $span.eq(0).click(function(){   // +
            var value = $input.val();
            $input.val( ++value );
        });
        $span.eq(1).click(function(){   // -
            var value = $input.val();
            if(value == 1){
                return;
            }
            $input.val( --value );
        });
   }
   //添加购物车
   function addCart(data){
      let $detail_message_cart = $detail.find('.detail_message_cart');
      $detail_message_cart.click(function(){

        let result = {
            goodsName : data.goodsName,
            goodsImg : data.goodsImg,
            goodsPrice : data.goodsPrice,
            goodsNumber : Number($detail.find('.detail_message_num input').val()),
            goodsColor : $detail.find('.detail_message_box').filter('.active').html(),
            goodsId : data.goodsId,
            goodsChecked : true
        };

        addCartStorage(result , function(){
            alert('添加成功');
        });

      });
   }

    //更多精彩
    var none = document.querySelector('li.more_brilliant')
    var block = document.querySelector('.more_brilliant ul.more_brilliant_list')
    moreBrill(none , block) 
    //客户服务
    var none1 = document.querySelector('li.service')
    var block1 = document.querySelector('.service ul.service_list')
    moreBrill(none1 , block1) 
    //网站导航
    var none2 = document.querySelector('li.header_right_nav')
    var block2 = document.querySelector('li.header_right_nav .header_right_navlist')
    moreBrill(none2 , block2) 
    //手机版
    var none3 = document.querySelector('li.nav_phone')
    var block3 = document.querySelector('li.nav_phone .nav_phone_list')
    moreBrill(none3 , block3) 
    //购物车下拉
    var noneCart = document.querySelector('.header_right li.cart')
    var blockCart = document.querySelector('.cart_hover')
    moreBrill(noneCart , blockCart) 
    //手机导航
    var noneNav = document.querySelector('#nav .nav_phone')
    var blockNav = document.querySelector('#phoneNav')
    moreBrill(noneNav , blockNav) 
    
});