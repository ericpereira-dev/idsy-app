class RequestedModel
{
  constructor ()
  {
      this.url                        = '';
      this.method                     = '';     
      this.controller                 = '';  
      this.device                     = '';  
      this.publicData                 = '';  
      this.publicDataType             = '';  
      this.privateData                = '';  
      this.privateDataType            = '';  
      this.authenticationData         = '';  
      this.authenticationDataType     = '';  
      this.result                     = '';  
      this.resultCode                 = '';  
      this.functionResponse           = ''; 
    }
}

function showLoader()
{
    document.body.style.backgroundColor = '#c3c0c0';
    document.getElementById('loader').style.display = 'block';
    document.getElementById('central').style.display = 'none';
}

function hideLoader()
{ 
    document.body.style.backgroundColor = '#eee';    
    document.getElementById('loader').style.display = 'none';
    document.getElementById('central').style.display = 'block';                            
}

async function showMessage(e_message)
{
    document.getElementById('loader').style.display = 'none';   
    document.getElementById('central').style.display = 'none';   
    document.getElementById('form_message_text').innerText = e_message;  
    document.getElementById('message').style.display = 'block';         
}

function hideMessage()
{        
    document.getElementById('message').style.display = 'none'; 
    document.getElementById('central').style.display = 'block';
}

function loginExit()
{
    localStorage.removeItem('token');
    document.getElementById('menu_exit').style.display = 'none';            
    document.getElementById('menu_login').style.display = 'block';
    window.location.href = localStorage.getItem('source')+'login.php';
}

function updateScreen()
{
    hoje = new Date();
    dia = hoje.getDate().toString();   

    if ((localStorage.getItem('token') == null) || 
        (localStorage.getItem('token_date') == null) ||
        (localStorage.getItem('token_date') !== dia))
    {
        document.getElementById('menu_exit').style.display = 'none';            
        document.getElementById('menu_login').style.display = 'block';         

        if ((window.location.href !== localStorage.getItem('source')+'login/') && 
            (window.location.href !== localStorage.getItem('source')+'cadastro/usuario/'))
        {
            window.location.href = localStorage.getItem('source')+'login/';            
        }
        
        document.getElementById('central').style.display = 'block';  
    }
    else
    {
        document.getElementById('menu_exit').style.display = 'block';            
        document.getElementById('menu_login').style.display = 'none'; 
        document.getElementById('central').style.display = 'block';                         
    } 
}


