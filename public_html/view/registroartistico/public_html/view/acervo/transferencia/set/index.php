<?php require "../../../../../Config.php" ?>
<?php require "../../../../../templates/header.php" ?>
<?php echo '<link rel="stylesheet" href="'.$config["assets"].'css/acervo-transferencia-set.css?v=1">' ?>

<body>
    <?php require "../../../../../templates/menu.php" ?>
    <?php require "../../../../../templates/body.php" ?>
    <div id="central">
        <div class="container">
            <div id="form_set_center" class="row justify-content-center align-items-center">
                <div id="form_set">
                    <div class="card bg-light pb-4" style="border-radius: 25px;">
                        <div class="card-body">
                            <div id="form_top">
                                <div id="form_titulo">
                                    <h5 class="card-title">Dados da Transferência</h5>
                                </div>
                            </div>
                            <div class="form-row">
                                <!-- ID -->
                                <div class="mb-3">
                                    <label for="id" class="form-label">ID</label>
                                    <input type="text" class="form-control" id="form_set_id" placeholder="" disabled>
                                </div>    

                                <!-- ID acervo -->
                                <div class="mb-3">
                                    <label onclick="acervoView()" for="id" class="form-label">ID do Acervo(Clique para alterar)</label>
                                    <input type="text" class="form-control" id="form_set_id_acervo" placeholder="" disabled>
                                </div>                                   
                                
                                <!-- Obra -->
                                <div class="mb-3">
                                    <label for="nome" class="form-label">Nome da Obra</label>
                                    <input type="text" class="form-control" id="form_set_obra_nome" placeholder="" disabled>
                                </div>

                                <!-- ID Colecionador -->
                                <div class="mb-3">
                                    <label onclick="colecionadorView()" for="id" class="form-label">ID do Colecionador(Clique para alterar)</label>
                                    <input type="text" class="form-control" id="form_set_id_colecionador" placeholder="" disabled>
                                </div>                                   
                                
                                <!-- Obra -->
                                <div class="mb-3">
                                    <label for="nome" class="form-label">Nome do Colecionador</label>
                                    <input type="text" class="form-control" id="form_set_obra_colecionador_nome" placeholder="" disabled>
                                </div>                                


                                <!-- Botões -->
                                <div class="d-flex flex-column align-items-center gap-2 mt-4">
                                    <div class="d-flex gap-2">
                                        <button onclick="acervoTransferenciaSend('F')" type="submit" class="btn btn-secondary">Salvar</button>
                                        <button onclick="acervoTransferenciaClear()" type="submit" class="btn btn-secondary">Limpar</button>                                        
                                        <button onclick="window.location.href='<?php echo $config["source"].'view/acervo/transferencia/get/'?>'" type="submit" class="btn btn-secondary">Pesquisar</button>
                                        <button onclick="acervoTransferenciaSend('T')" type="submit" class="btn btn-danger">Excluir</button>                                        
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

<?php require "../../../../../templates/footer.php" ?>
<?php echo '<script src="'.$config["assets"].'js/call/acervo-transferencia-set.js?v=2"></script>' ?>

