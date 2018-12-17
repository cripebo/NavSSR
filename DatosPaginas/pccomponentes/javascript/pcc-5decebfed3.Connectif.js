var PCC=PCC||{};PCC.desconnectif={entityInfo:{},cart:{},pushSubscription:{},events:[],bannerPlaceholders:{},sentPageVisit:!1,setEmailStatus:function(t){this.entityInfo._emailStatus=t?"active":"unsubscribed"},setEmailStatusByValue:function(t){this.entityInfo._emailStatus=t},setName:function(t){this.entityInfo._name=t},setSurname:function(t){this.entityInfo._surname=t},sendRequest:function(t){this.sentPageVisit&&(this.events=this.utils.removeEventsByType(this.events,"page-visit")),this.utils.checkEventByType(this.events,"page-visit")&&(this.sentPageVisit=!0);var e={entityInfo:this.entityInfo,cart:this.cart,pushSubscription:this.pushSubscription,events:this.utils.removeDuplicateEventsByEvent(this.events,"page-visit"),bannerPlaceholders:this.bannerPlaceholders,onResponded:t||{}};connectif.managed.sendEvents(this.events,e)},generateConnectifScript:function(){var t=document.createElement("script");t.setAttribute("type","text/javascript"),t.setAttribute("id","initialize_connectif_autogenerated"),t.innerText=' if (typeof initializeConnectif === "function") { initializeConnectif(connectifConfiguration);} ',document.body.appendChild(t)},getRequest:function(t){return this.sentPageVisit&&(this.events=this.utils.removeEventsByType(this.events,"page-visit")),{entityInfo:this.entityInfo,entityinfo:this.entityInfo,cart:this.cart,pushSubscription:this.pushSubscription,events:this.utils.removeDuplicateEventsByEvent(this.events,"page-visit"),bannerPlaceholders:this.bannerPlaceholders,onResponsed:t}},onResponse:function(t,e){connectif.set("cn_tracker",JSON.stringify({id:t.trackerId}))},onResponseAlt:function(t,e){!function(t){var e=connectif.getPushSubscription();e?e.then(t):t()}(function(e){var n=!0;"default"===Notification.permission||("granted"===Notification.permission?(n=!1,e||connectif.subscribeToPushNotifications()):"denied"===Notification.permission&&(n=!1)),t.webModals&&(!t.webModals.immediate||connectif.isSomeModalOpened()||!n&&t.webModals.immediate.onlyShowIfPushUnsubscribed||(connectif.showModal(t.webModals.immediate),z=t.webModals.immediate),!t.webModals.onLeavePage||!n&&t.webModals.onLeavePage.onlyShowIfPushUnsubscribed||(j.onLeavePage=t.webModals.onLeavePage),!t.webModals.onScroll||!n&&t.webModals.onScroll.onlyShowIfPushUnsubscribed||(j.onScroll=t.webModals.onScroll),!t.webModals.onTimer||!n&&t.webModals.onTimer.onlyShowIfPushUnsubscribed||(j.onTimer=t.webModals.onTimer,l())),Array.isArray(t.banners)&&t.banners.forEach(function(t){connectif.showBanner(t.banners[0])})})},setEntityInfo:function(t){this.checkClientTracking(t.userEmail),this.entityInfo={primaryKey:t.userEmail||"",_name:t.name||"",_surname:t.surname||"",_emailStatus:t.emailStatus||null}},checkClientTracking:function(t){var t=t||"anon";if(this.getClientEmailFromLocalStorage()){var e=this.getClientEmailFromLocalStorage();e!=t&&"anon"!=e&&(this.removeClientEmailInLocalStorage(),this.storeClientEmailInLocalStorage(t))}else this.storeClientEmailInLocalStorage(t)},addEntityCustomFields:function(t){this.entityInfo=this.utils.jsonMerge(this.entityInfo,t)},removeEntityCustomFields:function(){this.entityInfo={primaryKey:this.entityInfo.primaryKey,_name:this.entityInfo._name,_surname:this.entityInfo._surname,_emailStatus:this.entityInfo._emailStatus}},setCart:function(t){this.cart={cartId:t.cartId,totalQuantity:t.totalQuantity,totalPrice:t.totalPrice,products:t.products}},addCartCustomFields:function(t){this.cart=this.utils.jsonMerge(this.entityInfo,t)},removeCartCustomFields:function(){this.cart={cartId:this.cart.cartId,totalQuantity:this.cart.totalQuantity,totalPrice:this.cart.totalPrice,products:this.cart.products}},setPushSubscription:function(t){this.pushSubscription=t},setEvents:function(t){this.events=t},addEvent:function(t){this.events.push(t)},addEvents:function(t){for(var e=0,n=t.length;e!=n;e++)this.events.push(t[e])},addNewsletterSubscribeEvent:function(){this.events.push({type:"newsletter-subscribe"})},addSearchEvent:function(t){this.events.push({type:"search",searchText:t})},addProductVisitEvent:function(t){this.events.push({type:"product-visited",product:t})},addProductSearchedEvent:function(t){this.events.push({type:"product-searched",product:t})},addLoginEvent:function(){this.events.push({type:"login"})},addRegisterEvent:function(){this.events.push({type:"register"})},addPurchaseEvent:function(t){this.events.push({type:"purchase",purchase:{purchaseId:t.purchaseId,paymentMethod:t.paymentMethod,cartId:t.cartId,totalQuantity:t.totalQuantity,totalPrice:t.totalPrice,products:t.products}})},addPageVisitEvent:function(){this.events.push({type:"page-visit"})},removeTrackerFromLocalStorage:function(){localStorage.removeItem("cn_tracker")},storeClientEmailInLocalStorage:function(t){localStorage.setItem("cn_primaryKey",t)},getClientEmailFromLocalStorage:function(){return null!==localStorage.getItem("cn_primaryKey")&&localStorage.getItem("cn_primaryKey")},removeClientEmailInLocalStorage:function(){localStorage.removeItem("cn_primaryKey")},removeClientTrackerInLocalStorage:function(){localStorage.removeItem("cn_tracker")},utils:{constructJson:function(t,e){for(var n={},i=0,o=t.length;i!=o;i++)n[t[i]]=e[i];return n},getTotalPricesFromProduct:function(t){var e=t.qty,n=this.clearPriceString(t.price);return(Number(e)*Number(n)).toFixed(2)},getConnectifCart:function(t){var e=this.getConnectifProducts(t.cart.cart);return{cartId:t.cartId,totalQuantity:t.cart.totalItems,totalPrice:t.cart.finalPrice,products:e}},getConnectifProducts:function(t){for(var e=[],n=this.getBaseUrl(),i=0,o=t.length;i!=o;i++){var s={productId:t[i].internalId.toString(),unitPrice:this.clearPriceString(t[i].price),quantity:t[i].qty,price:this.getTotalPricesFromProduct(t[i]),name:t[i].title,imageUrl:this.getPccImage(t[i].articleImage),productDetailUrl:n+"/"+t[i].slug,brand:t[i].trademark};e.push(s)}return e},getBaseUrl:function(){var t=window.location.href.split("/");return t.length>2?t[0]+"//"+t[2]:""},getPccImage:function(t,e){return"http://thumb.pccomponentes.com/w-"+((e=e||220)+"-"+e)+"/"+t},clearPriceString:function(t){return Number(t.replace(/[A-Z\-]/g,"").replace(",","."))},jsonMerge:function(t,e){for(var n=t,i=e,o=Object.keys(i),s=0,r=o.length;s!=r;s++)n[o[s]]=i[o[s]];return n},removeDuplicateEventsByEvent:function(t,e){for(var n=!1,i=(t=t).length-1;i>=0;i--)t[i].type==e&&(n?t.splice(i,1):n=!0);return t},removeEventsByType:function(t,e){for(var n=(t=t).length-1;n>=0;n--)t[n].type==e&&t.splice(n,1);return t},checkEventByType:function(t,e){for(var n=(t=t).length-1;n>=0;n--)if(t[n].type==e)return!0;return!1},consoleImage:function(t){var e=new Image;e.onload=function(){var e=["font-size: 1px;","line-height: "+this.height+"px;","padding: "+.5*this.height+"px "+.5*this.width+"px;","background-size: "+this.width+"px "+this.height+"px;","background: url("+t+");"].join(" ");console.log("%c",e)},e.src=t},addIntegrationOST:function(){$("body").append('<audio autoplay preload="auto" id="integrationOST"><source class="audio-source" src="https://a.tumblr.com/tumblr_p97z4pLw0M1t3uk21o1.mp3"></audio>')},removeIntegrationOST:function(){var t=document.getElementById("integrationOST");t.parentNode.removeChild(t)}}};var exports=exports||{};exports.desconnectif=PCC.desconnectif;