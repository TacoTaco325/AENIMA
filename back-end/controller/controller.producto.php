<?php

require_once "model/model.producto.php";

class ControllerProducto{

    public function getProductos(){
        
        $result = ModelProducto::getProductos();
        $json ["producto"]= $result;
        
        echo json_encode($json);
        return;
    }

    public function getProductoCat($idcat){

        $result = ModelProducto::getProductoCat($idcat);
        $json ["producto"]= $result;

        echo json_encode($json);

        return;
    }

    public function insertProducto($data){
        echo json_encode(ModelProducto::insertProducto($data));

        return;
    }

    public function updateProducto($data){
        echo json_encode(ModelProducto::updateProducto($data));

        return;
    }

    public function deleteProducto($id){
        echo json_encode(ModelProducto::deleteProducto($id));

        return;
    }

}