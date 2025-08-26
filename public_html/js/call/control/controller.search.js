var vg_controller_search_load;

function controllerSearchView(v_controller_search_load)
{
  vg_controller_search_load = v_controller_search_load;
  vg_form_active = document.getElementById('search');  
  vg_form_active.innerHTML = 
  '<div id="form_controller_search_center" class="row justify-content-center align-items-center">'+
    '<div id="form_controller_search">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">Controller Search</h5>'+
            '</div>'+
            '<div id="form_close" onclick="searchClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+            
          '<div class="form-row">'+
            '<div class="form-group">'+
              '<label>Nome</label>'+
              '<input type="text" class="form-control" id="form_controller_search_name" placeholder="Nome">'+
            '</div>'+            
          '<div id="form_controller_search_botao">'+    
            '<button onclick="controllerSearchGet()" type="submit" class="btn btn-primary">Find</button>'+
            '<button onclick="controllerSearchGridClear()" type="submit" class="btn btn-primary" style="margin-left: 5px">Clear</button>'+            
          '</div>'+   
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>'+
  '<div id="form_controller_search_result_center" class="row justify-content-center align-items-center">'+
  '</div>';
  
   searchActive();       
   var v_focu = document.getElementById("form_controller_name");
   v_focu.focus();
   v_focu.select();     
}

function controllerSearchGet()
{
    showLoader(); 
    var v_publiData = 
    {        
        id: 0,      
        name: document.getElementById("form_controller_search_name").value,
        fields: '1',
        orderBy:'',
        lines: '' 
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = config.api;
    requestedModel.controller                 = 'CONTROLLER'; 
    requestedModel.method                     = 'GET'; 
    requestedModel.publicDataType             = 'JSON'; 
    requestedModel.publicData                 = JSON.stringify(v_publiData);
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = vg_token;    
    requestedModel.privateDataType            = '';  
    requestedModel.privateData                = '';
    requestedModel.functionResponse           = controllerSearchGetResponse;   
    request(requestedModel);
}

var controllerSearchGetResponse = function (e_request)
{   
  var v_view="";
  var v_record=0;
  document.getElementById("form_controller_search_result_center").innerHTML = '';  

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
        v_view = v_view +'<td>'+v_data[i].name+'</td>';               
        v_view = v_view +'<td align="center">';
        v_view = v_view +'<button onclick="vg_controller_search_load('+v_data[i].id+')" type="submit" class="btn btn-success">Load</button>';
        v_view = v_view +'</td></tr>';        
    }

    v_view = 
    '<div id="form_controller_search_result">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+    
          '<div class="panel-body" >'+
            '<table class="table table-striped table-bordered table-list">'+
                '<thead>'+
                    '<tr>'+
                        '<th class="hidden-xs">ID</th>'+
                        '<th>Name</th>'+
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
    document.getElementById("form_controller_search_result_center").innerHTML = v_view;    
  }     
}

function controllerSearchGridClear()
{
  document.getElementById("form_controller_search_name").value              = '';  
  document.getElementById("form_controller_search_result_center").innerHTML = '';      
}