<!--Llamamos a la funcion se sesion-->
<?php
session_start();
require_once(__DIR__ . "/../../modelo/usuario.php");
require_once(__DIR__ . "/../plantillas/header.php");
require_once(__DIR__ . "/../../controlador/modulossudo.php");
$usuario = new Usuario();
$usuario->setIdUsuario($_POST['ID']);
$usuario->getUsu();
?>

<!--Seccion principal de la pagina-->
<!-- Contenido -->

<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Administradores</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Editar Administrador</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <form action="../../controlador/usuario.php" name="formRegistro" method="POST"
                    onsubmit="return valiForm()">
                    <div class="row">
                        <input type="text" id="Accion" name="Accion" value="UpdateAdmin" hidden>
                        <input type="text" id="id" name="id" value="<?php echo $usuario->getIdUsuario() ?>" hidden>
                        <!--Nombre-->
                        <div class="col-sm">
                            <p>Nombre:</p>
                            <input type="text" class="form-control" name="Nombre" id="Nombre" required
                                value="<?php echo $usuario->getNombre() ?>">
                        </div>
                        <!--Apellido Paterno-->
                        <div class="col-sm">
                            <p>Apellido Paterno:</p>
                            <input type="text" class="form-control" name="Apaterno" id="Apaterno" required
                                value="<?php echo $usuario->getAPaterno() ?>">
                        </div>
                        <!--Apellido Materno-->
                        <div class="col-sm">
                            <p>Apellido Materno:</p>
                            <input type="text" class="form-control" name="Amaterno" id="Amaterno" required
                                value="<?php echo $usuario->getAMaterno() ?>">
                        </div>
                    </div>
                    <div class="row">
                        <!--Usuario-->
                        <div class="col-sm" id="divUsuario" value="OK">
                            <p>Usuario:
                                <font id="err_usu" color="red"></font>
                            </p>
                            <input type="text" class="form-control" name="Usuario" id="Usuario"
                                oninput="verificarUsuario()" required value="<?php echo $usuario->getUsuario() ?>">
                        </div>
                        <!--Correo-->
                        <div class="col-sm" id="divCorreo" value="OK">
                            <p>Correo:
                                <font id="err_email" color="red"></font>
                            </p>
                            <input type="email" class="form-control" name="Correo" id="Correo"
                                oninput="verificarCorreo()" required value="<?php echo $usuario->getCorreo() ?>">
                        </div>
                        <!--Contraseña-->
                        <div class="col-sm" id="divContra" value="OK">
                            <p>Contraseña:
                                <font id="err_contra" color="red"></font>
                            </p>
                            <input type="password" class="form-control" name="Contra" id="Contra" oninput="valiContra()"
                                required value="<?php echo $usuario->getContra() ?>">
                        </div>
                        <!--Confirmar Contraseña-->
                        <div class="col-sm" id="divContraV" value="OK">
                            <p>Verificar Contraseña:
                                <font id="err_contraV" color="red"></font>
                            </p>
                            <input type="password" class="form-control" name="ContraV" id="ContraV"
                                oninput="veriContra()" required>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm">
                            <a class="btn btn-gob2 text-light btn-block" onclick="cancelarForm()">Cancelar</a>
                        </div>
                        <div class="col-sm">
                            <button class="btn btn-gob btn-fill  btn-block" type="submit">Guardar</button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    </div>
</div>
<!--Footer de la pagina-->
<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>
<!--Fin del footer de la pagina-->

<!--Seccion del script para la selecicon de la tabla de la base de datos-->
<script>
function verificarUsuario() {
    //Funcion que verifica si el usuario ya existe en la base de datos
    cadena = "Usuario=" + $("#Usuario").val() + "&Accion=verificarUsuario";
    $.ajax({
        type: "POST",
        url: "../../controlador/usuario.php",
        data: cadena,
        success: function(resp) {
            if (resp > 0) {
                $('#err_usu').html(" ¡El usuario ya existe!");
                document.getElementById('divUsuario').value = 'Error';
            } else {
                document.getElementById("err_usu").innerHTML = "";
                document.getElementById('divUsuario').value = 'Ok';
            }
        }
    });
}

function verificarCorreo() {
    //Funcion que verifica si el usuario ya existe en la base de datos
    cadena = "Correo=" + $("#Correo").val() + "&Accion=verificarCorreo";
    $.ajax({
        type: "POST",
        url: "../../controlador/usuario.php",
        data: cadena,
        success: function(resp) {
            if (resp > 0) {
                $('#err_email').html(" ¡El correo ya existe!");
                document.getElementById('divCorreo').value = 'Error';
            } else {
                document.getElementById("err_email").innerHTML = "";
                document.getElementById('divCorreo').value = 'OK';
            }
        }
    });
}

function valiContra() {
    var p1 = document.getElementById("Contra").value;
    var espacios = false;
    var cont = 0;
    //Verificar si hay espacios en blanco
    while (!espacios && (cont < p1.length)) {
        if (p1.charAt(cont) == " ")
            espacios = true;
        cont++;
    }
    if (espacios) {
        $('#err_contra').html(" No puede contener espacios en blanco");
        document.getElementById('divContra').value = 'Error';
    } else {
        document.getElementById("err_contra").innerHTML = "";
        document.getElementById('divContra').value = 'OK';
    }
}

function veriContra() {
    var p1 = document.getElementById("Contra").value;
    var p2 = document.getElementById("ContraV").value;
    if (p1 != p2) {
        $('#err_contraV').html(" Las passwords deben de coincidir");
        document.getElementById('divContraV').value = 'Error';
    } else {
        document.getElementById("err_contraV").innerHTML = "";
        document.getElementById('divContraV').value = 'OK';
    }
}

function valiForm() {
    if (document.getElementById("divUsuario").value == 'Error') {
        swal("¡El usuario ya existe!");
        return false;
    }
    if (document.getElementById("divCorreo").value == 'Error') {
        swal("¡El correo ya existe!");
        return false;
    }
    if (document.getElementById("divContra").value == 'Error') {
        swal("La contraseña no puede contener espacios en blanco");
        return false;
    }
    if (document.getElementById("divContraV").value == 'Error') {
        swal("Las contraseñas deben de coincidir");
        return false;
    }
    return true;
}

function cancelarForm() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Una vez cancelado la edición de su perfil, no podrá recuperar la información.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#621132',
        cancelButtonColor: '#6f7271',
        confirmButtonText: 'Si, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            window.location = '/aplicacion/vista/admin/admins.php';
        }
    });
}
</script>
<!--Fin del script-->