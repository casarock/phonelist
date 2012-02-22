<?php
class Database {
    private static $instance = NULL;
    private $config = NULL;
    private $connection = NULL;

    private function __construct($config) {
        $this->config = $config;
        $this->connect();
    }

    private function connect() {
        $connection = mysql_connect($this->config['db']['host'],
                                    $this->config['db']['username'],
                                    $this->config['db']['password']);
        $this->connection = $connection;
    }

    private function __clone() {}

    private function setDb($dbname) {
        return mysql_select_db($dbname, $this->connection);
    }

    public function getConnection() {
        return $this->connection;
    }

    public function isConnected() {
        if (is_resource($this->connection)) {
            return true;
        } else {
            return false;
        }
    }

    public function getAllFrom($db, $table) {
        $this->setDb($this->config['db']['name']);
        $query = 'SELECT * FROM ' . $table;
        $resultSet = mysql_query($query);

        $result = array();
        while ($row = mysql_fetch_assoc($resultSet)) {
            $result[] = $row;
        }
        return $result;
    }

    public static function getInstance(array $config) {
        if (NULL === self::$instance) {
            self::$instance = new self($config);
        }
        return self::$instance;
    }
}
?>