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