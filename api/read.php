<?php

require 'database.php';

$user = [];
$user_sql = "SELECT EmpId,FirstName,LastName,Email,Password,Designation,Avatar FROM User";

if($user_result = mysqli_query($con,$user_sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($user_result))
  {
   $user[$i]['EmpId']    = $row['EmpId'];
   $user[$i]['FirstName'] = $row['FirstName'];
   $user[$i]['LastName'] = $row['LastName'];
   $user[$i]['Email'] = $row['Email'];
   $user[$i]['Password'] = $row['Password'];
   $user[$i]['Designation'] = $row['Designation'];
   $user[$i]['Avatar'] = $row['Avatar'];
    $i++;
  }
  echo json_encode($user);
}
else
{
  http_response_code(404);
}





?>