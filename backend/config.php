<?php
if (strstr($_SERVER["PHP_SELF"], "config.php")) {
    die();
}
return array(
    'db' => array(
        'username' => 'dbuser',
        'password' => 'dbpwd',
        'host'     => 'dbhost',
        'table'    => 'dbtable'
    ),
    'user' => array(
        'username' => 'xx',
        'password' => ''
    )
);
?>