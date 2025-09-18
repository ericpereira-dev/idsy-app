// Preview da foto
const fotoInput = document.getElementById('form_pessoa_foto');

fotoInput.addEventListener('change', () => 
{
    resizeImage('form_pessoa_foto', 'form_pessoa_foto_preview', 200);
    /*

    const file = fotoInput.files[0];
    if (file) 
    {
        const reader = new FileReader();
        reader.onload = function(e) 
        {
            const img = new Image();
            img.onload = function() 
            {
                // Definindo a largura fixa
                const maxWidth = 200;
                const scale = maxWidth / img.width;
                const newWidth = maxWidth;
                const newHeight = img.height * scale;

                // Criar canvas e redimensionar
                const canvas = document.createElement("canvas");
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Converter para Base64
                const base64 = canvas.toDataURL("image/jpeg", 0.9);

                // Mostrar no preview
                document.getElementById("form_pessoa_foto_preview").src = base64;
                preview.style.display = "block";
                // Guardar no campo hidden
                document.getElementById("form_pessoa_foto_base64").value = base64;
                document.getElementById("form_pessoa_redes").value = base64;
                document.getElementById("form_pessoa_curriculo").value = document.getElementById("form_pessoa_foto_preview").src;
            };
            img.src = e.target.result;
        };
    
    reader.readAsDataURL(file);

        // reader.onload = e => 
        // {
        //     preview.src = e.target.result;
        //     preview.style.display = "block";
        //     base64.value = e.target.result;
        // };
        // reader.readAsDataURL(file);
    } 
    else 
    {
        preview.style.display = "none";
    }   
*/
});

function pessoaSend()
{
    // showLoader(); 

    document.getElementById('form_pessoa_curriculo').value = document.getElementById('form_pessoa_foto_preview').src;
/*
    var v_privateData = 
    {        
        name: document.getElementById("form_pessoa_name").value,
        documento: document.getElementById("form_pessoa_documento").value,
        documento_tipo: document.getElementById("form_pessoa_documento_tipo").value,
        img: v_img,
        fone: document.getElementById("form_pessoa_celular").value,
        curriculo: document.getElementById("form_pessoa_curriculo").value,
        redes_sociais: document.getElementById("form_pessoa_redes_sociais").value,
        contato_publico: boolToStr(document.getElementById("form_pessoa_contato_publico").checked),
        blocked:'F',
        deleted: deleted
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
    requestedModel.functionResponse           = pessoaResponse;   
    request(requestedModel);
    */
}

var pessoaResponse = function (e_request)
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

function userNewAccessSend()
{
  showLoader(); 

  var v_privateData = 
  {        
      name: document.getElementById("form_pessoa_name").value,   
      login: document.getElementById("form_pessoa_login").value,       
      password: document.getElementById("form_pessoa_password").value,      
      email: document.getElementById("form_pessoa_email").value,
      token: document.getElementById("form_pessoa_token").value,      
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
  requestedModel.authenticationData         = document.getElementById("form_pessoa_token").value;    
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