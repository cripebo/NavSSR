function initPremium(e){var r=e.request||"",t=e.callbacks||{},a=e.subscriptionId||"",s=JSON.parse(localStorage.getItem("storedPremiumData")),c=(new Date).getTime(),o=hoursToSeconds(1);switch(r){case"subscribe":subscribeUserToPremium(t);break;case"add-to-cart":addPremiumToCart(t);break;case"info":null!=s&&(c-s.lastUpdateDate)/1e3<o?isObjectEmpty(t)||t.run(s):(console.log("premiumData is not defined or too old"),getPremiumPrices(t));break;case"enable-alerts":updatePremiumProperty(t,a,"previousAlert",!0);break;case"disable-alerts":updatePremiumProperty(t,a,"previousAlert",0);break;case"enable-refresh":updatePremiumProperty(t,a,"refresh",!0);break;case"disable-refresh":updatePremiumProperty(t,a,"refresh",0);break;case"cancel-subscription":cancelPremiumSubscription(t,a);break;case"no-request":isObjectEmpty(t)||t.run();break;case"is-premium-in-cart":isPremiumInCart(t);break;case"delete-from-cart":deleteFromCart(t);break;case"cart-checkbox":cartCheckbox(t);break;default:console.log("Param Request Empty or not valid")}}function getPremiumPrices(e){$.ajax({url:baseUrl+"/subscriptions/active-subscriptions",data:{},dataType:"json",method:"get",success:function(r){r.lastUpdateDate=(new Date).getTime(),storePremiumInfoInLocalStorage(r),isObjectEmpty(e)||e.run(r)},error:function(r){isObjectEmpty(e)||e.errors(r)},cache:!1})}function subscribeUserToPremium(e){$.ajax({url:baseUrl+"/cart/order/premium-rate/subscribe",data:{},dataType:"json",method:"get",success:function(r){r.error||isObjectEmpty(e)||e.run(r)},error:function(r){isObjectEmpty(e)||e.errors(r)},cache:!1})}function updatePremiumProperty(e,r,t,a){var s=Routing.generate("pcc_web_change_alerts_subscriptions"),c=constructJson(t,a);c.idSubscription=r,$.ajax({url:s,data:c,dataType:"json",method:"post",success:function(r){r.error||isObjectEmpty(e)||e.run(r)},error:function(r){isObjectEmpty(e)||e.errors(r)},cache:!1})}function addPremiumToCart(e){var r=Routing.generate("pcc_cart_add_item_ajax",{idArticle:131305}),t={units:1,warranty:0};$.ajax({url:r,data:t,dataType:"json",method:"post",success:function(r){r.error||isObjectEmpty(e)||e.run(r)},error:function(r){isObjectEmpty(e)||e.errors(r)},cache:!1})}function isPremiumInCart(e){var r=Routing.generate("pcc_cart_is_item_in_cart_ajax",{idArticle:131305});$.ajax({url:r,data:{},dataType:"json",method:"get",success:function(r){r.error||isObjectEmpty(e)||e.run(r)},error:function(r){isObjectEmpty(e)||e.errors(r)},cache:!1})}function deleteFromCart(e){var r=$(".product-131305");if(!r.hasClass("deleted")){var t={method:"delete",dataType:"json",url:r.data("deletehref")};$.ajax(t).done(function(e){var r;PCC.Browser.isIexplorer()?(r=document.createEvent("Event")).initEvent("cartModified",!1,!0):r=new CustomEvent("cartModified",{detail:{}}),document.dispatchEvent(r)}).fail(function(e){if(e.responseText){var r=$.parseJSON(e.responseText);"error"==r.status&&setErrorMessage(r.message)}}),r.addClass("deleted")}}function cartCheckbox(e){$(".return-cart-premium")[0].checked=!0}function cancelPremiumSubscription(e,r){var t=Routing.generate("pcc_web_cancel_premium_subscription"),a={};a.idSubscription=r,$.ajax({url:t,data:a,dataType:"json",method:"post",success:function(r){r.error||isObjectEmpty(e)||e.run(r)},error:function(r){isObjectEmpty(e)||e.errors(r)},cache:!1})}function storePremiumInfoInLocalStorage(e){localStorage.setItem("storedPremiumData",JSON.stringify(e))}function hoursToSeconds(e){return 60*e*60}function isObjectEmpty(e){return 0===Object.keys(e).length}function constructJson(e,r){var t={};return t[e]=r,t}$(document).ready(function(e){});var url=window.location.href,arrUrl=url.split("/"),baseUrl=arrUrl[0]+"//"+arrUrl[2];