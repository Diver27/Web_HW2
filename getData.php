<?php
$manager = new MongoDB\Driver\Manager("mongodb://23.105.205.182:27017");

$filter = [];
$options = [];
$getListQuery = new MongoDB\Driver\Query($filter, $options);
try {
    $cursor = $manager->executeQuery('web.films', $getListQuery);
}catch(Exception $e){
    echo 'Query Error';
}
$returnData = array();
$localUrl = iterator_to_array($localUrl);
foreach ($localUrl as $k => $row) {
    array_push($returnData, $row->localurl);
}
echo json_encode($returnData, JSON_UNESCAPED_UNICODE);