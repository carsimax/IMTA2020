<?php
/**
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
require_once(__DIR__ . "/../../modelo/sector.php");
require_once(__DIR__ . "/../../controlador/modulossudo.php");
$registros = new Sector;
$sectores = $registros->getTodos();
?>

<!--Formulario-->
<form action="../../controlador/usuario.php" name="formRegistro" method="POST" onsubmit="return valiForm()">
    <div class="row">
        <input type="text" id="Accion" name="Accion" value="RegistroAdmin" hidden>
        <!--Nombre-->
        <div class="col-sm">
            <p>Nombre:</p>
            <input type="text" class="form-control" name="Nombre" id="Nombre" required>
        </div>
        <!--Apellido Paterno-->
        <div class="col-sm">
            <p>Apellido Paterno:</p>
            <input type="text" class="form-control" name="Apaterno" id="Apaterno" required>
        </div>
        <!--Apellido Materno-->
        <div class="col-sm">
            <p>Apellido Materno:</p>
            <input type="text" class="form-control" name="Amaterno" id="Amaterno" required>
        </div>
    </div>
    <div class="row">
        <!--Usuario-->
        <div class="col-sm" id="divUsuario" value="OK">
            <p>Usuario:
                <font id="err_usu" color="red"></font>
            </p>
            <input type="text" class="form-control" name="Usuario" id="Usuario" oninput="verificarUsuario()" required>
        </div>
        <!--Correo-->
        <div class="col-sm" id="divCorreo" value="OK">
            <p>Correo:
                <font id="err_email" color="red"></font>
            </p>
            <input type="email" class="form-control" name="Correo" id="Correo" oninput="verificarCorreo()" required>
        </div>
        <!--Contraseña-->
        <div class="col-sm" id="divContra" value="OK">
            <p>Contraseña:
                <font id="err_contra" color="red"></font>
            </p>
            <input type="password" class="form-control" name="Contra" id="Contra" oninput="valiContra()" required>
        </div>
        <!--Confirmar Contraseña-->
        <div class="col-sm" id="divContraV" value="OK">
            <p>Verificar Contraseña:
                <font id="err_contraV" color="red"></font>
            </p>
            <input type="password" class="form-control" name="ContraV" id="ContraV" oninput="veriContra()" required>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-sm">
            <a class="btn btn-gob2 text-light  btn-block" onclick="cancelarForm()">Cancelar</a>
        </div>
        <div class="col-sm">
            <button class="btn btn-gob btn-fill  btn-block" type="submit">Registrar</button>
        </div>
    </div>
</form>
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
        text: "Una vez cancelado el registro, no podrá recuperar la información.",
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