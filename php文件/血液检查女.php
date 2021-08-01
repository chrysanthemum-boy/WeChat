<?php
header('Content-Type:application/json');
 
//获取表单数据
$keyword1 = $_GET["keyword"];
$num1 = $_GET["num"];

//过滤表单空格
$keyword2 = trim($keyword1);
 
//当表单提交空白数据时
if(empty($keyword2) || empty($num1)){
   
  //构建数组
  $arr = array(
      "empty" => "请输入或者识别内容"
    );
 
  //把数组转换为json
  $data = json_encode($arr);
  echo "[$data]";
 
}else{
 
//过滤表单特殊字符
$replace = array('!','@','#','$','%','^','&','*','(',')','_','-','+','=','{','}','[',']',';',':','"','<','>','?','/','|','\'');
$keyword3 = str_replace($replace, '', $keyword2);

//1链接数据库
$link = mysqli_connect('localhost','root','123456'); 
//var_dump($link);
//2判断是否连接成功
if (!$link) {
	exit('数据库连接失败');
}

//3设置字符集
mysqli_set_charset($link , 'utf8');

//4选择数据库
mysqli_select_db($link , '医点就透2');

//5准备sql语句
$sql = "SELECT * FROM 血液检查女 WHERE name like '%$keyword3%' ";

//6发送sql语句
$res = mysqli_query($link , $sql);
//var_dump($res);
if (!$res) {
    printf("Error: %s\n", mysqli_error($link));
    exit();
}

//7处理结果集
$row = mysqli_fetch_assoc($res);
$max = $row['max'];
$min = $row['min'];
$exist = mysqli_num_rows($res);
if ($exist) {
    if($num1>=$min and $num1<=$max){
      $arr = array(
        "result"=>"此值在正常范围内"
      );
      $data = json_encode($arr);
      echo "[$data]";
    }
    else if($num1<=$min){
      $arr = array(
        "result"=>"此值偏低"
      );
      $data = json_encode($arr);
      echo "[$data]";
    }
    else{
      $arr = array(
        "result"=>"此值偏高"
      );
      $data = json_encode($arr);
      echo "[$data]";
    }
}
//$results = array();
//查询数据库是否存在这条记录
//$exist = mysqli_num_rows($res);
//if ($exist) {
//  //遍历输出
//  
//  while ($row = mysqli_fetch_assoc($res)){
//    $results[] = $row;
//    }
// 
//  //输出JSON
//  echo json_encode($results);
 
  //当查询无结果的时候
else{

  //构建数组
  $arr = array(
    "noresult" => "暂无结果",
    "noresult1" => "（数据库中暂未存储此数据或者识别结果有误！请校对更改后再次尝试！）"
  );

  //把数组转换为json
  $data = json_encode($arr);
  echo "[$data]";
}
 

//8关闭数据库
mysqli_close($link);
}