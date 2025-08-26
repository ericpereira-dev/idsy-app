function teamFirewallView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML = 
  '<div id="form_team_firewall_center" class="row justify-content-center align-items-center">'+
    '<div id="form_team_firewall">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">Team Firewall</h5>'+
            '</div>'+
            '<div id="form_close" onclick="centralClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+                      
          '<div class="form-row">'+
            '<div class="form-group">'+
              '<label onclick="teamSearchView(teamFirewallTeamLoad)">Team(Click to Change)</label>'+
              '<input type="text" class="form-control" id="form_team_firewall_id_team" placeholder="ID" disabled>'+
            '</div>'+
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Team</label>'+
              '<input type="text" class="form-control" id="form_team_firewall_team" placeholder="Team" disabled>'+
            '</div>'+              
            '<div class="form-row" style="margin-top: 10px">'+
              '<div class="form-group">'+
                '<label>Device</label>'+
                '<input type="text" class="form-control" id="form_team_firewall_device" placeholder="Device">'+
              '</div>'+              
            '</div>'+
            '<div class="form-row" style="margin-top: 10px">'+
              '<div class="form-group">'+
                '<label>IP</label>'+
                '<input type="text" class="form-control" id="form_team_firewall_ip" placeholder="Controller">'+
              '</div>'+              
            '</div>'+            
          '</div>'+
          '<div id="form_team_firewall_botaos" style="margin-top: 20px">'+              
            '<button onclick="teamFirewallSetInclude()" type="button" class="btn btn-primary" style="margin-left: 5px">Include Rules</button>'+              
            '<button onclick="teamFirewallLoad()" type="button" class="btn btn-primary" style="margin-left: 5px">Find Rules</button>'+                          
          '</div>'+          
        '</div>'+
      '</div>'+
    '</div>'+    
    '</div>'+        
  '<div id="form_team_firewall_search_result_center" class="row justify-content-center align-items-center">'+
  '</div>';    
  '</div>';   
    
   centralActive();       
   var v_focu = document.getElementById("form_team_firewall_device");
   v_focu.focus();
   v_focu.select();     
}

var teamFirewallLoad = function()
{
  showLoader();   

  var v_publiData = 
  { 
    id:"",
    device:"", 
    ip:"",
    id_team: document.getElementById("form_team_firewall_id_team").value,
    fields:1,
    orderBy:0,
    lines: 0
  }     
  
  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'TEAM_FIREWALL'; 
  requestedModel.method                     = 'GET'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = '';  
  requestedModel.privateData                = '';
  requestedModel.functionResponse           = teamFirewallLoadResponse;   
  request(requestedModel);
}

var teamFirewallLoadResponse = function (e_request)
{   
  var v_view="";
  var v_record=0;
  document.getElementById("form_team_firewall_search_result_center").innerHTML = '';  

  hideLoader();    

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    var v_data = JSON.parse(e_request.result);

    for (var i = 0; i < v_data.length; i++) 
      {
          v_record = v_record+1;
          v_view = v_view +'<tr>';
          v_view = v_view +'<td class="hidden-xs">'+v_data[i].ip+'</td>';
          v_view = v_view +'<td>'+v_data[i].device+'</td>';               
          v_view = v_view +'<td align="center">';   
          v_view = v_view +'<button onclick="teamFirewallSet(\'T\','+v_data[i].id+','+v_data[i].id_team+',\''+v_data[i].device+'\',\''+v_data[i].ip+'\')" type="submit" class="btn btn-danger">Delete</button>';
          v_view = v_view +'</td></tr>';        
      }
  
      v_view = 
      '<div id="form_firewall_search_result">'+
        '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
          '<div class="card-body">'+    
            '<div class="panel-body" >'+
              '<table class="table table-striped table-bordered table-list">'+
                  '<thead>'+
                      '<tr>'+
                          '<th class="hidden-xs">IP</th>'+
                          '<th>Device</th>'+
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
      document.getElementById("form_team_firewall_search_result_center").innerHTML = v_view;    
    }
}

var teamFirewallTeamLoad = function(id)
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
  requestedModel.functionResponse           = teamFirewallTeamLoadResponse;   
  request(requestedModel);
}

var teamFirewallTeamLoadResponse = function (e_request)
{   
  hideLoader();   
  teamFirewallView();   

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    v_result = JSON.parse(e_request.result);    
    document.getElementById("form_team_firewall_id_team").value              = v_result[0].id;
    document.getElementById("form_team_firewall_team").value                 = v_result[0].name;    
  }   
  centralActive();  
}

var teamFirewallSet = function(deleted, id, id_team, device, ip)
{
  showLoader(); 
  var v_priveteData = 
  {        
    id: id,
    id_team: id_team,
    device: device,
    ip: ip,
    deleted: deleted
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'TEAM_FIREWALL'; 
  requestedModel.method                     = 'POST'; 
  requestedModel.publicDataType             = ''; 
  requestedModel.publicData                 = '';
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = 'JSON';  
  requestedModel.privateData                = JSON.stringify(v_priveteData);
  requestedModel.functionResponse           = teamFirewallSetResponse;   
  request(requestedModel);
}

var teamFirewallSetResponse = function (e_request)
{   
  hideLoader();     

  if (e_request.resultCode != 200)
  {
    showMessage(e_request.result);                
  }
  else
  {
    teamFirewallLoad();    
  }   
}

var teamFirewallSetInclude = function()
{
  teamFirewallSet('F', 
                  0,
                  document.getElementById("form_team_firewall_id_team").value,
                  document.getElementById("form_team_firewall_device").value,
                  document.getElementById("form_team_firewall_ip").value
  )
}

