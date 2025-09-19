<nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
    <div class="container">
      <a class="navbar-brand" href="<?php echo $config["source"]?>">
        <?php echo '<img src="'.$config["assets"].'img/title.png">'?>
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
              <li>
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'cadastro/usuario.php'?>">Usuário</a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>              
              <li>
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'cadastro/pessoa.php'?>">Dados Pessoais</a>
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
          <li id="menu_login" class="nav-item">
            <a class="nav-link active" aria-current="page" href="<?php echo $config["source"].'login.php'?>">Entrar</a>
          </li>
          <li id="menu_exit" onclick=loginExit() class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Sair</a>
          </li>          
        </ul>
      </div>
    </div>
  </nav>