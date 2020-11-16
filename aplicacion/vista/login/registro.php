<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../plantillas/header.php");
require_once(__DIR__ . "/../../modelo/sector.php");
$registros = new Sector;
$sectores = $registros->getTodos();
?>

<form action="/aplicacion/controlador/usuario.php" name="formRegistro" method="POST" onsubmit="return valiForm()">
    <input type="text" id="Accion" name="Accion" value="Registro" hidden>
    <div class="row">
        <!--Nombre-->
        <div class="col-sm">
            <p>Nombre:</p>
            <input type="text" class="form-control" name="Nombre" id="Nombre" required
                pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}">
        </div>
        <!--Apellido Paterno-->
        <div class="col-sm">
            <p>Apellido Paterno:</p>
            <input type="text" class="form-control" name="Apaterno" id="Apaterno" required
                pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}">
        </div>
        <!--Apellido Materno-->
        <div class="col-sm">
            <p>Apellido Materno:</p>
            <input type="text" class="form-control" name="Amaterno" id="Amaterno" required
                pattern="[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{2,64}">
        </div>
    </div>
    <hr>
    <div class="row">
        <!--Usuario-->
        <div class="col-sm" id="divUsuario" value="OK">
            <p>Usuario <font id="err_usu" col-smor="red"></font>
            </p>
            <small><b>Cadena de letras minúsculas de entre 5 y 12 caracteres y 2 números opcionales
                    al final.</b></small>
            <input type="text" class="form-control" name="Usuario" id="Usuario" oninput="verificarUsuario()" required
                pattern="^([a-z]+[0-9]{0,2}){5,12}$">
        </div>
        <!--Correo-->
        <div class="col-sm" id="divCorreo" value="OK">
            <p>Correo:
                <font id="err_email" col-smor="red"></font>
            </p>
            <br>
            <input type="email" class="form-control" name="Correo" id="Correo" oninput="verificarCorreo()" required
                pattern="^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$">
        </div>
    </div>
    <hr>
    <div class="row">
        <!--Sector-->
        <div class="col-sm">
            <p>Sector:</p>
            <select class="form-control" name="Sector" id="Sector" onchange="cambiar()">
                <?php
                                    foreach ($sectores as $sector) {
                                        ?>
                <option value="<?php echo $sector['id_sector']; ?>"><?php echo $sector['sector']; ?>
                </option>
                <?php } ?>
            </select>
        </div>
    </div>
    <div class="row">
        <!--Formulario del Sector-->
        <div class="col-sm" id="divSector"></div>
    </div>
    <hr>
    <div class="row">
        <!--Contraseña-->
        <div class="col-sm" id="divContra" value="OK">
            <p>Contraseña:
                <font id="err_contra" col-smor="red"></font>
            </p>
            <small><b>Cadena de entre 8 y 12 caracteres, podrá contener letras mayúsculas,
                    minúsculas, números y los caracteres !?</b></small>.
            <input type="password" class="form-control" name="Contra" id="Contra" oninput="valiContra()" required
                pattern="[A-Za-z0-9!?-]{8,12}">
        </div>
        <!--Confirmar Contraseña-->
        <div class="col-sm" id="divContraV" value="OK">
            <p>Verificar Contraseña:
                <font id="err_contraV" col-smor="red"></font>
            </p>
            <br>
            <input type="password" class="form-control" name="ContraV" id="ContraV" oninput="veriContra()" required
                pattern="[A-Za-z0-9!?-]{8,12}">
        </div>
    </div>
    <!--Confirmar Contraseña-->
    <hr>
    <div class="row">
        <div class="col-sm">
            <fieldset>
                <legend>¿Qué deseas buscar?</legend>
                <label>
                    <input type="radio" name="filtro" value="1" checked> Todo.
                </label>
                <br>
                <label>
                    <input type="radio" name="filtro" value="2"> Acuíferos.
                </label>
                <br>
                <label>
                    <input type="radio" name="filtro" value="3"> Pozos.
                </label>
                <br>
                <label>
                    <input type="radio" name="filtro" value="4"> Estadísticas Agrícol-smas.
                </label>
            </fieldset>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-sm">
            <a class="btn btn-gob2 text-light btn-block" onclick="cancelarForm()">Cancelar</a>
        </div>
        <div class="col-sm">
            <button class="btn btn-gob btn-block" type="submit">Registrar</button>
        </div>
    </div>
</form>

<script>
function cambiar() {
    $val = $("#Sector").val();
    var form;
    switch ($val) {
        case '1':
            document.getElementById("divSector").innerHTML = "";
            break;
        case '2':
            $("#divSector").load('/aplicacion/vista/login/educativoform.php');
            break;
        case '3':
            document.getElementById("divSector").innerHTML = "";
            $("#divSector").load('/aplicacion/vista/login/publicoform.php');
            break;
        case '4':
            document.getElementById("divSector").innerHTML = "";
            $("#divSector").load('/aplicacion/vista/login/privadoform.php');
            break;

    }
}

function verificarUsuario() {
    //Funcion que verifica si el usuario ya existe en la base de datos
    cadena = "Usuario=" + $("#Usuario").val() + "&Accion=verificarUsuario";
    $.ajax({
        type: "POST",
        url: "/aplicacion/controlador/usuario.php",
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
        url: "/aplicacion/controlador/usuario.php",
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
        text: "Una vez cancelado el registro, no podrá recuperar la información.",
        icon: "warning",
        showCancelButton: true,
        confirmButtoncol: '#621132',
        cancelButtoncol : '#6f7271',
        confirmButtonText: 'Si, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            window.location = '/';
        }
    });
}
</script>