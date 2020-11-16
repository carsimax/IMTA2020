<?php
require_once(__DIR__ . "/../../../controlador/modulosadmin.php");
//Requerimos del modelo de los organismos de cuanca disponibles
require_once(__DIR__ . "/../../../modelo/organismo.php");
$registros = new Organismo();
//Obtenemos todos los registros
$Organismos = $registros->getTodos();
?>

<div class="col-sm-12 pt-3 pb-2 mb-3 border-bottom">
    <h4>Presas</h4>
</div>
<div class="row">
    <div class="col-sm">
        <a href="presas/nuevo.php" class="btn btn-gob btn-fill  btn-block"><i class="fas fa-plus"></i> Nueva Presa</a>
    </div>
    <div class="col-sm">
        <a href="presas/shape.php" class="btn btn-gob btn-fill btn-block"><i class="fas fa-shapes"></i></i> Importar Shape</a>
    </div>
    <div class="col-sm">
        <a href="presas/PresaExcel.php" class="btn btn-gob btn-fill btn-block"><i class="fas fa-file-excel"></i> Importar Presas</a>
    </div>
    <div class="col-sm">
        <a href="presas/volumenpresaexcel.php" class="btn btn-gob btn-fill btn-block"><i class="fas fa-file-excel"></i> Importar Información Volumétrica</a>
    </div>
</div>
<hr>

<div class="row">
    <div class="col-sm">
        <label>Organismo de Cuenca:</label>
        <select onchange="Organismos()" name="Organismos[]" multiple id="Organismos">
            <?php
            foreach ($Organismos as $Organismo) {
                ?>
                <option value="<?php echo $Organismo['id_organismo'] ?>"><?php echo $Organismo['numero'] ?>
                    .<?php echo $Organismo['nombre'] ?> </option>
            <?php } ?>
        </select>
    </div>
    <div class="col-sm" id="divEstado">
        <label>Estado:</label>
        <select onchange="Estados()" name="Estados[]" multiple id="Estados">
        </select>
        <br>
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
                        title: 'ID Presa',
                        className: 'dt-body-right'
                    },
                    {
                        title: 'Nombre Oficial'
                    },
                    {
                        title: 'Nombre Común'
                    },
                    {
                        title: 'Corriente'
                    },
                    {
                        title: 'Año de Termino'
                    },
                    {
                        title: 'Estado'
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
                        targets: 6,
                        data: null,
                        defaultContent: '<button id="editar" class="btn btn-gob btn-fill"><i class="fa fa-edit"></button>',
                        width: "5%"
                    },
                    {
                        targets: 7,
                        data: null,
                        defaultContent: '<button id="eliminar" class="btn btn-gob btn-fill"><i class="far fa-trash-alt"></i></button>',
                        width: "5%"
                    }]
            });
            $('#Organismos').multiselect({
                columns: 1,
                search: true,
                selectAll: true,
                texts: {
                    placeholder: 'Seleccione un Organismo de Cuenca',
                    search: 'Buscar Organismos de Cuenca'
                }
            });
            $('#Estados').multiselect({
                columns: 1,
                search: true,
                selectAll: true,
                texts: {
                    placeholder: 'Seleccione un Estado',
                    search: 'Buscar Estado'
                }
            });


            async function Organismos() {
                /**
                 * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
                 */
                $('#Estados').multiselect('reset');
                /**
                 * @type {string}
                 * La variable query nos permite guardar la sentencia SQL para consultar los estados
                 */
                const query = await concatOrganismo();
                /**
                 * Antes de realizar la consulta a la base de datos,
                 * es necesario verificar primero si el query contiene datos a buscar.
                 */
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
                            /**
                             * Primero se recorre el array con todos los estados devueltos por el controlador.
                             */
                            $.each(JSON.parse(resp), function (index, item) {
                                /**
                                 * Por medio del plugin de multiselect, podemos agregar los objetos del array al select de estados
                                 */
                                data.push({name: item.estado, value: item.id_estado, checked: false});
                            });
                        }
                    }).always(function () {
                        $('#Estados').multiselect('loadOptions', data);
                    });
                }
            }


            async function Estados() {
                /**
                 * Esta línea de código llama a la función que limpia la capa de organismos de cuenca
                 */

                const query = await concatEstado();
                /**
                 * Antes de realizar la consulta a la base de datos,
                 * es necesario verificar primero si el query contiene datos a buscar.
                 */
                if (query !== "") {
                    /**
                     * @type {string}
                     * Se crea una cadena que es la que se va a enviar por medio de Ajax,
                     * este contiene tanto el query anteriormente descrito como la acción que va realizar en el controlador de mapa
                     */
                    const cadena = "query=" + query + "&Accion=Todos";
                    var data = [];
                    /**
                     * Se manda a llamar por medio de Ajax a la función de estados en el controlador de mapa
                     */
                    $.ajax({
                        async: true,
                        type: "POST",
                        url: "/aplicacion/controlador/presa.php",
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
                                data.push([item.id_presa, item.nom_oficial, item.nom_comun, item.corriente, item.anio_term, item.edo, item]);
                            });
                            table.clear().draw();
                            table.rows.add(data).draw();
                        }
                    });
                }
                await sleep(500);
                table.order([0, 'asc']).draw();
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
                    query += 'edo_id=' + $(this).val() + ' or ';
                });
                /**
                 * Al final el query quedara con un or al final, la siguiente línea quita ese or sobrante.
                 * @type {string}
                 */
                query = query.slice(0, -3);
                return query;
            }



            $('#example').on('click', '#editar', function () {
                var data = table.row($(this).parents('tr')).data();
                $.redirect("/aplicacion/vista/crud/presas/editar.php", {ID: data[0]}, "POST");
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
                            url: '/aplicacion/controlador/presa.php',
                            data: cadena,
                            success: function (response) {
                                if (response == 1) {
                                    buenTrabajoNuevo('Presas');
                                } else {
                                    algoAndaMal('No se ha podido eliminar el registro.');
                                }
                            },
                        });
                    }
                });
            });
</script>