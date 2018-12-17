function initSpotfront(e){function t(e,t,r,s,a){doT.templateSettings.interpolate=/#\{=([\s\S]+?)\}#/g,doT.templateSettings.iterate=/#\{~\s*(?:\}#|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}#)/g,doT.templateSettings.conditional=/\#\{\?(\?)?\s*([\s\S]*?)\s*\}\#/g;for(var i="",l=0;l!=e.length;l++){var n=e[l],o=$("#spotfront-products-list").text();i+=doT.template(o)(n)}"before"===r&&prependAtPosition(i,t,r),"after"===r&&appendAtPosition(i,t,r),"inside"===r&&renderInside(i,t),"instead"===r&&renderInstead(i,t,r),s&&$(a).show()}function r(e){doT.templateSettings.interpolate=/#\{=([\s\S]+?)\}#/g,doT.templateSettings.iterate=/#\{~\s*(?:\}#|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}#)/g,doT.templateSettings.conditional=/\#\{\?(\?)?\s*([\s\S]*?)\s*\}\#/g;for(var t="",r=0;r!=e.length;r++){var s=e[r],a=$("#spotfront-products-list").text();t+=doT.template(a)(s)}return t}function s(e){var t=e,r=[];if(Array.isArray(t))for(var s=0;s!=t.length;s++)t[s].sponsored&&r.push(t[s]);else t.sponsored&&r.push(t);return r}var a=e.slot||1210,i=e.categories||["home"],l=e.isHome||!1,n=e.amount||1,o=e.DOMTarget,c=e.renderPosition||"inside",u=e.isHidden||!1,d=e.hiddenElement||e.DOMTarget,b=e.imageSize||220,p=e.customCallback||function(){},g=e.returnData||!1,f=e.returnDataType||"json",v=e.ratingBase||10,m=e.ratingNewBase||5,h=e.premiumPrice||25,S=["deliveryDate","availability","idArticle"],y="";l||(i=removeSpotFrontRequestCategories(i,"home")),i=cleanCategoriesStringsInArray(i);TagDeliveryContent.request({slot:a,targets:{category:i},count:n},function(e){0!=e.length&&0!=(e=s(e)).length&&(e=cleanSpotfrontObjetURLs(e),e=cleanSpotfrontObjetStrings(e),e=addPricesByType(e),e=addImageSize(e,b),e=changeRatingBase(e,v,m),e=disponibilityToString(e),e=checkOfferPrice(e),e=checkIfArticlesArePremium(e,h),e=requestAdditionalParameters(e,S,function(s){if(g)return"json"===f&&(y=e),"html"===f&&(y=r(e)),y;t(s,o,c,u,d),p()}))})}function cleanCategoriesStringsInArray(e){for(var t=e,r=[],s=0;s!==t.length;s++)r.push(removeDiacritics(t[s]).toLowerCase().replaceAll(" ","-").replaceAll("/","-"));return r}function replaceCategoryInArray(e,t,r){for(var s=e,a=0,i=s.length;a!=i;a++)s[a]===t&&(s[a]=r);return s}function removeSpotFrontRequestCategories(e,t){for(var r=e,s=0;s!=r.length;s++)removeDiacritics(r[s]).toLowerCase().replace(" ","-")==removeDiacritics(t).toLowerCase().replace(" ","-")&&r.splice(s,1);return r}function cleanSpotfrontObjetURLs(e){for(var t=window.location.href.split("/"),r=t[0]+"//"+t[2],s=e,a=0;a!=s.length;a++){var i=s[a].product.landingPageUrl.split("/");i=r+"/"+(i=i[i.length-1]),s[a].product.landingPageUrl=i}return s}function cleanSpotfrontObjetStrings(e){for(var t=e,r=0;r!=t.length;r++){var s=t[r].product.name.replace('"',"&quot;");t[r].product.name=s}return t}function addPricesByType(e){for(var t=e,r=0;r!=t.length;r++){var s=t[r].product.priceCurrent.toString().split(".");t[r].product.priceIntegerPart=s[0],s.length>1?t[r].product.priceDecimalPart=s[1]:t[r].product.priceDecimalPart="00"}return t}function addImageSize(e,t){for(var r=e,s=0;s!=r.length;s++){var a=r[s].product.imageSmall.replace("44-44",t+"-"+t);r[s].product.imageCardSize=a}return r}function changeRatingBase(e,t,r){for(var s=e,a=0;a!=s.length;a++){var i=s[a].product.media_valoraciones;i=i/t*r,s[a].product.media_valoraciones=i}return s}function disponibilityToString(e){for(var t=e,r=0;r!=t.length;r++)t[r].product.available?(t[r].product.availabilityString="in stock",t[r].product.disponibilityStringClass="disponibilidad-inmediata"):(t[r].product.availabilityString="out of stock",t[r].product.disponibilityStringClass="");return t}function checkOfferPrice(e){for(var t=e,r=0;r!=t.length;r++)t[r].product.salePrice&&(t[r].product.price=t[r].product.salePrice);return t}function checkIfArticlesArePremium(e,t){for(var r=e,s=0;s!=r.length;s++)r[s].product.priceCurrent>=t?r[s].product.isPremium=!0:r[s].product.isPremium=!1;return r}function requestAdditionalParameters(e,t,r){for(var s=window.location.href.split("/"),a=s[0]+"//"+s[2]+"/ajax_nc/get?idArticle=",i="keyName="+t.toString(),l=e,n=[],o=0;o!=l.length;o++)n.push(l[o].product_id);n=n.toString(),$.ajax({url:a+n+"&"+i,data:{},dataType:"json",async:!0,method:"get",crossDomain:!0,cache:!1,success:function(e){e=objectValues(e);for(var t=0;t!=e.length;t++)for(var s=0;s!=l.length;s++)if(l[s].product_id==e[t].idArticle){l[s].product.deliveryDate=e[t].deliveryDate.strDeliveryDate;break}r(l)}})}function prependAtPosition(e,t,r){var s=t;$(s).before(e)}function appendAtPosition(e,t,r){var s=t;$(s).after(e)}function renderInside(e,t){$(t).html(e)}function renderInstead(e,t,r){$(t).contents();$(t).replaceWith(e)}function removeDiacritics(e){if(void 0!==e)return e.replace(/[^\u0000-\u007E]/g,function(e){return diacriticsMap[e]||e})}function objectValues(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&t.push(e[r]);return t}String.prototype.replaceAll=function(e,t){return this.replace(new RegExp(e,"g"),t)};for(var defaultDiacriticsRemovalMap=[{base:"A",letters:"AⒶＡÀ�?ÂẦẤẪẨÃĀĂẰẮẴẲȦǠÄǞẢÅǺ�?ȀȂẠẬẶḀĄȺⱯ"},{base:"AA",letters:"Ꜳ"},{base:"AE",letters:"ÆǼǢ"},{base:"AO",letters:"Ꜵ"},{base:"AU",letters:"Ꜷ"},{base:"AV",letters:"ꜸꜺ"},{base:"AY",letters:"Ꜽ"},{base:"B",letters:"BⒷＢḂḄḆɃƂ�?"},{base:"C",letters:"CⒸＣĆĈĊČÇḈƇȻꜾ"},{base:"D",letters:"DⒹＤḊĎḌ�?ḒḎ�?ƋƊƉ�?��?"},{base:"DZ",letters:"ǱǄ"},{base:"Dz",letters:"ǲǅ"},{base:"E",letters:"EⒺＥÈÉÊỀẾỄỂẼĒḔḖĔĖËẺĚȄȆẸỆȨḜĘḘḚ�?Ǝ"},{base:"F",letters:"FⒻＦḞƑ�?�"},{base:"G",letters:"GⒼＧǴĜḠĞĠǦĢǤƓꞠ�?��?�"},{base:"H",letters:"HⒽＨĤḢḦȞḤḨḪĦⱧⱵ�?"},{base:"I",letters:"IⒾＩÌ�?ÎĨĪĬİ�?ḮỈ�?ȈȊỊĮḬƗ"},{base:"J",letters:"JⒿＪĴɈ"},{base:"K",letters:"KⓀＫḰǨḲĶḴƘⱩ�?��?��?�Ꞣ"},{base:"L",letters:"L�?ＬĿĹĽḶḸĻḼḺ�?ȽⱢⱠ�?��?�Ꞁ"},{base:"LJ",letters:"Ǉ"},{base:"Lj",letters:"ǈ"},{base:"M",letters:"MⓂＭḾṀṂⱮƜ"},{base:"N",letters:"NⓃＮǸŃÑṄŇṆŅṊṈȠ�?�?Ꞥ"},{base:"NJ",letters:"Ǌ"},{base:"Nj",letters:"ǋ"},{base:"O",letters:"OⓄＯÒÓÔỒ�?ỖỔÕṌȬṎŌ�?ṒŎȮȰÖȪỎ�?ǑȌȎƠỜỚỠỞỢỌỘǪǬØǾƆƟ�?��?�"},{base:"OI",letters:"Ƣ"},{base:"OO",letters:"�?�"},{base:"OU",letters:"Ȣ"},{base:"OE",letters:"Œ"},{base:"oe",letters:"œ"},{base:"P",letters:"PⓅＰṔṖƤⱣ�??�?��?�"},{base:"Q",letters:"QⓆＱ�?��?�Ɋ"},{base:"R",letters:"RⓇＲŔṘŘ�?ȒṚṜŖṞɌⱤ�?�ꞦꞂ"},{base:"S",letters:"SⓈＳẞŚṤŜṠŠṦṢṨȘŞⱾꞨꞄ"},{base:"T",letters:"TⓉＴṪŤṬȚŢṰṮŦƬƮȾꞆ"},{base:"TZ",letters:"Ꜩ"},{base:"U",letters:"UⓊＵÙÚÛŨṸŪṺŬÜǛǗǕǙỦŮŰǓȔȖƯỪỨỮỬỰỤṲŲṶṴɄ"},{base:"V",letters:"VⓋＶṼṾƲ�?�Ʌ"},{base:"VY",letters:"�?�"},{base:"W",letters:"WⓌＷẀẂŴẆẄẈⱲ"},{base:"X",letters:"X�?ＸẊẌ"},{base:"Y",letters:"YⓎＹỲ�?ŶỸȲẎŸỶỴƳɎỾ"},{base:"Z",letters:"Z�?ＺŹ�?ŻŽẒẔƵȤⱿⱫ�?�"},{base:"a",letters:"a�?�?ẚàáâầấẫẩã�?ăằắẵẳȧǡäǟảåǻǎ�?ȃạậặ�?ąⱥ�?"},{base:"aa",letters:"ꜳ"},{base:"ae",letters:"æǽǣ"},{base:"ao",letters:"ꜵ"},{base:"au",letters:"ꜷ"},{base:"av",letters:"ꜹꜻ"},{base:"ay",letters:"ꜽ"},{base:"b",letters:"bⓑｂḃḅḇƀƃɓ"},{base:"c",letters:"cⓒｃćĉċ�?çḉƈȼꜿↄ"},{base:"d",letters:"dⓓｄḋ�?�?ḑḓ�?đƌɖɗ�?�"},{base:"dz",letters:"ǳǆ"},{base:"e",letters:"eⓔｅèéê�?ếễểẽēḕḗĕėëẻěȅȇẹệȩ�?ęḙḛɇɛ�?"},{base:"f",letters:"fⓕｆḟƒ�?�"},{base:"g",letters:"gⓖｇǵ�?ḡğġǧģǥɠꞡᵹ�?�"},{base:"h",letters:"hⓗｈĥḣḧȟḥḩḫẖħⱨⱶɥ"},{base:"hv",letters:"ƕ"},{base:"i",letters:"iⓘｉìíîĩīĭïḯỉ�?ȉȋịįḭɨı"},{base:"j",letters:"jⓙｊĵǰɉ"},{base:"k",letters:"kⓚｋḱǩḳķḵƙⱪ�??�?��?�ꞣ"},{base:"l",letters:"lⓛｌŀĺľḷḹļḽḻſłƚɫⱡ�?��?�?�"},{base:"lj",letters:"ǉ"},{base:"m",letters:"mⓜ�?ḿ�?ṃɱɯ"},{base:"n",letters:"n�?ｎǹńñṅňṇņṋṉƞɲŉꞑꞥ"},{base:"nj",letters:"ǌ"},{base:"o",letters:"oⓞ�?òóôồốỗổõ�?ȭ�?�?ṑṓ�?ȯȱöȫ�?őǒ�?�?ơ�?ớỡởợ�?ộǫǭøǿɔ�?��??ɵ"},{base:"oi",letters:"ƣ"},{base:"ou",letters:"ȣ"},{base:"oo",letters:"�??"},{base:"p",letters:"pⓟ�?ṕṗƥᵽ�?��?��?�"},{base:"q",letters:"qⓠｑɋ�?��?�"},{base:"r",letters:"rⓡｒŕṙřȑȓṛ�?ŗṟ�?ɽ�?�ꞧꞃ"},{base:"s",letters:"sⓢｓßśṥ�?ṡšṧṣṩșşȿꞩꞅẛ"},{base:"t",letters:"tⓣｔṫẗťṭțţṱṯŧƭʈⱦꞇ"},{base:"tz",letters:"ꜩ"},{base:"u",letters:"uⓤｕùúûũṹūṻŭüǜǘǖǚủůűǔȕȗưừứữửựụṳųṷṵʉ"},{base:"v",letters:"vⓥｖṽṿʋ�?�ʌ"},{base:"vy",letters:"�?�"},{base:"w",letters:"wⓦｗ�?ẃŵẇẅẘẉⱳ"},{base:"x",letters:"xⓧｘẋ�?"},{base:"y",letters:"yⓨｙỳýŷỹȳ�?ÿỷẙỵƴ�?ỿ"},{base:"z",letters:"zⓩｚźẑżžẓẕƶȥɀⱬ�?�"}],diacriticsMap={},i=0;i<defaultDiacriticsRemovalMap.length;i++)for(var letters=defaultDiacriticsRemovalMap[i].letters,j=0;j<letters.length;j++)diacriticsMap[letters[j]]=defaultDiacriticsRemovalMap[i].base;
