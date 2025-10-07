document.addEventListener("DOMContentLoaded", function() {
    localStorage.setItem('form_before', localStorage.getItem('form_now'));
    localStorage.setItem('form_now', window.location.href);

    // Verifica se veio de outra página    

    if (localStorage.getItem('transf'))
    {
        var v_dados = JSON.parse(localStorage.getItem('transf'));
        if (v_dados.action == 'get')
        {
            acervoGet(v_dados.data);
            localStorage.removeItem('transf');
        }
    }
});

// Preview da foto 1
const fotoInput = document.getElementById('form_set_foto1');

fotoInput.addEventListener('change', () => 
{
    resizeImage('form_set_foto1', 'form_set_foto1_preview', 200);
});

// Preview da foto 2
const fotoInput2 = document.getElementById('form_set_foto2');

fotoInput2.addEventListener('change', () => 
{
    resizeImage('form_set_foto2', 'form_set_foto2_preview', 200);
});

// Preview da foto 3
const fotoInput3 = document.getElementById('form_set_foto3');

fotoInput3.addEventListener('change', () => 
{
    resizeImage('form_set_foto3', 'form_set_foto3_preview', 200);
});

function acervoSend(deleted)
{
    showLoader();     

    var v_privateData = 
    {        
        id: document.getElementById("form_set_id").value,
        nome: document.getElementById("form_set_nome").value,
        producao_inicio: document.getElementById("form_set_inicio_producao_data").value,
        producao_fim: document.getElementById("form_set_fim_producao_data").value,                
        categoria: document.getElementById("form_set_categoria").value,
        descricao_material: document.getElementById("form_set_descricao_material").value,
        descricao_poetica: document.getElementById("form_set_descricao_poetica").value,        
        img1: document.getElementById("form_set_foto1_preview").src,
        img2: document.getElementById("form_set_foto2_preview").src,
        img3: document.getElementById("form_set_foto3_preview").src,
        blocked:'F',
        deleted: deleted
    }      

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = localStorage.getItem('api');
    requestedModel.controller                 = 'REGISTRO_ARTISTICO_OBRA'; 
    requestedModel.method                     = 'POST'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = '';
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = localStorage.getItem('token');
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = JSON.stringify(v_privateData); 
    requestedModel.functionResponse           = acervoSendResponse;   

    showLoader();     

    request(requestedModel);
}

var acervoSendResponse = function (e_request)
{   
    hideLoader();    

    if (e_request.resultCode != 200)
    {
        showMessage(e_request.result);                
    }
    else
    {
        var v_result = JSON.parse(e_request.result);     

        if (v_result.deleted == 'T') 
        {
            acervoClear();
            showMessage('Excluído com sucesso!');                                                
        }
        else 
        {
            document.getElementById("form_set_id").value = v_result.id_acervo;
            if (v_result.qrcode !== "") 
            {
                document.getElementById("form_set_qrcode_preview").src = v_result.qrcode;
                document.getElementById("form_set_qrcode_preview").style.display = "block";
            } else 
            {
                document.getElementById("form_set_qrcode_preview").style.display = "none";
            }        
                    
            showMessage('Salvo com sucesso!');                                    
        }
    }    
}

function acervoGet(id)
{
    showLoader(); 

    var v_publiData = 
    {        
        id_acervo: id,      
        nome: '',
        categoria: '',
        fields: '0',
        orderBy:'',
        lines: '' 
    }    

    class RequestedModel{};
    const requestedModel                      = new RequestedModel();
    requestedModel.device                     = getBrowserId();
    requestedModel.url                        = localStorage.getItem('api');
    requestedModel.controller                 = 'REGISTRO_ARTISTICO_OBRA'; 
    requestedModel.method                     = 'GET'; 
    requestedModel.publicDataType             = 'json';      
    requestedModel.publicData                 = JSON.stringify(v_publiData);
    requestedModel.authenticationDataType     = 'TEXT';  
    requestedModel.authenticationData         = localStorage.getItem('token');
    requestedModel.privateDataType            = 'json';  
    requestedModel.privateData                = ''; 
    requestedModel.functionResponse           = acervoGetResponse;   
    request(requestedModel);
}

var acervoGetResponse = function (e_request)
{   
    hideLoader();    

    if (e_request.resultCode != 200)
    {
        showMessage(e_request.result);                
    }
    else
    {           
        var v_result = JSON.parse(e_request.result);

        document.getElementById("form_set_id").value =v_result[0].acervo.id;
        document.getElementById("form_set_nome").value =v_result[0].acervo.nome;
        document.getElementById("form_set_inicio_producao_data").value = v_result[0].acervo.producao_inicio;
        document.getElementById("form_set_fim_producao_data").value = v_result[0].acervo.producao_fim;
        document.getElementById("form_set_categoria").value = v_result[0].acervo.categoria;
        document.getElementById("form_set_descricao_material").value = v_result[0].acervo.descricao_material;
        document.getElementById("form_set_descricao_poetica").value = v_result[0].acervo.descricao_poetica;

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

        if (v_result[0].acervo.qrcode !== "") {
            document.getElementById("form_set_qrcode_preview").src = v_result[0].acervo.qrcode;
            document.getElementById("form_set_qrcode_preview").style.display = "block";
        } else {
            document.getElementById("form_set_qrcode_preview").style.display = "none";
        }        
    }
}

function acervoClear()
{
    document.getElementById("form_set_id").value ='';
    document.getElementById("form_set_nome").value ='';
    document.getElementById("form_set_inicio_producao_data").value = '';
    document.getElementById("form_set_fim_producao_data").value = '';
    document.getElementById("form_set_categoria").value = 'Tela';
    document.getElementById("form_set_descricao_material").value = '';
    document.getElementById("form_set_descricao_poetica").value = '';
    document.getElementById("form_set_foto1_preview").style.display = "none";
    document.getElementById("form_set_foto1_preview").src = "";
    document.getElementById("form_set_foto2_preview").style.display = "none";
    document.getElementById("form_set_foto2_preview").src = "";
    document.getElementById("form_set_foto3_preview").style.display = "none";
    document.getElementById("form_set_foto3_preview").src = "";
    document.getElementById("form_set_qrcode_preview").style.display = "none";
    document.getElementById("form_set_qrcode_preview").src = "";
}