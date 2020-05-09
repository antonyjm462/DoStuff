<?php

require 'database.php';

$all = [];

$all_sql = "SELECT * FROM Task";

if($all_result = mysqli_query($con,$all_sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($all_result))
  {
   $all[$i]['Lid'] = $row['Lid'];
   $all[$i]['Tid'] = $row['Tid'];
   $all[$i]['Task_Description'] = $row['Task_Description'];
   $all[$i]['Task_Comment'] = $row['Task_Comment'];
   $all[$i]['Task_Status_id'] = $row['Task_Status_id'];
   $all[$i]['Task_Duedate'] = $row['Task_Duedate'];
   $all[$i]['Task_Priority'] = $row['Task_Priority'];
   $all[$i]['Task_Name'] = $row['Task_Name'];
   $all[$i]['Task_Assigned'] = $row['Task_Assigned'];
   $all[$i]['Task_Created'] = $row['Task_Created'];
   $all[$i]['Task_Updated'] = $row['Task_Updated'];
    $i++;
  }
  echo json_encode($all);
}
else
{
  http_response_code(404);
}





?>
