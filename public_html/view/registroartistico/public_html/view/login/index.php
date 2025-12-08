<?php require "../../../Config.php" ?>
<?php require "../../../templates/header.php" ?>
<?php echo '<link rel="stylesheet" href="'.$config["assets"].'css/login.css?v=1">' ?>

<body>
    <?php require "../../../templates/menu.php" ?>
    <?php require "../../../templates/body.php" ?>
    <div id="central">
        <div class="container">
            <div id="form_login_center" class="row justify-content-center align-items-center">
                <div id="form_login">
                    <div class="card bg-light pb-4" style="border-radius: 25px;">
                        <div class="card-body">
                            <div id="form_top">
                                <div id="form_titulo">
                                    <h5 class="card-title">Acesso</h5>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Login</label>
                                    <input type="text" class="form-control" id="form_login_usuario" required>
                                </div>
                                <div class="form-group" style="margin-top: 10px">
                                    <label>Senha</label>
                                    <input type="password" class="form-control" id="form_login_senha" required>
                                </div>
                                <div class="form-group" style="margin-top: 10px">
                                    <label>Chave</label>
                                    <input type="number" class="form-control" id="form_login_chave" required autocomplete="off">
                                </div>
                            </div>
                            <div class="d-flex flex-column align-items-center gap-2 mt-4">
                                <div class="d-flex gap-2">
                                    <button onclick="clientLoginSimpleSend()" type="submit" class="btn btn-secondary">Entrar</button>
                                    <button onclick="clientKeySimpleSend()" type="submit" class="btn btn-secondary">Receber Chave</button>
                                </div>
                                <a href="<?php echo $config["source"] . 'view/cadastro/usuario/' ?>" class="btn btn-link">Esqueceu a Senha ou Novo Usuário!</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<?php require "../../../templates/footer.php" ?>
<?php echo '<script src="'.$config["assets"].'js/call/login.js?v=1"></script>' ?>