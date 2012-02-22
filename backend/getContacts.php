<?php
require_once 'GetsData.php';
require_once 'Database.php';
$config = require_once('config.php');

if (!isset($_GET['hash']) || !isset($_GET['username']) || !isset($_GET['password'])) {
    echo "{'status': 'noparams'}";
    return;
}
$retrieved = array('hash'     => htmlspecialchars($_GET['hash']),
                   'username' => htmlspecialchars($_GET['username']),
                   'password' => htmlspecialchars($_GET['password']));

$database = Database::getInstance($config);
if ($database->isConnected()) {
    $dataProvider = new GetsData($database);
} else {
    echo "{'status', 'dberror'}";
    return;
}

if ($retrieved['hash'] == $dataProvider->getLocalHash()) {
    echo "{'status': 'unchanged'}";
    return;
}

if ($retrieved['username'] !== $config['user']['username'] || $retrieved['password'] !== $config['user']['password']) {
    echo "{'status': 'wrongcredentials'}";
    return;
}

echo $dataProvider->getAllDataAsJSONString();
?>