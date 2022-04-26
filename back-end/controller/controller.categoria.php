<?php

require_once "model/model.categoria.php";

class ControllerCategoria{

    public function getCategoria(){
        
        $result = ModelCategoria::getCategoria();
        $json ["categoria"]= $result;
        
        echo json_encode($json);
        return;
    }
}