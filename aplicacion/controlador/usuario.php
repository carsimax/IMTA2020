<?php

/**
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
//Variables para depurar y ver los errores de ejecución dentro del servidor apache.
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

/**
 * Para que el controlador funcione de forma correcta, es necesario la llamada a los modelos necesarios en el mismo.
 */
require_once(__DIR__ . "/../modelo/usuario.php");
require_once(__DIR__ . "/../modelo/educativo.php");
require_once(__DIR__ . "/../modelo/publico.php");
require_once(__DIR__ . "/../modelo/privado.php");
require_once(__DIR__ . "/../modelo/contra.php");
require_once(__DIR__ . "/../../correo/src/Exception.php");
require_once(__DIR__ . "/../../correo/src/PHPMailer.php");
require_once(__DIR__ . "/../../correo/src/SMTP.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**
 * La variable acción almacena la función que recibimos desde la vista.
 */
$accion = filter_input(INPUT_POST, "Accion");

//Si no se recibió nada por post, intentara recibirlo por get.
if (filter_input(INPUT_POST, "Accion") == NULL) {
    $accion = filter_input(INPUT_GET, "Accion");
}

/**
 * Este switch es la controladora de las funciones que contiene el controlador,
 * Desde aquí se determina a que función del controlador llamar.
 */
switch ($accion) {
    /**
     * Funcion de login
     */
    case 'Login':
        try {
            login(filter_input(INPUT_POST, "Email"), filter_input(INPUT_POST, "Contra"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion para verificar el usuario
     */
    case 'verificarUsuario':
        try {
            verificarUsuario(filter_input(INPUT_POST, "Usuario"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * funcion para verificar el correo
     */
    case 'verificarCorreo':
        try {
            verificarCorreo(filter_input(INPUT_POST, "Correo"));
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion para realizar el registro del usuario
     */
    case 'Registro':
        try {
            Registrar();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Registro2':
        try {
            Registrar2();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'RegistroAdmin':
        try {
            RegistrarAdmin();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion para restablecer la contra
     */
    case 'Restablecer':
        try {
            restablecer();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    /**
     * Funcion para actualizar el usuario
     */
    case 'Update':
        try {
            update();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Update2':
        try {
            update2();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'UpdateAdmin':
        try {
            UpdateAdmin();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Admins':
        try {
            Admins();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Delete':
        try {
            Eliminar();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Todos':
        try {
            getTodos();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Comentario':
        try {
            setComentario();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    case 'Comentarios':
        try {
            Comentarios();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

/**
 * @param $Usuario
 * @return bool
 * Funcion para verificarusuario
 */
function verificarUsuario($Usuario) {
    try {
        /**
         * Se crea la instancia a usuario
         */
        $usuario = new Usuario;
        $usuario->setUsuario($Usuario);
        /**
         * se manda a llamar a la funcion de verifica
         */
        $resp = $usuario->verificarUsuario();
        /**
         * Comprobamos si existe el cusuario
         */
        echo $resp;
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * @param $Correo
 * @return bool
 * Funcion para verificar correo
 */
function verificarCorreo($Correo) {
    try {
        /**
         * Se crea la instancia a usuario
         */
        $usuario = new Usuario;
        $usuario->setCorreo($Correo);
        /**
         * se manda a llamar a la funcion de verifica
         */
        $resp = $usuario->verificarCorreo();
        /**
         * Comprobamos si existe el correo
         */
        echo $resp;
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * @return bool
 * Funcion para registrar el nuevo usuario
 */
function Registrar() {
    try {
        /**
         * Se crea la instancia al objeto usuario
         */
        $usuario = new Usuario;
        /**
         * Se colocan los datos de POST por medio de los metodos SET del objeto
         */
        $usuario->setUsuario(filter_input(INPUT_POST, "Usuario"));
        $usuario->setNombre(filter_input(INPUT_POST, "Nombre"));
        $usuario->setAPaterno(filter_input(INPUT_POST, "Apaterno"));
        $usuario->setAMaterno(filter_input(INPUT_POST, "Amaterno"));
        $usuario->setSectorID(filter_input(INPUT_POST, "Sector"));
        $usuario->setCorreo(filter_input(INPUT_POST, "Correo"));
        $pass = filter_input(INPUT_POST, "Contra");
        /**
         * Se encripta la contrasena del usuario
         */
        $usuario->setContra(password_hash($pass, PASSWORD_BCRYPT));
        /**
         * se manda a llamar a la funcion insertar y se obtiene el id generado
         */
        $resp = $usuario->insert();
        /**
         * Se obtiene el sector al que perteece el usuario
         */
        switch ($usuario->getSectorID()) {
            case '2':
                /**
                 * Sector Educativo
                 * Se genera una instancia al modelo educativo
                 */
                $educativo = new Educativo;
                /**
                 * Se colocan los valores del POST por medio de los SET
                 */
                $educativo->setUsuarioID($resp);
                $educativo->setEscuela(filter_input(INPUT_POST, "Nombre_Escuela"));
                $educativo->setDireccion(filter_input(INPUT_POST, "Direccion"));
                $educativo->setCarrera(filter_input(INPUT_POST, "Carrera"));
                $educativo->setGrado(filter_input(INPUT_POST, "Grado"));
                $educativo->setGrupo(filter_input(INPUT_POST, "Grupo"));
                $educativo->setNivel(filter_input(INPUT_POST, "Nivel"));
                //Se llama a ala funcion insertar
                $educativo->insert();
                break;
            case '3':
                /**
                 * Sector Publico
                 * Se genera una instancia al modelo publico
                 */
                $publico = new Publico;
                /**
                 * Se colocan los valores del POST por medio de los SET
                 */
                $publico->setUsuarioId($resp);
                $publico->setInstitucion(filter_input(INPUT_POST, "Nombre_Institucion"));
                $publico->setDireccion(filter_input(INPUT_POST, "Direccion"));
                $publico->setGiro(filter_input(INPUT_POST, "Giro"));
                /**
                 * Se llama a ala funcion insertar
                 */
                $publico->insert();
                break;
            case '4':
                /**
                 * Sector Privado
                 * Se genera una instancia al modelo publico
                 */
                $privado = new Privado;
                /**
                 * Se colocan los valores del POST por medio de los SET
                 */
                $privado->setUsuarioID($resp);
                $privado->setEmpresa(filter_input(INPUT_POST, "Nombre_Empresa"));
                $privado->setDireccion(filter_input(INPUT_POST, "Direccion"));
                $privado->setGiro(filter_input(INPUT_POST, "Giro"));
                /**
                 * Se llama a ala funcion insertar
                 */
                $privado->insert();
                break;
        }
        /**
         * Insertar en la tabla secundaria de Contraseñas
         * Se crea la instancia de contra
         */
        $Contra = new Contra;
        /**
         * Se colocan los datos recibidos por POST
         */
        $Contra->setUsuarioID($resp);
        $Contra->setContra($pass);
        /**
         * Se manda a llamar a la funcion de insertar
         */
        $Contra->insert();
        /**
         * Se redirecciona a la pantalla principal
        $email_user = "maximilianocarsi@gmail.com";
        $email_password = "C02101998m0644";
        $the_subject = "Registro  Exitoso";
        $address_to = $usuario->getCorreo(); //correo del paciente
        $from_name = "Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional";
        $phpmailer = new PHPMailer();
        $phpmailer->Username = $email_user;
        $phpmailer->Password = $email_password;
        $phpmailer->SMTPSecure = 'ssl';
        $phpmailer->Host = "smtp.gmail.com"; // GMail
        $phpmailer->Port = 465;
        $phpmailer->IsSMTP(); // use SMTP
        $phpmailer->SMTPAuth = true;
        $phpmailer->setFrom($phpmailer->Username, $from_name);
        $phpmailer->AddAddress($address_to); // recipients email
        $phpmailer->Subject = $the_subject;

        $phpmailer->Body .= "<h1 style='color:#3498db;'>Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional</h1>"; //Encabezado del correo
        $phpmailer->Body .= "<h2>Registro  Exitoso</h2>"; //Encabezado del correo
        $phpmailer->Body .= "<h3><b>Usuario:</b> " . $usuario->getUsuario() . "</h3>";
        $phpmailer->Body .= "<h3><b>Nombre:</b> " . $usuario->getNombre() . " " . $usuario->getAPaterno() . " " . $usuario->getAMaterno() . "</h3>";
        $phpmailer->Body .= "<p>Ya eres parte del Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional </p>";
        $phpmailer->IsHTML(true);

        if ($phpmailer->Send()) {
            echo '<script type="text/javascript">alert("Registro Exitoso");</script>';
            echo "<script type='text/javascript'>";
            echo "window.location.href ='/'";
            echo "</script>";
        } else {
            //echo '<script type="text/javascript">alert("Algo Salio mal;");</script>';
            //echo "<script type='text/javascript'>";
            //echo "window.location.href ='/'";
            //echo "</script>";
        }*/
        echo '<script type="text/javascript">alert("Registro Exitoso");</script>';
        echo "<script type='text/javascript'>";
        echo "window.location.href ='/'";
        echo "</script>";
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

function RegistrarAdmin() {
    try {
        /**
         * Se crea la instancia al objeto usuario
         */
        $usuario = new Usuario;
        /**
         * Se colocan los datos de POST por medio de los metodos SET del objeto
         */
        $usuario->setUsuario(filter_input(INPUT_POST, "Usuario"));
        $usuario->setNombre(filter_input(INPUT_POST, "Nombre"));
        $usuario->setAPaterno(filter_input(INPUT_POST, "Apaterno"));
        $usuario->setAMaterno(filter_input(INPUT_POST, "Amaterno"));
        $usuario->setCorreo(filter_input(INPUT_POST, "Correo"));
        $pass = filter_input(INPUT_POST, "Contra");
        /**
         * Se encripta la contrasena del usuario
         */
        $usuario->setContra(password_hash($pass, PASSWORD_BCRYPT));
        /**
         * se manda a llamar a la funcion insertar y se obtiene el id generado
         */
        $resp = $usuario->insertAdmin();

        $Contra = new Contra;
        /**
         * Se colocan los datos recibidos por POST
         */
        $Contra->setUsuarioID($resp);
        $Contra->setContra($pass);
        /**
         * Se manda a llamar a la funcion de insertar
         */
        $Contra->insert();
        /**
         * Se redirecciona a la pantalla principal
         */
        $email_user = "maximilianocarsi@gmail.com";
        $email_password = "C02101998m0644";
        $the_subject = "Registro  Exitoso";
        $address_to = $usuario->getCorreo(); //correo del paciente
        $from_name = "Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional";
        $phpmailer = new PHPMailer();
        /**
         * datos de la cuenta de Gmail
        $phpmailer->Username = $email_user;
        $phpmailer->Password = $email_password;
        $phpmailer->SMTPSecure = 'ssl';
        $phpmailer->Host = "smtp.gmail.com"; // GMail
        $phpmailer->Port = 465;
        $phpmailer->IsSMTP(); // use SMTP
        $phpmailer->SMTPAuth = true;
        $phpmailer->setFrom($phpmailer->Username, $from_name);
        $phpmailer->AddAddress($address_to); // recipients email
        $phpmailer->Subject = $the_subject;

        $phpmailer->Body .= "<h1 style='color:#3498db;'>Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional</h1>"; //Encabezado del correo
        $phpmailer->Body .= "<h2>Registro  Exitoso</h2>"; //Encabezado del correo
        $phpmailer->Body .= "<h3><b>Usuario:</b> " . $usuario->getUsuario() . "</h3>";
        $phpmailer->Body .= "<h3><b>Nombre:</b> " . $usuario->getNombre() . " " . $usuario->getAPaterno() . " " . $usuario->getAMaterno() . "</h3>";
        $phpmailer->Body .= "<p>Ya eres parte del Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional </p>";
        $phpmailer->IsHTML(true);

        if ($phpmailer->Send()) {
            echo "<script type='text/javascript'>";
            echo "window.location.href ='/aplicacion/vista/admin/admins.php'";
            echo "</script>";
        } else {
            //echo '<script type="text/javascript">alert("Algo Salio mal;");</script>';
            //echo "<script type='text/javascript'>";
            //echo "window.location.href ='/'";
            //echo "</script>";
        }*/
        echo "<script type='text/javascript'>";
        echo "window.location.href ='/aplicacion/vista/admin/admins.php'";
        echo "</script>";
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * @param $usu
 * @param $contra
 * @return bool
 * Funcion del Login
 */
function login($usu, $contra) {
    try {
        /**
         * Creamos la instancia a usuario
         */
        $usuario = new Usuario;
        $usuario->setCorreo($usu);
        $usuario->setUsuario($usu);
        $resp = $usuario->login();
        /**
         * Comprobamos si existe el correo
         */
        if ($resp->getCorreo() != NULL) {
            /**
             * Comenzaremos con la verificación de la contraseña
             */
            if (password_verify($contra, $resp->getContra())) {
                /**
                 * Creamos la sesión
                 */
                session_start();
                /**
                 * colocamos los datos en session como el estado de loggedin
                 */
                $_SESSION['loggedin'] = true;
                /**
                 * la hora de inicio
                 */
                $_SESSION['start'] = time();
                /**
                 * La hora de expiracion
                 */
                $_SESSION['expire'] = $_SESSION['start'] + (1 * 360000);
                /**
                 * Los datos basicos del usuario
                 */
                $_SESSION['ID_Usuario'] = $resp->getIDUsuario();
                $_SESSION['Nombre'] = $resp->getNombre();
                $_SESSION['A_Paterno'] = $resp->getAPaterno();
                $_SESSION['A_Materno'] = $resp->getAMaterno();
                $_SESSION['Rol_ID'] = $resp->getRolID();
                $_SESSION['olvidada'] = $resp->getIsOlvidad();
                $_SESSION['proceso'] = 0;
                /**
                 * Se retorna el estado de la operacion
                 */
                echo 1;
            } else {
                /**
                 * si la contra no coincide, se muestra el mensaje de error
                 */
                echo 'La contraseña no es válida.';
            }
        } else {
            /**
             * Si no Existe el correo
             */
            echo "El usuario no existe.";
        }
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

/**
 * @throws Exception
 * Funcion para restablecer contra
 */
function restablecer() {
    /**
     * Se crea una instancia a usuario
     */
    $usuario = new Usuario;
    $usuario->setCorreo(filter_input(INPUT_POST, "Correo"));
    if ($usuario->restablecer() == 1) {
        $email_user = "maximilianocarsi@gmail.com";
        $email_password = "C02101998m0644";
        $the_subject = "Restablecimiento de contraseña";
        $address_to = $usuario->getCorreo(); //correo del paciente
        $from_name = "Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional";
        $phpmailer = new PHPMailer();
        /**
         * datos de la cuenta de Gmail
         */
        $phpmailer->Username = $email_user;
        $phpmailer->Password = $email_password;
        $phpmailer->SMTPSecure = 'ssl';
        $phpmailer->Host = "smtp.gmail.com"; // GMail
        $phpmailer->Port = 465;
        $phpmailer->IsSMTP(); // use SMTP
        $phpmailer->SMTPAuth = true;
        $phpmailer->setFrom($phpmailer->Username, $from_name);
        $phpmailer->AddAddress($address_to); // recipients email
        $phpmailer->Subject = $the_subject;

        $phpmailer->Body .= "<h1 style='color:#3498db;'>Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional</h1>"; //Encabezado del correo
        $phpmailer->Body .= "<h2>Recuperación de contraseña.</h2>"; //Encabezado del correo
        $phpmailer->Body .= "<h3><b>Usuario:</b> " . $usuario->getUsuario() . "</h3>";
        $phpmailer->Body .= "<h3><b>Nombre:</b> " . $usuario->getNombre() . " " . $usuario->getAPaterno() . " " . $usuario->getAMaterno() . "</h3>";
        $phpmailer->Body .= "<h3><b>Contraseña:</b></h3>";
        $phpmailer->Body .= "<h2 style='color:#FF0000;'>" . $usuario->getContra() . "</h2>";
        $phpmailer->Body .= "<p>Es necesario cambiar la contraseña desde su perfil de usuario para seguir utilizando la plataforma </p>";
        $phpmailer->IsHTML(true);

        if ($phpmailer->Send()) {
            echo '<script type="text/javascript">alert("Email enviado");</script>';
            echo "<script type='text/javascript'>";
            echo "window.location.href ='/'";
            echo "</script>";
        } else {
            echo '<script type="text/javascript">alert("Algo Salio mal;");</script>';
            echo "<script type='text/javascript'>";
            echo "window.location.href ='/'";
            echo "</script>";
        }
    } else {
        echo '<script type="text/javascript">alert("Tiene una solicitud pendiente");</script>';
        echo "<script type='text/javascript'>";
        echo "window.location.href ='/'";
        echo "</script>";
    }
}

/**
 * funcion para actualizar
 */
function update() {
    /**
     * Se crea la instancia al objeto usuario
     */
    $usuario = new Usuario;
    /**
     * Se colocan los datos de POST por medio de los metodos SET del objeto
     */
    $usuario->setIdUsuario(filter_input(INPUT_POST, "id"));
    $usuario->setUsuario(filter_input(INPUT_POST, "Usuario"));
    $usuario->setNombre(filter_input(INPUT_POST, "Nombre"));
    $usuario->setAPaterno(filter_input(INPUT_POST, "Apaterno"));
    $usuario->setAMaterno(filter_input(INPUT_POST, "Amaterno"));
    $usuario->setCorreo(filter_input(INPUT_POST, "Correo"));
    $pass = filter_input(INPUT_POST, "Contra");
    /**
     * Se encripta la contrasena del usuario
     */
    $usuario->setContra(password_hash($pass, PASSWORD_BCRYPT));
    /**
     * se manda a llamar a la funcion insertar y se obtiene el id generado
     */
    $usuario->update();
    /**
     * Se crea la instancia de contra
     */
    $Contra = new Contra;
    /**
     * Se colocan los datos recibidos por POST
     */
    $Contra->setUsuarioID($usuario->getIdUsuario());
    $Contra->setContra($pass);
    /**
     * Se manda a llamar a la funcion de insertar
     */
    if ($Contra->update()) {
        /**
         * Se redirecciona a la pantalla principal
         */
        header('Location: logout.php');
    }
}

function updateAdmin() {
    /**
     * Se crea la instancia al objeto usuario
     */
    $usuario = new Usuario;
    /**
     * Se colocan los datos de POST por medio de los metodos SET del objeto
     */
    $usuario->setIdUsuario(filter_input(INPUT_POST, "id"));
    $usuario->setUsuario(filter_input(INPUT_POST, "Usuario"));
    $usuario->setNombre(filter_input(INPUT_POST, "Nombre"));
    $usuario->setAPaterno(filter_input(INPUT_POST, "Apaterno"));
    $usuario->setAMaterno(filter_input(INPUT_POST, "Amaterno"));
    $usuario->setCorreo(filter_input(INPUT_POST, "Correo"));
    $pass = filter_input(INPUT_POST, "Contra");
    /**
     * Se encripta la contrasena del usuario
     */
    $usuario->setContra(password_hash($pass, PASSWORD_BCRYPT));
    /**
     * se manda a llamar a la funcion insertar y se obtiene el id generado
     */
    $usuario->update();
    /**
     * Se crea la instancia de contra
     */
    $Contra = new Contra;
    /**
     * Se colocan los datos recibidos por POST
     */
    $Contra->setUsuarioID($usuario->getIdUsuario());
    $Contra->setContra($pass);
    /**
     * Se manda a llamar a la funcion de insertar
     */
    if ($Contra->update()) {
        echo "<script type='text/javascript'>";
        echo "window.location.href ='/aplicacion/vista/admin/admins.php'";
        echo "</script>";
    }
}

function Admins() {
    $Admins = new Usuario();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Admins->getAdmins());
}
function Comentarios() {
    $Admins = new Usuario();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Admins->getComentarios());
}

/**
 * Funcion para Eliminar un admin
 */
function Eliminar() {
    /**
     * Se crea una instanica a un grupo de cultivo
     */
    $Usuario = new Usuario();
    /**
     * Se coloca el Id del acuifero a eliminar por medio del metodo SET
     */
    $Usuario->setIdUsuario(filter_input(INPUT_GET, "ID"));
    /**
     * Se manda a llamar a la funcion de eliminar.
     */
    echo $Usuario->delete();
}

function getTodos() {
    $Usuarios = new Usuario();
    /**
     * Regresa los registros de los acuiferos
     */
    echo json_encode($Usuarios->getUsuarios());
}

function update2() {
    /**
     * Se crea la instancia al objeto usuario
     */
    $usuario = new Usuario;
    /**
     * Se colocan los datos de POST por medio de los metodos SET del objeto
     */
    $usuario->setIdUsuario(filter_input(INPUT_POST, "id"));
    $usuario->setUsuario(filter_input(INPUT_POST, "Usuario"));
    $usuario->setNombre(filter_input(INPUT_POST, "Nombre"));
    $usuario->setAPaterno(filter_input(INPUT_POST, "Apaterno"));
    $usuario->setAMaterno(filter_input(INPUT_POST, "Amaterno"));
    $usuario->setCorreo(filter_input(INPUT_POST, "Correo"));
    $pass = filter_input(INPUT_POST, "Contra");
    /**
     * Se encripta la contrasena del usuario
     */
    $usuario->setContra(password_hash($pass, PASSWORD_BCRYPT));
    /**
     * se manda a llamar a la funcion insertar y se obtiene el id generado
     */
    $usuario->update();
    /**
     * Se crea la instancia de contra
     */
    $Contra = new Contra;
    /**
     * Se colocan los datos recibidos por POST
     */
    $Contra->setUsuarioID($usuario->getIdUsuario());
    $Contra->setContra($pass);
    /**
     * Se manda a llamar a la funcion de insertar
     */
    if ($Contra->update()) {
        /**
         * Se redirecciona a la pantalla principal
         */
        header('Location: /aplicacion/vista/crud/dbadmin.php');
    }
}

function Registrar2() {
    try {
        /**
         * Se crea la instancia al objeto usuario
         */
        $usuario = new Usuario;
        /**
         * Se colocan los datos de POST por medio de los metodos SET del objeto
         */
        $usuario->setUsuario(filter_input(INPUT_POST, "Usuario"));
        $usuario->setNombre(filter_input(INPUT_POST, "Nombre"));
        $usuario->setAPaterno(filter_input(INPUT_POST, "Apaterno"));
        $usuario->setAMaterno(filter_input(INPUT_POST, "Amaterno"));
        $usuario->setSectorID(filter_input(INPUT_POST, "Sector"));
        $usuario->setCorreo(filter_input(INPUT_POST, "Correo"));
        $pass = filter_input(INPUT_POST, "Contra");
        /**
         * Se encripta la contrasena del usuario
         */
        $usuario->setContra(password_hash($pass, PASSWORD_BCRYPT));
        /**
         * se manda a llamar a la funcion insertar y se obtiene el id generado
         */
        $resp = $usuario->insert();
        /**
         * Se obtiene el sector al que perteece el usuario
         */
        switch ($usuario->getSectorID()) {
            case '2':
                /**
                 * Sector Educativo
                 * Se genera una instancia al modelo educativo
                 */
                $educativo = new Educativo;
                /**
                 * Se colocan los valores del POST por medio de los SET
                 */
                $educativo->setUsuarioID($resp);
                $educativo->setEscuela(filter_input(INPUT_POST, "Nombre_Escuela"));
                $educativo->setDireccion(filter_input(INPUT_POST, "Direccion"));
                $educativo->setCarrera(filter_input(INPUT_POST, "Carrera"));
                $educativo->setGrado(filter_input(INPUT_POST, "Grado"));
                $educativo->setGrupo(filter_input(INPUT_POST, "Grupo"));
                $educativo->setNivel(filter_input(INPUT_POST, "Nivel"));
                //Se llama a ala funcion insertar
                $educativo->insert();
                break;
            case '3':
                /**
                 * Sector Publico
                 * Se genera una instancia al modelo publico
                 */
                $publico = new Publico;
                /**
                 * Se colocan los valores del POST por medio de los SET
                 */
                $publico->setUsuarioId($resp);
                $publico->setInstitucion(filter_input(INPUT_POST, "Nombre_Institucion"));
                $publico->setDireccion(filter_input(INPUT_POST, "Direccion"));
                $publico->setGiro(filter_input(INPUT_POST, "Giro"));
                /**
                 * Se llama a ala funcion insertar
                 */
                $publico->insert();
                break;
            case '4':
                /**
                 * Sector Privado
                 * Se genera una instancia al modelo publico
                 */
                $privado = new Privado;
                /**
                 * Se colocan los valores del POST por medio de los SET
                 */
                $privado->setUsuarioID($resp);
                $privado->setEmpresa(filter_input(INPUT_POST, "Nombre_Empresa"));
                $privado->setDireccion(filter_input(INPUT_POST, "Direccion"));
                $privado->setGiro(filter_input(INPUT_POST, "Giro"));
                /**
                 * Se llama a ala funcion insertar
                 */
                $privado->insert();
                break;
        }
        /**
         * Insertar en la tabla secundaria de Contraseñas
         * Se crea la instancia de contra
         */
        $Contra = new Contra;
        /**
         * Se colocan los datos recibidos por POST
         */
        $Contra->setUsuarioID($resp);
        $Contra->setContra($pass);
        /**
         * Se manda a llamar a la funcion de insertar
         */
        $Contra->insert();
        /**
         * Se redirecciona a la pantalla principal
        $email_user = "maximilianocarsi@gmail.com";
        $email_password = "C02101998m0644";
        $the_subject = "Registro  Exitoso";
        $address_to = $usuario->getCorreo(); //correo del paciente
        $from_name = "Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional";
        $phpmailer = new PHPMailer();
        $phpmailer->Username = $email_user;
        $phpmailer->Password = $email_password;
        $phpmailer->SMTPSecure = 'ssl';
        $phpmailer->Host = "smtp.gmail.com"; // GMail
        $phpmailer->Port = 465;
        $phpmailer->IsSMTP(); // use SMTP
        $phpmailer->SMTPAuth = true;
        $phpmailer->setFrom($phpmailer->Username, $from_name);
        $phpmailer->AddAddress($address_to); // recipients email
        $phpmailer->Subject = $the_subject;

        $phpmailer->Body .= "<h1 style='color:#3498db;'>Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional</h1>"; //Encabezado del correo
        $phpmailer->Body .= "<h2>Registro  Exitoso</h2>"; //Encabezado del correo
        $phpmailer->Body .= "<h3><b>Usuario:</b> " . $usuario->getUsuario() . "</h3>";
        $phpmailer->Body .= "<h3><b>Nombre:</b> " . $usuario->getNombre() . " " . $usuario->getAPaterno() . " " . $usuario->getAMaterno() . "</h3>";
        $phpmailer->Body .= "<p>Ya eres parte del Sistema de Información Sobre el Uso del Agua de Riego a Nivel Nacional </p>";
        $phpmailer->IsHTML(true);

        if ($phpmailer->Send()) {
            echo '<script type="text/javascript">alert("Registro Exitoso");</script>';
            echo "<script type='text/javascript'>";
            echo "window.location.href ='/aplicacion/vista/crud/dbadmin.php'";
            echo "</script>";
        } else {
            //echo '<script type="text/javascript">alert("Algo Salio mal;");</script>';
            //echo "<script type='text/javascript'>";
            //echo "window.location.href ='/'";
            //echo "</script>";
        }*/
        echo '<script type="text/javascript">alert("Registro Exitoso");</script>';
        echo "<script type='text/javascript'>";
        echo "window.location.href ='/aplicacion/vista/crud/dbadmin.php'";
        echo "</script>";
    } catch (Exception $exc) {
        echo $exc->getTraceAsString();
        return false;
    }
}

function setComentario() {
    /**
     * Se crea la instancia al objeto usuario
     */
    $usuario = new Usuario;
    $usuario->setNombre(filter_input(INPUT_POST, "Nombre"));
    $usuario->setAPaterno(filter_input(INPUT_POST, "AP"));
    $usuario->setAMaterno(filter_input(INPUT_POST, "AM"));
    $Comentario = filter_input(INPUT_POST, "Comentario");
    if ($usuario->insertComentario($Comentario)) {
        echo '<script type="text/javascript">alert("Su comentario se ha enviado a nuestra base de datos uwu.");</script>';
        echo "<script type='text/javascript'>";
        echo "window.location.href ='/'";
        echo "</script>";
    }
}
