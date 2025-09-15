<?php require "../Config.php" ?>
<?php require "../templates/header.php" ?>
<?php echo '<link rel="stylesheet" href="'. $config["assets"] . 'css/cadastro-usuario.css?v=1">' ?>

<body>
    <?php require "../templates/menu.php" ?>
    <?php require "../templates/body.php" ?>
    <div id="central">
        <div class="container">
            <div id="form_user_new_access_center" class="row justify-content-center align-items-center">
                <div id="form_user_new_access">
                    <div class="card bg-light pb-4" style="border-radius: 25px;">
                        <div class="card-body">
                            <div id="form_top">
                                <div id="form_titulo">
                                    <h5 class="card-title">Incluir ou Alterar Usuário</h5>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Nome</label>
                                    <input type="text" class="form-control" id="form_user_new_access_name">
                                </div>
                                <div class="form-group" style="margin-top: 10px">
                                    <label>Login</label>
                                    <input type="text" class="form-control" id="form_user_new_access_login">
                                </div>
                                <div class="form-group" style="margin-top: 10px">
                                    <label>Senha</label>
                                    <input type="password" class="form-control" id="form_user_new_access_password">
                                </div>
                                <div class="form-group" style="margin-top: 10px">
                                    <label>E-Mail</label>
                                    <input type="email" class="form-control" id="form_user_new_access_email" placeholder="E-mail">
                                </div>
                                <div class="form-group" style="margin-top: 10px">
                                    <label>Chave</label>
                                    <input type="text" class="form-control" id="form_user_new_access_token" autocomplete="off">
                                </div>
                            </div>
                            <div id="form_user_check">
                                <div class="form-check">
                                    <input onclick="setPasswordView(form_user_new_access_exibir_password, form_user_new_access_password)" class="form-check-input" type="checkbox" id="form_user_new_access_exibir_password">
                                    <label class="form-check-label" for="gridCheck">
                                        Show Password
                                    </label>
                                </div>
                            </div>
                            <div id="form_user_new_access_botao">
                                <button onclick="userNewAccessSend()" type="submit" class="btn btn-primary">Salvar</button>
                                <button onclick="userNewAccessKeySend()" type="submit" class="btn btn-primary" style="margin-left: 5px" ;>Receber Chave</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<?php require "../templates/footer.php" ?>
<?php echo '<script src="' . $config["assets"] .'js/call/cadastro-usuario.js?v=1"></script>' ?>