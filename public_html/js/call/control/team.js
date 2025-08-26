function teamView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML = 
  '<div id="form_team_center" class="row justify-content-center align-items-center">'+
    '<div id="form_team">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">Team Registration</h5>'+
            '</div>'+
            '<div id="form_close" onclick="centralClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+                      
          '<div class="form-row">'+
            '<div class="form-group">'+
              '<label>ID</label>'+
              '<input type="text" class="form-control" id="form_team_id" placeholder="ID" disabled>'+
            '</div>'+
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Name</label>'+
              '<input type="text" class="form-control" id="form_team_name" placeholder="Name">'+
            '</div>'+            
          '</div>'+
          '<div id="form_user_check">'+             
            '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_team_blocked">'+               
                '<label class="form-check-label" for="gridCheck">'+
                    'Blocked'+
                '</label>'+
            '</div>'+                                     
          '</div>'+                                
          '<div id="form_team_botaos" style="margin-top: 20px">'+              
            '<button onclick="teamSend(\'F\')" type="button" class="btn btn-primary">Save</button>'+
            '<button onclick="teamSearchView(teamLoad)" type="button" class="btn btn-primary" style="margin-left: 5px">Search</button>'+              
            '<button onclick="teamClear()" type="button" class="btn btn-primary" style="margin-left: 5px">Clean</button>'+                                      
            '<button onclick="teamSend(\'T\')" type="button" class="btn btn-danger" style="margin-left: 5px">Delete</button>'+                          
          '</div>'+          
        '</div>'+
      '</div>'+
    '</div>'+    
  '</div>';   

   centralActive();       
   var v_focu = document.getElementById("form_team_name");
   v_focu.focus();
   v_focu.select();     
}

function teamSend(deleted)
{
    var v_privateData = 
    {        
        id: document.getElementById("form_team_id").value,      
        name: document.getElementById("form_team_name").value,
        blocked: boolToStr(document.getElementById("form_team_blocked").checked),                
        deleted: deleted
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = config.api;
    requestedModel.controller                 = 'team'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'JSON'; 
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = vg_token;    
    requestedModel.privateDataType            = 'JSON';  
    requestedModel.privateData                = JSON.stringify(v_privateData); 
    requestedModel.functionResponse           = teamSendResponse; 

    if (deleted=='T')
    {
      teamClear();
    }

    showLoader();       
    request(requestedModel);
}

var teamSendResponse = function (e_request)
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
      document.getElementById("form_team_id").value                   = v_result;    
      showMessage('Salvo com sucesso!');   
    }
    else
    {
      showMessage('Excluido com sucesso!');   
    }                           
  }        
}

var teamLoad = function(id)
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
  requestedModel.functionResponse           = teamLoadResponse;   
  request(requestedModel);
}

var teamLoadResponse = function (e_request)
{   
  hideLoader();   
  teamView();   

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    v_result = JSON.parse(e_request.result);    
    document.getElementById("form_team_id").value                   = v_result[0].id;
    document.getElementById("form_team_name").value                 = v_result[0].name;
    document.getElementById("form_team_blocked").checked            = strToBool(v_result[0].blocked);      
  }   
  centralActive();  
}

function teamClear()
{
  document.getElementById("form_team_id").value                   = '';
  document.getElementById("form_team_name").value                 = '';
  document.getElementById("form_team_blocked").checked            = strToBool('F');      
}
