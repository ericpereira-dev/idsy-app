function loginView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML =   
  '<div class="container">'+
  '<div id="form_login_center" class="row justify-content-center align-items-center">'+  
  '<div id="form_login">'+
  '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
    '<div class="card-body">'+
      '<div id="form_top">'+
        '<div id="form_titulo">'+
          '<h5 class="card-title">Acesso</h5>'+
        '</div>'+
        '<div id="form_close" onclick="centralClear()">'+
          '<img src="'+config.img+'close.png">'+
        '</div>'+          
      '</div>'+               
        '<div class="form-row">'+
          '<div class="form-group">'+
            '<label>Grupo</label>'+
            '<input type="text" class="form-control" id="form_login_grupo">'+
          '</div>'+
          '<div class="form-group" style="margin-top: 10px">'+
            '<label>Login</label>'+
            '<input type="text" class="form-control" id="form_login_usuario">'+
          '</div>'+              
          '<div class="form-group" style="margin-top: 10px">'+
            '<label>Senha</label>'+
            '<input type="password" class="form-control" id="form_login_senha">'+
          '</div>'+
          '<div class="form-group" style="margin-top: 10px">'+
            '<label>Chave</label>'+
            '<input type="number" class="form-control" id="form_login_chave" autocomplete="off">'+
          '</div>'+           
        '</div>'+
        '<div id="form_login_botao">'+
          '<button onclick="clientLoginSend()" type="submit" class="btn btn-primary">Entrar</button>'+
          '<button onclick="clientKeySend()" type="submit" class="btn btn-primary" style="margin-left: 5px";>Receber Chave</button>'+  
          '<button onclick="userNewAccessView()" type="submit" class="btn btn-primary" style="margin-left: 5px";>Alterar Senha</button>'+            
        '</div>'+
    '</div>'+
    '</div>'+    
  '</div>'+
  '</div>'+  
'</div>';   

centralActive();

// var v_focu = document.getElementById("form_login_grupo");
// v_focu.focus();
// v_focu.select();   
}

function clientKeySend()
{
    showLoader(); 

    var v_authentication = 
    {        
        login: document.getElementById("form_login_usuario").value,
        password: document.getElementById("form_login_senha").value,
        team: document.getElementById("form_login_grupo").value
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = '';      
    requestedModel.url                        = config.api;
    requestedModel.controller                 = 'KEY'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'json';  
    requestedModel.authenticationData         = JSON.stringify(v_authentication);;
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = ''; 
    requestedModel.functionResponse           = clientKeyResponse;   
    request(requestedModel);
}

var clientKeyResponse = function (e_request)
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

function clientLoginSend()
{
    showLoader(); 

    v_key = document.getElementById("form_login_chave").value;
    var v_authentication = 
    {        
        login: document.getElementById("form_login_usuario").value,
        password: document.getElementById("form_login_senha").value,
        team: document.getElementById("form_login_grupo").value,
        key: v_key.trim()
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = '';      
    requestedModel.url                        = config.api;
    requestedModel.controller                 = 'LOGIN'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'JSON';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'JSON';  
    requestedModel.authenticationData         = JSON.stringify(v_authentication);;
    requestedModel.privateDataType            = 'JSON';  
    requestedModel.privateData                = ''; 
    requestedModel.functionResponse           = clientLoginResponse;   
    request(requestedModel);
}

var clientLoginResponse = function (e_request)
{   
    hideLoader();    

    if (e_request.resultCode != 200)
    {
        showMessage(e_request.result);                
    }
    else
    {           
        document.getElementById('menu_exit').style.display = 'block';            
        document.getElementById('menu_login').style.display = 'none'; 
        vg_token = e_request.result;       
        centralClear();
        showMessage('Acesso liberado!');
    }
}