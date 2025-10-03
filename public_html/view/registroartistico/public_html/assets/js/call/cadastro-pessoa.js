document.addEventListener("DOMContentLoaded", function() 
{
    // localStorage.setItem("form_active", document.getElementById('central'));     
    // centralActive();
    pessoaGet();
});

// Preview da foto
const fotoInput = document.getElementById('form_pessoa_foto');

fotoInput.addEventListener('change', () => 
{
    resizeImage('form_pessoa_foto', 'form_pessoa_foto_preview', 200);
});

function pessoaSend()
{
    showLoader(); 

    var v_privateData = 
    {        
        nome: document.getElementById("form_pessoa_nome").value,
        fone: document.getElementById("form_pessoa_celular").value,
        documento_tipo: document.getElementById("form_pessoa_tipo_documento").value,
        documento: document.getElementById("form_pessoa_documento").value,        
        img: document.getElementById("form_pessoa_foto_preview").src,
        redes_sociais: document.getElementById("form_pessoa_redes_sociais").value,
        curriculo: document.getElementById("form_pessoa_curriculo").value,        
        contato_publico: boolToStr(document.getElementById("form_pessoa_contato_publico").checked)
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = localStorage.getItem('api');
    requestedModel.controller                 = 'REGISTRO_ARTISTICO_PESSOA'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = localStorage.getItem('token');
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = JSON.stringify(v_privateData); 
    requestedModel.functionResponse           = pessoaSendResponse;   
    request(requestedModel);
}

var pessoaSendResponse = function (e_request)
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

function pessoaGet()
{
  showLoader(); 

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = localStorage.getItem('api');
    requestedModel.controller                 = 'REGISTRO_ARTISTICO_PESSOA'; 
    requestedModel.method                     = 'GET'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = localStorage.getItem('token');
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = ''; 
    requestedModel.functionResponse           = pessoaGetResponse;   
    request(requestedModel);
}

var pessoaGetResponse = function (e_request)
{   
    hideLoader();    

    if (e_request.resultCode != 200)
    {
        showMessage(e_request.result);                
    }
    else
    {           
        var v_result = JSON.parse(e_request.result);
        document.getElementById("form_pessoa_nome").value = v_result[0].nome;
        document.getElementById("form_pessoa_celular").value = v_result[0].fone;
        document.getElementById("form_pessoa_tipo_documento").value = v_result[0].documento_descricao;
        document.getElementById("form_pessoa_documento").value = v_result[0].documento;
        document.getElementById("form_pessoa_curriculo").value = v_result[0].curriculo;
        document.getElementById("form_pessoa_redes_sociais").value = v_result[0].redes_sociais;
        document.getElementById("form_pessoa_contato_publico").checked = strToBool(v_result[0].contato_publico);

        if (v_result[0].img_dados !== "") {
            document.getElementById("form_pessoa_foto_preview").src = v_result[0].img_dados;
            document.getElementById("form_pessoa_foto_preview").style.display = "block";
        } else {
            document.getElementById("form_pessoa_foto_preview").style.display = "none";
        }
    }
}