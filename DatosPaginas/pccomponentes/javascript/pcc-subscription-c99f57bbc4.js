function validateForm(){$.validator.methods.email=function(o,e){return this.optional(e)||/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/.test(o)},$('form[name="Promotionsbulletin"]').validate({rules:{"Promotionsbulletin[email]":"email","userRegister[passwordConfirm]":{equalTo:"#userRegister_password"}},errorPlacement:function(o){},invalidHandler:function(o,e){e.numberOfInvalids()&&showModal(e.errorList[0].message)},submitHandler:function(){checkForm()}})}function checkForm(){checklopd.is(":checked")?$.ajax({url:elemForm.attr("action"),data:elemForm.serialize(),method:"post",dataType:"json"}).done(function(){checklopd.prop("checked",!1),elemForm.find("input").val(""),showModal("Felicidades!!<br>Te has suscrito a nuestro boletín"),window.dataLayer=window.dataLayer||[],dataLayer.push({event:"envio-formulario",formulario:"suscripcionPromocionesGTM","campo-formulario1":"boletin","campo-formulario2":"footer",user:PccUserId.get()})}).fail(function(o){showModal($.parseJSON(o.responseText).message)}):showModal("Debes aceptar los terminos de la LOPD.")}function showModal(o){modalpcc.find('div[class="modal-body"]').html("<p>"+o+"</p>"),modalpcc.find('div[class="modal-footer"]').html('<button type="button" class="btn btn-primary" data-dismiss="modal">Cerrar</button>'),modalpcc.modal("show")}var elemForm=$("#bulletinForm"),checklopd=$("#checklopd"),modalpcc=$("#modalpcc-small");elemForm.submit(function(o){o.preventDefault(),validateForm()}),$("#Promotionsbulletin_Enviar").click(function(){validateForm()});
