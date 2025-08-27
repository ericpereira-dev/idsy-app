<?php require "Config.php" ?>
<!DOCTYPE html>
<html lang="br">    
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="keywords" content="gestão, programa, software, gestão">
    <?php echo '<title>'.$config["title"].'</title>'?>
    <?php echo '<link rel="shortcut icon" href='.$config["img_custom"].'icon.ico">'?>
    <?php echo '<link rel="stylesheet" href="'.$config["css"].'bootstrap/bootstrap.min.css?v=1">'?>         
    <?php echo '<link rel="stylesheet" href="'.$config["css"].'styles.css?v=22">'?>         
</head>
<body> 
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
    <div class="container">
      <a class="navbar-brand" href="#">
        <?php echo '<img src="'.$config["img_custom"].'title.png">'?>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Cadastro
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li onclick=userNewAccessView()>
                <a class="dropdown-item" href="#">Usuário</a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>              
              <li onclick=controllerView()>
                <a class="dropdown-item" href="#">Dados Pessoais</a>
              </li>              
              <li>
                <hr class="dropdown-divider">
              </li>              
              <li onclick=controllerView()>
                <a class="dropdown-item" href="#">Colecionador</a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>                            
              <li onclick=teamView()>
                <a class="dropdown-item" href="#">Artista</a>
              </li>             
            </ul>
          </li>           
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Acervo
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li onclick=teamUserView()>
                <a class="dropdown-item" href="#">Minhas Obras</a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li onclick=teamControllerView()>
                <a class="dropdown-item" href="#">Vendas Pendentes</a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>                            
              <li onclick=authorizationView()>
                <a class="dropdown-item" href="#">Nova Obra(Só Artista)</a>
              </li>
            </ul>
          </li>                              
          <li id="menu_login" onclick=loginSimpleView() class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Login</a>
          </li>
          <li id="menu_exit" onclick=loginExit() class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Logout</a>
          </li>          
        </ul>
      </div>
    </div>
  </nav>
  <div id="search">   
  </div>  
  <div id="central">   
  </div>  
  <div id="message" class="position-absolute">
    <div class="container">
      <div id="form_message_center" class="row justify-content-center align-items-center">
        <div id="form_message">
          <div class="card bg-light pb-4" style="border-radius: 25px;">
            <div class="card-body">
              <h5 form_mensagem_titulo class="card-title">Atenção</h5>
              <div class="form-row">
                <div class="form-group">
                  <div id="form_message_text">                    
                  </div>
                </div>
              </div>
              <div id="form_message_botao">
                <button onclick=hideMessage() type="submit" class="btn btn-primary">OK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
  <div id="loader" class="position-absolute">
    <p class = "aguarde">Aguarde...</p>                     
  </div>   

  <!-- obrigatório -->
  <?php echo '<script src="'.$config["js"].'jsdelivr/min.js?v=7"></script>'?>           
  <?php echo '<script src="'.$config["js"].'jquery/min.js?v=7"></script>'?>           
  <?php echo '<script src="'.$config["js"].'core/request.js?v=8"></script>'?>           
  <?php echo '<script src="'.$config["js"].'core/functions.js?v=4"></script>'?>           
  <?php echo '<script src="'.$config["js"].'core/public.js?v=5"></script>'?>               
  <?php echo '<script> var vg_team ="'.$config["team"].'"</script>'?>    
  <?php echo '<script> var config ={api: "'.$config["api"].'",img: "'.$config["img"].'"} </script>'?>;  
  <?php echo '<script src="'.$config["js"].'bootstrap/bootstrap.min.js?v=1"></script>'?>  
  <!-- fim obrigatório -->
         
  <?php echo '<script src="'.$config["js"].'call/control/client.login.simple.js?v=2"></script>'?>           
  <?php echo '<script src="'.$config["js"].'call/control/client.login.js?v=7"></script>'?>           
  <?php echo '<script src="'.$config["js"].'call/control/client.rest.test.js?v=5"></script>'?>           
  <?php echo '<script src="'.$config["js"].'call/control/remote.access.js?v=4"></script>'?>                 
  <?php echo '<script src="'.$config["js"].'call/control/user.js?v=4"></script>'?>           
  <?php echo '<script src="'.$config["js"].'call/control/user.search.js?v=4"></script>'?>           
  <?php echo '<script src="'.$config["js"].'call/control/timeline.js?v=11"></script>'?>           
  <?php echo '<script src="'.$config["js"].'call/control/timeline.detail.js?v=12"></script>'?>             
  <?php echo '<script src="'.$config["js"].'call/control/team.js?v=4"></script>'?>             
  <?php echo '<script src="'.$config["js"].'call/control/team.search.js?v=4"></script>'?>               
  <?php echo '<script src="'.$config["js"].'call/control/controller.js?v=4"></script>'?>               
  <?php echo '<script src="'.$config["js"].'call/control/controller.search.js?v=4"></script>'?>                 
  <?php echo '<script src="'.$config["js"].'call/control/team.user.js?v=4"></script>'?>             
  <?php echo '<script src="'.$config["js"].'call/control/team.user.search.js?v=4"></script>'?>               
  <?php echo '<script src="'.$config["js"].'call/control/authorization.js?v=10"></script>'?>             
  <?php echo '<script src="'.$config["js"].'call/control/firewall.js?v=11"></script>'?>                 
  <?php echo '<script src="'.$config["js"].'call/control/team.firewall.js?v=3"></script>'?>             
  <?php echo '<script src="'.$config["js"].'call/control/team.controller.js?v=2"></script>'?>               
  <?php echo '<script src="'.$config["js"].'call/control/user.new.access.js?v=10"></script>'?>               
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
</body>
</html>

