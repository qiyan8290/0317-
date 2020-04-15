let utils = (function (){
    // 获取样式
    function getCss(element, attr){
        let value = window.getComputedStyle(element)[attr],
            reg = /^\d+(px|rem|em)?$/i;
        if(reg.test(value)){
            value = parseFloat(value);
        }
        return;
    }

    // 设置样式
    function setCss(element, attr, value){
        if(attr === "opacity"){
            element["style"]["opacity"] = value;
            element["style"]["filter"] = `alpha(opacity=${value*100})`;
            return;
        }
        let reg = /^(width|height|margin|padding)?(top|right|bottom|left)?$/i;
        if(reg.test(attr)){
            if(!isNaN(value)){
                value += "px";
            }
        }
        element["style"][attr] = value;
    }

    // 批量设置样式
    function setGroupCss(element, options){
        for(let key in options){
            if(!options.hasOwnProperty(key)) break;
            setCss(element, key, options[key]);
        }
    }

    // 既可以获取样式，又可以设置样式
    function css(element){
        let len = arguments.length,
            attr = arguments[1],
            value = arguments[2];
        if(len >= 3){
            setCss(element, attr, value);
            return;
        }
        if(attr !== null && typeof attr === "object"){
            setGroupCss(element, attr);
            return;
        }
        return getCss(element, attr, value);
    }

    // 获取元素到父元素到上/左偏移
    function offset(element){
        let parent = element.offsetParent,
            left = element.offsetLeft,
            top = element.offsetTop;

        if(!/MSIE 8/.test(navigator.userAgent)){
            left += parent.clientLeft;
            top += parent.clientTop;
        }
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;

        return {
            left,
            top
        };
    }



    return {
        css,
        offset
    };
})();