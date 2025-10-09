var corCompleta = "#99ff8f"
var corIncompleta = "#eff70b"

function getDateNow() {
    // Obtém a data atual
    const dataAtual = new Date();

    // Formata a data para o formato YYYY-MM-DD
    const ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth() + 1;
    mes = mes < 10 ? '0' + mes : mes;
    let dia = dataAtual.getDate();
    dia = dia < 10 ? '0' + dia : dia;

    // Define o valor do campo de data como a data atual formatada
    return `${ano}-${mes}-${dia}`;
}

function resetCampos() {
    var textFields = document.getElementsByTagName("input");
    for (var i = 0; i < textFields.length; i++) {
        if (textFields[i].type == "text") {
            textFields[i].style.backgroundColor = "";
            textFields[i].style.borderColor = "";
        }
    }
}

function coresMask(t) {
    var l = t.value;
    var m = l.length;
    var x = t.maxLength;
    if (m == 0) {
        t.style.borderColor = "";
        t.style.backgroundColor = "";
    }
    else if (m < x) {
        t.style.borderColor = corIncompleta;
        t.style.backgroundColor = corIncompleta;
    } else {
        // t.style.borderColor=corCompleta;
        // t.style.backgroundColor=corCompleta;
        // sem cor para confirmação
        t.style.borderColor = "";
        t.style.backgroundColor = "";
    }
}

function mascara(m, t, e, c) {
    var cursor = t.selectionStart;
    var texto = t.value;
    texto = texto.replace(/\D/g, '');
    var l = texto.length;
    var lm = m.length;
    if (window.event) {
        id = e.keyCode;
    } else if (e.which) {
        id = e.which;
    }
    cursorfixo = false;
    if (cursor < l) cursorfixo = true;
    var livre = false;
    if (id == 16 || id == 19 || (id >= 33 && id <= 40)) livre = true;
    ii = 0;
    mm = 0;
    if (!livre) {
        if (id != 8) {
            t.value = "";
            j = 0;
            for (i = 0; i < lm; i++) {
                if (m.substr(i, 1) == "#") {
                    t.value += texto.substr(j, 1);
                    j++;
                } else if (m.substr(i, 1) != "#") {
                    t.value += m.substr(i, 1);
                }
                if (id != 8 && !cursorfixo) cursor++;
                if ((j) == l + 1) break;

            }
        }
        if (c) coresMask(t);
    }
    if (cursorfixo && !livre) cursor--;
    t.setSelectionRange(cursor, cursor);
}

function boolToStr(value) {
    if (value == true) {
        return "T"
    }
    else {
        return "F"
    }
}

function strToBool(value) {
    if (value == 'T') {
        return true
    }
    else {
        return false
    }
}

function getBrowserId() {
    // var aKeys = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"],
    //   sUsrAg = navigator.userAgent,
    //   nIdx = aKeys.length - 1;

    // for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--);

    // return nIdx;

    return window.navigator.userAgent;
}

function setPasswordView(value, element) {
    if (value.checked === true) {
        element.type = 'text'
    }
    else {
        element.type = 'password'
    }
}

function toLimit(string, caracteres) {
    return string.substring(0, caracteres);
}

function formatarMoeda(e_imput) {
    const v_input = document.getElementById(e_imput);
    let valor = v_input.value.replace(/\D/g, ''); // Remove tudo que não for número
    valor = (valor / 100).toFixed(2) + ''; // Divide por 100 e adiciona duas casas decimais
    valor = valor.replace('.', ','); // Troca ponto por vírgula

    // Adiciona separadores de milhar
    valor = valor.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    v_input.value = 'R$ ' + valor;
}

function formatarReal(valor) {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function resizeImage(e_fotoInput, e_preview, e_maxWidth = 200) {
    const v_input = document.getElementById(e_fotoInput);
    const v_preview = document.getElementById(e_preview);
    const v_file = v_input.files[0];

    if (v_file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                // Definindo a largura fixa
                const scale = e_maxWidth / img.width;
                const newWidth = e_maxWidth;
                const newHeight = img.height * scale;

                // Criar canvas e redimensionar
                const canvas = document.createElement("canvas");
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Converter para Base64
                const base64 = canvas.toDataURL("image/jpeg", 0.9);

                // Mostrar no preview
                v_preview.src = base64;
                v_preview.style.display = "block";
            };
            img.src = e.target.result;
        };

        reader.readAsDataURL(v_file);
    }
    else {
        v_preview.style.display = "none";
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}