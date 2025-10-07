<?php require "../../../../Config.php" ?>
<?php require "../../../../templates/header.php" ?>
<?php echo '<link rel="stylesheet" href="'.$config["assets"].'css/acervo-set.css?v=1">' ?>

<body>
    <?php require "../../../../templates/menu.php" ?>
    <?php require "../../../../templates/body.php" ?>
    <div id="central">
        <div class="container">
            <div id="form_set_center" class="row justify-content-center align-items-center">
                <div id="form_set">
                    <div class="card bg-light pb-4" style="border-radius: 25px;">
                        <div class="card-body">
                            <div id="form_top">
                                <div id="form_titulo">
                                    <h5 class="card-title">Dados da Obra do Acervo</h5>
                                </div>
                            </div>
                            <div class="form-row">
                                <!-- qrcode -->
                                <div class="mb-3">
                                    <img id="form_set_qrcode_preview" alt="Pré-visualização do QR Code">
                                </div>

                                <!-- ID -->
                                <div class="mb-3">
                                    <label for="id" class="form-label">ID</label>
                                    <input type="text" class="form-control" id="form_set_id" placeholder="" disabled>
                                </div>                             

                                <!-- Descricao -->
                                <div class="mb-3">
                                    <label for="descricao" class="form-label">Descricao</label>
                                    <input type="text" class="form-control" id="form_set_descricao" placeholder="Digite a descrição da obra" required>
                                </div>

                                <!-- Data de Início da Produção -->
                                <div class="mb-3">
                                    <label for="valor_venda" class="form-label">Valor para Venda</label>
                                    <input type="text" class="form-control" id="form_set_valor_venda" required>
                                </div>


                                <!-- Categoria -->
                                <div class="mb-3">
                                    <label for="categoria" class="form-label">Categoria</label>
                                    <select class="form-select" id="form_set_categoria" required>
                                        <option value="Arte Digital">Arte Digital</option>    
                                        <option value="Colagem">Colagem</option>
                                        <option value="Desenho">Desenho</option>
                                        <option value="Escultura">Escultura</option>
                                        <option value="Fotografia">Fotografia</option>
                                        <option value="Gravura">Gravura</option>
                                        <option value="Instalação">Instalação</option>
                                        <option value="Livro de Artista">Livro de Artista</option>                                                                                
                                        <option value="Objeto">Objeto</option>
                                        <option value="Pintura">Pintura</option>
                                        <option value="Tela">Tela</option>
                                        <option value="Têxtil">Têxtil</option>                                        
                                        <option value="Outros">Outros</option>
                                    </select>
                                </div>

                                <!-- Descrição Material -->
                                <div class="mb-3">
                                    <label for="descricao_material" class="form-label">Descrição Material</label>
                                    <textarea class="form-control" id="form_set_descricao_material" rows="3" placeholder="Cole aqui sua descrição material"></textarea>
                                </div>                                

                                <!-- Avenda -->
                                <div class="mb-3">
                                    <input class="form-check-input" type="checkbox" id="form_acervo_avenda">
                                    <label class="form-check-label" for="form_avenda">
                                        Avenda
                                    </label>
                                </div>

                                <!-- Botões -->
                                <div class="d-flex flex-column align-items-center gap-2 mt-4">
                                    <div class="d-flex gap-2">
                                        <button onclick="acervoSend('F')" type="submit" class="btn btn-secondary">Salvar</button>
                                        <button onclick="acervoClear()" type="button" class="btn btn-secondary">Limpar</button>
                                        <button onclick="window.location.href='<?php echo $config["source"].'view/acervo/get/'?>'" type="submit" class="btn btn-secondary">Pesquisar</button>
                                        <button onclick="acervoSend('T')" type="submit" class="btn btn-danger">Excluir</button>
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

<?php require "../../../../templates/footer.php" ?>
<?php echo '<script src="'.$config["assets"].'js/call/acervo-set.js?v=3"></script>' ?>

