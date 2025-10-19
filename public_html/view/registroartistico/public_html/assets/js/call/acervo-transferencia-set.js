document.addEventListener("DOMContentLoaded", function () {
    localStorage.setItem('form_before', localStorage.getItem('form_now'));
    localStorage.setItem('form_now', window.location.href);

    if (localStorage.getItem('to_go_back')) {
        var toGoBack = JSON.parse(localStorage.getItem('to_go_back'));

        if (toGoBack.form == 'acervo-transferencia') {
        document.getElementById("form_set_id").value = toGoBack.id;
        document.getElementById("form_set_id_acervo").value = toGoBack.id_acervo;
        document.getElementById("form_set_obra_nome").value = toGoBack.obra_nome;
        document.getElementById("form_set_id_colecionador").value = toGoBack.id_colecionador;
        document.getElementById("form_set_obra_colecionador_nome").value = toGoBack.obra_colecionador_nome;
        localStorage.removeItem('to_go_back');
        }
    }

    // Verifica se veio de outra página    

    if (localStorage.getItem('transf')) {
        var v_dados = JSON.parse(localStorage.getItem('transf'));
        if (v_dados.action == 'get') {
            acervoGet(v_dados.data);
        }else if (v_dados.action == 'getColecionador') {
            colecionadorGet(v_dados.data);
        }else if (v_dados.action == 'getTransferencia') {
            acervoTransferenciaGet(v_dados.data);
        }
        
        localStorage.removeItem('transf');        
    }
});

function getToGoBack() {
    var toGoBack = {
        form: 'acervo-transferencia',
        id: document.getElementById("form_set_id").value,
        id_acervo: document.getElementById("form_set_id_acervo").value,
        obra_nome: document.getElementById("form_set_obra_nome").value,
        id_colecionador: document.getElementById("form_set_id_colecionador").value,
        obra_colecionador_nome: document.getElementById("form_set_obra_colecionador_nome").value
    };
    return toGoBack;
}

function acervoTransferenciaSend(deleted) {
    showLoader();

    var v_privateData =
    {
        id: document.getElementById("form_set_id").value,
        id_acervo: document.getElementById("form_set_id_acervo").value,        
        id_colecionador: document.getElementById("form_set_id_colecionador").value,
        deleted: deleted
    }

    class RequestedModel { };
    const requestedModel = new RequestedModel();
    requestedModel.device = getBrowserId();
    requestedModel.url = localStorage.getItem('api');
    requestedModel.controller = 'REGISTRO_ARTISTICO_ACERVO_TRANSFERENCIA';
    requestedModel.method = 'POST';
    requestedModel.publicDataType = 'json';
    requestedModel.publicData = '';
    requestedModel.authenticationDataType = 'TEXT';
    requestedModel.authenticationData = localStorage.getItem('token');
    requestedModel.privateDataType = 'json';
    requestedModel.privateData = JSON.stringify(v_privateData);
    requestedModel.functionResponse = acervoTransferenciaSendResponse;

    showLoader();

    request(requestedModel);
}

var acervoTransferenciaSendResponse = function (e_request) {
    hideLoader();

    if (e_request.resultCode != 200) {
        showMessage(e_request.result);
    }
    else {
        var v_result = JSON.parse(e_request.result);

        if (v_result.deleted == 'T') {
            acervoTransferenciaClear();
            showMessage('Excluído com sucesso!');
        }
        else {
            document.getElementById("form_set_id").value = v_result.id;
            showMessage('Salvo com sucesso!');
        }
    }
}

function acervoTransferenciaGet(id) {
  showLoader();

  var v_publiData =
  {
    id: id,
    obra_nome: '',
    categoria: '',
    fields: '0',
    orderBy: '',
    lines: ''
  }

  class RequestedModel { };
  const requestedModel = new RequestedModel();
  requestedModel.device = getBrowserId();
  requestedModel.url = localStorage.getItem('api');
  requestedModel.controller = 'REGISTRO_ARTISTICO_ACERVO_TRANSFERENCIA';
  requestedModel.method = 'GET';
  requestedModel.publicDataType = 'json';
  requestedModel.publicData = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType = 'TEXT';
  requestedModel.authenticationData = localStorage.getItem('token');
  requestedModel.privateDataType = 'json';
  requestedModel.privateData = '';
  requestedModel.functionResponse = acervoTransferenciaResponse;
  request(requestedModel);
}

var acervoTransferenciaResponse = function (e_request) {  
  hideLoader();

  if (e_request.resultCode != 200) {
    showMessage(e_request.result);
  }
  else {
    var v_data = JSON.parse(e_request.result);
    document.getElementById("form_set_id").value                       =  v_data[0].id;
    document.getElementById("form_set_id_acervo").value                =  v_data[0].id_acervo;
    document.getElementById("form_set_obra_nome").value                =  v_data[0].obra_nome;
    document.getElementById("form_set_id_colecionador").value          =  v_data[0].id_colecionador;
    document.getElementById("form_set_obra_colecionador_nome").value   =  v_data[0].colecionador_nome;
  }
}

function acervoTransferenciaClear() {
    document.getElementById("form_set_id").value = '';
    document.getElementById("form_set_id_acervo").value = '';
    document.getElementById("form_set_obra_nome").value = '';
    document.getElementById("form_set_id_colecionador").value = '';
    document.getElementById("form_set_obra_colecionador_nome").value = '';
}

function acervoView() {
    localStorage.setItem('to_go_back', JSON.stringify(getToGoBack()));
    window.location.href = window.location.origin + '/view/acervo/get/';
}

function colecionadorView() {
    localStorage.setItem('to_go_back', JSON.stringify(getToGoBack()));
    window.location.href = window.location.origin + '/view/acervo/transferencia/colecionador/';
}

function acervoGet(id) {
    showLoader();

    var v_publiData =
    {
        id_obra: id,
        nome: '',
        categoria: '',
        fields: '1',
        orderBy: '',
        lines: ''
    }

    class RequestedModel { };
    const requestedModel = new RequestedModel();
    requestedModel.device = getBrowserId();
    requestedModel.url = localStorage.getItem('api');
    requestedModel.controller = 'REGISTRO_ARTISTICO_ACERVO';
    requestedModel.method = 'GET';
    requestedModel.publicDataType = 'json';
    requestedModel.publicData = JSON.stringify(v_publiData);
    requestedModel.authenticationDataType = 'TEXT';
    requestedModel.authenticationData = localStorage.getItem('token');
    requestedModel.privateDataType = 'json';
    requestedModel.privateData = '';
    requestedModel.functionResponse = acervoGetResponse;
    request(requestedModel);
}

var acervoGetResponse = function (e_request) {
    hideLoader();

    if (e_request.resultCode != 200) {
        showMessage(e_request.result);
    }
    else {
        var v_result = JSON.parse(e_request.result);

        document.getElementById("form_set_id_acervo").value = v_result[0].id;
        document.getElementById("form_set_obra_nome").value = v_result[0].obra_nome;
    }
}

function colecionadorGet(id) {
    showLoader();

  var v_publiData =
  {
    id: id,
    fields: '1',
    orderBy: '',
    lines: ''
  }

  class RequestedModel { };
  const requestedModel = new RequestedModel();
  requestedModel.device = getBrowserId();
  requestedModel.url = localStorage.getItem('api');
  requestedModel.controller = 'REGISTRO_ARTISTICO_ACERVO_TRANSFERENCIA_COLECIONADOR';
  requestedModel.method = 'GET';
  requestedModel.publicDataType = 'json';
  requestedModel.publicData = JSON.stringify(v_publiData);
  requestedModel.authenticationDataType = 'TEXT';
  requestedModel.authenticationData = localStorage.getItem('token');
  requestedModel.privateDataType = 'json';
  requestedModel.privateData = '';
  requestedModel.functionResponse = colecionadorGetResponse;
  request(requestedModel);
}

var colecionadorGetResponse = function (e_request) {
    hideLoader();

    if (e_request.resultCode != 200) {
        showMessage(e_request.result);
    }
    else {
        var v_result = JSON.parse(e_request.result);

        document.getElementById("form_set_id_colecionador").value = v_result.id;
        document.getElementById("form_set_obra_colecionador_nome").value = v_result.colecionador_nome;
    }
}