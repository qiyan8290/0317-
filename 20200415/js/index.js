let waterFlowModule = (function (){
    let data = null,
        columns = Array.from(document.querySelectorAll(".column"));
    // 获取数据
    let queryData = function queryData(){
        let xhr = new XMLHttpRequest;
        xhr.open("GET", "json/data.json", false);
        xhr.onreadystatechange = function (){
            if(xhr.readyState === 4 && xhr.status === 200){
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);
    };

    // 绑定数据
    let bindHTML = function bindHTML(){
        // 循环数据按照真实宽高和渲染宽高进行比例适配
        data = data.map(item => {
            let w = item.width,
                h = item.height;
            h = (230 * h) / w;
            item.width = 230;
            item.height = h;
            return item;
        });

        // 循环数据，按每三个为一组进行分组
        for(let i = 0; i < data.length; i += 3){
            let group = data.slice(i, i + 3);
            // 按渲染高度进行升序排序
            group.sort((a, b) => {
                return a.height - b.height;
            });
            // 每列按实际到高度值进行降序排序
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });

            // 循环每一组，创建card，插入到对应到列中
            group.forEach((item, index) => {
                let {
                    link,
                    pic,
                    height,
                    title
                } = item;
                let card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `<a href="${link}">
                    <div class="lazy_img_box" style="height: ${height}px">
                        <img src="" alt="" data-image="${pic}">
                    </div>
                    <p>${title}</p>
                </a>`;
                columns[index].appendChild(card);
            });
        }
    };

    // 延迟加载
    let lazyFunc = function lazyFunc(){
        let lazyImgBoxs = document.querySelectorAll(".lazy_img_box");
        [].forEach.call(lazyImgBoxs, item => {
            let isLoad = item.getAttribute("isLoad");
            if(isLoad === "true") return;
            let B = utils.offset(item).top + item.offsetHeight / 2;
            let A = document.documentElement.scrollTop + document.documentElement.clientHeight;
            if(B <= A){
                lazyImg(item);
            }
        });
    };
    let lazyImg = function lazyImg(lazyImgBox){
        let img = lazyImgBox.querySelector("img"),
            dataImg = img.getAttribute("data-image"),
            tempImg = new Image;
        tempImg.src = dataImg;
        tempImg.onload = function (){
            img.src = dataImg;
            utils.css(img, "opacity", 1);
        };
        img.removeAttribute("data-image");
        tempImg = null;
        lazyImgBox.setAttribute("isLoad", "true");
    };

    // 加载更多数据
    let isRender;
    let loadMore = function loadMore(){
        let HTML = document.documentElement;
        if(HTML.scrollTop + HTML.clientHeight + HTML.clientHeight / 2 >= HTML.offsetHeight){
            if(isRender) return;
            isRender = true;
            queryData();
            bindHTML();
            lazyFunc();
            isRender = false;
        }
    };


    return {
        init() {
            queryData();
            bindHTML();
            lazyFunc();
            window.onscroll = function (){
                lazyFunc();
                // loadMore();
            };
        }
    };
})();
waterFlowModule.init();