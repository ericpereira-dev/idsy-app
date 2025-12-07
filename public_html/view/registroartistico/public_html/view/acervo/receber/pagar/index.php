<?php require "../../../../../Config.php" ?>
<?php require "../../../../../templates/header.php" ?>
<?php echo '<link rel="stylesheet" href="'.$config["assets"].'css/acervo-receber-pagar.css?v=1">' ?>

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
                                    <h5 class="card-title">Dados do Pagamento</h5>
                                </div>
                            </div>
                            <div class="form-row">
                                <!-- qrcode -->
                                <div class="mb-3">
                                    <img id="form_set_qrcode_preview" alt="Pré-visualização do QR Code">
                                </div>

                                <!-- copiaecola -->
                                <div class="mb-3">
                                    <label for="copiaecola" class="form-label">Copia e Cola</label>
                                    <input type="text" class="form-control" id="form_set_copiaecola" placeholder="" disabled>
                                </div>    
                                
                                <!-- Colecionador -->
                                <div class="mb-3">
                                    <label for="colecionador" class="form-label">Colecionador</label>
                                    <input type="text" class="form-control" id="form_set_colecionador" placeholder="" disabled>
                                </div>

                                <!-- obra -->
                                <div class="mb-3">
                                    <label for="obra" class="form-label">Obra</label>
                                    <input type="text" class="form-control" id="form_set_obra" placeholder="" disabled>
                                </div>                                       
                               
                                <!-- Botões -->
                                <div class="d-flex flex-column align-items-center gap-2 mt-4">
                                    <div class="d-flex gap-2">
                                        <button onclick="acervoReceberPagarVoltar()" type="submit" class="btn btn-secondary">Voltar</button>                                        
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
<?php echo '<script src="'.$config["assets"].'js/call/acervo-receber-pagar.js?v=1"></script>' ?>

