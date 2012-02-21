<?php
require_once 'GetsData.php';
$config = require_once('config.php');

// check hash -> return json: {'status': 'not changed'}
// check credentials
// return json {[... contact obj...]}
$retrieved = array();
if (!isset($_GET['hash']) || !isset($_GET['username']) || !isset($_GET['password'])) {
    return;
}
$retrieved['hash'] = htmlspecialchars($_GET['hash']);
$retrieved['username'] = htmlspecialchars($_GET['username']);
$retrieved['password'] = htmlspecialchars($_GET['password']);

$dataProvider = new GetsData();

if ($retrieved['hash'] == $dataProvider->getLocalHash()) {
    echo "{'status': 'not changed!'}";
    return;
}

if ($retrieved['username'] !== $config['user']['username'] && $retrieved['password'] !== $config['user']['password']) {
    echo "{'status': 'wrong username or password'}";
    return;
}

echo $dataProvider->getAllDataAsJSONString();
?>