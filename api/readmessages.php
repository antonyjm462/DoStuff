<?php

require 'database.php';

$all = [];

$all_sql = "SELECT * FROM message";

if($all_result = mysqli_query($con,$all_sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($all_result))
  {
   $all[$i]['Mid'] = $row['Mid'];
   $all[$i]['EmpId'] = $row['EmpId'];
   $all[$i]['Firstname'] = $row['Firstname'];
   $all[$i]['LastName'] = $row['LastName'];
   $all[$i]['Recipient'] = $row['Recipient'];
   $all[$i]['Message_Content'] = $row['Message_Content'];
   $all[$i]['Message_Updated'] = $row['Message_Updated'];
   $all[$i]['Message_Created'] = $row['Message_Created'];
    $i++;
  }
  echo json_encode($all);
}
else
{
  http_response_code(404);
}





?>
