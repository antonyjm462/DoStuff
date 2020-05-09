<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");

echo $postdata;

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $Project_Status_id = mysqli_real_escape_string($con, trim($request->Project_Status_id));
  $Project_Name = mysqli_real_escape_string($con, trim($request->Project_Name));
  $Project_Description = mysqli_real_escape_string($con, trim($request->Project_Description));
  $Project_Created = mysqli_real_escape_string($con, trim($request->Project_Created));
  $Project_Updated = mysqli_real_escape_string($con, trim($request->Project_Updated));
  $Project_Duedate = mysqli_real_escape_string($con, trim($request->Project_Duedate));

  $user_sql = "INSERT INTO `Project`(`Project_Status_id`,`Project_Name`,`Project_Description`,`Project_Created`,`Project_Updated`,`Project_Duedate`) VALUES
('{$Project_Status_id}','{$Project_Name}','{$Project_Description}',current_timestamp(),current_timestamp(),'{$Project_Duedate}')";

  echo $user_sql;

  if(mysqli_query($con,$user_sql))
  {
    http_response_code(201);
  }
  else
  {
    http_response_code(422);
  }
}

?>
