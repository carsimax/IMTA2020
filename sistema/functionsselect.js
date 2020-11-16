
//Asinga el estilo buscando por el id del select
async function setEstiloSelect(idSelect, placeholder, search) {
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

//Concatena los valores de un select con el id del select y el nombre de la variable para el query de la base de datos 
function concatValoresSelect(idSelect, foreingkey) {
    var query = "";
    $(idSelect + " option:selected").each(function () {
        query += foreingkey + $(this).val() + " or ";
    });
    query = query.slice(0, -3);
    return query;
}
