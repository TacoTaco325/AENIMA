<?php

require_once 'conexion.php';

header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept"); 
header('Access-Control-Allow-Methods: GET, POST, PUT'); 


class ModelProducto{

    static public function getProductos(){
        try {
            $statement = Conexion::connect()->prepare("SELECT p.idpro, p.nombre, p.idcat, c.categoria, p.precio, p.stock, p.imagen, p.descripcion, p.estado FROM producto p INNER JOIN categoria c ON p.idcat = c.idcat WHERE p.estado = 1");
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

    static public function getProductoCat($idcat){
        try {
            $statement = Conexion::connect()->prepare("SELECT p.idpro, p.nombre, p.idcat, c.categoria, p.precio, p.stock, p.imagen, p.descripcion, p.estado FROM producto p INNER JOIN categoria c ON p.idcat = c.idcat WHERE c.idcat = '$idcat'");
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

    static public function insertProducto($data){
        try {
            $query = "INSERT INTO producto (  nombre ,  idcat ,  precio,  stock,  imagen,  descripcion,  estado ) 
                                    VALUES ( :nombre , :idcat , :precio, :stock, :imagen, :descripcion, 1 )";
            $statement = Conexion::connect()->prepare($query);
            $statement->execute([':nombre'=>$data['nombre'],
                                ':idcat'=>$data['idcat'], 
                                ':precio'=>$data['precio'], 
                                ':stock'=>$data['stock'], 
                                ':imagen'=>$data['imagen'], 
                                ':descripcion'=>$data['descripcion']]);
            $json = array(
                "status"  => 204,
                "DETAILS" => 'SUCCESSFUL REQUEST'
            );

            return $json;
        } catch (PDOException $e) {
            $json = array(
                "status"  => 404,
                "DETAILS" => $e->getMessage()
            );
            return $json;
        }
    }

    static public function updateProducto($data){
        try {
            $query = "UPDATE producto SET nombre = :nombre , idcat = :idcat , precio = :precio , stock = :stock ,
                                         imagen = :imagen, descripcion = :descripcion WHERE idpro = :idpro";
            $statement = Conexion::connect()->prepare($query);
            $statement->execute([':idpro'=>$data['idpro'],
                                ':nombre'=>$data['nombre'],
                                ':idcat'=>$data['idcat'], 
                                ':precio'=>$data['precio'], 
                                ':stock'=>$data['stock'], 
                                ':imagen'=>$data['imagen'], 
                                ':descripcion'=>$data['descripcion']]);
            $json = array(
                "status"  => 204,
                "DETAILS" => 'SUCCESSFUL REQUEST'
            );

            return $json;
        } catch (PDOException $e) {
            $json = array(
                "status"  => 404,
                "DETAILS" => $e->getMessage()
            );
            return $json;
        }
    }

    static public function deleteProducto($idpro){
        try {
            $query = "UPDATE producto SET estado = 0 WHERE idpro = '$idpro'";
            $statement = Conexion::connect()->prepare($query);
            $statement->execute();
            $json = array(
                "status"  => 204,
                "DETAILS" => 'SUCCESSFUL REQUEST'
            );

            return $json;
        } catch (PDOException $e) {
            $json = array(
                "status"  => 404,
                "DETAILS" => $e->getMessage()
            );
            return $json;
        }
    }




}