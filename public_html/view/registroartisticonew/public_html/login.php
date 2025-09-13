<?php require "../Config.php" ?>
<?php require "../templates/header.php" ?>
<?php echo '<link rel="stylesheet" href="'.$config["assets"].'css/login.css?v=1">'?>         

<body>
    <?php require "../templates/menu.php" ?>
    <?php require "../templates/body.php" ?>
    <div id="search">   
    </div>  
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
                                    <input type="text" class="form-control" id="form_login_usuario">
                                </div>
                                <div class="form-group" style="margin-top: 10px">
                                    <label>Senha</label>
                                    <input type="password" class="form-control" id="form_login_senha">
                                </div>
                                <div class="form-group" style="margin-top: 10px">
                                    <label>Chave</label>
                                    <input type="number" class="form-control" id="form_login_chave" autocomplete="off">
                                </div>
                            </div>
                            <div id="form_login_botao">
                                <button onclick="clientLoginSimpleSend()" type="submit" class="btn btn-primary">Entrar</button>
                                <button onclick="clientKeySimpleSend()" type="submit" class="btn btn-primary" style="margin-left: 5px" ;>Receber Chave</button>
                                <button onclick="userNewAccessView()" type="submit" class="btn btn-primary" style="margin-left: 5px" ;>Alterar Senha</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

<?php require "../templates/footer.php" ?>
<?php echo '<script src="'.$config["assets"].'js/call/login.js?v=1"></script>'?>