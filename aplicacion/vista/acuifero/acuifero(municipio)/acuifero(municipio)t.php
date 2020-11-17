<div class="col-sm" id="tabla">
    <nav>
        <div class="nav nav-tabs" id="nav-tab-acu" role="tablist">
            <a class="nav-item nav-link active" id="nav-OC-tab" data-toggle="tab" href="#nav-OC" role="tab"
                aria-controls="nav-OC" aria-selected="true">Organismo Cuenca</a>
            <a class="nav-item nav-link" id="nav-EST-tab" data-toggle="tab" href="#nav-EST" role="tab"
                aria-controls="nav-EST" aria-selected="true" onclick="mostrarDEstado()">Estado</a>
            <a class="nav-item nav-link" id="nav-MUNI-tab" data-toggle="tab" href="#nav-MUNI" role="tab"
                aria-controls="nav-MUNI" aria-selected="true" onclick="mostrarMunicipio()">Municipio</a>
            <a class="nav-item nav-link" id="nav-ACU-tab" data-toggle="tab" href="#nav-ACU" role="tab"
                aria-controls="nav-EST" aria-selected="true" onclick=" mostrarDAcuifero()">Acuífero</a>
        </div>
    </nav>
    <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-OC" role="tabpanel" aria-labelledby="nav-OC-tab">
            <br>
            <table id="OC" class="table table-bordered responsive nowrap" style="width:100%"></table>
        </div>
        <div class="tab-pane fade show" id="nav-EST" role="tabpanel" aria-labelledby="nav-EST-tab">
            <br>
            <table id="Est" class="table table-bordered responsive nowrap" style="width:100%"></table>
        </div>
        <div class="tab-pane fade show" id="nav-MUNI" role="tabpanel" aria-labelledby="nav-MUNI-tab">
            <br>
            <table id="Mun" class="table table-bordered responsive nowrap" style="width:100%"></table>
        </div>
        <div class="tab-pane fade show" id="nav-ACU" role="tabpanel" aria-labelledby="nav-ACU-tab">
            <br>
            <table id="Acu" class="table table-bordered responsive nowrap" style="width:100%"></table>
        </div>
    </div>
</div>
<script>
//Tabla de Organismos de cuenca
tablaOC = $('#OC').DataTable({
    columnDefs: [{
            className: 'dt-body-right',
            targets: [2, 3, 4, 5, 6, 7, 8]
        },
        {
            targets: 0,
            data: null,
            defaultContent: "<button data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-primary btn-fill  btn-block\"><i class=\"far fa-chart-bar\"></i></button>"
        }
    ],
    dom: 'Bfrtip',
    columns: [{
            title: 'Gráfica'
        },
        {
            title: 'Organismo de Cuenca'
        },
        {
            title: 'R (hm³)'
        },
        {
            title: 'DNC (hm³)'
        },
        {
            title: 'VCAS (hm³)'
        },
        {
            title: 'VEALA (hm³)'
        },
        {
            title: 'VAPTYR (hm³)'
        },
        {
            title: 'VAPRH (hm³)'
        },
        {
            title: 'DMA (hm³)'
        }
    ],
    buttons: [{
        extend: 'excelHtml5',
        title: 'Disponibilidad de acuíferos por Organismo de cuenca ',
        className: 'btn btn-primary btn-sm',
        text: 'Exportar Excel',
        exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    }, {
        extend: 'pdfHtml5',
        title: 'Consulta acuíferos por Organismo de cuenca',
        className: 'btn btn-primary btn-sm',
        text: 'Exportar PDF',
        messageBottom: citas,
        orientation: 'portrait',
        pageSize: 'A4',
        exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        customize: function(doc) {
            //Remove the title created by datatTables
            doc.content.splice(0, 1);
            //Create a date string that we use in the footer. Format is dd-mm-yyyy
            var now = new Date();
            var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
            // It's important to create enough space at the top for a header !!!
            doc.pageMargins = [20, 70, 20, 50];
            // Set the font size fot the entire document
            doc.defaultStyle.fontSize = 10;
            // Set the fontsize for the table header
            doc.styles.tableHeader.fontSize = 10;
            doc['header'] = (function() {
                return {
                    columns: [{
                            image: logo,
                            width: 200
                        },
                        {
                            alignment: 'left',
                            //italics: true,
                            text: 'Disponibilidad de acuíferos por Organismo de cuenca',
                            fontSize: 12.5,
                            margin: [10, 5]
                        },
                        {
                            alignment: 'right',
                            fontSize: 10,
                            text: jsDate.toString()
                        }
                    ],
                    margin: 20
                }
            });
            doc['footer'] = (function(page, pages) {
                return {
                    columns: [{
                        // This is the right column
                        alignment: 'center',
                        text: ['Página ', {
                            text: page.toString()
                        }, ' de ', {
                            text: pages.toString()
                        }]
                    }],
                    margin: [50, 0]
                };
            });
            var objLayout = {};
            objLayout['hLineWidth'] = function(i) {
                return .5;
            };
            objLayout['vLineWidth'] = function(i) {
                return .5;
            };
            objLayout['hLineColor'] = function(i) {
                return '#aaaaaa';
            };
            objLayout['vLineColor'] = function(i) {
                return '#aaaaaa';
            };
            objLayout['paddingLeft'] = function(i) {
                return 4;
            };
            objLayout['paddingRight'] = function(i) {
                return 4;
            };
            doc.content[0].layout = objLayout;
        }
    }],
    "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    }
});
//Tablas de Estados
tablaEst = $('#Est').DataTable({
    columnDefs: [{
            className: 'dt-body-right',
            targets: [2, 3, 4, 5, 6, 7, 8]
        },
        {
            targets: 0,
            data: null,
            defaultContent: "<button data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-primary btn-fill  btn-block\"><i class=\"far fa-chart-bar\"></i></button>"
        }
    ],
    dom: 'Bfrtip',
    columns: [{
            title: 'Gráfica'
        },
        {
            title: 'Estado'
        },
        {
            title: 'R (hm³)'
        },
        {
            title: 'DNC (hm³)'
        },
        {
            title: 'VCAS (hm³)'
        },
        {
            title: 'VEALA (hm³)'
        },
        {
            title: 'VAPTYR (hm³)'
        },
        {
            title: 'VAPRH (hm³)'
        },
        {
            title: 'DMA (hm³)'
        }
    ],
    buttons: [{
        extend: 'excelHtml5',
        title: 'Disponibilidad de acuíferos por Estado',
        className: 'btn btn-primary btn-sm',
        text: 'Exportar Excel',
        exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    }, {
        extend: 'pdfHtml5',
        title: 'Disponibilidad de acuíferos por Estado',
        className: 'btn btn-primary btn-sm',
        text: 'Exportar PDF',
        messageBottom: citas,
        orientation: 'portrait',
        pageSize: 'A4',
        exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        customize: function(doc) {
            //Remove the title created by datatTables
            doc.content.splice(0, 1);
            //Create a date string that we use in the footer. Format is dd-mm-yyyy
            var now = new Date();
            var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
            // It's important to create enough space at the top for a header !!!
            doc.pageMargins = [20, 70, 20, 50];
            // Set the font size fot the entire document
            doc.defaultStyle.fontSize = 10;
            // Set the fontsize for the table header
            doc.styles.tableHeader.fontSize = 10;
            doc['header'] = (function() {
                return {
                    columns: [{
                            image: logo,
                            width: 200
                        },
                        {
                            alignment: 'left',
                            //italics: true,
                            text: 'Disponibilidad de acuíferos por Estado',
                            fontSize: 12.5,
                            margin: [10, 5]
                        },
                        {
                            alignment: 'right',
                            fontSize: 10,
                            text: jsDate.toString()
                        }
                    ],
                    margin: 20
                }
            });
            doc['footer'] = (function(page, pages) {
                return {
                    columns: [{
                        // This is the right column
                        alignment: 'center',
                        text: ['Página ', {
                            text: page.toString()
                        }, ' de ', {
                            text: pages.toString()
                        }]
                    }],
                    margin: [50, 0]
                };
            });
            var objLayout = {};
            objLayout['hLineWidth'] = function(i) {
                return .5;
            };
            objLayout['vLineWidth'] = function(i) {
                return .5;
            };
            objLayout['hLineColor'] = function(i) {
                return '#aaaaaa';
            };
            objLayout['vLineColor'] = function(i) {
                return '#aaaaaa';
            };
            objLayout['paddingLeft'] = function(i) {
                return 4;
            };
            objLayout['paddingRight'] = function(i) {
                return 4;
            };
            doc.content[0].layout = objLayout;
        }
    }],
    "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    }
});
//Tabla acuiferos
tablaAcu = $('#Acu').DataTable({
    columnDefs: [{
            className: 'dt-body-right',
            targets: [2, 3, 4, 5, 6, 7, 8]
        },
        {
            targets: 0,
            data: null,
            defaultContent: "<button data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-primary btn-fill  btn-block\"><i class=\"far fa-chart-bar\"></i></button>"
        }
    ],
    dom: 'Bfrtip',
    columns: [{
            title: 'Gráfica'
        },
        {
            title: 'Acuífero'
        },
        {
            title: 'R (hm³)'
        },
        {
            title: 'DNC (hm³)'
        },
        {
            title: 'VCAS (hm³)'
        },
        {
            title: 'VEALA (hm³)'
        },
        {
            title: 'VAPTYR (hm³)'
        },
        {
            title: 'VAPRH (hm³)'
        },
        {
            title: 'DMA (hm³)'
        }
    ],
    buttons: [{
        extend: 'excelHtml5',
        title: 'Disponibilidad de acuíferos',
        className: 'btn btn-primary btn-sm',
        text: 'Exportar Excel',
        exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8]
        }
    }, {
        extend: 'pdfHtml5',
        title: 'Disponibilidad de acuíferos',
        className: 'btn btn-primary btn-sm',
        text: 'Exportar PDF',
        messageBottom: citas,
        orientation: 'portrait',
        pageSize: 'A4',
        exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        customize: function(doc) {
            //Remove the title created by datatTables
            doc.content.splice(0, 1);
            //Create a date string that we use in the footer. Format is dd-mm-yyyy
            var now = new Date();
            var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
            // It's important to create enough space at the top for a header !!!
            doc.pageMargins = [20, 70, 20, 50];
            // Set the font size fot the entire document
            doc.defaultStyle.fontSize = 10;
            // Set the fontsize for the table header
            doc.styles.tableHeader.fontSize = 10;
            doc['header'] = (function() {
                return {
                    columns: [{
                            image: logo,
                            width: 200
                        },
                        {
                            alignment: 'left',
                            //italics: true,
                            text: 'Disponibilidad de acuíferos',
                            fontSize: 12.5,
                            margin: [10, 5]
                        },
                        {
                            alignment: 'right',
                            fontSize: 10,
                            text: jsDate.toString()
                        }
                    ],
                    margin: 20
                }
            });
            doc['footer'] = (function(page, pages) {
                return {
                    columns: [{
                        // This is the right column
                        alignment: 'center',
                        text: ['Página ', {
                            text: page.toString()
                        }, ' de ', {
                            text: pages.toString()
                        }]
                    }],
                    margin: [50, 0]
                };
            });
            var objLayout = {};
            objLayout['hLineWidth'] = function(i) {
                return .5;
            };
            objLayout['vLineWidth'] = function(i) {
                return .5;
            };
            objLayout['hLineColor'] = function(i) {
                return '#aaaaaa';
            };
            objLayout['vLineColor'] = function(i) {
                return '#aaaaaa';
            };
            objLayout['paddingLeft'] = function(i) {
                return 4;
            };
            objLayout['paddingRight'] = function(i) {
                return 4;
            };
            doc.content[0].layout = objLayout;
        }
    }],
    "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    }
});
//Tabla municipio
tablaMun = $('#Mun').DataTable({
    columnDefs: [{
            className: 'dt-body-right',
            targets: [3, 4, 5, 6, 7, 8, 9]
        },
        {
            targets: 0,
            data: null,
            defaultContent: "<button data-toggle=\"modal\" data-target=\"#exampleModal\" class=\"btn btn-primary btn-fill  btn-block\"><i class=\"far fa-chart-bar\"></i></button>"
        }
    ],
    dom: 'Bfrtip',
    columns: [{
            title: 'Gráfica'
        },
        {
            title: 'Estado'
        },
        {
            title: 'Municipio'
        },
        {
            title: 'R (hm³)'
        },
        {
            title: 'DNC (hm³)'
        },
        {
            title: 'VCAS (hm³)'
        },
        {
            title: 'VEALA (hm³)'
        },
        {
            title: 'VAPTYR (hm³)'
        },
        {
            title: 'VAPRH (hm³)'
        },
        {
            title: 'DMA (hm³)'
        }
    ],
    buttons: [{
        extend: 'excelHtml5',
        title: 'Disponibilidad de acuíferos por municipio',
        className: 'btn btn-primary btn-sm',
        text: 'Exportar Excel',
        exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    }, {
        extend: 'pdfHtml5',
        title: 'Disponibilidad de acuíferos por municipio',
        className: 'btn btn-primary btn-sm',
        text: 'Exportar PDF',
        messageBottom: citas,
        orientation: 'portrait',
        pageSize: 'A4',
        exportOptions: {
            columns: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        },
        customize: function(doc) {
            //Remove the title created by datatTables
            doc.content.splice(0, 1);
            //Create a date string that we use in the footer. Format is dd-mm-yyyy
            var now = new Date();
            var jsDate = now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
            // It's important to create enough space at the top for a header !!!
            doc.pageMargins = [20, 70, 20, 50];
            // Set the font size fot the entire document
            doc.defaultStyle.fontSize = 10;
            // Set the fontsize for the table header
            doc.styles.tableHeader.fontSize = 10;
            doc['header'] = (function() {
                return {
                    columns: [{
                            image: logo,
                            width: 200
                        },
                        {
                            alignment: 'left',
                            //italics: true,
                            text: 'Disponibilidad de acuíferos por municipio',
                            fontSize: 12.5,
                            margin: [10, 5]
                        },
                        {
                            alignment: 'right',
                            fontSize: 10,
                            text: jsDate.toString()
                        }
                    ],
                    margin: 20
                }
            });
            doc['footer'] = (function(page, pages) {
                return {
                    columns: [{
                        // This is the right column
                        alignment: 'center',
                        text: ['Página ', {
                            text: page.toString()
                        }, ' de ', {
                            text: pages.toString()
                        }]
                    }],
                    margin: [50, 0]
                };
            });
            var objLayout = {};
            objLayout['hLineWidth'] = function(i) {
                return .5;
            };
            objLayout['vLineWidth'] = function(i) {
                return .5;
            };
            objLayout['hLineColor'] = function(i) {
                return '#aaaaaa';
            };
            objLayout['vLineColor'] = function(i) {
                return '#aaaaaa';
            };
            objLayout['paddingLeft'] = function(i) {
                return 4;
            };
            objLayout['paddingRight'] = function(i) {
                return 4;
            };
            doc.content[0].layout = objLayout;
        }
    }],
    "language": {
        "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
    }
});
$('#OC tbody').on('click', 'button', function() {
    var data = tablaOC.row($(this).parents('tr')).data();
    graficaOC(data[0]);
    //$('#OC thead tr th').click(); 

});
$('#Est tbody').on('click', 'button', function() {
    var data = tablaEst.row($(this).parents('tr')).data();
    graficaEst(data[0]);
    //$('#Est thead tr th').click();    
});
$('#Acu tbody').on('click', 'button', function() {
    var data = tablaAcu.row($(this).parents('tr')).data();
    graficaAcu(data[0]);
    //$('#Acu thead tr th').click();
});
$('#Mun tbody').on('click', 'button', function() {
    var data = tablaMun.row($(this).parents('tr')).data();
    graficaMun(data[0]);
    //$('#Mun thead tr th').click();
});
</script>