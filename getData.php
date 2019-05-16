<?php
header('Content-Type:text/json;charset=utf-8');

$manager = new MongoDB\Driver\Manager("mongodb://127.0.0.1:27017");
$filter = [];
$options = ['limit' => 250];
$getListQuery = new MongoDB\Driver\Query($filter, $options);
try {
    $cursor = $manager->executeQuery('web.films', $getListQuery);
} catch (Exception $e) {
    echo 'Query Error';
}
echo json_encode(iterator_to_array($cursor));
//foreach ($cursor as $elem){
//    print_r($elem);
//}