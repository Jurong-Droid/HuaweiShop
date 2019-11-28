define(['jquery'],function($){

    function getBannerData(){
        return $.ajax('../mock/banner.json');
    }

    function getAdvData(){
        return $.ajax('../mock/adv.json');
    }

    function getHotData(){
        return $.ajax('../mock/hot_product.json');
    }

    function getHotItemData(){
        return $.ajax('../mock/hot_item.json');
    }

    function getRecommendationData(){
        return $.ajax('../mock/recommendation.json');
    }

    function getcenAdvData(){
        return $.ajax('../mock/center_adv.json');
    }
    
    function getGoodsData(type){
        return $.ajax(`../mock/${type}.json`);
    }

    function getNavsData(type){
        return $.ajax(`../mock/${type}.json`);
    }

    function getDetailData(type , goodsId){

        var promise = new Promise(function(resolve , reject){

            $.ajax(`../mock/${type}.json`).then((res)=>{
                var goods_list = res.goods_list;
                
                var result = goods_list.filter(function(v,i){
                    return v.goodsId == goodsId;
                });
                resolve(result[0]);
            });

        });

        return promise;

    }

    // function getNavData(){
    //     return $.ajax(`../mock/navPhone.json`)
    // }

    return {
        getBannerData,
        getAdvData,
        getHotData,
        getRecommendationData,
        getcenAdvData,
        getGoodsData,
        getNavsData ,
        getDetailData,
        //getNavData
    }

});