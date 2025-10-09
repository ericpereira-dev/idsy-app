document.addEventListener("DOMContentLoaded", function () {
    localStorage.setItem('form_before', localStorage.getItem('form_now'));
    localStorage.setItem('form_now', window.location.href);

    // Verifica se veio de outra página    

    if (localStorage.getItem('transf')) {
        var v_dados = JSON.parse(localStorage.getItem('transf'));
        if (v_dados.action == 'get') {
            acervoGet(v_dados.data);
            localStorage.removeItem('transf');
        }
    }
});

const valor_venda = document.getElementById('form_set_valor_venda');

valor_venda.addEventListener('input', () => {
    formatarMoeda('form_set_valor_venda');
});

function acervoSend() {
    showLoader();

    var v_privateData =
    {
        id: document.getElementById("form_set_id").value,
        descricao: document.getElementById("form_set_descricao_acervo").value,
        valor_venda: document.getElementById("form_set_valor_venda").value,
        avenda: boolToStr(document.getElementById("form_acervo_avenda").checked),
        blocked: boolToStr(document.getElementById("form_acervo_bloquear").checked)
    }

    class RequestedModel { };
    const requestedModel = new RequestedModel();
    requestedModel.device = getBrowserId();
    requestedModel.url = localStorage.getItem('api');
    requestedModel.controller = 'REGISTRO_ARTISTICO_ACERVO';
    requestedModel.method = 'POST';
    requestedModel.publicDataType = 'json';
    requestedModel.publicData = '';
    requestedModel.authenticationDataType = 'TEXT';
    requestedModel.authenticationData = localStorage.getItem('token');
    requestedModel.privateDataType = 'json';
    requestedModel.privateData = JSON.stringify(v_privateData);
    requestedModel.functionResponse = acervoSendResponse;

    showLoader();

    request(requestedModel);
}

var acervoSendResponse = function (e_request) {
    hideLoader();

    if (e_request.resultCode != 200) {
        showMessage(e_request.result);
    }
    else {
        showMessage('Salvo com sucesso!');
    }
}

function acervoGet(id) {
    showLoader();

    var v_publiData =
    {
        id_obra: id,
        nome: '',
        categoria: '',
        fields: '0',
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

        document.getElementById("form_set_id").value = v_result[0].obra.id;
        document.getElementById("form_set_nome").value = v_result[0].obra.obra_nome;
        document.getElementById("form_set_inicio_producao_data").value = v_result[0].obra.producao_inicio;
        document.getElementById("form_set_fim_producao_data").value = v_result[0].obra.producao_fim;
        document.getElementById("form_set_categoria").value = v_result[0].obra.categoria;
        document.getElementById("form_set_descricao_material").value = v_result[0].obra.descricao_material;
        document.getElementById("form_set_descricao_poetica").value = v_result[0].obra.descricao_poetica;
        document.getElementById("form_set_valor_venda").value = v_result[0].obra.valor_venda;
        formatarMoeda('form_set_valor_venda');
        document.getElementById("form_set_descricao_acervo").value = v_result[0].obra.descricao;  
        document.getElementById("form_acervo_avenda").checked = strToBool(v_result[0].obra.avenda);
        document.getElementById("form_acervo_bloquear").checked = strToBool(v_result[0].obra.blocked);                              

        if (v_result[0].img[0] !== "" && Array.isArray(v_result[0].img) && v_result[0].img.length > 0) {
            document.getElementById("form_set_foto1_preview").src = v_result[0].img[0];
            document.getElementById("form_set_foto1_preview").style.display = "block";
        } else {
            document.getElementById("form_set_foto1_preview").src = '';
            document.getElementById("form_set_foto1_preview").style.display = "none";
        }

        if (v_result[0].img[1] !== "" && Array.isArray(v_result[0].img) && v_result[0].img.length > 1) {
            document.getElementById("form_set_foto2_preview").src = v_result[0].img[1];
            document.getElementById("form_set_foto2_preview").style.display = "block";
        } else {
            document.getElementById("form_set_foto2_preview").src = '';
            document.getElementById("form_set_foto2_preview").style.display = "none";
        }

        if (v_result[0].img[2] !== "" && Array.isArray(v_result[0].img) && v_result[0].img.length > 2) {
            document.getElementById("form_set_foto3_preview").src = v_result[0].img[2];
            document.getElementById("form_set_foto3_preview").style.display = "block";
        } else {
            document.getElementById("form_set_foto3_preview").src = '';
            document.getElementById("form_set_foto3_preview").style.display = "none";
        }

        if (v_result[0].obra.qrcode !== "") {
            document.getElementById("form_set_qrcode_preview").src = v_result[0].obra.qrcode;
            document.getElementById("form_set_qrcode_preview").style.display = "block";
        } else {
            document.getElementById("form_set_qrcode_preview").style.display = "none";
        }
    }
}