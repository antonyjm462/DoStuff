<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");

echo $postdata;

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);

  $uid = mysqli_real_escape_string($con, trim($request->uid));
  $Firstname = mysqli_real_escape_string($con, trim($request->Firstname));
  $Lastname = mysqli_real_escape_string($con, trim($request->Lastname));
  $data = mysqli_real_escape_string($con, trim($request->data));
  $Recipient = mysqli_real_escape_string($con, trim($request->Recipient));

  $user_sql = "INSERT INTO `message` (`Mid`, `EmpId`, `Firstname`, `LastName`, `Recipient`, `Message_Content`, `Message_Created`, `Message_Updated`) VALUES(NULL, '{$uid}','{$Firstname}','{$Lastname}','{$Recipient}','{$data}', current_timestamp(), current_timestamp());";

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
