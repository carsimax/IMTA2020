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
require_once("dbconnection.php");

/**
 * Class Usuario
 */
class Usuario {

    /**
     * @var
     */
    private $id_usuario;
    private $usuario;
    private $nombre;
    private $a_paterno;
    private $a_materno;
    private $foto;
    private $correo;
    private $contra;
    private $is_acuifero;
    private $is_pozo;
    private $is_estadistico;
    private $rol_id;
    private $sector_id;
    private $is_olvidad;
    private $Token;
    private $Verificar;


     /**
     * @return mixed
     */
    public function getVerificar() {
        return $this->Verificar;
    }

    /**
     * @param mixed $is_olvidad
     */
    public function setVerificar($Verificar) {
        $this->Verificar = $Verificar;
    }

    /**
     * @return mixed
     */
    public function getIsOlvidad() {
        return $this->is_olvidad;
    }

    /**
     * @param mixed $is_olvidad
     */
    public function setIsOlvidad($is_olvidad) {
        $this->is_olvidad = $is_olvidad;
    }

    /**
     * @return mixed
     */
    public function getIdUsuario() {
        return $this->id_usuario;
    }

    /**
     * @param mixed $id_usuario
     */
    public function setIdUsuario($id_usuario) {
        $this->id_usuario = $id_usuario;
    }

    /**
     * @return mixed
     */
    public function getUsuario() {
        return $this->usuario;
    }

    /**
     * @param mixed $usuario
     */
    public function setUsuario($usuario) {
        $this->usuario = $usuario;
    }

    /**
     * @return mixed
     */
    public function getNombre() {
        return $this->nombre;
    }

    /**
     * @param mixed $nombre
     */
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    /**
     * @return mixed
     */
    public function getAPaterno() {
        return $this->a_paterno;
    }

    /**
     * @param mixed $a_paterno
     */
    public function setAPaterno($a_paterno) {
        $this->a_paterno = $a_paterno;
    }

    /**
     * @return mixed
     */
    public function getAMaterno() {
        return $this->a_materno;
    }

    /**
     * @param mixed $a_materno
     */
    public function setAMaterno($a_materno) {
        $this->a_materno = $a_materno;
    }

    /**
     * @return mixed
     */
    public function getFoto() {
        return $this->foto;
    }

    /**
     * @param mixed $foto
     */
    public function setFoto($foto) {
        $this->foto = $foto;
    }

    /**
     * @return mixed
     */
    public function getCorreo() {
        return $this->correo;
    }

    /**
     * @param mixed $correo
     */
    public function setCorreo($correo) {
        $this->correo = $correo;
    }

    /**
     * @return mixed
     */
    public function getContra() {
        return $this->contra;
    }

    /**
     * @param mixed $contra
     */
    public function setContra($contra) {
        $this->contra = $contra;
    }

    /**
     * @return mixed
     */
    public function getIsAcuifero() {
        return $this->is_acuifero;
    }

    /**
     * @param mixed $is_acuifero
     */
    public function setIsAcuifero($is_acuifero) {
        $this->is_acuifero = $is_acuifero;
    }

    /**
     * @return mixed
     */
    public function getIsPozo() {
        return $this->is_pozo;
    }

    /**
     * @param mixed $is_pozo
     */
    public function setIsPozo($is_pozo) {
        $this->is_pozo = $is_pozo;
    }

    /**
     * @return mixed
     */
    public function getIsEstadistico() {
        return $this->is_estadistico;
    }

    /**
     * @param mixed $is_estadistico
     */
    public function setIsEstadistico($is_estadistico) {
        $this->is_estadistico = $is_estadistico;
    }

    /**
     * @return mixed
     */
    public function getRolId() {
        return $this->rol_id;
    }

    /**
     * @param mixed $rol_id
     */
    public function setRolId($rol_id) {
        $this->rol_id = $rol_id;
    }

    /**
     * @return mixed
     */
    public function getSectorId() {
        return $this->sector_id;
    }

    /**
     * @param mixed $sector_id
     */
    public function setSectorId($sector_id) {
        $this->sector_id = $sector_id;
    }

    /**
     * @return mixed
     */
    public function getToken() {
        return $this->Token;
    }

    /**
     * @param mixed $sector_id
     */
    public function setToken($Token) {
        $this->Token = $Token;
    }

    /**
     * @return int|null
     */
    public function verificarUsuario() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT usuario FROM usuario WHERE usuario LIKE :usuario ');
            $select->bindValue('usuario', $this->getUsuario(), PDO::PARAM_STR);
            $select->execute();
            $registro = $select->rowCount();
            return $registro;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return int|null
     */
    public function verificarCorreo() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT correo FROM usuario WHERE correo LIKE :correo ');
            $select->bindValue('correo', $this->getCorreo(), PDO::PARAM_STR);
            $select->execute();
            $registro = $select->rowCount();
            return $registro;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return mixed
     */
    public function insert() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('INSERT INTO usuario(usuario, nombre, a_paterno, a_materno,correo, contra,rol_id, sector_id,is_olvidada,verificar,token) 
        VALUES (:usuario,:nombre,:a_paterno,:a_materno,:correo,:contra,3,:sector_id,0,0,:token)');
        $select->bindValue('usuario', $this->getUsuario(), PDO::PARAM_STR);
        $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
        $select->bindValue('a_paterno', $this->getAPaterno(), PDO::PARAM_STR);
        $select->bindValue('a_materno', $this->getAMaterno(), PDO::PARAM_STR);
        $select->bindValue('sector_id', $this->getSectorID(), PDO::PARAM_INT);
        $select->bindValue('correo', $this->getCorreo(), PDO::PARAM_STR);
        $select->bindValue('contra', $this->getContra(), PDO::PARAM_STR);
        $select->bindValue('token', $this->getToken(), PDO::PARAM_STR);
        $select->execute();
        //Obtener el ultimo
        $select = $db->prepare('SELECT MAX(id_usuario) AS id FROM usuario');
        $select->execute();
        $registro = $select->fetch();
        return $registro['id'];
    }

    public function insertAdmin() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('INSERT INTO usuario(usuario, nombre, a_paterno, a_materno,correo, contra,rol_id, sector_id,is_olvidada) 
        VALUES (:usuario,:nombre,:a_paterno,:a_materno,:correo,:contra,2,1,0)');
        $select->bindValue('usuario', $this->getUsuario(), PDO::PARAM_STR);
        $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
        $select->bindValue('a_paterno', $this->getAPaterno(), PDO::PARAM_STR);
        $select->bindValue('a_materno', $this->getAMaterno(), PDO::PARAM_STR);
        $select->bindValue('correo', $this->getCorreo(), PDO::PARAM_STR);
        $select->bindValue('contra', $this->getContra(), PDO::PARAM_STR);
        $select->execute();
        //Obtener el ultimo
        $select = $db->prepare('SELECT MAX(id_usuario) AS id FROM usuario');
        $select->execute();
        $registro = $select->fetch();
        return $registro['id'];
    }

    /**
     * @return Usuario|null
     */
    public function login() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM usuario WHERE correo=:correo OR usuario=:usuario');
            $select->bindValue('correo', $this->getCorreo(), PDO::PARAM_STR);
            $select->bindValue('usuario', $this->getUsuario(), PDO::PARAM_STR);
            $select->execute();
            $registro = $select->fetch();
            $usuario = new Usuario();
            if (!empty($registro)) {
                $usuario->setIDUsuario($registro['id_usuario']);
                $usuario->setUsuario($registro['usuario']);
                $usuario->setNombre($registro['nombre']);
                $usuario->setAPaterno($registro['a_paterno']);
                $usuario->setAMaterno($registro['a_materno']);
                $usuario->setFoto($registro['foto']);
                $usuario->setRolID($registro['rol_id']);
                $usuario->setSectorID($registro['sector_id']);
                $usuario->setCorreo($registro['correo']);
                $usuario->setContra($registro['contra']);
                $usuario->setIsOlvidad($registro['is_olvidada']);
                $usuario->setVerificar($registro['verificar']);
            }
            return $usuario;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return |null
     */
    public function getSector() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select id_usuario,sector from sector inner join usuario on usuario.sector_id=sector.id_sector WHERE id_usuario=:id_usuario');
            $select->bindValue('id_usuario', $this->getIdUsuario(), PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            return $registro['sector'];
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return |null
     */
    public function getGrado() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select nivel from usuario_educativo WHERE usuario_id=:id_usuario');
            $select->bindValue('id_usuario', $this->getIdUsuario(), PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            return $registro['nivel'];
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return |null
     */
    public function getEscuela() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select escuela from usuario_educativo WHERE usuario_id=:id_usuario');
            $select->bindValue('id_usuario', $this->getIdUsuario(), PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            return $registro['escuela'];
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return |null
     */
    public function getPublico() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select institucion from usuario_publico WHERE usuario_id=:id_usuario');
            $select->bindValue('id_usuario', $this->getIdUsuario(), PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            return $registro['institucion'];
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return |null
     */
    public function getPrivado() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('select empresa from usuario_privado WHERE usuario_id=:id_usuario');
            $select->bindValue('id_usuario', $this->getIdUsuario(), PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            return $registro['empresa'];
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return int|mixed|null
     */
    public function restablecer($correo) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            //Obtener informacion del usuario
            $select = $db->prepare('SELECT * FROM usuario WHERE correo=:correo');
            $select->bindValue('correo', $correo, PDO::PARAM_STR);
            $select->execute();
            $registro = $select->fetch();
            $this->setIDUsuario($registro['id_usuario']);
            $this->setUsuario($registro['usuario']);
            $this->setNombre($registro['nombre']);
            $this->setAPaterno($registro['a_paterno']);
            $this->setAMaterno($registro['a_materno']);
            $this->setFoto($registro['foto']);
            $this->setRolID($registro['rol_id']);
            $this->setSectorID($registro['sector_id']);
            $this->setCorreo($registro['correo']);
            //Sacar la contra
            $select = $db->prepare('SELECT * FROM contra WHERE usuario_id=:usuario_id');
            $select->bindValue('usuario_id', $this->getIdUsuario(), PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            return $registro['contra'];
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return $this|null
     */
    public function getUsu() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {


            $select = $db->prepare('SELECT * FROM usuario WHERE id_usuario=:id_usuario');
            $select->bindValue('id_usuario', $this->getIdUsuario(), PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setIDUsuario($registro['id_usuario']);
            $this->setUsuario($registro['usuario']);
            $this->setNombre($registro['nombre']);
            $this->setAPaterno($registro['a_paterno']);
            $this->setAMaterno($registro['a_materno']);
            $this->setFoto($registro['foto']);
            $this->setRolID($registro['rol_id']);
            $this->setSectorID($registro['sector_id']);
            $this->setCorreo($registro['correo']);
            $this->setIsOlvidad($registro['is_olvidada']);

            //Sacar la contra
            $select = $db->prepare('SELECT * FROM contra WHERE usuario_id=:usuario_id');
            $select->bindValue('usuario_id', $this->getIdUsuario(), PDO::PARAM_INT);
            $select->execute();
            $registro = $select->fetch();
            $this->setContra($registro['contra']);

            return $this;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return bool
     */
    public function update() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('UPDATE usuario SET 
        usuario=:usuario,
        nombre=:nombre,
        a_paterno=:a_paterno,
        a_materno=:a_materno,
        correo=:correo,
        contra=:contra,
        is_olvidada=0
        WHERE id_usuario=:id_usuario');
        $select->bindValue('id_usuario', $this->getIdUsuario(), PDO::PARAM_INT);
        $select->bindValue('usuario', $this->getUsuario(), PDO::PARAM_STR);
        $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
        $select->bindValue('a_paterno', $this->getAPaterno(), PDO::PARAM_STR);
        $select->bindValue('a_materno', $this->getAMaterno(), PDO::PARAM_STR);
        $select->bindValue('correo', $this->getCorreo(), PDO::PARAM_STR);
        $select->bindValue('contra', $this->getContra(), PDO::PARAM_STR);
        return $select->execute();
    }

    public function getAdmins() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM usuario WHERE rol_id=2');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function getComentarios() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM comentario');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    /**
     * @return bool|null
     */
    public function delete() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $select = $db->prepare('DELETE FROM usuario WHERE id_usuario=:id_usuario');
            //Colocamos los datos
            $select->bindValue('id_usuario', $this->getIdUsuario(), PDO::PARAM_INT);
            return $select->execute();
        } catch (PDOException $exc) {
            return null;
        }
    }
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

    public function getUsuarios() {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT * FROM usuario WHERE rol_id=3');
            $select->execute();
            $registros = $select->fetchAll(PDO::FETCH_ASSOC);
            return $registros;
        } catch (PDOException $exc) {
            $db->rollback();
            $db = null;
            echo $exc->getMessage();
            return null;
        }
    }

    public function insertComentario($comentario) {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        $select = $db->prepare('INSERT INTO comentario VALUES (0,:nombre,:ap,:am,:comentario,NOW())');
        $select->bindValue('nombre', $this->getNombre(), PDO::PARAM_STR);
        $select->bindValue('ap', $this->getAPaterno(), PDO::PARAM_STR);
        $select->bindValue('am', $this->getAMaterno(), PDO::PARAM_STR);
        $select->bindValue('comentario', $comentario, PDO::PARAM_STR);
        return $select->execute();
    }

}
