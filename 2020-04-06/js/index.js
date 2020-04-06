let shopModule = (function shopModule(){
    let data = null,
        productBox = document.querySelector(".product_box"),
        navList = document.querySelectorAll(".nav_box li");

    // 获取数据
    let queryData = function queryData(){
        let xhr = new XMLHttpRequest;
        xhr.open("GET", "./json/product.json", false);
        xhr.onreadystatechange = function (){
            if(xhr.readyState === 4 && xhr.status === 200){
                data = JSON.parse(xhr.response);
            }
        };
        xhr.send();
    };

    // 渲染页面
    let render = function render(){
        let str = ``;
        data.forEach(item => {
            let {
                id,
                title,
                price,
                hot,
                time,
                img
            } = item;

            str += `<div class="card">
                    <img src="${img}" alt="">
                    <div class="content">
                        <h5>${title}</h5>
                        <p>价格：${price}</p>
                        <p>销量：${hot}</p>
                        <p>时间：${time}</p>
                    </div>
                </div>`;
        });
        productBox.innerHTML = str;
    };

    // 将自定义属性返回到默认值
    let clear = function clear(){
        Array.from(navList).forEach(item => {
            if(item != this){
                item.flag = -1;
            }
        });
    };
    // 绑定点击事件
    let handle = function handle(){
        Array.from(navList).forEach(item => {
            item.flag = -1;
            item.onclick = function (){
                clear.call(this);
                this.flag *= -1;
                let pai = this.getAttribute("data-pai");
                data.sort((a, b) => {
                    a = String(a[pai]).replace(/-/g, "");
                    b = String(b[pai]).replace(/-/g, "");
                    return (a - b) * this.flag;
                });
                render();
            }
        });
    };


    return {
        init (){
            queryData();
            render();
            handle();
        }
    };
})();
shopModule.init();