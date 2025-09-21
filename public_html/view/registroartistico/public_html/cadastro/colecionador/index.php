<?php require "../../../Config.php" ?>
<?php require "../../../templates/header.php" ?>
<?php echo '<link rel="stylesheet" href="'.$config["assets"].'css/cadastro-colecionador.css?v=1">' ?>

<body>
    <?php require "../../../templates/menu.php" ?>
    <?php require "../../../templates/body.php" ?>
    <div id="central">
        <div class="container">
            <div id="form_colecionador_center" class="row justify-content-center align-items-center">
                <div id="form_colecionador">
                    <div class="card bg-light pb-4" style="border-radius: 25px;">
                        <div class="card-body">
                            <div id="form_top">
                                <div id="form_titulo">
                                    <h5 class="card-title">Colecionador</h5>
                                </div>
                            </div>
                            <div class="form-row">

                                <!-- Ativo -->
                                <div class="mb-3">
                                    <input class="form-check-input" type="checkbox" id="form_colecionador_ativo">
                                    <label class="form-check-label" for="form_colecionador_ativo">
                                        Ativo
                                    </label>
                                </div>

                                <!-- Botões -->
                                <div class="d-flex flex-column align-items-center gap-2 mt-1">
                                    <div class="d-flex gap-2">
                                        <button onclick="colecionadorSend()" type="submit" class="btn btn-secondary">Salvar</button>
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

<?php require "../../../templates/footer.php" ?>
<?php echo '<script src="'.$config["assets"].'js/call/cadastro-colecionador.js?v=2"></script>' ?>

