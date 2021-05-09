<?php

/**
 * Copyright (c) 2020.
 * IMTA.
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


class InventarioDistrito
{
    /**
     * Variables de la clase
     */
    private $id_inventario;
    private $modulo_id;
    private $nom_modulo;
    private $sup_dominada;
    private $sup_regable;
    private $usuarios;
    private $presa_almacenamiento;
    private $presa_derivacio;
    private $diques;
    private $ptas_bomb;
    private $pozos;
    private $principal_rev_conc;
    private $principal_rev_mamp;
    private $principal_sin_rev;
    private $principal_suma;
    private $secundario_rev_conc;
    private $secundario_rev_mamp;
    private $secundario_sin_rev;
    private $secundario_suma;
    private $entubado;
    private $entubados_total;
    private $red_drenaje_principal;
    private $red_drenaje_secundario;
    private $red_drenaje_suma;
    private $red_caminos_pavimentados;
    private $red_caminos_revestidos;
    private $red_caminos_terraceria;
    private $red_caminos_total;
    private $estructuras_canales;
    private $etructura_drenes;
    private $estructuras_caminos;
    private $estructuras_suma;
    private $edificios_casetas;
    private $obras_diveversas;

    /**
     * InventarioDistrito constructor.
     */
    public function __construct()
    {
    }

    /**
     * @return mixed
     */
    public function getIdInventario()
    {
        return $this->id_inventario;
    }

    /**
     * @param mixed $id_inventario
     */
    public function setIdInventario($id_inventario)
    {
        $this->id_inventario = $id_inventario;
    }

    /**
     * @return mixed
     */
    public function getModuloId()
    {
        return $this->modulo_id;
    }

    /**
     * @param mixed $modulo_id
     */
    public function setModuloId($modulo_id)
    {
        $this->modulo_id = $modulo_id;
    }

    /**
     * @return mixed
     */
    public function getNomModulo()
    {
        return $this->nom_modulo;
    }

    /**
     * @param mixed $nom_modulo
     */
    public function setNomModulo($nom_modulo)
    {
        $this->nom_modulo = $nom_modulo;
    }

    /**
     * @return mixed
     */
    public function getSupDominada()
    {
        return $this->sup_dominada;
    }

    /**
     * @param mixed $sup_dominada
     */
    public function setSupDominada($sup_dominada)
    {
        $this->sup_dominada = $sup_dominada;
    }

    /**
     * @return mixed
     */
    public function getSupRegable()
    {
        return $this->sup_regable;
    }

    /**
     * @param mixed $sup_regable
     */
    public function setSupRegable($sup_regable)
    {
        $this->sup_regable = $sup_regable;
    }

    /**
     * @return mixed
     */
    public function getUsuarios()
    {
        return $this->usuarios;
    }

    /**
     * @param mixed $usuarios
     */
    public function setUsuarios($usuarios)
    {
        $this->usuarios = $usuarios;
    }

    /**
     * @return mixed
     */
    public function getPresaAlmacenamiento()
    {
        return $this->presa_almacenamiento;
    }

    /**
     * @param mixed $presa_almacenamiento
     */
    public function setPresaAlmacenamiento($presa_almacenamiento)
    {
        $this->presa_almacenamiento = $presa_almacenamiento;
    }

    /**
     * @return mixed
     */
    public function getPresaDerivacio()
    {
        return $this->presa_derivacio;
    }

    /**
     * @param mixed $presa_derivacio
     */
    public function setPresaDerivacio($presa_derivacio)
    {
        $this->presa_derivacio = $presa_derivacio;
    }

    /**
     * @return mixed
     */
    public function getDiques()
    {
        return $this->diques;
    }

    /**
     * @param mixed $diques
     */
    public function setDiques($diques)
    {
        $this->diques = $diques;
    }

    /**
     * @return mixed
     */
    public function getPtasBomb()
    {
        return $this->ptas_bomb;
    }

    /**
     * @param mixed $ptas_bomb
     */
    public function setPtasBomb($ptas_bomb)
    {
        $this->ptas_bomb = $ptas_bomb;
    }

    /**
     * @return mixed
     */
    public function getPozos()
    {
        return $this->pozos;
    }

    /**
     * @param mixed $pozos
     */
    public function setPozos($pozos)
    {
        $this->pozos = $pozos;
    }

    /**
     * @return mixed
     */
    public function getPrincipalRevConc()
    {
        return $this->principal_rev_conc;
    }

    /**
     * @param mixed $principal_rev_conc
     */
    public function setPrincipalRevConc($principal_rev_conc)
    {
        $this->principal_rev_conc = $principal_rev_conc;
    }

    /**
     * @return mixed
     */
    public function getPrincipalRevMamp()
    {
        return $this->principal_rev_mamp;
    }

    /**
     * @param mixed $principal_rev_mamp
     */
    public function setPrincipalRevMamp($principal_rev_mamp)
    {
        $this->principal_rev_mamp = $principal_rev_mamp;
    }

    /**
     * @return mixed
     */
    public function getPrincipalSinRev()
    {
        return $this->principal_sin_rev;
    }

    /**
     * @param mixed $principal_sin_rev
     */
    public function setPrincipalSinRev($principal_sin_rev)
    {
        $this->principal_sin_rev = $principal_sin_rev;
    }

    /**
     * @return mixed
     */
    public function getPrincipalSuma()
    {
        return $this->principal_suma;
    }

    /**
     * @param mixed $principal_suma
     */
    public function setPrincipalSuma($principal_suma)
    {
        $this->principal_suma = $principal_suma;
    }

    /**
     * @return mixed
     */
    public function getSecundarioRevConc()
    {
        return $this->secundario_rev_conc;
    }

    /**
     * @param mixed $secundario_rev_conc
     */
    public function setSecundarioRevConc($secundario_rev_conc)
    {
        $this->secundario_rev_conc = $secundario_rev_conc;
    }

    /**
     * @return mixed
     */
    public function getSecundarioRevMamp()
    {
        return $this->secundario_rev_mamp;
    }

    /**
     * @param mixed $secundario_rev_mamp
     */
    public function setSecundarioRevMamp($secundario_rev_mamp)
    {
        $this->secundario_rev_mamp = $secundario_rev_mamp;
    }

    /**
     * @return mixed
     */
    public function getSecundarioSinRev()
    {
        return $this->secundario_sin_rev;
    }

    /**
     * @param mixed $secundario_sin_rev
     */
    public function setSecundarioSinRev($secundario_sin_rev)
    {
        $this->secundario_sin_rev = $secundario_sin_rev;
    }

    /**
     * @return mixed
     */
    public function getSecundarioSuma()
    {
        return $this->secundario_suma;
    }

    /**
     * @param mixed $secundario_suma
     */
    public function setSecundarioSuma($secundario_suma)
    {
        $this->secundario_suma = $secundario_suma;
    }

    /**
     * @return mixed
     */
    public function getEntubado()
    {
        return $this->entubado;
    }

    /**
     * @param mixed $entubado
     */
    public function setEntubado($entubado)
    {
        $this->entubado = $entubado;
    }

    /**
     * @return mixed
     */
    public function getEntubadosTotal()
    {
        return $this->entubados_total;
    }

    /**
     * @param mixed $entubados_total
     */
    public function setEntubadosTotal($entubados_total)
    {
        $this->entubados_total = $entubados_total;
    }

    /**
     * @return mixed
     */
    public function getRedDrenajePrincipal()
    {
        return $this->red_drenaje_principal;
    }

    /**
     * @param mixed $red_drenaje_principal
     */
    public function setRedDrenajePrincipal($red_drenaje_principal)
    {
        $this->red_drenaje_principal = $red_drenaje_principal;
    }

    /**
     * @return mixed
     */
    public function getRedDrenajeSecundario()
    {
        return $this->red_drenaje_secundario;
    }

    /**
     * @param mixed $red_drenaje_secundario
     */
    public function setRedDrenajeSecundario($red_drenaje_secundario)
    {
        $this->red_drenaje_secundario = $red_drenaje_secundario;
    }

    /**
     * @return mixed
     */
    public function getRedDrenajeSuma()
    {
        return $this->red_drenaje_suma;
    }

    /**
     * @param mixed $red_drenaje_suma
     */
    public function setRedDrenajeSuma($red_drenaje_suma)
    {
        $this->red_drenaje_suma = $red_drenaje_suma;
    }

    /**
     * @return mixed
     */
    public function getRedCaminosPavimentados()
    {
        return $this->red_caminos_pavimentados;
    }

    /**
     * @param mixed $red_caminos_pavimentados
     */
    public function setRedCaminosPavimentados($red_caminos_pavimentados)
    {
        $this->red_caminos_pavimentados = $red_caminos_pavimentados;
    }

    /**
     * @return mixed
     */
    public function getRedCaminosRevestidos()
    {
        return $this->red_caminos_revestidos;
    }

    /**
     * @param mixed $red_caminos_revestidos
     */
    public function setRedCaminosRevestidos($red_caminos_revestidos)
    {
        $this->red_caminos_revestidos = $red_caminos_revestidos;
    }

    /**
     * @return mixed
     */
    public function getRedCaminosTerraceria()
    {
        return $this->red_caminos_terraceria;
    }

    /**
     * @param mixed $red_caminos_terraceria
     */
    public function setRedCaminosTerraceria($red_caminos_terraceria)
    {
        $this->red_caminos_terraceria = $red_caminos_terraceria;
    }

    /**
     * @return mixed
     */
    public function getRedCaminosTotal()
    {
        return $this->red_caminos_total;
    }

    /**
     * @param mixed $red_caminos_total
     */
    public function setRedCaminosTotal($red_caminos_total)
    {
        $this->red_caminos_total = $red_caminos_total;
    }

    /**
     * @return mixed
     */
    public function getEstructurasCanales()
    {
        return $this->estructuras_canales;
    }

    /**
     * @param mixed $estructuras_canales
     */
    public function setEstructurasCanales($estructuras_canales)
    {
        $this->estructuras_canales = $estructuras_canales;
    }

    /**
     * @return mixed
     */
    public function getEtructuraDrenes()
    {
        return $this->etructura_drenes;
    }

    /**
     * @param mixed $etructura_drenes
     */
    public function setEtructuraDrenes($etructura_drenes)
    {
        $this->etructura_drenes = $etructura_drenes;
    }

    /**
     * @return mixed
     */
    public function getEstructurasCaminos()
    {
        return $this->estructuras_caminos;
    }

    /**
     * @param mixed $estructuras_caminos
     */
    public function setEstructurasCaminos($estructuras_caminos)
    {
        $this->estructuras_caminos = $estructuras_caminos;
    }

    /**
     * @return mixed
     */
    public function getEstructurasSuma()
    {
        return $this->estructuras_suma;
    }

    /**
     * @param mixed $estructuras_suma
     */
    public function setEstructurasSuma($estructuras_suma)
    {
        $this->estructuras_suma = $estructuras_suma;
    }

    /**
     * @return mixed
     */
    public function getEdificiosCasetas()
    {
        return $this->edificios_casetas;
    }

    /**
     * @param mixed $edificios_casetas
     */
    public function setEdificiosCasetas($edificios_casetas)
    {
        $this->edificios_casetas = $edificios_casetas;
    }

    /**
     * @return mixed
     */
    public function getObrasDiveversas()
    {
        return $this->obras_diveversas;
    }

    /**
     * @param mixed $obras_diveversas
     */
    public function setObrasDiveversas($obras_diveversas)
    {
        $this->obras_diveversas = $obras_diveversas;
    }

    public function getDistritos()
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $select = $db->prepare('SELECT
            organismo.id_organismo,
            organismo.nombre as organismo,
            organismo.numero,
            estado.id_estado,
            estado.nombre as estado,
            distrito_riego.id_distrito_riego,
            distrito_riego.nom_dr as distrito,
            modulos_dr.id_modulo,
            modulos_dr.nom_oficial,
            modulos_dr.nombre,
            modulos_dr.srl,
            modulos_dr.unidad,
            modulos_dr.grupo,
            fuente_modulo.id_fuente,
            fuente_modulo.aprovechameinto,
            inventario_dr.sup_dominada,
            inventario_dr.sup_regable,
            inventario_dr.usuarios,
            inventario_dr.presa_almacenamiento,
            inventario_dr.presa_derivacio,
            inventario_dr.diques,
            inventario_dr.ptas_bomb,
            inventario_dr.pozos,
            inventario_dr.principal_rev_conc,
            inventario_dr.principal_rev_mamp,
            inventario_dr.principal_sin_rev,
            inventario_dr.principal_suma,
            inventario_dr.secundario_rev_conc,
            inventario_dr.secundario_rev_mamp,
            inventario_dr.secundario_sin_rev,
            inventario_dr.secundario_suma,
            inventario_dr.entubado,
            inventario_dr.entubados_total,
            inventario_dr.red_drenaje_principal,
            inventario_dr.red_drenaje_secundario,
            inventario_dr.red_drenaje_suma,
            inventario_dr.red_caminos_pavimentados,
            inventario_dr.red_caminos_revestidos,
            inventario_dr.red_caminos_terraceria,
            inventario_dr.red_caminos_total,
            inventario_dr.estructuras_canales,
            inventario_dr.etructura_drenes,
            inventario_dr.estructuras_caminos,
            inventario_dr.estructuras_suma,
            inventario_dr.edificios_casetas,
            inventario_dr.obras_diveversas
            FROM inventario_dr
            INNER JOIN modulos_dr on modulos_dr.id_modulo=inventario_dr.modulo_id
            INNER JOIN organismo on organismo.id_organismo=modulos_dr.oc_id
            INNER JOIN estado on estado.id_estado=modulos_dr.estado_id
            INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=modulos_dr.distrito_id
            INNER JOIN fuente_modulo on fuente_modulo.id_fuente=modulos_dr.fuente_id
            GROUP BY id_organismo');
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

    public function InventarioTabla($query)
    {
        $pdo = new DBConnection();
        $db = $pdo->DBConnect();
        try {
            $db->beginTransaction();
            $sql = 'SELECT
            organismo.id_organismo,
            organismo.nombre as organismo,
            organismo.numero,
            estado.id_estado,
            estado.nombre as estado,
            distrito_riego.id_distrito_riego,
            distrito_riego.nom_dr as distrito,
            modulos_dr.id_modulo,
            modulos_dr.nom_oficial,
            modulos_dr.nombre,
            modulos_dr.srl,
            modulos_dr.unidad,
            modulos_dr.grupo,
            fuente_modulo.id_fuente,
            fuente_modulo.aprovechameinto,
            sum(inventario_dr.sup_dominada) as sup_dominada,
            sum(inventario_dr.sup_regable) as sup_regable,
            sum(inventario_dr.usuarios) as usuarios,
            sum(inventario_dr.presa_almacenamiento) as presa_almacenamiento,
            sum(inventario_dr.presa_derivacio) as presa_derivacio,
            sum(inventario_dr.diques) as diques,
            sum(inventario_dr.ptas_bomb) as ptas_bomb,
            sum(inventario_dr.pozos) as pozos,
            sum(inventario_dr.principal_rev_conc) as principal_rev_conc,
            sum(inventario_dr.principal_rev_mamp) as principal_rev_mamp,
            sum(inventario_dr.principal_sin_rev) as principal_sin_rev,
            sum(inventario_dr.principal_suma) as principal_suma,
            sum(inventario_dr.secundario_rev_conc) as secundario_rev_conc,
            sum(inventario_dr.secundario_rev_mamp) as secundario_rev_mamp,
            sum(inventario_dr.secundario_sin_rev) as secundario_sin_rev,
            sum(inventario_dr.secundario_suma) as secundario_suma,
            sum(inventario_dr.entubado) as entubado,
            sum(inventario_dr.entubados_total) as entubados_total,
            sum(inventario_dr.red_drenaje_principal) as red_drenaje_principal,
            sum(inventario_dr.red_drenaje_secundario) as red_drenaje_secundario,
            sum(inventario_dr.red_drenaje_suma) as red_drenaje_suma,
            sum(inventario_dr.red_caminos_pavimentados) as red_caminos_pavimentados,
            sum(inventario_dr.red_caminos_revestidos) as red_caminos_revestidos,
            sum(inventario_dr.red_caminos_terraceria) as red_caminos_terraceria,
            sum(inventario_dr.red_caminos_total) as red_caminos_total,
            sum(inventario_dr.estructuras_canales) as estructuras_canales,
            sum(inventario_dr.etructura_drenes) as etructura_drenes,
            sum(inventario_dr.estructuras_caminos) as estructuras_caminos,
            sum(inventario_dr.estructuras_suma) as estructuras_suma,
            sum(inventario_dr.edificios_casetas) as edificios_casetas,
            sum(inventario_dr.obras_diveversas) as obras_diveversas
            FROM inventario_dr
            INNER JOIN modulos_dr on modulos_dr.id_modulo=inventario_dr.modulo_id
            INNER JOIN organismo on organismo.id_organismo=modulos_dr.oc_id
            INNER JOIN estado on estado.id_estado=modulos_dr.estado_id
            INNER JOIN distrito_riego on distrito_riego.id_distrito_riego=modulos_dr.distrito_id
            INNER JOIN fuente_modulo on fuente_modulo.id_fuente=modulos_dr.fuente_id
            WHERE ' . $query;
            $select = $db->prepare($sql);
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
}