<?php
class GetsData {
    // db connectivity
    // build json
    // save hash

    private $hash = null;

    public function construct() {
        $this->hash = 'HASH';
    }

    public function getLocalHash() {
        return $this->hash;
    }
}
?>