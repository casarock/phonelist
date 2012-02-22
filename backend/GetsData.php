<?php
class GetsData {
    // db connectivity
    // build json
    // save hash

    private $hash = null;
    private $databaseConnection = null;

    public function __construct($db) {
        $this->databaseConnection = $db;
        $this->hash = 'HASH';
    }

    public function getLocalHash() {
        return $this->hash;
    }

    //@TODO
    public function getAllDataAsJSONString() {
        return "{'status': 'not implemented'}";
    }
}
?>