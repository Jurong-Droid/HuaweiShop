define(['jquery'],function($){

    function addCartStorage(data , cb){

        //console.log(data);

        var cartList = getCartStorage() || [];
        var flag = true;
        var index = -1;

        for(var i=0;i<cartList.length;i++){
            if( cartList[i].goodsId == data.goodsId && cartList[i].goodsColor == data.goodsColor ){  
                flag = false;
                index = i;
            }
        }

        if(flag){   // 填新的
            cartList.push(data);
            setCartStorage( cartList );
        }
        else{   //累加number
            cartList[index].goodsNumber += data.goodsNumber;
            setCartStorage( cartList );
        }
        cb();

    }
    function setCartStorage( data ){
        window.localStorage.setItem('cart' , JSON.stringify(data));
    }
    function getCartStorage(){
        return JSON.parse(window.localStorage.getItem('cart'));
    }

    return {
        addCartStorage,
        setCartStorage,
        getCartStorage
    }

});