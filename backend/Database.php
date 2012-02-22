<?php
class Database {
    private static $connection = NULL;

    private function __construct() {
    }

    private function __clone() {}

    public function isConnected() {
        //@TODO
        return true;
    }

    public static function getInstance(array $config) {
        if (NULL === self::$connection) {
            self::$connection = new self;
        }
        return self::$connection;
    }
}
?>