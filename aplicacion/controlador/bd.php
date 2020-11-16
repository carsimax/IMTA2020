
<?php
require_once("../modelo/dbconnection.php");
//En eta parte se recibe la accion que debe realizar el controlador por medio del POST.
set_time_limit(10800);
ini_set('memory_limit', '1024M');
$accion = filter_input(INPUT_POST, "Accion");
if (filter_input(INPUT_POST, "Accion") == NULL) {
    $accion = filter_input(INPUT_GET, "Accion");
}
//Se crea un switch para determinar que acciones realizar para cada operacion del controlador.
switch ($accion) {
    //Si se quiere realizar una copia de la base de datos
    case 'Copia':
        try {
            //Se manda a llamar la funcion de copia de seguridad.
            Copia();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
    //Si se quiere restaurar la base de datos
    case 'Restaurar':
        try {
            //Se manda a llamar la funcion de restaurar.
            Restaurar();
        } catch (Exception $exc) {
            echo $exc->getTraceAsString();
        }
        break;
}

//Funcion para realizar la copia de seguridad de la base de datos
function Copia() {
    if (!isset($_SESSION)) {
        session_start();
    }
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Realizó una copia de seguridad.";
    $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
    $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
    if ($select->execute()) {
        ob_start();
        $database = $pdo->getDatabase();
        $user = $pdo->getUser();
        $pass = $pdo->getPass();
        $host = $pdo->getHost();
        $fecha = date("m.d.y");
        $mysqlExportPath = $database . '_' . $fecha . '.sql';
        $dir = dirname(__FILE__) . '/' . $mysqlExportPath;
        if (PHP_OS == 'Linux') {
            exec("mysqldump --max_allowed_packet=512M --opt --user={$user} --password={$pass} --host={$host} {$database} --result-file={$dir} 2>&1", $output);
            // var_dump($output);
            header("Content-disposition: attachment; filename=" . $mysqlExportPath);
            header("Content-type: application/octet-stream");
            readfile($mysqlExportPath);
        } else {
            
            exec("C:/xampp/mysql/bin/mysqldump --opt --user={$user} --password={$pass} --host={$host} {$database} --result-file={$dir} 2>&1", $output);
            // var_dump($output);
            header("Content-disposition: attachment; filename=" . $mysqlExportPath);
            header("Content-type: application/octet-stream");
            readfile($mysqlExportPath);
        }
    }
    unlink($dir);
}

//funcion para restuarar la base de datos
function Restaurar() {
    ob_start();
    if (!isset($_SESSION)) {
        session_start();
    }
    $pdo = new DBConnection();
    $db = $pdo->DBConnect();
    //Introduzca aqu� la informaci�n de su base de datos y el nombre del archivo de copia de seguridad.
    $database = $pdo->getDatabase();
    $user = $pdo->getUser();
    $pass = $pdo->getPass();
    $host = $pdo->getHost();
    $archivoRecibido = $_FILES["base"]["tmp_name"];
    
    $destino = dirname(__FILE__) . '/restore.sql';
    if (!move_uploaded_file($archivoRecibido, $destino)) {
        $mensaje = 'EL proceso ha fallado';
        echo $mensaje;
    }
    if (PHP_OS == 'Linux') {
        exec("mysql --user={$user} --password={$pass} --host={$host} {$database} < {$destino}", $output, $worked);
        switch ($worked) {
            case 0:
                unlink("restore.sql");
                echo '<script type="text/javascript">alert("La copia de seguridad se ha restaurado correctamente.");</script>';
                echo "<script type='text/javascript'>";
                echo "window.history.back(-1)";
                echo "</script>";
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Restauró la base de datos.";
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                $select->execute();
                break;
            case 1:
                echo 'Se ha producido un error durante la importaci�n. Por favor, compruebe si el archivo est� en la misma carpeta que este script. Compruebe tambi�n los siguientes datos de nuevo: <br/><br/><table><tr><td>Nombre de la base de datos MySQL:</td><td><b>' . $database . '</b></td></tr><tr><td>Nombre de usuario MySQL:</td><td><b>' . $user . '</b></td></tr><tr><td>Contrase�a MySQL:</td><td><b>NOTSHOWN</b></td></tr><tr><td>Nombre de host MySQL:</td><td><b>' . $host . '</b></td></tr><tr><td>Nombre de archivo de la importaci�n de MySQL:</td><td><b>' . $destino . '</b></td></tr></table>';
                break;
        }
    } else {
        exec("C:/xampp/mysql/bin/mysql  --user={$user} --password={$pass} --host={$host} {$database} < {$destino}", $output, $worked);
        switch ($worked) {
            case 0:
                unlink("restore.sql");
                echo '<script type="text/javascript">alert("La copia de seguridad se ha restaurado correctamente.");</script>';
                echo "<script type='text/javascript'>";
                echo "window.history.back(-1)";
                echo "</script>";
                $cadena = "El administrador " . $_SESSION['ID_Usuario'] . " Restauró la base de datos.";
                $select = $db->prepare('INSERT INTO tabla_version VALUES(0,NOW(),:cadena)');
                $select->bindValue('cadena', $cadena, PDO::PARAM_STR);
                $select->execute();
                break;
            case 1:
                echo 'Se ha producido un error durante la importaci�n. Por favor, compruebe si el archivo est� en la misma carpeta que este script. Compruebe tambi�n los siguientes datos de nuevo: <br/><br/><table><tr><td>Nombre de la base de datos MySQL:</td><td><b>' . $database . '</b></td></tr><tr><td>Nombre de usuario MySQL:</td><td><b>' . $user . '</b></td></tr><tr><td>Contrase�a MySQL:</td><td><b>NOTSHOWN</b></td></tr><tr><td>Nombre de host MySQL:</td><td><b>' . $host . '</b></td></tr><tr><td>Nombre de archivo de la importaci�n de MySQL:</td><td><b>' . $destino . '</b></td></tr></table>';
                break;
        }
    }
//Importaci�n de la base de datos y salida del status
    unlink($destino);
}
?>
