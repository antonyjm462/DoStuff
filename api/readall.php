<?php

require 'database.php';

$all = [];

$all_sql = "SELECT * FROM Project P JOIN List L ON
P.Pid=L.Pid JOIN Task T ON L.Lid=T.Lid";

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
   $all[$i]['Lid'] = $row['Lid'];
   $all[$i]['List_Name'] = $row['List_Name'];
   $all[$i]['List_Description'] = $row['List_Description'];
   $all[$i]['List_Created'] = $row['List_Created'];
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
