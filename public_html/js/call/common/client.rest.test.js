function clientRestView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML = 
  '<div id="form_rest_client_center" class="row justify-content-center align-items-center">'+
    '<div id="form_rest_client">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">Rest Client</h5>'+
            '</div>'+
            '<div id="form_close" onclick="centralClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+           
          '<div class="form-row">'+
            '<div class="form-group">'+
              '<label>URL</label>'+
              '<input type="text" class="form-control" id="form_rest_client_url" placeholder="URL">'+
            '</div>'+
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Arquivo</label>'+
              '<input type="text" class="form-control" id="form_rest_client_arquivo" placeholder="Arquivo">'+
            '</div>'+            
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Metodo</label>'+
              '<input type="text" class="form-control" id="form_rest_client_metodo" placeholder="Metodo">'+
            '</div>'+                        
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Query</label>'+
              '<input type="text" class="form-control" id="form_rest_client_query" placeholder="Query">'+
            '</div>'+                      
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Header</label>'+
              '<input type="text" class="form-control" id="form_rest_client_header" placeholder="Header">'+
            '</div>'+ 
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Body</label>'+
              '<input type="text" class="form-control" id="form_rest_client_body" placeholder="body">'+
            '</div>'+
          '</div>'+
          '<div id="form_rest_client_botao">'+    
            '<button onclick=restClientSend() type="submit" class="btn btn-primary">Enviar</button>'+
            '<button onclick=clientRestClearViewResponse() type="submit" class="btn btn-primary" style="margin-left: 5px">Limpar Retorno</button>'+              
          '</div>'+
          '<div class="form-group" style="margin-top: 10px">'+
              '<label>Retorno</label>'+
              '<input type="text" class="form-control" id="form_rest_client_retorno" placeholder="">'+
          '</div>'+              
        '</div>'+
      '</div>'+
    '</div>'+
    '</div>'+    
  '</div>';   

   centralActive();   
   document.getElementById("form_rest_client_url").value = 'https://www.ep.dev.br/api.php';
   document.getElementById("form_rest_client_arquivo").value = 'LOGIN' ;     
   document.getElementById("form_rest_client_metodo").value = 'POST';
   document.getElementById("form_rest_client_query").value = '{"cliente_id":"1", "nome":"eric"}';
   document.getElementById("form_rest_client_header").value= '{"login":"admin", "password":"1234","team":"ativa", "key":"123456"}';         
   document.getElementById("form_rest_client_body").value= '{"nome":"eric", "bairro":"santa barbara"}';            

     
   var v_focu = document.getElementById("form_rest_client_url");
   v_focu.focus();
   v_focu.select();     
}

function clientRestClearViewResponse()
{
  document.getElementById("form_rest_client_retorno").value    = '';
}

function restClientSend()
{
    showLoader(); 
    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = document.getElementById("form_rest_client_url").value;
    requestedModel.controller                 = document.getElementById("form_rest_client_arquivo").value; 
    requestedModel.method                     = document.getElementById("form_rest_client_metodo").value; 
    requestedModel.publicDataType             = 'json'; 
    requestedModel.publicData                 = document.getElementById("form_rest_client_query").value;
    requestedModel.authenticationDataType     = 'json';  
    requestedModel.authenticationData         = document.getElementById("form_rest_client_header").value;    
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = document.getElementById("form_rest_client_body").value; 
    requestedModel.functionResponse           = restClientResponse;   
    request(requestedModel);
}

var restClientResponse = function (e_request)
{   
    hideLoader();
    document.getElementById("form_rest_client_retorno").value    = e_request.result+'('+e_request.resultCode+')';
    centralActive();      
}

