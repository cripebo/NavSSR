!function(t){var e=(navigator.userLanguage||navigator.language).indexOf("pt")>-1?"pt-pt":"es-es",o={modalEl:[],setup:function(){o.hasCookie()||o.isDifferentLang(t("html").attr("lang"))&&(o.createContent(),o.toggleShown())},hasCookie:function(){return!!t.cookie("lang_modal")},saveCookie:function(){t.cookie("lang_modal",1,{expires:365})},isDifferentLang:function(t){return e.indexOf(t)<0},createContent:function(){var n=t("link[hreflang="+e+"]").attr("href").replace("-pt","").replace("-es",""),a={"es-es":{title:"PCCOMPONENTES.COM",text:"¿Mejor en español?",changeBtn:"En español",closeBtn:"Em português"},"pt-pt":{title:"PCCOMPONENTES.PT",text:"Melhor em português?",changeBtn:"Em português",closeBtn:"En español"}},l=t(['<div id="lang-modal" class="modal fade">','<div class="modal-dialog modal-sm">','<div class="modal-content">','<div class="modal-body">','<h4 class="modal-title">'+a[e].title+"</h4>","<p>"+a[e].text+"</p>",'<a href="'+n+'" class="btn btn-primary btn-block btn-lg">'+a[e].changeBtn+"</a>",'<a href="'+document.location.href+'" type="button" class="btn btn-secondary-outline btn-block btn-lg">'+a[e].closeBtn+"</a>","</div>","</div>","</div>","</div>"].join(""));o.modalEl=t(l).modal({keyboard:!1,show:!1}),o.modalEl.find(".btn").on("click",function(e){var n=t(e.target).attr("href");e.preventDefault(),o.saveCookie(),o.toggleShown(),document.location.href!==n&&setTimeout(function(){document.location.href=n},100)})},toggleShown:function(){o.modalEl.modal("toggle")}};t(window).on("load",function(){o.setup()})}(jQuery);
