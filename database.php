$active_group = 'default';
$query_builder = TRUE;

$db['default'] = array(
    'dsn' => '',
    'hostname' => 'us-cdbr-iron-east-01.cleardb.net',
    'username' => 'b52246f2fbaf21',
    'password' => 'c0717918',
    'database' => 'heroku_f18a66d54326764',
    'dbdriver' => 'mysql',
    'dbprefix' => '',
    'pconnect' => FALSE,
    'db_debug' => (ENVRIONMENT !== 'production'),
    'cache_on' => FALSE,
    'cachedir' => '',
    'char_set' => 'utf8',
    'dbcollat' => 'utf8_general_ci',
    'swap_pre' => '',
    'encrypt' => FALSE,
    'compress' => FALSE,
    'striction' => FALSE,
    'fallover' => array(),
    'save_querries' => TRUE
);