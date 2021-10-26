<?php
session_start();
require_once(__DIR__ . "/../modelo/dbconnection.php");
$pdo = new DBConnection();
$db = $pdo->DBConnect();
try {
    $sql = 'SET GLOBAL key_buffer_size=8589934592';
    $select = $db->prepare($sql);
    $select->execute();
    /**
     * Cambiamos el valor del max_allowed
     */
    $sql = 'SET GLOBAL max_allowed_packet=8589934592';
    $select = $db->prepare($sql);
    $select->execute();
    /**
     * Cambiamos el valor  maximo de conexiones
     */
    $sql = 'SET GLOBAL max_connections=3600';
    $select = $db->prepare($sql);
    $select->execute();
    /**
     * Cambiamos el valor  thread_cache_size
     */
    $sql = 'SET GLOBAL thread_cache_size=3600';
    $select = $db->prepare($sql);
    $select->execute();
    /**
     * Cambiamos el valor  sort_buffer_size
     */
    $sql = 'SET GLOBAL sort_buffer_size=8589934592';
    $select = $db->prepare($sql);
    $select->execute();
    /**
     * Cambiamos el valor  read_buffer_size
     */
    $sql = 'SET GLOBAL read_buffer_size=8589934592';
    $select = $db->prepare($sql);
    $select->execute();
} catch (PDOException $exc) {
    $db->rollback();
    $db = null;
    echo $exc->getMessage();
    return null;
}
header("Location:/aplicacion/vista/principal.php");
die();
