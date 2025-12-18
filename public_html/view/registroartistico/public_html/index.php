<?php require "../Config.php" ?>

<?php require "../templates/header.php" ?>

<?php echo '<link rel="stylesheet" href="'.$config["assets"].'css/index.css?v=3">'?>  
<body>
  <?php require "../templates/menu.php" ?>
  <?php require "../templates/body.php" ?>

  <div id="central">
    <div class="container">
      <div id="form_index_center" class="row justify-content-center align-items-center">
        <div id="form_index">
          <div class="card bg-light pb-4" style="border-radius: 25px;">
            <div class="card-body">
              <h5 form_mensagem_titulo class="card-title">🎨Sistema de Registro Artístico!</h5>
              <div class="form-row">
                <div class="form-group">
                  <div id="form_index_text">             
                      Estamos felizes em ter você aqui.<br>
                      Este sistema foi desenvolvido para registrar, proteger e gerenciar suas obras artísticas de forma segura, 
                      prática e legalmente organizada. Aqui você pode formalizar a autoria de músicas, 
                      artes visuais, textos, roteiros, códigos criativos e outros trabalhos autorais.<br><br>

                      👉 Comece agora criando um registro<br>
                      <a href="<?php echo $config["source"].'view/obra/set/'?>">
                        Acessar novo registro
                      </a><br><br>                   

                      👉 Consulte obras já registradas<br>
                      <a href="<?php echo $config["source"].'view/obra/get/'?>">
                        Meus registros
                      </a><br><br>                                 

                      👉 Consulte o cadastro pessoal<br>
                      <a href="<?php echo $config["source"].'view/cadastro/pessoa/'?>">
                        Meu dados
                      </a><br><br>                                 

                      👉 Consulte o seu codigo de colecionador<br>
                      <a href="<?php echo $config["source"].'view/cadastro/colecionador/set/'?>">
                        Meu codigo
                      </a><br><br>                                                       

                      👉 Consulte o seu acervo<br>
                      <a href="<?php echo $config["source"].'view/acervo/get/'?>">
                        Meu acervo
                      </a><br><br>  

                      Todos os registros ficam associados à sua conta, com data, identificação única e histórico de alterações, 
                      garantindo mais segurança jurídica para o autor.<br><br>
                  </div>
                </div>
              </div>
              <h5 form_mensagem_titulo class="card-title">Seja bem-vindo!!!<br></h5>              
            </div>
          </div>
        </div>
      </div>
  </div>  


  </div>
</body>

<?php require "../templates/footer.php" ?>
<?php echo '<script> var vg_team ="' . $config["team"] . '"</script>' ?>