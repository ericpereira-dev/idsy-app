<?php require "../../../Config.php" ?>
<?php require "../../../templates/header.php" ?>
<?php echo '<link rel="stylesheet" href="'.$config["assets"].'css/cadastro-artista.css?v=1">' ?>

<body>
    <?php require "../../../templates/menu.php" ?>
    <?php require "../../../templates/body.php" ?>
    <div id="central">
        <div class="container">
            <div id="form_artista_center" class="row justify-content-center align-items-center">
                <div id="form_artista">
                    <div class="card bg-light pb-4" style="border-radius: 25px;">
                        <div class="card-body">
                            <div id="form_top">
                                <div id="form_titulo">
                                    <h5 class="card-title">Artista</h5>
                                </div>
                            </div>
                            <div class="form-row">
                                <!-- Nome -->
                                <div class="mb-3">
                                    <label for="nome" class="form-label">Nome Artístico</label>
                                    <input type="text" class="form-control" id="form_artista_nome" placeholder="Digite seu nome completo" required>
                                </div>

                                <!-- Ativo -->
                                <div class="mb-3">
                                    <input class="form-check-input" type="checkbox" id="form_artista_ativo">
                                    <label class="form-check-label" for="form_artista_ativo">
                                        Ativo
                                    </label>
                                </div>

                                <!-- Botões -->
                                <div class="d-flex flex-column align-items-center gap-2 mt-1">
                                    <div class="d-flex gap-2">
                                        <button onclick="artistaSend()" type="submit" class="btn btn-secondary">Salvar</button>
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
<?php echo '<script src="'.$config["assets"].'js/call/cadastro-artista.js?v=2"></script>' ?>

