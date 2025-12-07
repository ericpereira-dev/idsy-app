document.addEventListener("DOMContentLoaded", function () {
    localStorage.setItem('form_before', localStorage.getItem('form_now'));
    localStorage.setItem('form_now', window.location.href);

    // Verifica se veio de outra página    
    erro = false;

    if (localStorage.getItem('transf')) {
        var v_dados = JSON.parse(localStorage.getItem('transf'));

        if (v_dados.qrcode !== "") {
            document.getElementById("form_set_qrcode_preview").src = v_dados.qrcode;
            document.getElementById("form_set_qrcode_preview").style.display = "block";
        } else {
            document.getElementById("form_set_qrcode_preview").style.display = "none";
            erro=true;
        }

        if (v_dados.copiaECola !== "") {
            document.getElementById("form_set_copiaecola").value = v_dados.copiaECola;
        } else {
            erro=true;
        }        

        if (v_dados.obra !== "") {
            document.getElementById("form_set_obra").value = v_dados.obra;
        } else {
            erro=true;
        }        
        
        if (v_dados.colecionador !== "") {
            document.getElementById("form_set_colecionador").value = v_dados.colecionador;
        } else {
            erro=true;
        }   
    }
    else {
        erro=true
    }

    if (erro==true){
        showMessage('Não consta dados de pagamento!');
        sleep(2000);
        window.location.href = localStorage.getItem('form_before');
    }    
});

function acervoReceberPagarVoltar() {
  window.location.href = localStorage.getItem('form_before');
}