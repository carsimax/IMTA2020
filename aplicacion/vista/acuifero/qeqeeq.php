<?php
    require('../modelo/usuario.php');
    $email= $_GET['email'];
    $token=$_GET['token'];
    $usuario=new Usuario;
    if($usuario->tokenVer($email,$token)==1){
        echo "<script type='text/javascript'>";
        echo "window.location.href ='/'";
        echo "</script>";
    }
?>

public function tokenVer($email, $token)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('UPDATE usuario SET
        verificar=1
        WHERE correo=:correo AND token=:token');
        $select->bindValue('correo', $email, PDO::PARAM_STR);
        $select->bindValue('token', $token, PDO::PARAM_STR);
        return $select->execute();
    }