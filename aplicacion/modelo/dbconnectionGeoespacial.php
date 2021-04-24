<?php

/**
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
class DBConnectionGeoespacial
{

    //Atributos de las clase de conexion de la base de datos.
    private $driver;
    private $host;
    private $user;
    private $pass;
    private $database;
    private $charset;
    function getDriver()
    {
        return $this->driver;
    }

    function getHost()
    {
        return $this->host;
    }

    function getUser()
    {
        return $this->user;
    }

    function getPass()
    {
        return $this->pass;
    }

    function getDatabase()
    {
        return $this->database;
    }

    function getCharset()
    {
        return $this->charset;
    }

    function setDriver($driver): void
    {
        $this->driver = $driver;
    }

    function setHost($host): void
    {
        $this->host = $host;
    }

    function setUser($user): void
    {
        $this->user = $user;
    }

    function setPass($pass): void
    {
        $this->pass = $pass;
    }

    function setDatabase($database): void
    {
        $this->database = $database;
    }

    function setCharset($charset): void
    {
        $this->charset = $charset;
    }

    //Funcion del constructor.
    public function __construct()
    {
        $servidor = $_SERVER['SERVER_NAME'];
        switch ($servidor) {
            case 'sisuar.imta.mx':
                //Vacia variabes constantes
                $this->setDriver('mysql');
                $this->setHost('localhost');
                $this->setUser('root');
                $this->setDatabase('geoespacial');
                $this->setPass('$sisuar2020$');
                $this->setCharset('utf8');
                break;
            default:
                // $this->setDriver('mysql');
                // $this->setHost('10.147.20.206');
                // $this->setUser('carsi');
                // $this->setDatabase('geoespacial');
                // $this->setPass('root');
                // $this->setCharset('utf8');
                $this->setDriver('mysql');
                $this->setHost('localhost');
                $this->setUser('root');
                $this->setDatabase('geoespacial');
                $this->setPass('');
                $this->setCharset('utf8');
                break;
        }
    }

    //Funcion para realizar la conexion a la base de datos mysql de nuestra plataforma.
    function DBConnect()
    {
        try {
            $dbg = new PDO($this->getDriver() . ":host=" . $this->getHost() . ";dbname=" . $this->getDatabase() . ";charset=" . $this->getCharset(), $this->getUser(), $this->getPass());
            $dbg->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true);
            $dbg->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return ($dbg);
        } catch (PDOException $exc) {
            echo $exc->getTraceAsString();
            print "Error: " . $exc->getMessage();
        }
    }
}
