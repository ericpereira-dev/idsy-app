function clientKeySimpleSend()
{
    showLoader(); 

    var v_authentication = 
    {        
        login: document.getElementById("form_login_usuario").value,
        password: document.getElementById("form_login_senha").value,
        team: localStorage.getItem('team')
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = '';      
    requestedModel.url                        = localStorage.getItem('api');
    requestedModel.controller                 = 'KEY'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'json';  
    requestedModel.authenticationData         = JSON.stringify(v_authentication);;
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = ''; 
    requestedModel.functionResponse           = clientKeySimpleResponse;   
    request(requestedModel);
}

var clientKeySimpleResponse = function (e_request)
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

function clientLoginSimpleSend()
{
    showLoader(); 

    v_key = document.getElementById("form_login_chave").value;
    var v_authentication = 
    {        
        login: document.getElementById("form_login_usuario").value,
        password: document.getElementById("form_login_senha").value,
        team: localStorage.getItem('team'),
        key: v_key.trim()
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = '';      
    requestedModel.url                        = localStorage.getItem('api');
    requestedModel.controller                 = 'LOGIN'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'JSON';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'JSON';  
    requestedModel.authenticationData         = JSON.stringify(v_authentication);;
    requestedModel.privateDataType            = 'JSON';  
    requestedModel.privateData                = ''; 
    requestedModel.functionResponse           = clientLoginSimpleResponse;   
    request(requestedModel);
}

var clientLoginSimpleResponse = function (e_request)
{   
    if (e_request.resultCode != 200)
    {
        hideLoader();            
        showMessage(e_request.result);             
    }
    else
    {
        hoje = new Date();
        dia = hoje.getDate();
        localStorage.setItem('token', e_request.result);
        localStorage.setItem('token_date', dia.toString());
        
        // await showMessage('Acesso liberado!');  
        // await sleep(2000);
    
        window.location.href = localStorage.getItem('source'); 
    }
}