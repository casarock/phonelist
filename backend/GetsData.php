<?php
class GetsData {
    // db connectivity
    // build json
    // save hash

    private $hash = null;
    private $database = null;
    private $config = null;

    public function __construct(Database $db, $config) {
        $this->config = $config;
        $this->database = $db;
        $this->hash = 'HASH';
    }

    public function getLocalHash() {
        return $this->hash;
    }

    //@TODO
    public function getAllDataAsJSONString($table) {
        if (!$this->database->getConnection()) {
            return "{'status': 'error connection to database'}";
        }

        $result = $this->database->getAllFrom($this->config['db']['name'], $this->config['db']['table']);
        return json_encode($result);
    }
}
?>