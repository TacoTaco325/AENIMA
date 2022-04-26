<?php

require_once 'conexion.php';

header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"); 
header('Access-Control-Allow-Methods: GET, POST, PUT'); 

class ModelCategoria{

    static public function getCategoria(){
        try {
            $statement = Conexion::connect()->prepare("SELECT * FROM categoria WHERE estado = 1");
            $statement->execute();

            return $statement->fetchAll(PDO::FETCH_CLASS);
        } catch (PDOException $e) {
            $json = array(
                "status"  => 404,
                "DETAILS" => $e->getMessage()
            );
            return $json;
        }
    }
}