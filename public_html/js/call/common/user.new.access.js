function userNewAccessView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML =   
  '<div class="container">'+
  '<div id="form_user_new_access_center" class="row justify-content-center align-items-center">'+  
  '<div id="form_user_new_access">'+
  '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
    '<div class="card-body">'+
      '<div id="form_top">'+
        '<div id="form_titulo">'+
          '<h5 class="card-title">Incluir ou Alterar Usuário</h5>'+
        '</div>'+
        '<div id="form_close" onclick="centralClear()">'+
          '<img src="'+config.img+'close.png">'+
        '</div>'+          
      '</div>'+               
        '<div class="form-row">'+
          '<div class="form-group">'+
            '<label>Nome</label>'+
            '<input type="text" class="form-control" id="form_user_new_access_name">'+
          '</div>'+
          '<div class="form-group" style="margin-top: 10px">'+
            '<label>Login</label>'+
            '<input type="text" class="form-control" id="form_user_new_access_login">'+
          '</div>'+              
          '<div class="form-group" style="margin-top: 10px">'+
            '<label>Senha</label>'+
            '<input type="password" class="form-control" id="form_user_new_access_password">'+
          '</div>'+
          '<div class="form-group" style="margin-top: 10px">'+
          '<label>E-Mail</label>'+
          '<input type="email" class="form-control" id="form_user_new_access_email" placeholder="E-mail">'+
        '</div>'+            
          '<div class="form-group" style="margin-top: 10px">'+
            '<label>Chave</label>'+
            '<input type="text" class="form-control" id="form_user_new_access_token" autocomplete="off">'+
          '</div>'+           
        '</div>'+
        '<div id="form_user_check">'+                
        '<div class="form-check">'+
          '<input onclick="setPasswordView(form_user_new_access_exibir_password, form_user_new_access_password)" class="form-check-input" type="checkbox" id="form_user_new_access_exibir_password">'+
          '<label class="form-check-label" for="gridCheck">'+
            'Show Password'+
          '</label>'+
        '</div>'+
        '</div>'+
        '<div id="form_user_new_access_botao">'+
          '<button onclick="userNewAccessSend()" type="submit" class="btn btn-primary">Salvar</button>'+
          '<button onclick="userNewAccessKeySend()" type="submit" class="btn btn-primary" style="margin-left: 5px";>Receber Chave</button>'+  
        '</div>'+
    '</div>'+
    '</div>'+    
  '</div>'+
  '</div>'+  
'</div>';   

centralActive();
}

function userNewAccessKeySend()
{
    showLoader(); 

    var v_authentication = 
    {        
        email: document.getElementById("form_user_new_access_email").value,
        team: vg_team
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = '';      
    requestedModel.url                        = config.api;
    requestedModel.controller                 = 'USER_NEW_PASSWORD_TOKEN'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'json';  
    requestedModel.authenticationData         = JSON.stringify(v_authentication);;
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = ''; 
    requestedModel.functionResponse           = userKeyResponse;   
    request(requestedModel);
}

var userKeyResponse = function (e_request)
{   
    hideLoader();    

    if (e_request.resultCode != 200)
    {
        showMessage(e_request.result);                
    }
    else
    {
        showMessage('Chave enviada com sucesso!');                        
    }    
}

function userNewAccessSend()
{
  showLoader(); 

  var v_privateData = 
  {        
      name: document.getElementById("form_user_new_access_name").value,   
      login: document.getElementById("form_user_new_access_login").value,       
      password: document.getElementById("form_user_new_access_password").value,      
      email: document.getElementById("form_user_new_access_email").value,
      token: document.getElementById("form_user_new_access_token").value,      
      team: vg_team
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = '';      
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'USER_NEW_PASSWORD'; 
  requestedModel.method                     = 'POST'; 
  requestedModel.publicDataType             = 'json';      
  requestedModel.publicData                 = '';
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = document.getElementById("form_user_new_access_token").value;    
  requestedModel.privateDataType            = 'JSON';  
  requestedModel.privateData                = JSON.stringify(v_privateData); 
  requestedModel.functionResponse           = userNewAccessSendResponse;   
  request(requestedModel);
}

var userNewAccessSendResponse = function (e_request)
{   
    hideLoader();    

    if (e_request.resultCode != 200)
    {
        showMessage(e_request.result);                
    }
    else
    {           
        showMessage('Alterado com sucesso!');
    }
}