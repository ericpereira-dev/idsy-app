function firewallView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML = 
    '<div id="form_firewall_center" class="row justify-content-center align-items-center">'+
        '<div id="form_firewall">'+
          '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
            '<div class="card-body">'+
              '<div id="form_top">'+
                '<div id="form_titulo">'+
                  '<h5 class="card-title">Firewall</h5>'+
                '</div>'+
                '<div id="form_close" onclick="centralClear()">'+
                  '<img src="'+config.img+'close.png">'+
                '</div>'+          
              '</div>'+        
              '<div class="form-row">'+          
                '<div class="form-group">'+
                  '<label>ID</label>'+
                  '<input type="number" class="form-control" id="form_firewall_id" placeholder="ID">'+
                '</div>'+                                     
                '<div class="form-group" style="margin-top: 10px">'+
                  '<label>IP</label>'+
                  '<input type="text" class="form-control" id="form_firewall_ip" placeholder="IP">'+
                '</div>'+  
              '</div>'+                                     
              '<div id="form_firewall_botaos" style="margin-top: 20px">'+              
                '<button onclick="firewallLoad()" type="button" class="btn btn-primary" style="margin-left: 5px">Find</button>'+              
              '</div>'+          
            '</div>'+
          '</div>'+    
        '</div>'+        
        '<div id="form_firewall_search_result_center" class="row justify-content-center align-items-center">'+
        '</div>';    
    '</div>';   

   centralActive();       
}

var firewallLoad = function()
{
  showLoader();   

  var v_publiData = 
  {        
    id: document.getElementById("form_firewall_id").value, 
    ip: document.getElementById("form_firewall_ip").value,
    id_timeline: '0',
    fields:'0',
    orderBy:'0',
    lines: '0'    
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'firewall'; 
  requestedModel.method                     = 'GET'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = '';  
  requestedModel.privateData                = '';
  requestedModel.functionResponse           = firewallLoadResponse;   
  request(requestedModel);
}

var firewallLoadResponse = function (e_request)
{   
  var v_view="";
  var v_record=0;
  document.getElementById("form_firewall_search_result_center").innerHTML = '';  

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
        v_view = v_view +'<td class="hidden-xs">'+v_data[i].id+'</td>';
        v_view = v_view +'<td>'+v_data[i].insert+'</td>';          
        v_view = v_view +'<td align="center">';
        v_view = v_view +'<button onclick="timelineLoadDetail('+v_data[i].id_timeline+')" type="submit" class="btn btn-info">Info</button>';
        v_view = v_view +'</td>';        
        v_view = v_view +'<td align="center">';        
        v_view = v_view +'<button onclick="firewallSet(\'T\','+ v_data[i].id+')" type="submit" class="btn btn-danger">Delete</button>';;
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
                        '<th class="hidden-xs">ID</th>'+
                        '<th>Date</th>'+
                        '<th>Timeline</th>'+
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
    document.getElementById("form_firewall_search_result_center").innerHTML = v_view;    
  }     
}

var firewallSet = function(deleted, id)
{
  showLoader(); 
  var v_privateData = 
  {        
      id: id,                                
      deleted: deleted 
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'firewall'; 
  requestedModel.method                     = 'POST'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = '';
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = 'JSON';  
  requestedModel.privateData                = JSON.stringify(v_privateData);
  requestedModel.functionResponse           = firewallTeamUserSetResponse;   
  request(requestedModel);
}

var firewallTeamUserSetResponse = function (e_request)
{   
  hideLoader();     

  if (e_request.resultCode != 200)
  {
    showMessage(e_request.result);                
  }
  else
  {
    firewallLoad();    
  }   
}

