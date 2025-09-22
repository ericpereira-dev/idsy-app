    document.addEventListener("DOMContentLoaded", function() 
    {
        // localStorage.setItem("form_active", document.getElementById('central'));     
        // centralActive();
        artistaGet();
    });


function artistaSend()
{
    showLoader(); 

    var v_privateData = 
    {        
        ativo: boolToStr(document.getElementById("form_artista_ativo").checked),
        nome: document.getElementById("form_artista_nome").value
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = localStorage.getItem('api');
    requestedModel.controller                 = 'REGISTRO_ARTISTICO_ARTISTA'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = localStorage.getItem('token');
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = JSON.stringify(v_privateData); 
    requestedModel.functionResponse           = artistaSendResponse;   
    request(requestedModel);
}

var artistaSendResponse = function (e_request)
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

function artistaGet()
{
    showLoader(); 
    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = localStorage.getItem('api');
    requestedModel.controller                 = 'REGISTRO_ARTISTICO_ARTISTA'; 
    requestedModel.method                     = 'GET'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = localStorage.getItem('token');
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = ''; 
    requestedModel.functionResponse           = artistaGetResponse;   
    request(requestedModel);
}

var artistaGetResponse = function (e_request)
{   
    hideLoader();    

    if (e_request.resultCode != 200)
    {
        showMessage(e_request.result);                
    }
    else
    {           
        var v_result = JSON.parse(e_request.result);
        document.getElementById("form_artista_ativo").checked = strToBool(v_result.ativo);
        document.getElementById("form_artista_nome").value = v_result.nome;
    }
}