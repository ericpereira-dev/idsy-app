var vg_timeline_detail_load;

var timelineLoadDetail = function(id)
{
  showLoader(); 

  var v_publiData = 
  {        
    id: id, 
    date: '',
    resultCode: '',
    resultCodeNot: '',
    controller: '',    
    slow: 'F',
    fields:0,
    orderBy:'',
    lines: ''      
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
  requestedModel.functionResponse           = timelineLoadDetailResponse;   
  request(requestedModel);
}

var timelineLoadDetailResponse = function (e_request)
{   
  hideLoader();    

  if (e_request.resultCode != 200)
  {
      showMessage(e_request.result);                
  }
  else
  {
    vg_timeline_detail_load = vg_timeline_detail_load;
    vg_form_active = document.getElementById('search');  
    vg_form_active.innerHTML = 
    '<div id="form_timeline_center" class="row justify-content-center align-items-center">'+
    '<div id="form_timeline">'+
      '<div class="card bg-light pb-4" style="border-radius: 25px;">'+
        '<div class="card-body">'+
          '<div id="form_top">'+
            '<div id="form_titulo">'+
              '<h5 class="card-title">Timeline Detail</h5>'+
            '</div>'+
            '<div id="form_close" onclick="searchClear()">'+
              '<img src="'+config.img+'close.png">'+
            '</div>'+          
          '</div>'+                      
          '<div class="form-row">'+
            '<div class="form-group">'+
              '<label>ID</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_id" disabled>'+
            '</div>'+
            '<div class="form-group">'+
              '<label>IP</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_ip" disabled>'+
            '</div>'+
            '<div class="form-group">'+
              '<label>Device</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_device" disabled>'+
            '</div>'+            
            '<div class="form-group">'+
              '<label>Program</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_program" disabled>'+
            '</div>'+            
            '<div class="form-group">'+
              '<label>Controller</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_controller" disabled>'+
            '</div>'+  
            '<div class="form-group">'+
              '<label>Method</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_method" disabled>'+
            '</div>'+                        
            '<div class="form-group">'+
              '<label>Início</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_inicio" disabled>'+
            '</div>'+            
            '<div class="form-group">'+
              '<label>Fim</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_fim" disabled>'+
            '</div>'+                        
            '<div class="form-group">'+
              '<label>Result</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_result" disabled>'+
            '</div>'+            
            '<div class="form-group">'+
              '<label>Result Code</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_resultcode" disabled>'+
            '</div>'+            
            '<div class="form-group">'+
              '<label>Exception</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_exception" disabled>'+
            '</div>'+            
            '<div class="form-group">'+
              '<label>Exception Line</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_exception_line" disabled>'+
            '</div>'+                        
            '<div class="form-group">'+
              '<label>Exception File</label>'+
              '<input type="text" class="form-control" id="form_timeline_detail_exception_file" disabled>'+
            '</div>'+                        
            '<div class="form-group">'+
              '<label>History</label>'+
              '<textarea class="form-control" id="form_timeline_detail_history" disabled>'+
            '</div>'+  
          '</div>'+
        '</div>'+
      '</div>'+
    '</div>'+    
    '</div>'+         
  '</div>';   

  var v_result = JSON.parse(e_request.result);  

  document.getElementById("form_timeline_detail_id").value                     = v_result[0].id;
  document.getElementById("form_timeline_detail_ip").value                     = v_result[0].ip;
  document.getElementById("form_timeline_detail_device").value                 = v_result[0].device;
  document.getElementById("form_timeline_detail_program").value                = v_result[0].program;
  document.getElementById("form_timeline_detail_controller").value             = v_result[0].controller;  
  document.getElementById("form_timeline_detail_method").value                 = v_result[0].method;    
  document.getElementById("form_timeline_detail_inicio").value                 = v_result[0].insert;
  document.getElementById("form_timeline_detail_fim").value                    = v_result[0].update;
  document.getElementById("form_timeline_detail_result").value                 = v_result[0].result;
  document.getElementById("form_timeline_detail_resultcode").value             = v_result[0].resultcode;
  document.getElementById("form_timeline_detail_exception").value              = v_result[0].exception;
  document.getElementById("form_timeline_detail_exception_line").value         = v_result[0].exceptionline;    
  document.getElementById("form_timeline_detail_exception_file").value         = v_result[0].exceptionfile;      
  document.getElementById("form_timeline_detail_history").value                = JSON.stringify(JSON.parse(v_result[0].historic), null, 4); 
  searchActive();     
  }     
}