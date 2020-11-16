<?php
session_start();
//LLamamos la cabezera con todos los ccs y scripts del sistema
if (!defined(__DIR__ . '/plantillas/header.php')) {
    require(__DIR__ . '/plantillas/header.php');
    define(__DIR__ . '/plantillas/header.php', 1);
}
?>




<div class="container">

    <div class="pt-3 pb-2 mb-3 border-bottom">
        <nav aria-label="breadcrumb ">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="#">Comentarios y sugerencias</a>
                </li>
            </ol>
        </nav>
    </div>


    <div class="col-sm">
        <p>Esta sección está creada para que puedas dejarnos tus comentarios y sugerencias acerca del funcionamiento del sistema. Esto nos ayudará a mejorar constantemente esta plataforma.</p>
        <form action="../controlador/usuario.php" name="formRegistro" method="POST">

            <div class="row">
                <input type="text" id="Accion" name="Accion" value="Comentario" hidden />
                <?php if (isset($_SESSION['loggedin'])) { ?>
                    <div class="col-sm" id="Nombre">
                        <p>Nombre:</p>
                        <input type="text" class="form-control" name="Nombre" id="Nombre" required value=" <?php echo $_SESSION['Nombre'] ?>" />
                    </div>
                    <div class="col-sm" id="Nombre">
                        <p>Apellido Paterno:</p>
                        <input type="text" class="form-control" name="AP" id="AP" required value=" <?php echo $_SESSION['A_Paterno'] ?>" />
                    </div>
                    <div class="col-sm" id="Nombre">
                        <p>Apellido Materno:</p>
                        <input type="text" class="form-control" name="AM" id="AM" required value=" <?php echo $_SESSION['A_Materno'] ?>" />
                    </div>
                <?php } else { ?>
                    <div class="col-sm" id="Nombre">
                        <p>Nombre:</p>
                        <input type="text" class="form-control" name="Nombre" id="Nombre" required />
                    </div>
                    <div class="col-sm" id="Nombre">
                        <p>Apellido Paterno:</p>
                        <input type="text" class="form-control" name="AP" id="AP" required />
                    </div>
                    <div class="col-sm" id="Nombre">
                        <p>Apellido Materno:</p>
                        <input type="text" class="form-control" name="AM" id="AM" required />
                    </div>
                <?php } ?>
            </div>
            <br>
            <div class="row">
                <div class="col-sm" id="Nombre">
                    <p>Comentario:</p>
                    <textarea class="form-control" id="Comentario" name="Comentario" placeholder="Ingrese su masaje para nosotros aquí." rows="7" required></textarea>
                </div>
            </div>
            <br>
            <div class="row">
                <div class="col-sm">
                    <a class="btn btn-gob2 text-light btn-block" onclick="cancelarForm()">Cancelar</a>
                </div>
                <div class="col-sm">
                    <button class="btn btn-gob btn-fill btn-block" type="submit">
                        Continuar
                    </button>
                </div>
            </div>
        </form>
    </div>
    <br>
</div>


<?php
if (!defined('plantillas/footer.php')) {
    require('plantillas/footer.php');
    define('plantillas/footer.php', 1);
}
?>
<script>
    function cancelarForm() {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Está apunto de cancelar un comentario importante para nosotros.☹️☹️☹️",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#621132',
            cancelButtonColor: '#6f7271',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                window.location = '/';
            }
        });
    }
</script>