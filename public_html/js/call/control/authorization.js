function authorizationView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML = 
  '<div id="form_authorization_center" class="row justify-content-center align-items-center">'+
    '<div id="form_authorization">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">Authorization</h5>'+
            '</div>'+
            '<div id="form_close" onclick="centralClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+                      
          '<div class="form-row">'+
            '<div class="form-group">'+
              '<label onclick="teamUserSearchView(authorizationTeamUserLoad)">Team to User(Click to Change)</label>'+
              '<input type="text" class="form-control" id="form_authorization_id" placeholder="ID" disabled>'+
            '</div>'+
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Team</label>'+
              '<input type="text" class="form-control" id="form_authorization_team" placeholder="Team" disabled>'+
            '</div>'+  
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>User</label>'+
              '<input type="text" class="form-control" id="form_authorization_user" placeholder="User" disabled>'+
            '</div>'+
            '<div id="form_authorization_check">'+                            
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_authorization_activated" checked>'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Activated'+
                '</label>'+
              '</div>'+   
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_authorization_disabled" checked>'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Disabled'+
                '</label>'+
              '</div>'+               
              '<div class="form-row" style="margin-top: 10px">'+
              '<div class="form-group">'+
                '<label>Filter Controller</label>'+
                '<input type="text" class="form-control" id="form_authorization_controller" placeholder="Controller">'+
              '</div>'+              
            '</div>'+
          '</div>'+
          '<div id="form_authorization_botaos" style="margin-top: 20px">'+              
            '<button onclick="authorizationLoad()" type="button" class="btn btn-primary" style="margin-left: 5px">Find</button>'+              
          '</div>'+          
        '</div>'+
      '</div>'+
    '</div>'+    
    '</div>'+        
  '<div id="form_authorization_search_result_center" class="row justify-content-center align-items-center">'+
  '</div>';    
  '</div>';   
    
   centralActive();       
   var v_focu = document.getElementById("form_authorization_controller");
   v_focu.focus();
   v_focu.select();     
}

var authorizationLoad = function()
{
  showLoader();   

  var v_publiData = 
  {        
    id_team_user: document.getElementById("form_authorization_id").value, 
    controller: document.getElementById("form_authorization_controller").value,
    disabled: boolToStr(document.getElementById("form_authorization_disabled").checked),
    activated: boolToStr(document.getElementById("form_authorization_activated").checked)        
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'user_authorization'; 
  requestedModel.method                     = 'GET'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = '';  
  requestedModel.privateData                = '';
  requestedModel.functionResponse           = authorizationLoadResponse;   
  request(requestedModel);
}

var authorizationLoadResponse = function (e_request)
{   
  var v_view="";
  var v_record=0;
  document.getElementById("form_authorization_search_result_center").innerHTML = '';  

  hideLoader();    

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    var v_data = JSON.parse(e_request.result);
    var v_status = '';
    var v_btn = '';

    for (var i = 0; i < v_data.length; i++) 
    {
      if (v_data[i].authorized=='F')
      {
        v_btn ='<button onclick="authorizationTeamUserSet(\'F\','+ v_data[i].id_team_user +','+v_data[i].id_controller+')" type="submit" class="btn btn-success">Action</button>';
        v_status = 'Disable';
      }
      else
      {
        v_btn ='<button onclick="authorizationTeamUserSet(\'T\','+ v_data[i].id_team_user +','+v_data[i].id_controller+')" type="submit" class="btn btn-danger">Disable</button>';
        v_status = 'Action';        
      }

        v_record = v_record+1;
        v_view = v_view +'<tr>';
        v_view = v_view +'<td class="hidden-xs">'+v_data[i].id_controller+'</td>';
        v_view = v_view +'<td>'+toLimit(v_data[i].controller, 12)+'</td>';               
        v_view = v_view +'<td>'+v_status+'</td>';          
        v_view = v_view +'<td align="center">';
        v_view = v_view +v_btn;
        v_view = v_view +'</td></tr>';        
    }

    v_view = 
    '<div id="form_authorization_search_result">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+    
          '<div class="panel-body" >'+
            '<table class="table table-striped table-bordered table-list">'+
                '<thead>'+
                    '<tr>'+
                        '<th class="hidden-xs">ID</th>'+
                        '<th>Controller</th>'+
                        '<th>Status</th>'+
                        '<th>Change</th>'+                        
                    '</tr> '+
                '</thead>'+
              '<tbody>'+
                v_view+
              '</tbody>'+
            '</table>'+
          '</div>'+    
        '</div>'+    
      '</div>'+    
    '</div>';                                  
    document.getElementById("form_authorization_search_result_center").innerHTML = v_view;    
  }     
}

var authorizationTeamUserLoad = function(id)
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
  requestedModel.functionResponse           = authorizationTeamUserLoadResponse;   
  request(requestedModel);
}

var authorizationTeamUserLoadResponse = function (e_request)
{   
  hideLoader();   
  authorizationView();   

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    v_result = JSON.parse(e_request.result);    
    document.getElementById("form_authorization_id").value                   = v_result[0].id;
    document.getElementById("form_authorization_team").value                 = '('+v_result[0].id_team+') '+v_result[0].team;
    document.getElementById("form_authorization_user").value                 = '('+v_result[0].id_user+') '+v_result[0].user;
  }   
  centralActive();  
}

var authorizationTeamUserSet = function(status, id_team_user, id_controller)
{
  showLoader(); 
  var v_privateData = 
  {        
      id_team_user: id_team_user,      
      id_controller: id_controller,                                
      status: status 
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'user_authorization'; 
  requestedModel.method                     = 'POST'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = '';
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = 'JSON';  
  requestedModel.privateData                = JSON.stringify(v_privateData);
  requestedModel.functionResponse           = authorizationTeamUserSetResponse;   
  request(requestedModel);
}

var authorizationTeamUserSetResponse = function (e_request)
{   
  hideLoader();     

  if (e_request.resultCode != 200)
  {
    showMessage(e_request.result);                
  }
  else
  {
    authorizationLoad();    
  }   
}

