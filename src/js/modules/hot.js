define(['jquery'], function($) {

    var $hot = $('#hot')
    //渲染头部广告数据方法
    function hotInit(data){
        //console.log(data)
        let hot_box = data.hot_box;
        let tmp = `
            ${
                hot_box.map((v, i) => {

                    return ` <li>
                                <a href="${v.imgLink}">
                                    <img src="${v.imgUrl}" alt="">
                                </a>
                            </li>
                            `;
            }).join('')
            }
        `;

        $hot.html(tmp);
        delAdv()
    }

    return{
        hotInit
    }

});