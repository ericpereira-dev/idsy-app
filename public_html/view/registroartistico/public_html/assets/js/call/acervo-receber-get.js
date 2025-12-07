document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem('form_before', localStorage.getItem('form_now'));
    localStorage.setItem('form_now', window.location.href);
});

function acervoReceberGet() {
  showLoader();

  var v_publiData =
  {
    obra_nome: document.getElementById("form_receber_nome").value,
    fields: '1',
    orderBy: '',
    lines: ''
  }

  class RequestedModel { };
  const requestedModel = new RequestedModel();
  requestedModel.device = getBrowserId();
  requestedModel.url = localStorage.getItem('api');
  requestedModel.controller = 'REGISTRO_ARTISTICO_ACERVO_RECEBER';
  requestedModel.method = 'GET';
  requestedModel.publicDataType = 'json';
  requestedModel.publicData = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType = 'TEXT';
  requestedModel.authenticationData = localStorage.getItem('token');
  requestedModel.privateDataType = 'json';
  requestedModel.privateData = '';
  requestedModel.functionResponse = acervoReceberGetResponse;
  request(requestedModel);
}

var acervoReceberGetResponse = function (e_request) {
  var v_view = "";
  var v_record = 0;
  document.getElementById("form_acervo_search_result_center").innerHTML = '';

  hideLoader();

  if (e_request.resultCode != 200) {
    showMessage(e_request.result);
  }
  else {
    var v_data = JSON.parse(e_request.result);

    for (var i = 0; i < v_data.length; i++) {
      v_record = v_record + 1;
      v_view = v_view + '<tr>';
      v_view = v_view + '<td class="hidden-xs">' + v_data[i].id + '</td>';
      v_view = v_view + '<td>' + v_data[i].obra_nome + '</td>';
      v_view = v_view + '<td align="center">';
      v_view = v_view + '<button onclick="acervoReceberPagar(' + v_data[i].id + ')" type="submit" class="btn btn-success">Pagar</button>';
      v_view = v_view + '</td></tr>';      
    }

    v_view =
      '<div id="form_acervo_search_result">' +
      '<div class="card bg-light pb-4" style="border-radius: 25px;">' +
      '<div class="card-body">' +
      '<div class="panel-body" >' +
      '<div id="form_top">' +
      '<div id="form_titulo">' +
      '<h5 class="card-title">Resultado</h5>' +
      '</div>' +
      '</div>' +
      '<table class="table table-striped table-bordered table-list">' +
      '<thead>' +
      '<tr>' +
      '<th class="hidden-xs">ID</th>' +
      '<th>Nome</th>' +   
      '<th>Ação</th>' +            
      '</tr> ' +
      '</thead>' +
      '<tbody>' +
      v_view +
      '</tbody>' +
      '</table>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
    document.getElementById("form_acervo_search_result_center").innerHTML = v_view;
  }
}

function acervoReceberPagar(id) {
  showLoader();

    var v_privateData =
    {
      id: id
    }

    class RequestedModel { };
    const requestedModel = new RequestedModel();
    requestedModel.device = getBrowserId();
    requestedModel.url = localStorage.getItem('api');
    requestedModel.controller = 'REGISTRO_ARTISTICO_ACERVO_RECEBER';
    requestedModel.method = 'POST';
    requestedModel.publicDataType = 'json';
    requestedModel.publicData = '';
    requestedModel.authenticationDataType = 'TEXT';
    requestedModel.authenticationData = localStorage.getItem('token');
    requestedModel.privateDataType = 'json';
    requestedModel.privateData = JSON.stringify(v_privateData);
    requestedModel.functionResponse = acervoReceberPagarResponse;
    request(requestedModel);
}

function acervoReceberPagarResponse(e_request) {
    hideLoader();

    if (e_request.resultCode != 200) {
        showMessage(e_request.result);
    }
    else {        
      localStorage.setItem('transf', e_request.result);
      window.location.href = window.location.origin + '/view/acervo/receber/pagar/';
    }
}

function acervoReceberVoltar() {
  window.location.href = localStorage.getItem('form_before');
}