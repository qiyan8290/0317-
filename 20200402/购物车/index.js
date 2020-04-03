(function (){
    let liList = document.querySelectorAll(".list li"),
        totalNum = document.querySelectorAll(".info em");

    for(let i = 0; i < liList.length; i++){
        let item = liList[i],
            numText = item.querySelector(".num_text"), // 商品件数（单件）
            numBtn = item.querySelectorAll("i"), // 加/减 两个按钮
            price = item.querySelector(".price"), // 单价
            subTotal = item.querySelector(".subtotal"), // 小计
            num = 0;  
            count = 0;
            allMoney = 0,
            ary = [];
        price = parseFloat( price.innerText ); 


        numBtn[0].onclick = function (){
            num > 0 ? num-- && count-- : null;
            if(num < 0){
                num = 0;
            }
            numText.innerText = num;
            subTotal.innerText = parseFloat(num * price) + "元";
            // 共计商品数量
            totalNum[0].innerText = count;  // 商品合计
            
            num >= 0 ? totalNum[1].innerText = parseFloat(totalNum[1].innerText) - price : null  // 总消费
            if(totalNum[1].innerText < 0){
                totalNum[1].innerText = 0;
            }
        }
        
        numBtn[1].onclick = function (){
            num++;
            numText.innerText = num;
            subTotal.innerText = parseFloat(num * price) + "元";

            count++;
            totalNum[0].innerText = count; // 商品合计
            totalNum[1].innerText = parseFloat(totalNum[1].innerText) + price;  // 总消费

            
        }

        
    }

})();