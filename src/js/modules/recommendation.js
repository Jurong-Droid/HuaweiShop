define(['jquery' , 'swiper'], function($ , Swiper) {

    var $swiperWrapper = $('#recommendation_wrap').find('.swiper-wrapper')
    function RecommendationInit(data){
        //console.log(data)
        let recommendation = data.recommendation;
        let tmp = `
            ${
                recommendation.map((v, i) => {

                    return ` 
                    <div class="swiper-slide">
                        <a href="javascript:;">
                            <div class="recommendation_img">
                                <img src="${v.goodsImg}" alt="">
                                <span>${v.goodsDescribe}</span>
                            </div>
                            <h2>${v.goodsName}</h2>
                            <p>￥${v.goodsPrice}</p>
                        </a>
                    </div>
                    `;

            }).join('')
            }
        `;        

        $swiperWrapper.html(tmp);
    }

    function SwiperInit() {
        new Swiper(".swiper-container", {
          slidesPerView: 5,
          spaceBetween: 30,
          slidesPerGroup: 5,
          loop: true,
          autoplay : true,
          loopFillGroupWithBlank: true,
          observer: true,
          observeParents: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        });
      }
    
      return {
        RecommendationInit,
        SwiperInit
        // swiper
      };

});