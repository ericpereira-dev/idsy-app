<?php require "../../../../../Config.php" ?>
<?php require "../../../../../templates/header.php" ?>
<?php echo '<link rel="stylesheet" href="' . $config["assets"] . 'css/acervo-transferencia-get.css?v=1">' ?>

<body>
    <?php require "../../../../../templates/menu.php" ?>
    <?php require "../../../../../templates/body.php" ?>
    <div id="central">
        <div class="container">
            <div id="form_get_center" class="row justify-content-center align-items-center">
                <div id="form_get">
                    <div class="card bg-light pb-4" style="border-radius: 25px;">
                        <div class="card-body">
                            <div id="form_top">
                                <div id="form_titulo">
                                    <h5 class="card-title">Pesquisa de transferencia</h5>
                                </div>
                            </div>
                            <div class="form-row">
                                <!-- Nome -->
                                <div class="mb-3">
                                    <label for="nome" class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="form_get_nome" placeholder="Digite o nome da acervo" required>
                                </div>

                                <!-- Botões -->
                                <div class="d-flex flex-column align-items-center gap-2 mt-4">
                                    <div class="d-flex gap-2">
                                        <button onclick="acervoTransferenciaGet()" type="submit" class="btn btn-secondary">Pesquisar</button>
                                        <button onclick="acervoTransferenciaVoltar()" type="submit" class="btn btn-secondary">Voltar</button>                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="form_acervo_search_result_center" class="row justify-content-center align-items-center">
        </div>
    </div>
</body>

<?php require "../../../../../templates/footer.php" ?>
<?php echo '<script src="' . $config["assets"] . 'js/call/acervo-transferencia-get.js?v=4"></script>' ?>