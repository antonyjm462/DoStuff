<?php

require 'database.php';

$all = [];

$all_sql = "SELECT * FROM List";

if($all_result = mysqli_query($con,$all_sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($all_result))
  {
   $all[$i]['Pid']    = $row['Pid'];
   $all[$i]['Lid'] = $row['Lid'];
   $all[$i]['List_Name'] = $row['List_Name'];
   $all[$i]['List_Description'] = $row['List_Description'];
   $all[$i]['List_Created'] = $row['List_Created'];
    $i++;
  }
  echo json_encode($all);
}
else
{
  http_response_code(404);
}





?>
