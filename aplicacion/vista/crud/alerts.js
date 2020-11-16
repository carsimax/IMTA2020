/* 
 * Alertas y redireccionamientos por Jquery que se utilizan en la gestión de la bd
 */

//Redirecciona a una página al confirmar acción
function cancelarForm(tablaPost) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No se guardarán los cambios en la base de datos.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#621132',
        cancelButtonColor: '#6f7271',
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            $.redirect("/aplicacion/vista/crud/dbadmin.php", {tablaP: tablaPost}, "POST");
        }
    });
}

//Redirecciona a un formulario al cancelar la alerta por el getElementId
function cancelarFormReg(elementId) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "No se guardarán los cambios en la base de datos.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#621132',
        cancelButtonColor: '#6f7271',
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            document.getElementById(elementId).submit();
        }
    });
}

//Redirecciona a un formulario al confirmar la insersión de la información por el getElementId
function valiFormAnterior(url, data, elementId) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se guardarán los cambios en la base de datos.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#621132',
        cancelButtonColor: '#6f7271',
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: 'GET',
                url: url,
                data: data,
                success: function (response) {
                    if (response === 'OK') {
                        swal("Buen Trabajo!", "Se han guardado los cambios", "success").then((value) => {
                            document.getElementById(elementId).submit();
                        });
                    } else if (response == 1) {
                        swal("Buen Trabajo!", "Se han guardado los cambios", "success").then((value) => {
                            document.getElementById(elementId).submit();
                        });
                    } else {
                        algoAndaMal(response);
                    }
                }
            });
        }
    });
}

//Muestra mensaje para confirmar la insersción de información del formulario para un nuevo registro
function valiFormNuevo(url, data, tablaP) {
    
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se guardarán los cambios en la base de datos.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#621132',
        cancelButtonColor: '#6f7271',
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: 'GET',
                url: url,
                data: data,
                success: function (response) {
                    if (response === 'OK') {
                        buenTrabajoNuevo(tablaP);
                    } else if (response == 1) {
                        buenTrabajoNuevo(tablaP);
                    } else {
                        algoAndaMal(response);   
                    }
                }
            });
        }
    });
}

//Muestra mensaje de error en la realización de una acción
function algoAndaMal(response){
    Swal.fire({title: "¡Algo anda mal!", text: response, icon: "error", confirmButtonColor: '#621132', confirmButtonText: 'OK'});
}
//Muestra un warning al usuario
function advertencia(response){
    Swal.fire({title: "¡Cuidado!", text: response, icon: "warning", confirmButtonColor: '#621132', confirmButtonText: 'OK'});
}
//Muestra una ventana emerjente de éxito que redirecciona a una página
function buenTrabajoNuevo(tablaP) {
    Swal.fire({title: "¿Buen tabajo!", text: "Se han guardado los cambios.", icon: "success", confirmButtonColor: '#621132', confirmButtonText: 'OK'
    }).then((value) => {
        $.redirect("/aplicacion/vista/crud/dbadmin.php", {tablaP: tablaP}, "POST");
    });
}

// Muestra alerta para confirmar la accion de editar información
function valiFormEditar(url, data) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se guardarán los cambios en la base de datos.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#621132',
        cancelButtonColor: '#6f7271',
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                type: 'GET',
                url: url,
                data: data,
                success: function (response) {
                    if (response === 'OK') {
                        buenTrabajoEditar();
                    } else if (response == 1) {
                        buenTrabajoEditar();
                    } else {
                        algoAndaMal(response);
                    }
                }
            });
        }
    });
}

//Muestra una ventana emergente de éxito que no redirecciona a una página
function buenTrabajoEditar() {
    Swal.fire({title: "¿Buen tabajo!", text: "Se han guardado los cambios.", icon: "success", confirmButtonColor: '#621132', confirmButtonText: 'OK'});
}