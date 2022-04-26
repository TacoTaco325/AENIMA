<?php

class Conexion
{

    static public function connect()
    {
        $enlace = new PDO('mysql:host=localhost;dbname=aenimabd','root','');

        $enlace->exec('set names utf8');

        return $enlace;
    }

}