define(['jquery'],function($){

    function navInit(type , data){
        console.log( type , data );
        var $parent = $(`#${type}`);
        var tmp = `
                ${
                    data.nav_list.map((v,i)=>{
                        return `
                        <li class="nav_block_items">
                            <img src="${v.navUrl}" alt=""><span></span>
                            <h2>${v.navName}</h2>
                        </li>

                        `;
                    }).join('')//.repeat(3)
                }
        `;
        $parent.html(tmp);
    }
   
    return {
        navInit
    }

});