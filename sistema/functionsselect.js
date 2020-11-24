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
        $( "#consultar" ).prop( "disabled", false );
    } else{
        $( "#consultar" ).prop( "disabled", true );
    } 
}