var vg_token = '';

var vg_handle = 1;

var vg_form_active;

var vg_team ='';

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

function form_active_set(valeu)
{
    if (valeu==true)
    {
        vg_form_active.style.display = 'block';
    }
    else
    {
        vg_form_active.style.display = 'none';
    }
} 

function centralActive()
{
    document.getElementById('search').style.display = 'none';        
    document.getElementById('central').style.display = 'block';  
    $('.navbar-collapse').collapse('hide');    
}

function centralClear()
{
    document.getElementById('central').innerHTML = '';
}

function searchActive()
{
    document.getElementById('search').style.display = 'block';        
    document.getElementById('central').style.display = 'none';
}

function searchClear()
{
    vg_form_active = document.getElementById('central');       
    document.getElementById('search').innerHTML = '';
    centralActive();
}

function showLoader()
{
    document.body.style.backgroundColor = '#c3c0c0';
    document.getElementById('loader').style.display = 'block';
    document.getElementById('central').style.display = 'none';   
    document.getElementById('search').style.display = 'none';                    
}

function hideLoader()
{ 
    document.body.style.backgroundColor = '#eee';    
    document.getElementById('loader').style.display = 'none';   
    vg_form_active.style.display = 'block';                                   
}

function showMessage(e_message)
{
    document.getElementById('loader').style.display = 'none';   
    document.getElementById('central').style.display = 'none';   
    document.getElementById('search').style.display = 'none';           
    document.getElementById('form_message_text').innerText = e_message;  
    document.getElementById('message').style.display = 'block';         
}

function hideMessage()
{        
    document.getElementById('message').style.display = 'none';     
    vg_form_active.style.display = 'block';
}

function loginExit()
{
    vg_token = '';
    document.getElementById('menu_exit').style.display = 'none';            
    document.getElementById('menu_login').style.display = 'block';        
    centralClear();
    searchClear();
}

