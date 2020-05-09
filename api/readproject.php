<?php

require 'database.php';

$all = [];

$all_sql = "SELECT * FROM Project";

if($all_result = mysqli_query($con,$all_sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($all_result))
  {
   $all[$i]['Pid']    = $row['Pid'];
   $all[$i]['Project_Status_id'] = $row['Project_Status_id'];
   $all[$i]['Project_Name'] = $row['Project_Name'];
   $all[$i]['Project_Description'] = $row['Project_Description'];
   $all[$i]['Project_Created'] = $row['Project_Created'];
   $all[$i]['Project_Duedate'] = $row['Project_Duedate'];
   $all[$i]['Project_Updated'] = $row['Project_Updated'];
    $i++;
  }
  echo json_encode($all);
}
else
{
  http_response_code(404);
}





?>
