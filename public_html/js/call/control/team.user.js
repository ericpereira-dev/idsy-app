function teamUserView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML = 
  '<div id="form_team_user_center" class="row justify-content-center align-items-center">'+
    '<div id="form_team_user">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">User to Team</h5>'+
            '</div>'+
            '<div id="form_close" onclick="centralClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+                      
          '<div class="form-row">'+
            '<div class="form-group">'+
              '<label>ID</label>'+
              '<input type="text" class="form-control" id="form_team_user_id" placeholder="ID" disabled>'+
            '</div>'+
            '<div class="form-group" style="margin-top: 10px">'+
              '<label onclick="teamSearchView(teamUserTeamLoad)">ID Team(Click to change)</label>'+              
              '<input type="text" class="form-control" id="form_team_user_id_team" placeholder="ID Team" disabled>'+
            '</div>'+            
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Team</label>'+
              '<input type="text" class="form-control" id="form_team_user_team" placeholder="Team" disabled>'+
            '</div>'+  
            '<div class="form-group" style="margin-top: 10px">'+
              '<label onclick="userSearchView(teamUserUserLoad)">ID User(Click to change)</label>'+
              '<input type="text" class="form-control" id="form_team_user_id_user" placeholder="ID User" disabled>'+
            '</div>'+            
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>User</label>'+
              '<input type="text" class="form-control" id="form_team_user_user" placeholder="User" disabled>'+
            '</div>'+
            '<div id="form_user_check">'+                
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_team_user_blocked">'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Blocked'+
                '</label>'+
              '</div>'+                      
            '</div>'+            
          '</div>'+
          '<div id="form_team_user_botaos" style="margin-top: 20px">'+              
            '<button onclick="teamUserSend(\'F\')" type="button" class="btn btn-primary">Save</button>'+
            '<button onclick="teamUserSearchView(teamUserLoad)" type="button" class="btn btn-primary" style="margin-left: 5px">Search</button>'+              
            '<button onclick="teamUserClear()" type="button" class="btn btn-primary" style="margin-left: 5px">Clean</button>'+                                      
            '<button onclick="teamUserSend(\'T\')" type="button" class="btn btn-danger" style="margin-left: 5px">Delete</button>'+                          
          '</div>'+          
        '</div>'+
      '</div>'+
    '</div>'+    
  '</div>';   

   centralActive();          
}

function teamUserSend(deleted)
{
    var v_privateData = 
    {        
        id: document.getElementById("form_team_user_id").value,      
        id_team: document.getElementById("form_team_user_id_team").value,
        id_user: document.getElementById("form_team_user_id_user").value,
        blocked: boolToStr(document.getElementById("form_team_user_blocked").checked),
        deleted: deleted
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = config.api;
    requestedModel.controller                 = 'TEAM_USER'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'JSON'; 
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = vg_token;    
    requestedModel.privateDataType            = 'JSON';  
    requestedModel.privateData                = JSON.stringify(v_privateData); 
    requestedModel.functionResponse           = teamUserSendResponse; 

    if (deleted=='T')
    {
      teamUserClear();
    }

    showLoader();       
    request(requestedModel);
}

var teamUserSendResponse = function (e_request)
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
      document.getElementById("form_team_user_id").value                   = v_result;    
      showMessage('Salvo com sucesso!');   
    }
    else
    {
      showMessage('Excluido com sucesso!');   
    }                                  
  }
}

var teamUserLoad = function(id)
{
  showLoader(); 
  var v_publiData = 
  {        
      id: id,      
      id_team:0,                                
      team:"",
      id_user:0,
      user:"",
      fields:0,
      orderBy:'',
      lines: ''      
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'TEAM_USER'; 
  requestedModel.method                     = 'GET'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = '';  
  requestedModel.privateData                = '';
  requestedModel.functionResponse           = teamUserLoadResponse;   
  request(requestedModel);
}

var teamUserLoadResponse = function (e_request)
{   
  hideLoader();   
  teamUserView();   

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    v_result = JSON.parse(e_request.result);    
    document.getElementById("form_team_user_id").value                   = v_result[0].id;
    document.getElementById("form_team_user_id_team").value              = v_result[0].id_team; 
    document.getElementById("form_team_user_team").value                 = v_result[0].team;
    document.getElementById("form_team_user_id_user").value              = v_result[0].id_user;
    document.getElementById("form_team_user_user").value                 = v_result[0].user;
    document.getElementById("form_team_user_blocked").checked            = strToBool(v_result[0].blocked);      
  }   
  centralActive();  
}

function teamUserClear()
{  
  document.getElementById("form_team_user_id").value                   = '';
  document.getElementById("form_team_user_id_team").value              = ''; 
  document.getElementById("form_team_user_team").value                 = '';
  document.getElementById("form_team_user_id_user").value              = '';
  document.getElementById("form_team_user_user").value                 = '';
  document.getElementById("form_team_user_blocked").checked            = strToBool('F');        
}

// load team
var teamUserTeamLoad = function(id)
{
  showLoader(); 
  var v_publiData = 
  {        
    id: id,      
    name: '',
    fields: '0',
    orderBy:'',
    lines: '' 
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'team'; 
  requestedModel.method                     = 'GET'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = '';  
  requestedModel.privateData                = '';
  requestedModel.functionResponse           = teamUserTeamLoadResponse;   
  request(requestedModel);
}

var teamUserTeamLoadResponse = function (e_request)
{   
  hideLoader();     

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    v_result = JSON.parse(e_request.result);    
    document.getElementById("form_team_user_id_team").value                   = v_result[0].id;
    document.getElementById("form_team_user_team").value                      = v_result[0].name;
  }   
  centralActive();  
}

// load user

var teamUserUserLoad = function(id)
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
  requestedModel.functionResponse           = teamUserUserLoadResponse;   
  request(requestedModel);
}

var teamUserUserLoadResponse = function (e_request)
{   
  hideLoader();   

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    v_result = JSON.parse(e_request.result);    
    document.getElementById("form_team_user_id_user").value                   = v_result[0].id;
    document.getElementById("form_team_user_user").value                      = v_result[0].name;
  }   
  centralActive();  
}