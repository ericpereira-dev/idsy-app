function createRequest()
{
    try
    {
        transport = new XMLHttpRequest();
    } 
    catch (IEAtual)
    {
        try
        {
            transport = new ActiveXObject("Microsoft.XMLHTTP");
        } 
        catch (IEAntigo)
        {
            try
            {
                transport = new ActiveXObject("Msxml2.XMLHTTP");
            } 
            catch (falha)
            {
                transport = false;
            }
        }
    }

    if (!transport)
    {
        alert("Seu Navegador não suporta Ajax!");
    } else
    {
        return transport;
    }
}

function requestOld(RequestedModel)
{
    var ajax = createRequest();
    ajax.onreadystatechange = function()
    {   // Verifica se foi concluído com sucesso e a conexão fechada (readyState=4)

        if (ajax.readyState == 4)
        {
            // Verifica se o arquivo foi encontrado com sucesso
            const v_obj = JSON.parse(ajax.responseText);  
            RequestedModel.result = v_obj.result;
            RequestedModel.resultCode = ajax.status;
            RequestedModel.functionResponse(RequestedModel);                           
        }
    }
    
    var public = '';

    if (RequestedModel.publicData!='')
    {
        public = '?publicdata='+RequestedModel.publicData;
    }

    ajax.open(RequestedModel.method, RequestedModel.url+public, true);                 
    ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("controller", RequestedModel.controller); 
    ajax.setRequestHeader("public_data_type", RequestedModel.publicDataType);            
    ajax.setRequestHeader("private_data_type", RequestedModel.privateDataType);            
    ajax.setRequestHeader("authentication_data_type", RequestedModel.authenticationDataType);                    
    ajax.setRequestHeader("authentication_data", RequestedModel.authenticationData); 
    ajax.setRequestHeader("device", RequestedModel.device); 
    ajax.send("privatedata="+RequestedModel.privateData);  
}

async function getHeaders(RequestedModel, publicData)
{
    if (RequestedModel.publicData!='')
    {
        publicData = '?publicdata='+RequestedModel.publicData;
    }

    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append("controller", RequestedModel.controller); 
    myHeaders.append("public_data_type", RequestedModel.publicDataType);            
    myHeaders.append("private_data_type", RequestedModel.privateDataType);            
    myHeaders.append("authentication_data_type", RequestedModel.authenticationDataType);                    
    myHeaders.append("authentication_data", RequestedModel.authenticationData); 
    myHeaders.append("device", RequestedModel.device);    
    return myHeaders;
}

async function getMyInit(RequestedModel, myHeaders)
{
    if (RequestedModel.method=='GET')
    {
        var myInit = 
        {
            method: RequestedModel.method,
            headers: myHeaders,
            // mode: "cors",
            mode: "no-cors",            
            cache: "default",
        };
    }
    else
    {
        var myInit = 
        {
            method: RequestedModel.method,
            headers: myHeaders,
            body: RequestedModel.privateData,
            // mode: "cors",
            mode: "no-cors",            
            cache: "default",
        };            
    };  
    
    return myInit;
}

async function request(RequestedModel)
{
    if (self.fetch) 
    {
        try
        {
            var publicData = '';
            // var myHeaders = await getHeaders(RequestedModel, publicData);
            // var myInit = await getMyInit(RequestedModel, myHeaders);

            if (RequestedModel.publicData!='')
            {
                publicData = '?publicdata='+RequestedModel.publicData;
            }

            var myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");
            myHeaders.append("controller", RequestedModel.controller); 
            myHeaders.append("public_data_type", RequestedModel.publicDataType);            
            myHeaders.append("private_data_type", RequestedModel.privateDataType);            
            myHeaders.append("authentication_data_type", RequestedModel.authenticationDataType);                    
            myHeaders.append("authentication_data", RequestedModel.authenticationData); 
            myHeaders.append("device", RequestedModel.device);    
            
            if (RequestedModel.method=='GET')
            {
                var myInit = 
                {
                    method: RequestedModel.method,
                    headers: myHeaders,
                    mode: "cors",
                    cache: "default",
                };
            }
            else
            {
                var myInit = 
                {
                    method: RequestedModel.method,
                    headers: myHeaders,
                    body: RequestedModel.privateData,
                    mode: "cors",
                    cache: "default",
                };            
            };

            const response = await fetch
            (
                RequestedModel.url+publicData,
                myInit
            )
            
            const data = await response.json();

            RequestedModel.result = data.result;

            RequestedModel.resultCode = response.status;
        }
        catch(err)
        {
            RequestedModel.result = err;
            RequestedModel.resultCode = 500;
        }
        RequestedModel.functionResponse(RequestedModel);            
    } 
    else 
    {
        requestOld(RequestedModel)
    } 
}

async function requestNew(RequestedModel)
{
    fetch('https://api.example.com/resource', {
        method: RequestedModel.method, // Or 'PUT', 'DELETE', etc.
        headers: {           
          'Content-Type': 'application/json',
          'controller': RequestedModel.controller, 
          'public_data_type': RequestedModel.publicDataType,            
          'private_data_type': RequestedModel.privateDataType,
          'authentication_data_type': RequestedModel.authenticationDataType,
          'authentication_data': RequestedModel.authenticationData, 
          'device': RequestedModel.device           
        },
        body: JSON.stringify({
          key: 'value',
          // Add any other data you need to send
        }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data); // Work with the JSON data
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });    
}