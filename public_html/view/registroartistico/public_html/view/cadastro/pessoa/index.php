<?php require "../../../../Config.php" ?>
<?php require "../../../../templates/header.php" ?>
<?php echo '<link rel="stylesheet" href="'.$config["assets"].'css/cadastro-pessoa.css?v=1">' ?>

<body>
    <?php require "../../../../templates/menu.php" ?>
    <?php require "../../../../templates/body.php" ?>
    <div id="central">
        <div class="container">
            <div id="form_pessoa_center" class="row justify-content-center align-items-center">
                <div id="form_pessoa">
                    <div class="card bg-light pb-4" style="border-radius: 25px;">
                        <div class="card-body">
                            <div id="form_top">
                                <div id="form_titulo">
                                    <h5 class="card-title">Dados Pessoais</h5>
                                </div>
                            </div>
                            <div class="form-row">
                                <!-- Nome -->
                                <div class="mb-3">
                                    <label for="nome" class="form-label">Nome</label>
                                    <input type="text" class="form-control" id="form_pessoa_nome" placeholder="Digite seu nome completo" required>
                                </div>

                                <!-- Celular -->
                                <div class="mb-3">
                                    <label for="celular" class="form-label">Celular</label>
                                    <input type="tel" class="form-control" id="form_pessoa_celular" placeholder="(99) 99999-9999" required>
                                </div>

                                <!-- Documento -->
                                <div class="mb-3">
                                    <label for="tipoDocumento" class="form-label">Tipo de Documento</label>
                                    <select class="form-select" id="form_pessoa_tipo_documento" required>
                                        <option value="CPF">CPF</option>
                                        <option value="CNPJ">CNPJ</option>
                                        <option value="PASSAPORTE">Passaporte</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="documento" class="form-label">Número do Documento</label>
                                    <input type="text" class="form-control" id="form_pessoa_documento" placeholder="Digite o número" required>
                                </div>

                                <!-- Foto -->
                                <div class="mb-3">
                                    <label for="foto" class="form-label">Foto</label>
                                    <input class="form-control" type="file" id="form_pessoa_foto" accept="image/*">
                                    <img id="form_pessoa_foto_preview" alt="Pré-visualização da foto">
                                </div>

                                <!-- Redes sociais -->
                                <div class="mb-3">
                                    <label for="redes" class="form-label">Redes Sociais</label>
                                    <textarea class="form-control" id="form_pessoa_redes_sociais" rows="3" placeholder="Cole aqui os links de suas redes sociais"></textarea>
                                </div>

                                <!-- Curriculo -->
                                <div class="mb-3">
                                    <label for="curriculo" class="form-label">Currículo</label>
                                    <textarea class="form-control" id="form_pessoa_curriculo" rows="3" placeholder="Cole aqui seu currículo"></textarea>
                                </div>

                                <!-- Contato Publico -->
                                <div class="mb-3">
                                    <input class="form-check-input" type="checkbox" id="form_pessoa_contato_publico">
                                    <label class="form-check-label" for="form_pessoa_contato_publico">
                                        Contato Público
                                    </label>
                                </div>

                                <!-- Botões -->
                                <div class="d-flex flex-column align-items-center gap-2 mt-4">
                                    <div class="d-flex gap-2">
                                        <button onclick="pessoaSend()" type="submit" class="btn btn-secondary">Salvar</button>
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
<?php echo '<script src="'.$config["assets"].'js/call/cadastro-pessoa.js?v=2"></script>' ?>

