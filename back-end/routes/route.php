<?php

require_once "controller/controller.producto.php";
require_once "controller/controller.categoria.php";

$arrayRoutes = explode('/', $_SERVER["REQUEST_URI"]);



if (count(array_filter($arrayRoutes)) == 0) {
    $json = array(
        "DETAILS" => "Not Found"
    );

    echo json_encode($json);

} else {
    if (count(array_filter($arrayRoutes)) == 1) {

        if (array_filter($arrayRoutes)[1] == "producto") {
            switch ($_SERVER['REQUEST_METHOD']) {
                case 'GET':
                    $producto = new controllerProducto();
                    $producto -> getProductos();
                    return;
                case 'POST':
                    $data = json_decode(file_get_contents("php://input"), true);

                    $producto = new controllerProducto();
                    $producto -> insertProducto($data);
                    return;
                case 'PUT':
                    $data = json_decode(file_get_contents("php://input"), true);
                    
                    $producto = new controllerProducto();
                    $producto -> updateProducto($data);
                    return;
            }
        }
        if (array_filter($arrayRoutes)[1] == "categoria") {
            switch ($_SERVER['REQUEST_METHOD']) {
                case 'GET':
                    $categoria = new controllerCategoria();
                    $categoria -> getCategoria();
                    break;
                default:
                    break;
            }
        }
    }else{
        if (array_filter($arrayRoutes)[1] == "fcategoria") {
            if (array_filter($arrayRoutes)[2]) {
                $idcat = array_filter($arrayRoutes)[2];
                $producto = new controllerProducto();
                $producto -> getProductoCat($idcat);
                return;
            }
        }
        if (array_filter($arrayRoutes)[1] == "dproducto") {
            if (array_filter($arrayRoutes)[2]) {
                $idcat = array_filter($arrayRoutes)[2];
                $producto = new controllerProducto();
                $producto -> deleteProducto($idcat);
                return;
            }
        }
            
    }
}
