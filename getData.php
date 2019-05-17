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
    private $pageSize;

    public function __construct(){
        $this->mongoDB=new MongoDB\Driver\Manager("mongodb://localhost:27017");
        $this->DBName='web';
        $this->collection='films';
        $this->pageSize=50;
    }

    public function getPageCount(){
        $command=new MongoDB\Driver\Command(['count'=>$this->collection]);
        $result=$this->mongoDB->executeCommand($this->DBName,$command);
        return $result->toArray()[0]->n;
    }

    public function getPageData($pageNum)
    {
        $skip = ($pageNum - 1) * $this->pageSize;
        $option = [
            'skip' => $skip,
            'limit' => $this->pageSize
        ];
        $query = new MongoDB\Driver\Query([], $option);
        $result=null;
        $result = $this->mongoDB->executeQuery("$this->DBName.$this->collection", $query);
        return json_encode(iterator_to_array($result));
    }
}

$mongoDBClient=new MongoDBClient();
$action=$_GET['action']?:exit('Parameter Error');
$pageNum=$_GET['pageNum']?:1;

$data=null;
if($action-'getPageCount'){
    $data=$mongoDBClient->getPageCount();
}elseif($action='goToPage'){
    $data=$mongoDBClient->getPageData($pageNum);
}

return $data;