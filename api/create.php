<?php
require 'database.php';
// Get the posted data.
$postdata = file_get_contents("php://input");

echo $postdata;

$user=[];

if(isset($postdata) && !empty($postdata))
{
  $request = json_decode($postdata);


  // Validate.
  // if(trim($request->id) === '')
  // {
  //   return http_response_code(400);
  // }
   
  // Sanitize.
  // $EmpId = mysqli_real_escape_string($con, (int)trim($request->EmpId));
  $FirstName = mysqli_real_escape_string($con, trim($request->FirstName));
  $LastName = mysqli_real_escape_string($con, trim($request->LastName));
  $Email = mysqli_real_escape_string($con, trim($request->Email));
  $Password = mysqli_real_escape_string($con, trim($request->Password));
  $Designation = mysqli_real_escape_string($con, trim($request->Designation));
  // if(trim($request->Avatar) !== '')
  // {
  // $Avatar = mysqli_real_escape_string($con, trim($request->Avatar));
  // }
  // else{
  //   $Avatar = "";
  // }
  // Create.
  // $user_sql = "INSERT INTO `user`(`Empid`,`FirstName`,`LastName`,`Email`,`Password`,`Designation`,`Avatar`) VALUES ('{$EmpId}','{$FirstName}','{$LastName}','{$Email}','{$Password}','{$Designation}','{$Avatar}')";
  $user_sql = "INSERT INTO `User`(`FirstName`,`LastName`,`Email`,`Password`,`Designation`) VALUES ('{$FirstName}','{$LastName}','{$Email}','{$Password}','{$Designation}')";

  echo $user_sql;

  if(mysqli_query($con,$user_sql))
  {
    http_response_code(201);
    // $user =[
    //       'FirstName' => $FirstName,
    //       'LastName'=>  $LastName,
    //       'Email'=> $Email,
    //       'Password'=> $Password,
    //       'Designation'=> $Designation,
    //       'id'=> mysqli_insert_id($con)
    // ];
    // echo json_encode($user);
  }
  else
  {
    http_response_code(422);
  }
}

?>