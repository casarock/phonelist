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
    $dataProvider = new GetsData($database, $config);
} else {
    header("HTTP/1.0 304 Not Modified");
    return;
}

if ($retrieved['hash'] == $dataProvider->getLocalHash()) {
    header("HTTP/1.0 304 Not Modified");
    return;
}

if ($retrieved['username'] !== $config['user']['username'] || $retrieved['password'] !== $config['user']['password']) {
    header("HTTP/1.0 200 OK");
    echo "{'status': 'wrongcredentials'}";
    return;
}
header("HTTP/1.0 200 OK");
echo $dataProvider->getAllDataAsJSONString($config['db']['table']);
?>