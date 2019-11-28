define(['jquery'], function($) {

    function moreInput(){
   
        var input_box = document.querySelector('#input_box');
        var more = document.querySelector('.input_item');
        var hotInput = document.querySelector('.search_value');

        input_box.onfocus = function(evt){
            more.style.display = 'block';
            hotInput.style.display = 'none';
            input_box.style.border = '1px solid #c9c9c9'
            evt.preventDefault()
        }
        input_box.onblur = function(evt){
            more.style.display = 'none';
            hotInput.style.display = 'block';
            input_box.style.border = 'none'
            evt.preventDefault()
        }
    }
    
    return{
        moreInput
    }

});