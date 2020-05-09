<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");

echo $postdata;

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $Pid = mysqli_real_escape_string($con, trim($request->Pid));
  $List_Name = mysqli_real_escape_string($con, trim($request->List_Name));
  $List_Description = mysqli_real_escape_string($con, trim($request->List_Description));
  $List_Created = mysqli_real_escape_string($con, trim($request->List_Created));

  $user_sql = "INSERT INTO
  `List`(`Pid`,`List_Name`,`List_Description`,`List_Created`) VALUES
   ('{$Pid}','{$List_Name}','{$List_Description}',current_timestamp())";

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
