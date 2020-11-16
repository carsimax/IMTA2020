<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../../plantillas/header.php");
require_once(__DIR__ . "/../../../controlador/sesion.php");
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/anio.php");
require_once(__DIR__ . "/../../../modelo/modulo.php");
$registros = new Anio();
$Anios = $registros->getAnios();
$registros = new Modulo();
$modulos= $registros->getModulos();
?>


<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Encabezado-->
            <div class="pt-3 pb-2 mb-3 border-bottom">
                <nav aria-label="breadcrumb ">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#" onclick="cancelarForm()">Catálogo de información</a></li>
                        <li class="breadcrumb-item active" aria-current="page">Nuevo</li>
                    </ol>
                </nav>
            </div>
            <div class="col-sm">
                <form action="" name="formPropietario" onsubmit="valiFormNuevo(); return false">
                    <input type="text" hidden id="Accion" name="Accion" value="Nuevo">
                    <div class="row">
                        <div class="col-sm">
                            <p>Fuente:</p>
                            <input type="text" class="form-control" name="fuente" id="fuente" required>
                        </div>
                        <div class="col-sm">
                            <p>URL:</p>
                            <input type="text" class="form-control" name="url" id="url" required>
                        </div>
                        <div class="col-sm">
                            <p>Fecha de recuperación: </p>
                            <input type="date" class="form-control" name="fecha" id="fecha" required>
                        </div>
                        <div class="col-sm">
                            <p>Cita en APA WEB:</p>
                            <input type="text" class="form-control" name="cita" id="cita" required>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                            <p>Año al que corresponde esta fuente:</p>
                            <select class="form-control" name="anio_id" id="anio_id">
                                <?php
                        foreach ($Anios as $Anio) {
                            ?>
                                <option value="<?php echo $Anio['id_anio']; ?>"><?php echo $Anio['anio']; ?></option>
                                <?php } ?>
                            </select>
                        </div>
                        <div class="col-sm">
                            <p>Módulo de consulta dónde se utiliza esta fuente:</p>
                            <select class="form-control" name="modulo_id" id="modulo_id">
                                <?php
                        foreach ($modulos as $modulo) {
                            ?>
                                <option value="<?php echo $modulo['id_modulo']; ?>"><?php echo $modulo['nombre']; ?>
                                </option>
                                <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                            <p>Descripcion:</p>
                            <textarea class="form-control" id="descripcion" name="descripcion" rows="3"></textarea>
                        </div>
                    </div>
                    <hr>
                    <div class="row">
                        <div class="col-sm">
                            <a onclick="cancelarForm()" class="btn btn-gob2 text-light  btn-block">Cancelar</a>
                        </div>
                        <div class="col-sm">
                            <button type="submit" class="btn btn-gob btn-fill  btn-block">Guardar</button>
                        </div>
                    </div>
                </form>
                <br>
            </div>
        </main>
    </div>
</div>
<?php require_once(__DIR__ . "/../../plantillas/footer.php"); ?>
<script>
//Funcion para cancelar el formulario
function cancelarForm() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No se guardarán los cambios en la base de datos.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#621132',
        cancelButtonColor: '#6f7271',
        confirmButtonText: 'Si, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            window.location = 'catalogo.php';
        }
    });
}

//Funcion para validar el formulario
function valiFormNuevo() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se guardarán los cambios en la base de datos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#621132',
        cancelButtonColor: '#6f7271',
        confirmButtonText: 'Si, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: 'GET',
                url: '/aplicacion/controlador/catalogo.php',
                data: $("form").serialize(),
                success: function(response) {
                    switch (response) {
                        case 'OK':
                            Swal.fire({
                                    title: "Buen Trabajo!",
                                    html: "Se han guardado los cambios",
                                    icon: "success",
                                    confirmButtonColor: '#621132'
                                })
                                .then((value) => {
                                    window.location.href = "catalogo.php";
                                });
                            break;
                        case 'Ya se encuentra en la Base de Datos':
                            Swal.fire({
                                icon: 'error',
                                title: 'Algo Anda mal!',
                                text: response,
                            });
                            break;
                    }
                },
            });
        }
    });
}
</script>