<?php
header('Content-Type:text/json;charset=utf-8');

//$manager = new MongoDB\Driver\Manager("mongodb://localhost:27017");
//$filter = [];
//$options = ['limit' => 250];
//$getListQuery = new MongoDB\Driver\Query($filter, $options);
//try {
//    $cursor = $manager->executeQuery('web.films', $getListQuery);
//} catch (Exception $e) {
//    echo 'Query Error';
//}
//echo json_encode(iterator_to_array($cursor));

class MongoDBClient{
    private $mongoDB;
    private $DBName;
    private $collection;

    public function _construct(){
        $this->mongoDB=new \MongoDB\Driver\Manager("mongodb://localhost:27017");
        $this->DBName='web';
        $this->collection='films';
    }

    public function getPageNum(){
        $command=new \MongoDB\Driver\Command(['count'=>$this->collection]);
        $result=$this->mongoDB->executeCommand($this->DBName,$command);

    }
}