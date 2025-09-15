function userNewAccessKeySend()
{
    showLoader(); 

    var v_authentication = 
    {        
        email: document.getElementById("form_user_new_access_email").value,
        team: localStorage.getItem('team')
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = '';      
    requestedModel.url                        = localStorage.getItem('api');;
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
      team: localStorage.getItem('team')
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = '';      
  requestedModel.url                        = localStorage.getItem('api');;
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