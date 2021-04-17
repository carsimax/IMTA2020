<!-- Site footer -->
<!-- Site footer -->
<footer class="site-footer">
    <div class="container">
        <div class="row">
            <div class="col-sm">
                <a target="_blank" rel="noreferrer" href="https://www.gob.mx/agricultura"> <img src="/imagenes/SADER.png" class="img-responsive" width="80%"></a>
            </div>
            <div class="col-sm">
                <a target="_blank" rel="noreferrer" href="https://www.conacyt.gob.mx/"> <img src="/imagenes/CONACYT.png" class="img-responsive" width="80%"></a>
            </div>
            <div class="col-sm">
                <a target="_blank" rel="noreferrer" href="https://www.gob.mx/imta"> <img src="/imagenes/IMTA.png" class="img-responsive" width="80%"></a>
            </div>
        </div>
        <hr>
        <div class="row">

            <div class="col-sm d-flex justify-content-center">
                <h6><a href='/aplicacion/vista/acercade.php'>Acerca de</a></h6>
            </div>
        </div>
        <hr>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-sm-6 col-xs-12">
                <p class="copyright-text" id="footer__text">
                    <!--<a href="#">Scanfcode</a>.-->
                </p>
            </div>

            <div class="col-md-4 col-sm-6 col-xs-12">
                <ul class="social-icons">
                    <li><a class="facebook" href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a class="twitter" href="#"><i class="fa fa-twitter"></i></a></li>
                    <!-- <li><a class="dribbble" href="#"><i class="fa fa-dribbble"></i></a></li>
                    <li><a class="linkedin" href="#"><i class="fa fa-linkedin"></i></a></li>-->
                </ul>
            </div>
        </div>
    </div>
</footer>
</body>
<a id="back2Top" title="Back to top" href="#">&#10148;</a>
<script>
    // Se asigna el anio actual al footer
    const legend = document.querySelector('#footer__text');
    legend.textContent = `Copyright © ${new Date().getFullYear()} todos los derechos reservados CONACyT-SADER.`


    function logout() {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Estas a punto de cerrar sesión",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#621132',
            cancelButtonColor: '#6f7271',
            confirmButtonText: 'Si, continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                window.location.href = '/aplicacion/controlador/logout.php';
            }
        });
    }
</script>

</html>