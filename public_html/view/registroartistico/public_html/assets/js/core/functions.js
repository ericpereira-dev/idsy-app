var corCompleta = "#99ff8f"
var corIncompleta = "#eff70b"

function getDateNow()
{
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

function resetCampos()
{
    var textFields = document.getElementsByTagName("input");
        for(var i=0; i < textFields.length; i++){
        if(textFields[i].type == "text"){
            textFields[i].style.backgroundColor = "";
            textFields[i].style.borderColor = "";
        }
    }   
}

function coresMask(t){
	var l = t.value;
	var m = l.length;
	var x = t.maxLength;
	if(m==0){
		t.style.borderColor="";
		t.style.backgroundColor="";
	}
	else if(m<x){
		t.style.borderColor=corIncompleta;
		t.style.backgroundColor=corIncompleta;
	}else{
		// t.style.borderColor=corCompleta;
		// t.style.backgroundColor=corCompleta;
        // sem cor para confirmação
		t.style.borderColor="";
		t.style.backgroundColor="";
	}
}

function mascara(m,t,e,c){
	var cursor = t.selectionStart;
	var texto = t.value;
	texto = texto.replace(/\D/g,'');
	var l = texto.length;
	var lm = m.length;
	if(window.event) {                  
	    id = e.keyCode;
	} else if(e.which){                 
	    id = e.which;
	}
	cursorfixo=false;
	if(cursor < l)cursorfixo=true;
	var livre = false;
	if(id == 16 || id == 19 || (id >= 33 && id <= 40))livre = true;
 	ii=0;
 	mm=0;
 	if(!livre){
	 	if(id!=8){
		 	t.value="";
		 	j=0;
		 	for(i=0;i<lm;i++){
		 		if(m.substr(i,1)=="#"){
		 			t.value+=texto.substr(j,1);
		 			j++;
		 		}else if(m.substr(i,1)!="#"){
		 			t.value+=m.substr(i,1);
		 		}
		 		if(id!=8 && !cursorfixo)cursor++;
		 		if((j)==l+1)break;
		 		
		 	} 	
	 	}
	 	if(c)coresMask(t);
 	}
 	if(cursorfixo && !livre)cursor--;
 	t.setSelectionRange(cursor, cursor);
}

function boolToStr(value)
{
    if (value==true)
    {
        return "T"
    }
    else
    {
        return "F"
    }
}

function strToBool(value)
{
    if (value=='T')
    {
        return true
    }
    else
    {
        return false
    }
}

function getBrowserId() 
{
	// var aKeys = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"],
	//   sUsrAg = navigator.userAgent,
	//   nIdx = aKeys.length - 1;
  
	// for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--);
  
	// return nIdx;

	return window.navigator.userAgent;
}

function setPasswordView(value, element)
{
  if (value.checked===true)  
  {
    element.type = 'text'
  }
  else
  {
    element.type = 'password'
  }
}

function toLimit(string, caracteres)
{
	return string.substring(0, caracteres);
}

function resizeAndConvertToBase64(file, maxWidth = 800, callback) 
{
    const reader = new FileReader();

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            let width = img.width;
            let height = img.height;

            // Redimensiona mantendo a proporção
            if (width > maxWidth) {
                height = Math.round((maxWidth / width) * height);
                width = maxWidth;
            }

            // Cria canvas para redimensionar
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(img, 0, 0, width, height);

            // Converte para Base64 (JPEG com qualidade 0.9)
            const base64 = canvas.toDataURL("image/jpeg", 0.9);
            callback(base64);
        };
        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
}

function sleep(ms) 
{
    return new Promise(resolve => setTimeout(resolve, ms));
}