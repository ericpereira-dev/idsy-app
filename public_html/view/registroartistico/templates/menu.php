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
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'view/cadastro/usuario/'?>">Usuário</a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>              
              <li>
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'view/cadastro/pessoa/'?>">Dados Pessoais</a>
              </li>              
              <li>
                <hr class="dropdown-divider">
              </li>              
              <li>
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'view/cadastro/colecionador/set/'?>">Colecionador</a>
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>                            
              <li>
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'view/cadastro/artista/'?>">Artista</a>
              </li>             
            </ul>
          </li>           
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Obra(Só Artista)
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'view/obra/set/'?>">Nova Obra</a>                
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>                
              <li>
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'view/obra/get/'?>">Pesquisar</a>                
              </li>
            </ul>
          </li>                                        
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Acervo
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">                         
              <li>
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'view/acervo/get/'?>">Meu Acervo</a>                
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>                
              <li>
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'view/acervo/transferencia/set/'?>">Transferir</a>                
              </li>
              <li>
                <hr class="dropdown-divider">
              </li>                
              <li>
                <a class="dropdown-item" aria-current="page" href="<?php echo $config["source"].'view/acervo/receber/get/'?>">Receber</a>                
              </li>                            
            </ul>
          </li>                              
          <li id="menu_login" class="nav-item">
            <a class="nav-link active" aria-current="page" href="<?php echo $config["source"].'view/login/'?>">Entrar</a>
          </li>
          <li id="menu_exit" onclick=loginExit() class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Sair</a>
          </li>          
        </ul>
      </div>
    </div>
  </nav>