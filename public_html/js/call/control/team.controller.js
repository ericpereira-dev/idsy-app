function teamControllerView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML = 
  '<div id="form_team_controller_center" class="row justify-content-center align-items-center">'+
    '<div id="form_team_controller">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">Team To Controller</h5>'+
            '</div>'+
            '<div id="form_close" onclick="centralClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+                      
          '<div class="form-row">'+
            '<div class="form-group">'+
              '<label onclick="teamSearchView(teamControllerTeamLoad)">Team(Click to Change)</label>'+
              '<input type="text" class="form-control" id="form_team_controller_id_team" placeholder="ID" disabled>'+
            '</div>'+
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Team</label>'+
              '<input type="text" class="form-control" id="form_team_controller_team" placeholder="Team" disabled>'+
            '</div>'+              
            '<div id="form_team_controller_check">'+                            
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_team_controller_activated" checked>'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Activated'+
                '</label>'+
              '</div>'+   
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_team_controller_disabled" checked>'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Disabled'+
                '</label>'+
              '</div>'+               
              '<div class="form-row" style="margin-top: 10px">'+
              '<div class="form-group">'+
                '<label>Filter Controller</label>'+
                '<input type="text" class="form-control" id="form_team_controller_controller" placeholder="Controller">'+
              '</div>'+              
            '</div>'+
          '</div>'+
          '<div id="form_teamController_botaos" style="margin-top: 20px">'+              
            '<button onclick="teamControllerLoad()" type="button" class="btn btn-primary" style="margin-left: 5px">Find</button>'+              
          '</div>'+          
        '</div>'+
      '</div>'+
    '</div>'+    
    '</div>'+        
  '<div id="form_team_controller_search_result_center" class="row justify-content-center align-items-center">'+
  '</div>';    
  '</div>';   
    
   centralActive();       
   var v_focu = document.getElementById("form_team_controller_controller");
   v_focu.focus();
   v_focu.select();     
}

var teamControllerLoad = function()
{
  showLoader();   

  var v_publiData = 
  {        
    id_team: document.getElementById("form_team_controller_id_team").value, 
    controller: document.getElementById("form_team_controller_controller").value,
    disabled: boolToStr(document.getElementById("form_team_controller_disabled").checked),
    activated: boolToStr(document.getElementById("form_team_controller_activated").checked)        
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'team_controller'; 
  requestedModel.method                     = 'GET'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = '';  
  requestedModel.privateData                = '';
  requestedModel.functionResponse           = teamControllerLoadResponse;   
  request(requestedModel);
}

var teamControllerLoadResponse = function (e_request)
{   
  var v_view="";
  var v_record=0;
  document.getElementById("form_team_controller_search_result_center").innerHTML = '';  

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
        v_btn ='<button onclick="teamControllerTeamUserSet(\'F\','+ v_data[i].id_team+','+v_data[i].id_controller+')" type="submit" class="btn btn-success">Action</button>';
        v_status = 'Disable';
      }
      else
      {
        v_btn ='<button onclick="teamControllerTeamUserSet(\'T\','+ v_data[i].id_team+','+v_data[i].id_controller+')" type="submit" class="btn btn-danger">Disable</button>';
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
    '<div id="form_team_controller_search_result">'+
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
    document.getElementById("form_team_controller_search_result_center").innerHTML = v_view;    
  }     
}

var teamControllerTeamLoad = function(id)
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
    requestedModel.functionResponse           = teamControllerTeamUserLoadResponse;   
    request(requestedModel);
}

var teamControllerTeamUserLoadResponse = function (e_request)
{   
  hideLoader();   
  teamControllerView();   

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    v_result = JSON.parse(e_request.result);    
    document.getElementById("form_team_controller_id_team").value                   = v_result[0].id;
    document.getElementById("form_team_controller_team").value                      = v_result[0].name;
  }   
  centralActive();  
}

var teamControllerTeamUserSet = function(status, id_team, id_controller)
{
  showLoader(); 
  var v_privateData = 
  {        
      id_team: id_team,      
      id_controller: id_controller,                                
      status: status 
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'team_controller'; 
  requestedModel.method                     = 'POST'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = '';
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = 'JSON';  
  requestedModel.privateData                = JSON.stringify(v_privateData);
  requestedModel.functionResponse           = teamControllerTeamUserSetResponse;   
  request(requestedModel);
}

var teamControllerTeamUserSetResponse = function (e_request)
{   
  hideLoader();     

  if (e_request.resultCode != 200)
  {
    showMessage(e_request.result);                
  }
  else
  {
    teamControllerLoad();    
  }   
}

