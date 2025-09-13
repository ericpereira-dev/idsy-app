function pessoaView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML = 
  '<div id="form_pessoa_center" class="row justify-content-center align-items-center">'+
    '<div id="form_pessoa">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">Dados Pessoais</h5>'+
            '</div>'+
            '<div id="form_close" onclick="centralClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+                      
          '<div class="form-row">'+
        '<!-- Nome -->'+
        '<div class="mb-3">'+
          '<label for="nome" class="form-label">Nome</label>'+
          '<input type="text" class="form-control" id="form_pessoa_name" placeholder="Digite seu nome completo" required>'+
        '</div>'+
        '<!-- Celular -->'+
        '<div class="mb-3">'+
          '<label for="celular" class="form-label">Celular</label>'+
          '<input type="tel" class="form-control" id="form_pessoa_celular" placeholder="(99) 99999-9999" required>'+
        '</div>'+
        '<!-- Documento -->'+
        '<div class="mb-3">'+
          '<label for="tipoDocumento" class="form-label">Tipo de Documento</label>'+
          '<select class="form-select" id="form_pessoa_documento_tipo" required>'+
            '<option value="cpf">CPF</option>'+
            '<option value="cnpj">CNPJ</option>'+
            '<option value="passaporte">Passaporte</option>'+
          '</select>'+
        '</div>'+
        '<div class="mb-3">'+
          '<label for="documento" class="form-label">Número do Documento</label>'+
          '<input type="text" class="form-control" id="form_pessoa_documento" placeholder="Digite o número" required>'+
          '<pre id="output"></pre>'+
        '</div>'+
        '<!-- Foto -->'+
        '<div class="mb-3">'+
          '<label for="foto" class="form-label">Foto</label>'+
          '<input class="form-control" type="file" id="form_pessoa_img" accept="image/*">'+
          '<img src="img/semimagem.png" id="img_preview" alt="Pré-visualização da foto">'+
        '</div>'+
        '<!-- Redes sociais -->'+
        '<div class="mb-3">'+
          '<label for="redes" class="form-label">Redes Sociais</label>'+
          '<textarea class="form-control" id="form_pessoa_redes_sociais" rows="3" placeholder="Cole aqui os links de suas redes sociais"></textarea>'+
        '</div>'+
        '<!-- Curriculo -->'+
        '<div class="mb-3">'+
          '<label for="curriculo" class="form-label">Currículo</label>'+
          '<textarea class="form-control" id="form_pessoa_curriculo" rows="3" placeholder="Cole aqui o texto do seu currículo"></textarea>'+
        '</div>'+
            '<div id="form_pessoa_check">'+                
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_pessoa_contato_publico">'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Deixar o contato publico!'+
                '</label>'+
              '</div>'+            
            '</div>'+
          '</div>'+
          '<div id="form_pessoa_botaos" style="margin-top: 20px">'+              
            '<button onclick="pessoaSend(\'F\')" type="button" class="btn btn-primary">Salvar</button>'+
          '</div>'+          
        '</div>'+
      '</div>'+
    '</div>'+    
  '</div>';

   centralActive();       
   var v_focu = document.getElementById("form_pessoa_name");
   v_focu.focus();
   v_focu.select();     
}

function pessoaSend(deleted)
{
    // Redimensiona a imagem e converte para base64
    var v_img;
    document.getElementById("form_pessoa_img").addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (file) {
            resizeAndConvertToBase64(file, 800, function(base64) {
                v_img = base64;
            });
        }
    });

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
    requestedModel.url                        = config.api;
    requestedModel.controller                 = 'REGISTRO_ARTISTICO_PESSOA'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'JSON'; 
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = vg_token;    
    requestedModel.privateDataType            = 'JSON';  
    requestedModel.privateData                = JSON.stringify(v_privateData); 
    requestedModel.functionResponse           = pessoaSendResponse; 

    if (deleted=='T')
    {
      pessoaClear();
    }

    showLoader();       
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
    v_result = JSON.parse(e_request.result);    
    
    if (v_result!='0')
    {
      document.getElementById("form_pessoa_id").value                   = v_result;    
      showMessage('Salvo com sucesso!');   
    }
    else
    {
      showMessage('Excluido com sucesso!');   
    }                                  
  }     
}

var pessoaLoad = function(id)
{
  showLoader(); 
  var v_publiData = 
  {        
      id: id,      
      name: '',
      fields:0,
      orderBy:'',
      lines: ''      
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'USER'; 
  requestedModel.method                     = 'GET'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = '';  
  requestedModel.privateData                = '';
  requestedModel.functionResponse           = pessoaLoadResponse;   
  request(requestedModel);
}

var pessoaLoadResponse = function (e_request)
{   
  hideLoader();   
  pessoaView();   

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    v_result = JSON.parse(e_request.result);    
    document.getElementById("form_pessoa_id").value                   = v_result[0].id;
    document.getElementById("form_pessoa_name").value                 = v_result[0].name;
    document.getElementById("form_pessoa_login").value                = v_result[0].login;
    document.getElementById("form_pessoa_password").value             = v_result[0].password;
    document.getElementById("form_pessoa_email").value                = v_result[0].email;
    document.getElementById("form_pessoa_twe_factors").checked        = strToBool(v_result[0].two_factors);      
    document.getElementById("form_pessoa_multiple_token").checked     = strToBool(v_result[0].multiple_token);      
    document.getElementById("form_pessoa_blocked").checked            = strToBool(v_result[0].blocked);      
  }   
  centralActive();  
}

function pessoaClear()
{
  document.getElementById("form_pessoa_id").value                   = '';
  document.getElementById("form_pessoa_name").value                 = '';
  document.getElementById("form_pessoa_login").value                = '';
  document.getElementById("form_pessoa_password").value             = '';
  document.getElementById("form_pessoa_email").value                = '';
  document.getElementById("form_pessoa_exibir_password").checked    = strToBool('F');        
  document.getElementById("form_pessoa_twe_factors").checked        = strToBool('F');      
  document.getElementById("form_pessoa_multiple_token").checked     = strToBool('F');      
  document.getElementById("form_pessoa_blocked").checked            = strToBool('F');      
}
