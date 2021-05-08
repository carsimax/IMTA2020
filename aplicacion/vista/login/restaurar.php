<?php
//LLamamos la cabezera con todos los ccs y scripts del sistema
require_once(__DIR__ . "/../plantillas/header.php");
?>
<!--Fin de la Barra Principal-->
<div class="container-fluid">
    <div class="row">
        <main role="main" class="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <!--Seccion principal-->
            <!--Contenedor-->
            <!--Cabezera del titulo-->
            <div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
                <h2 class="my-4">Restablecimiento de contraseña</h2>
            </div>
            <!-- Portfolio Item Row -->
            <div class="col-sm">
                <div class="row">
                    <div class="col-sm">
                        <!--Formulario-->
                        <input type="text" id="Accion" name="Accion" value="Restablecer" hidden>
                        <!--Correo-->
                        <div id="divCorreo" value="OK">
                            <p>Correo:</p>
                            <input type="email" class="form-control" name="Correo" id="Correo" required>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col-sm">
                        <a class="btn btn-gob2 text-light  btn-block" onclick="cancelarForm()">Cancelar</a>
                    </div>
                    <div class="col-sm">
                        <button class="btn btn-gob text-light  btn-block" onclick="sendMail()" type="submit">Continuar</button>
                    </div>
                </div>
        </main>
    </div>
</div>
<!--Footer de la pagina-->
<?php require_once(__DIR__ . "/../plantillas/footer.php"); ?>

<script>
    function sendMail() {
        $.ajax({
            type: 'POST',
            url: 'https://mandrillapp.com/api/1.0/messages/send.json',
            data: {
                'key': '38b1a8d17624bc48ae7d599e34e97977-us1',
                'message': {
                    'from_email': 'sisuar.imta@gmail.com',
                    'to': [{
                        'email': 'maximilianocarsi@gmail.com',
                        'name': 'RECIPIENT NAME (OPTIONAL)',
                        'type': 'to'
                    }],
                    'autotext': 'true',
                    'subject': 'YOUR SUBJECT HERE!',
                    'html': 'YOUR EMAIL CONTENT HERE! YOU CAN USE HTML!'
                }
            }
        }).done(function(response) {
            console.log(response); // if you're into that sorta thing
        });
    }

    function cancelarForm() {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Está apunto de cancelar el proceso de restablacimiento de contraseña.",
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