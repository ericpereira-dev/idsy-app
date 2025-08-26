function timelineView()
{
  vg_form_active = document.getElementById('central');  
  vg_form_active.innerHTML = 
  '<div id="form_timeline_center" class="row justify-content-center align-items-center">'+
    '<div id="form_timeline">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">Timeline</h5>'+
            '</div>'+
            '<div id="form_close" onclick="centralClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+                      
          '<div class="form-row">'+
            '<div class="form-group">'+
              '<label>ID</label>'+
              '<input type="number" class="form-control" id="form_timeline_id" placeholder="ID">'+
            '</div>'+
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Number Of Records In The Query</label>'+
              '<input type="number" class="form-control" id="form_timeline_query_registration_number" placeholder="Registros" value=100>'+
            '</div>'+    
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Field Order</label>'+
              '<input type="number" class="form-control" id="form_timeline_query_ordeyby" placeholder="Ordem dos campos">'+
            '</div>'+                    
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Controller</label>'+
              '<input type="text" class="form-control" id="form_timeline_query_controller" placeholder="Controller">'+
            '</div>'+                    
            '<div class="form-group" style="margin-top: 10px">'+
              '<label>Date</label>'+
              '<input type="date" class="form-control" id="form_timeline_date">'+
            '</div>'+                      
            '<div class="form_timeline_senha" style="margin-top: 10px">'+
              '<label>Cod Result</label>'+
              '<input type="number" class="form-control" id="form_timeline_cod_result" placeholder="Cod Result">'+
            '</div>'+ 
            '<div id="form_timeline_check">'+                            
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_timeline_cod_result_not" checked>'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Cod result <> 200'+
                '</label>'+
              '</div>'+   
              '<div class="form-check">'+
                '<input class="form-check-input" type="checkbox" id="form_timeline_slow">'+
                '<label class="form-check-label" for="gridCheck">'+
                  'Slow'+
                '</label>'+
              '</div>'+               
              '</div>'+
          '</div>'+
          '<div id="form_timeline_botaos" style="margin-top: 20px">'+              
            '<button onclick="timelineLoad()" type="button" class="btn btn-primary" style="margin-left: 5px">Find</button>'+              
            '<button onclick="timelineClear()" type="button" class="btn btn-primary" style="margin-left: 5px">Clear</button>'+                                      
          '</div>'+          
        '</div>'+
      '</div>'+
    '</div>'+    
    '</div>'+        
  '<div id="form_timeline_search_result_center" class="row justify-content-center align-items-center">'+
  '</div>';    
  '</div>';   

   centralActive();       
   document.getElementById('form_timeline_date').value = getDateNow();   
   var v_focu = document.getElementById("form_timeline_id");
   v_focu.focus();
   v_focu.select();     
}

var timelineLoad = function()
{
  showLoader(); 

  if (document.getElementById("form_timeline_cod_result_not").checked==true)
  {
     var v_resultcodeNot = '200';
  }
  else
  {
     var v_resultcodeNot = '';
  }

  var v_publiData = 
  {        
    id: document.getElementById("form_timeline_id").value, 
    date: document.getElementById("form_timeline_date").value,
    resultCode: document.getElementById("form_timeline_cod_result").value,
    resultCodeNot: v_resultcodeNot,
    controller: document.getElementById("form_timeline_query_controller").value,
    slow: boolToStr(document.getElementById("form_timeline_slow").checked),
    fields:1,
    orderBy:document.getElementById("form_timeline_query_ordeyby").value,
    lines: document.getElementById("form_timeline_query_registration_number").value       
  }      

  class RequestedModel{};
  const requestedModel                      = new RequestedModel();
  requestedModel.device                     = getBrowserId();
  requestedModel.url                        = config.api;
  requestedModel.controller                 = 'TIMELINE'; 
  requestedModel.method                     = 'GET'; 
  requestedModel.publicDataType             = 'JSON'; 
  requestedModel.publicData                 = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType     = 'TEXT';  
  requestedModel.authenticationData         = vg_token;    
  requestedModel.privateDataType            = '';  
  requestedModel.privateData                = '';
  requestedModel.functionResponse           = timelineLoadResponse;   
  request(requestedModel);
}

var timelineLoadResponse = function (e_request)
{   
  var v_view="";
  var v_record=0;
  document.getElementById("form_timeline_search_result_center").innerHTML = '';  

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
        v_view = v_view +'<td>'+v_data[i].datatime+'</td>';               
        v_view = v_view +'<td>'+toLimit(v_data[i].result, 30)+'</td>';          
        v_view = v_view +'<td align="center">';
        v_view = v_view +'<button onclick="timelineLoadDetail('+v_data[i].id+')" type="submit" class="btn btn-success">Load</button>';
        v_view = v_view +'</td></tr>';        
    }

    v_view = 
    '<div id="form_timeline_search_result">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+    
          '<div class="panel-body" >'+
            '<table class="table table-striped table-bordered table-list">'+
                '<thead>'+
                    '<tr>'+
                        '<th class="hidden-xs">ID</th>'+
                        '<th>Date</th>'+
                        '<th>Result</th>'+
                        '<th></th>'+                        
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
    document.getElementById("form_timeline_search_result_center").innerHTML = v_view;    
  }     
}

function timelineClear()
{
  document.getElementById("form_timeline_id").value                   = '';
  document.getElementById("form_timeline_name").value                 = '';
  document.getElementById("form_timeline_login").value                = '';
  document.getElementById("form_timeline_password").value             = '';
  document.getElementById("form_timeline_email").value                = '';
  document.getElementById("form_timeline_exibir_password").checked    = strToBool('F');        
  document.getElementById("form_timeline_twe_factors").checked        = strToBool('F');      
  document.getElementById("form_timeline_multiple_token").checked     = strToBool('F');      
  document.getElementById("form_timeline_blocked").checked            = strToBool('F');      
}

