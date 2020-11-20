<form id="formLogin">
    <!--Imagen del imta-->
    <div class="form-group text-center">
        <img class="img-fluid" src="/imagenes/logo_sisuar2.png" width="100%">
    </div>
    <!--Campo del correo-->
    <div class="form-group">
        <input type="text" class="form-control" id="email" placeholder="Introduzca el correo electronico o usuario" onkeypress="return runScript(event)">
    </div>
    <!--Campo de la Contraseña-->
    <div class="form-group">
        <input on type="password" class="form-control" id="contra" placeholder="Contraseña"  onkeypress="return runScript(event)">
    </div>
    <!--Boton de guardar-->
    <a id="botonenviar" value="Enviar" type="submit" class="btn btn-gob btn-fill btn-block text-light">Iniciar Sesión</a>
    <!--Enclace para el Registro-->
    <div class="text-center">
        <br>
        <a href="/aplicacion/vista/login/restaurar.php" aling="center">Olvidé mi contraseña</a>
        <br>
    </div>
</form> 
<!--Scrip que valida el formulario de registro de los usuarios-->

<script>

    //Funcion que esta atentan en todo momento
    $(document).ready(function () {
        //Cuando se da click en el boton de enviar, se ejecuta esta funcion
        $("#botonenviar").click(async function () {
            //Aqui se valida la informacion del formulario
            if (validaForm()) {
                Swal.fire({
                    title: 'Iniciando Sesión', // add html attribute if you want or remove
                    allowEscapeKey: false,
    allowOutsideClick: false,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    }
                });
                await sleep(1000);
                //Se concatena una cadena con el email y con la contraseña del usuario
                cadena = "Email=" + $("#email").val() + "&Contra=" + $("#contra").val() + "&Accion=Login";
                //Se manda a llamar a una funcion de ajax.
                $.ajax({
                    type: "POST",
                    url: "/aplicacion/controlador/usuario.php",
                    data: cadena,
                    success: function (resp) {
                        if (resp == 1) {
                            window.location.href = "/aplicacion/vista/principal.php";
                            Swal.close();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Algo salió mal!',
                                text: resp,
                                confirmButtonColor: '#621132'
                            });
                        }
                    }
                });
            }
        });
    });

    function validaForm() {
        // Campos de texto
        if ($("#email").val() == "") {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal!',
                text: 'El campo usuario no puede estar vacío',
                confirmButtonColor: '#621132'
            });
            $("#email").focus(); // Esta función coloca el foco de escritura del usuario en el campo Nombre directamente.
            return false;
        }
        if ($("#contra").val() == "") {
            Swal.fire({
                icon: 'error',
                title: 'Algo salió mal!',
                text: 'El campo constraseña no puede estar vacío',
                confirmButtonColor: '#621132'
            });
            $("#contra").focus();
            return false;
        }
        return true; // Si todo está correcto
    }

    function runScript(e) {
        //See notes about 'which' and 'key'
        if (e.keyCode == 13) {
            //Aqui se valida la informacion del formulario
            if (validaForm()) {

                //Se concatena una cadena con el email y con la contraseña del usuario
                cadena = "Email=" + $("#email").val() + "&Contra=" + $("#contra").val() + "&Accion=Login";

                //Se manda a llamar a una funcion de ajax.
                $.ajax({
                    type: "POST",
                    url: "/aplicacion/controlador/usuario.php",
                    data: cadena,
                    success: function (resp) {
                        if (resp == 1) {
                            window.location.href = "/aplicacion/vista/principal.php";
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Algo salió mal!',
                                text: resp,
                                confirmButtonColor: '#621132'
                            });
                        }
                    }
                });
            }
        }
    }
    /**
     * Funcion que puede pausar la ejecucion de las lineas de codigo
     * @param ms
     * @returns {Promise<unknown>}
     */
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
</script>