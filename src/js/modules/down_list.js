define(['jquery'], function($) {

    function moreBrill(fer , chlid){
        fer.onmouseover = function(){
            chlid.style.display = 'block'
            fer.onmouseout = function(){
                chlid.style.display = 'none';
            }
        }
 
    }
    
    return{
        moreBrill
    }

});