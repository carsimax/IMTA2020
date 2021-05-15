/*
*
*   FUNCIONES GLOBALES DE LOS MULTISELECTS QUE SE UTULIZAN EN LAS CONSULTAS
*   JORGE CALDERON PERALTA 
*/

//Asinga estilo buscando por el id del multiselect
function setEstiloSelect(idSelect, placeholder, search) {
    $(idSelect).multiselect({
        columns: 1,
        search: true,
        selectAll: true,
        texts: {
            placeholder: placeholder,
            search: search
        }
    });
}



//Crea un select el cual solo permita un elemento seleccionado
function setEstiloSelectOne(idSelect, placeholder, search, searchbool) {
    $(idSelect).multiselect({
        columns: 1,
        search: searchbool,
        selectAll: false,
        texts: {
            placeholder: placeholder,
            search: search,
        },
        onOptionClick: function (element, option) {
            var maxSelect = 1;

            // too many selected, deselect this option
            if ($(element).val().length > maxSelect) {
                if ($(option).is(':checked')) {
                    var thisVals = $(element).val();

                    thisVals.splice(
                        thisVals.indexOf($(option).val()), 1
                    );

                    $(element).val(thisVals);

                    $(option).prop('checked', false).closest('li')
                        .toggleClass('selected');
                }
            }
            // max select reached, disable non-checked checkboxes
            else if ($(element).val().length == maxSelect) {
                $(element).next('.ms-options-wrap')
                    .find('li:not(.selected)').addClass('disabled')
                    .find('input[type="checkbox"]')
                    .attr('disabled', 'disabled');
            }
            // max select not reached, make sure any disabled
            // checkboxes are available
            else {
                $(element).next('.ms-options-wrap')
                    .find('li.disabled').removeClass('disabled')
                    .find('input[type="checkbox"]')
                    .removeAttr('disabled');
            }
        }
    });
}

//Concatena los valores de un select con el id del select y el nombre de la variable para el query de la base de datos 
function concatValoresSelect(idSelect, foreingkey) {
    var query = "";
    $(idSelect + " option:selected").each(function () {
        query += foreingkey + $(this).val() + " or ";
    });
    query = query.slice(0, -3);
    return query;
}



//Construye las referencias y retorna una cadena con las mismas para ponerlos en el reporte PDF.
function construirReferencias(data, geoespacial) {
    geoespacial = false;
    citas = '\n';
    $.ajax({
        type: "GET",
        url: "/aplicacion/controlador/catalogo.php",
        data: data,
        success: function (resp) {
            document.getElementById("lista").innerHTML = "";
            $.each(JSON.parse(resp), function (index, item) {
                citas += item.cita + " \n";
                $("#lista").append("<li class='text-left'>" + item.cita + "</li>");
            });
        }
    });
    $("#referencias").show();
    //Se oculta la seccion geoespacial si no se utiliza
    if (!geoespacial) {
        $('#geoespacial').css('display', 'none');
    }
    return citas;
}

// Valida el valor de un select y habilita el boton de consulta
function isFormCompleted(idSelect) {
    if ($(idSelect).val() != '') {
        $("#consultar").prop("disabled", false);
    } else {
        $("#consultar").prop("disabled", true);
    }
}

//Variables de los botones
botonPresa=[];
botonDetallePresa=[];
var session = document.getElementById("sesionStatus").value;
if(session==="1"){
    botonPresa=[{
        extend: "excelHtml5",
        title: "Consulta de presas",
        className: "btn btn-gob btn-sm",
        text: "Exportar Excel",
        exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7],
        },
    },
    {
        extend: "pdfHtml5",
        title: "Consulta de presas",
        className: "btn btn-gob btn-sm",
        text: "Exportar PDF",
        messageBottom: citas,
        orientation: "portrait",
        pageSize: "A4",
        exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7],
        },
        customize: function (doc) {
            doc.content.splice(0, 1);
            var now = new Date();
            var jsDate =
                now.getDate() +
                "-" +
                (now.getMonth() + 1) +
                "-" +
                now.getFullYear();
            doc.pageMargins = [20, 70, 20, 50];
            doc.defaultStyle.fontSize = 10;
            doc.styles.tableHeader.fontSize = 10;
            doc["header"] = function () {
                return {
                    columns: [
                        {
                            image: logo,
                            width: 200,
                        },
                        {
                            alignment: "left",
                            text: "Consulta de presas",
                            fontSize: 12.5,
                            margin: [10, 5],
                        },
                        {
                            alignment: "right",
                            fontSize: 10,
                            text: jsDate.toString(),
                        },
                    ],
                    margin: 20,
                };
            };
            doc["footer"] = function (page, pages) {
                return {
                    columns: [
                        {
                            // This is the right column
                            alignment: "center",
                            text: [
                                "Página ",
                                { text: page.toString() },
                                " de ",
                                { text: pages.toString() },
                            ],
                        },
                    ],
                    margin: [50, 0],
                };
            };
            var objLayout = {};
            objLayout["hLineWidth"] = function (i) {
                return 0.5;
            };
            objLayout["vLineWidth"] = function (i) {
                return 0.5;
            };
            objLayout["hLineColor"] = function (i) {
                return "#aaaaaa";
            };
            objLayout["vLineColor"] = function (i) {
                return "#aaaaaa";
            };
            objLayout["paddingLeft"] = function (i) {
                return 4;
            };
            objLayout["paddingRight"] = function (i) {
                return 4;
            };
            doc.content[0].layout = objLayout;
        },
    },];
    botonDetallePresa=[
        {
            extend: "excelHtml5",
            title: "Volumen de presas",
            className: "btn btn-gob btn-sm",
            text: "Exportar Excel",
            exportOptions: {
                columns: [1, 2],
            },
        },
        {
            extend: "pdfHtml5",
            title: "Volumen de presas",
            className: "btn btn-gob btn-sm",
            text: "Exportar PDF",
            messageBottom: citas,
            orientation: "portrait",
            pageSize: "A4",
            exportOptions: {
                columns: [1, 2],
            },
            customize: function (doc) {
                //Remove the title created by datatTables
                doc.content.splice(0, 1);
                //Create a date string that we use in the footer. Format is dd-mm-yyyy
                var now = new Date();
                var jsDate =
                    now.getDate() +
                    "-" +
                    (now.getMonth() + 1) +
                    "-" +
                    now.getFullYear();
                // It's important to create enough space at the top for a header !!!
                doc.pageMargins = [20, 70, 20, 50];
                // Set the font size fot the entire document
                doc.defaultStyle.fontSize = 10;

                doc.styles.tableHeader.fontSize = 10;
                doc["header"] = function () {
                    return {
                        columns: [
                            {
                                image: logo,
                                width: 200,
                            },
                            {
                                alignment: "left",
                                //italics: true,
                                text: "Volumen de presas",
                                fontSize: 12.5,
                                margin: [10, 5],
                            },
                            {
                                alignment: "right",
                                fontSize: 10,
                                text: jsDate.toString(),
                            },
                        ],
                        margin: 20,
                    };
                };
                doc["footer"] = function (page, pages) {
                    return {
                        columns: [
                            {
                                // This is the right column
                                alignment: "center",
                                text: [
                                    "Página ",
                                    { text: page.toString() },
                                    " de ",
                                    { text: pages.toString() },
                                ],
                            },
                        ],
                        margin: [50, 0],
                    };
                };
                var objLayout = {};
                objLayout["hLineWidth"] = function (i) {
                    return 0.5;
                };
                objLayout["vLineWidth"] = function (i) {
                    return 0.5;
                };
                objLayout["hLineColor"] = function (i) {
                    return "#aaaaaa";
                };
                objLayout["vLineColor"] = function (i) {
                    return "#aaaaaa";
                };
                objLayout["paddingLeft"] = function (i) {
                    return 4;
                };
                objLayout["paddingRight"] = function (i) {
                    return 4;
                };
                doc.content[0].layout = objLayout;
            },
        },
    ];
}