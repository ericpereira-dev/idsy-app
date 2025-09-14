<?php require "../Config.php" ?>

<?php require "../templates/header.php" ?>

<?php echo '<link rel="stylesheet" href="'.$config["assets"].'css/index.css?v=1">'?>  
<body>
  <?php require "../templates/menu.php" ?>
  <?php require "../templates/body.php" ?>

  <div id="central">

    <div class="container">
      <div id="form_index_center" class="row justify-content-center align-items-center">
        <div id="form_index">
          <div class="card bg-light pb-4" style="border-radius: 25px;">
            <div class="card-body">
              <h5 form_mensagem_titulo class="card-title">Bem-vindo(a) ao Sistema de Registro Artístico!</h5>
              <div class="form-row">
                <div class="form-group">
                  <div id="form_index_text">             

Este espaço foi criado para valorizar e proteger a sua arte.
Aqui, você pode registrar suas criações de forma segura, prática e com validade legal.

🎭 Seja você músico, escritor(a), ilustrador(a), cineasta ou qualquer outro tipo de criador, este sistema é o seu aliado na preservação dos seus direitos autorais.

Comece agora a registrar sua obra e fortaleça o seu legado artístico                          
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>  


  </div>
</body>

<?php require "../templates/footer.php" ?>
<?php echo '<script> var vg_team ="' . $config["team"] . '"</script>' ?>