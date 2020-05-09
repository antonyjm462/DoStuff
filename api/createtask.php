<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");

echo $postdata;

$user=[];

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $Lid = mysqli_real_escape_string($con, trim($request->Lid));
  $Task_Description = mysqli_real_escape_string($con, trim($request->Task_Description));
  $Task_Comment = mysqli_real_escape_string($con, trim($request->Task_Comment));
  $Task_Duedate = mysqli_real_escape_string($con, trim($request->Task_Duedate));
  $Task_Priority = mysqli_real_escape_string($con, trim($request->Task_Priority));
  $Task_Name = mysqli_real_escape_string($con, trim($request->Task_Name));
  $Task_Status_id = mysqli_real_escape_string($con, trim($request->Task_Status_id));
  $Task_Assigned = mysqli_real_escape_string($con, trim($request->Task_Assigned));
  $Task_Created = mysqli_real_escape_string($con, trim($request->Task_Created));
  $Task_Updated = mysqli_real_escape_string($con, trim($request->Task_Updated));

  $user_sql = "INSERT INTO
  `Task`(`Lid`,`Task_Description`,`Task_Comment`,`Task_Duedate`,`Task_Priority`,`Task_Name`,`Task_Status_id`,`Task_Created`,`Task_Assigned`,`Task_Updated`)
  VALUES
  ('{$Lid}','{$Task_Description}','{$Task_Comment}','{$Task_Duedate}','{$Task_Priority}','{$Task_Name}','{$Task_Status_id}',current_timestamp(),'{$Task_Assigned}',current_timestamp())";


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
