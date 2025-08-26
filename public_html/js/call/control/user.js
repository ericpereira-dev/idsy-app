function userView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML = 
  '<div id="form_user_center" class="row justify-content-center align-items-center">'+
    '<div id="form_user">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">User Registration</h5>'+
            '</div>'+
            '<div id="form_close" onclick="centralClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+                      
          '<div class="form-row">'+
            '<div class="form-group">'+
              '<label>ID</label>'+
              '<input type="text" class="form-control" id="form_user_id" placeholder="ID" disabled>'+
            '</div>'+
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Name</label>'+
              '<input type="text" class="form-control" id="form_user_name" placeholder="Name">'+
            '</div>'+            
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>E-Mail</label>'+
              '<input type="email" class="form-control" id="form_user_email" placeholder="E-mail">'+
            '</div>'+                        
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Login</label>'+
              '<input type="text" class="form-control" id="form_user_login" placeholder="Login">'+
            '</div>'+                      
            '<div class="form_user_senha" style="margin-top: 10px">'+
              '<label>Password</label>'+
              '<input type="password" class="form-control" id="form_user_password" placeholder="Password">'+
              '<i class="bi bi-eye-fill"></i>'+
            '</div>'+ 
            '<div id="form_user_check">'+                
              '<div class="form-check">'+
                '<input onclick="setPasswordView(form_user_exibir_password, form_user_password)" class="form-check-input" type="checkbox" id="form_user_exibir_password">'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Show Password'+
                '</label>'+
              '</div>'+
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_user_twe_factors">'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Two-Factor Authentication'+
                '</label>'+
              '</div>'+            
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_user_multiple_token">'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Multiple token'+
                '</label>'+
              '</div>'+   
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_user_blocked">'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Blocked'+
                '</label>'+
              '</div>'+                      
            '</div>'+
          '</div>'+
          '<div id="form_user_botaos" style="margin-top: 20px">'+              
            '<button onclick="userSend(\'F\')" type="button" class="btn btn-primary">Save</button>'+
            '<button onclick="userSearchView(userLoad)" type="button" class="btn btn-primary" style="margin-left: 5px">Search</button>'+              
            '<button onclick="userClear()" type="button" class="btn btn-primary" style="margin-left: 5px">Clean</button>'+                                      
            '<button onclick="userSend(\'T\')" type="button" class="btn btn-danger" style="margin-left: 5px">Delete</button>'+                          
          '</div>'+          
        '</div>'+
      '</div>'+
    '</div>'+    
  '</div>';   

   centralActive();       
   var v_focu = document.getElementById("form_user_name");
   v_focu.focus();
   v_focu.select();     
}

function userSend(deleted)
{
    var v_privateData = 
    {        
        id: document.getElementById("form_user_id").value,      
        name: document.getElementById("form_user_name").value,
        login: document.getElementById("form_user_login").value,
        password: document.getElementById("form_user_password").value,
        email: document.getElementById("form_user_email").value,
        two_factors: boolToStr(document.getElementById("form_user_twe_factors").checked),
        multiple_token: boolToStr(document.getElementById("form_user_multiple_token").checked),        
        blocked: boolToStr(document.getElementById("form_user_blocked").checked),
        deleted: deleted
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = config.api;
    requestedModel.controller                 = 'USER'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'JSON'; 
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = vg_token;    
    requestedModel.privateDataType            = 'JSON';  
    requestedModel.privateData                = JSON.stringify(v_privateData); 
    requestedModel.functionResponse           = userSendResponse; 

    if (deleted=='T')
    {
      userClear();
    }

    showLoader();       
    request(requestedModel);
}

var userSendResponse = function (e_request)
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
      document.getElementById("form_user_id").value                   = v_result;    
      showMessage('Salvo com sucesso!');   
    }
    else
    {
      showMessage('Excluido com sucesso!');   
    }                                  
  }     
}

var userLoad = function(id)
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
  requestedModel.functionResponse           = userLoadResponse;   
  request(requestedModel);
}

var userLoadResponse = function (e_request)
{   
  hideLoader();   
  userView();   

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    v_result = JSON.parse(e_request.result);    
    document.getElementById("form_user_id").value                   = v_result[0].id;
    document.getElementById("form_user_name").value                 = v_result[0].name;
    document.getElementById("form_user_login").value                = v_result[0].login;
    document.getElementById("form_user_password").value             = v_result[0].password;
    document.getElementById("form_user_email").value                = v_result[0].email;
    document.getElementById("form_user_twe_factors").checked        = strToBool(v_result[0].two_factors);      
    document.getElementById("form_user_multiple_token").checked     = strToBool(v_result[0].multiple_token);      
    document.getElementById("form_user_blocked").checked            = strToBool(v_result[0].blocked);      
  }   
  centralActive();  
}

function userClear()
{
  document.getElementById("form_user_id").value                   = '';
  document.getElementById("form_user_name").value                 = '';
  document.getElementById("form_user_login").value                = '';
  document.getElementById("form_user_password").value             = '';
  document.getElementById("form_user_email").value                = '';
  document.getElementById("form_user_exibir_password").checked    = strToBool('F');        
  document.getElementById("form_user_twe_factors").checked        = strToBool('F');      
  document.getElementById("form_user_multiple_token").checked     = strToBool('F');      
  document.getElementById("form_user_blocked").checked            = strToBool('F');      
}
