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
        var x = document.getElementById("Correo").value;
        const cadena = "Correo=" + x + "&Accion=Restablecer";
        $.ajax({
            type: "POST",
            url: "/aplicacion/controlador/usuario.php",
            data: cadena,
            /**
             * @param resp
             * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
             */
            success: function(resp) {
                alert(JSON.parse(resp));
            }
        });
        Email.send({
                Host: "smtp.gmail.com",
                Username: "sisuar.imta@gmail.com",
                Password: "$imta2021$",
                To: 'maximilianocarsi@gmail.com',
                From: "sisuar.imta@gmail.com",
                Subject: "Sending Email using javascript",
                Body: "Well that was easy!!",
            })
            .then(function(message) {
                alert("mail sent successfully")
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