    document.addEventListener("DOMContentLoaded", function() 
    {
        // localStorage.setItem("form_active", document.getElementById('central'));     
        // centralActive();
        colecionadorGet();
    });


function colecionadorSend()
{
    showLoader(); 

    var v_privateData = 
    {        
        ativo: boolToStr(document.getElementById("form_colecionador_ativo").checked)
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = localStorage.getItem('api');
    requestedModel.controller                 = 'REGISTRO_ARTISTICO_COLECIONADOR'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = localStorage.getItem('token');
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = JSON.stringify(v_privateData); 
    requestedModel.functionResponse           = colecionadorSendResponse;   
    request(requestedModel);
}

var colecionadorSendResponse = function (e_request)
{   
    hideLoader();    

    if (e_request.resultCode != 200)
    {
        showMessage(e_request.result);                
    }
    else
    {
        showMessage('Salvo com sucesso!');                        
    }    
}

function colecionadorGet()
{
    showLoader(); 
    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = localStorage.getItem('api');
    requestedModel.controller                 = 'REGISTRO_ARTISTICO_COLECIONADOR'; 
    requestedModel.method                     = 'GET'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = localStorage.getItem('token');
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = ''; 
    requestedModel.functionResponse           = colecionadorGetResponse;   
    request(requestedModel);
}

var colecionadorGetResponse = function (e_request)
{   
    hideLoader();    

    if (e_request.resultCode != 200)
    {
        showMessage(e_request.result);                
    }
    else
    {           
        var v_result = e_request.result;
        document.getElementById("form_colecionador_ativo").checked = strToBool(v_result);
    }
}