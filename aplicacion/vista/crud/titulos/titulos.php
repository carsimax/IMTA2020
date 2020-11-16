<?php
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
require_once(__DIR__ . "/../../../modelo/organismo.php");
require_once(__DIR__ . "/../../../modelo/tipopozo.php");
/**
 * Obtenemos los registros de los organismos de cuenca
 */
$registros = new Organismo();
$Organismos = $registros->getTodos();
$registros = new TipoPozo();
$Tipos = $registros->getTodos();
?>
<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Títulos de concesión</h4>
</div>
<div class="row">
    <div class="col-sm">
        <a href="titulos/nuevo.php" class="btn btn-gob btn-fill  btn-block"><i class="fas fa-plus"></i> Nuevo Título</a>
    </div>
    <div class="col-sm">
        <a href="titulos/excel.php" class="btn btn-gob btn-fill btn-block"><i class="fas fa-file-pdf"></i> Importar desde Excel</a>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-sm">
        <label>Organismo de Cuenca:</label>
        <select class="form-control" onchange="Organismos()" id="Organismos">
            <option disabled selected value> -- Seleccione una opción -- </option>
            <?php
            foreach ($Organismos as $Organismo) {
                ?>
                <option value="<?php echo $Organismo['id_organismo'] ?>"><?php echo $Organismo['numero'] ?>
                    .<?php echo $Organismo['nombre'] ?> </option>
            <?php } ?>
        </select>
    </div>
    <!--Select del Estados-->
    <div class="col-sm" id="divEstado">
        <label>Estado:</label>
        <select  class="form-control" onchange="Estados()" id="Estados">
            <option disabled selected value> -- Seleccione una opción -- </option>
        </select>
    </div>
    <!--Select del Municipios-->
    <div class="col-sm" id="divMuni" >
        <label>Municipio:</label>
        <select class="form-control" onchange="Titulos()" id="Municipios">
            <option disabled selected value> -- Seleccione una opción -- </option>
        </select>
    </div>
    <!--Select del Tipo de Pozo-->
    <div class="col-sm" id="divTipo">
        <label>Tipo de Título:</label>
        <select class="form-control" onchange="Titulos()" id="Tipos">
            <?php
            foreach ($Tipos as $Tipo) {
                ?>
                <option value="<?php echo $Tipo['id_tipo']; ?>"><?php echo $Tipo['tipo']; ?></option>
            <?php } ?>
        </select>
    </div>
</div>
<hr>
<div class="row">
    <div class="col-sm">
        <table id="example" cellpadding="0" cellspacing="0" border="0" class="table table-bordered responsive nowrap" width="100%">
        </table>
        <br>
    </div>
</div>
<script type="text/javascript" src="/aplicacion/vista/crud/alerts.js"></script>
<script>
    table = $('#example').DataTable({
        columns: [
            {
                title: 'Folio',
                className: 'dt-body-right'
            },
            {
                title: 'Titular',
                className: 'dt-body-right'
            },
            {
                title: 'Editar'
            },
            {
                title: 'Eliminar'
            }
        ],
        language: {
            url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
        },
        columnDefs: [{
                targets: 2,
                data: null,
                defaultContent: '<button id="editar" class="btn btn-gob btn-fill"><i class="fa fa-edit"></button>',
                width: "5%"
            },
            {
                targets: 3,
                data: null,
                defaultContent: '<button id="eliminar" class="btn btn-gob btn-fill"><i class="far fa-trash-alt"></i></button>',
                width: "5%"
            }]
    });
    async function Organismos() {
        table.clear().draw();
        /**;
         * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
         */
        //await limpiarOrganismos();
        const query = await concatOrganismo();
        if (query !== "") {
            /**
             * @type {string}
             * Se crea una cadena que es la que se va a enviar por medio de Ajax,
             * este contiene tanto el query anteriormente descrito como la acción que va realizar en el controlador de mapa
             */
            const cadena = "query=" + query + "&Accion=Estados";
            var data = [];
            /**
             * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
             */
            $.ajax({
                async: true,
                type: "POST",
                url: "/aplicacion/controlador/mapa.php",
                data: cadena,
                /**
                 * @param resp
                 * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
                 */
                success: function (resp) {
                    $("#Estados").empty();
                    data.push('<option disabled selected value> -- Seleccione una opción -- </option>');
                    $.each(JSON.parse(resp), function (index, item) {
                        /**
                         * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de acuiferos
                         */
                        data.push('<option value="' + item.id_estado + '">' + item.estado + '</option>');
                    });
                }
            }).always(function () {
                $('#Estados').html(data.join(''));
                $('#Estados').multiselect('reload');
            });
        }
    }
    async function Estados() {
        table.clear().draw();
        /**
         * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
         */
        //await limpiarEstados();
        const query = await concatEstado();
        if (query !== "") {
            /**
             * @type {string}
             * Se crea una cadena que es la que se va a enviar por medio de Ajax,
             * este contiene tanto el query anteriormente descrito como la acción que va realizar en el controlador de mapa
             */
            const cadena = "query=" + query + "&Accion=&Accion=Municipios";
            var data = [];
            /**
             * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
             */
            $.ajax({
                async: true,
                type: "POST",
                url: "/aplicacion/controlador/mapa.php",
                data: cadena,
                /**
                 * @param resp
                 * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
                 */
                success: function (resp) {
                    /**
                     * Primero se recorre el array con todos los estados devueltos por el controlador.
                     */
                    $("#Municipios").empty();
                    data.push('<option disabled selected value> -- Seleccione una opción -- </option>');
                    $.each(JSON.parse(resp), function (index, item) {
                        /**
                         * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de acuiferos
                         */
                        data.push('<option value="' + item.id_municipio + '">' + item.nombre + '</option>');
                    });
                }
            }).always(function () {
                $('#Municipios').html(data.join(''));
                $('#Municipios').multiselect('reload');
            });
        }
    }
    async function concatOrganismo() {
        var query = '';
        /**
         * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
         */
        $('#Organismos option:selected').each(function () {
            query += 'organismo_id=' + $(this).val() + ' or ';
        });
        /**
         * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
         * @type {string}
         */
        query = query.slice(0, -3);
        return query;
    }
    async function concatEstado() {
        var query = '';
        /**
         * Se tiene que recorrer el select de organismos de cuenca para encontrar todos los elementos seleccionados.
         */
        $('#Estados option:selected').each(function () {
            query += 'estado_id=' + $(this).val() + ' or ';
        });
        /**
         * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
         * @type {string}
         */
        query = query.slice(0, -3);
        return query;
    }
    
    async function Titulos() {
        var Tipo = $("#Tipos").val();
        var Muni = $("#Municipios").val();
        var query = ' municipio_id=' + Muni + ' AND tipo_id=' + Tipo;
        var cadena = "query=" + query + "&Accion=TituloAcu2";
        var data = [];
        $.ajax({
            async: true,
            type: "POST",
            url: "/aplicacion/controlador/titulo.php",
            data: cadena,
            /**
             * @param resp
             * Si el controlador devuelve la consulta se procederá con el proceso de interpretación de los datos
             */
            success: function (resp) {
                /**
                 * Primero se recorre el array con todos los estados devueltos por el controlador.
                 */
                $.each(JSON.parse(resp), function (index, item) {
                    data.push([
                        item.titulo_id, item.titular]);
                });
            }
        }).always(function () {
            table.clear().draw();
            table.rows.add(data).draw();
        });
    }



    $('#example').on('click', '#editar', function () {
         var TipoT = $("#Tipos").val();
        var data = table.row($(this).parents('tr')).data();
        $.redirect("/aplicacion/vista/crud/titulos/editar.php", {ID: data[0], Tipo: TipoT}, "POST");
    });

    $('#example').on('click', '#eliminar', function () {
        var data = table.row($(this).parents('tr')).data();
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Está a punto de eliminar " + data[1],
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#621132',
            cancelButtonColor: '#6f7271',
            confirmButtonText: 'Sí, continuar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                cadena = "ID=" + data[0] + "&Accion=Delete";
                $.ajax({
                    type: 'GET',
                    url: '/aplicacion/controlador/titulo.php',
                    data: cadena,
                    success: function (response) {
                        if (response == 1) {
                            buenTrabajoNuevo('Titulos');
                        } else {
                            algoAndaMal('No se ha podido eliminar el registro.');
                        }
                    },
                });
            }
        });
    });
</script>