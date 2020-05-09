<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata))
{
  // Extract the data.
  $request = json_decode($postdata);
  // // Validate.
  // if ((int)$request->id < 1 || trim($request->number) == '' || (float)$request->amount < 0) {
  //   return http_response_code(400);
  // }

  // Sanitize.
  $EmpId = mysqli_real_escape_string($con, (int)trim($request->EmpId));
  $FirstName = mysqli_real_escape_string($con, trim($request->FirstName));
  $LastName = mysqli_real_escape_string($con, trim($request->LastName));
  $Email = mysqli_real_escape_string($con, trim($request->Email));
  $Password = mysqli_real_escape_string($con, trim($request->Password));
  $Designation = mysqli_real_escape_string($con, trim($request->Designation));
  $Avatar = mysqli_real_escape_string($con, trim($request->Avatar));

  // Update.
  $sql = "UPDATE `user` SET `FirstName`='$FirstName',`LastName`='$LastName',`Email`='$Email',`Password`='$Password',`Designation`='$Designation',`Avatar`='$Avatar' WHERE `EmpId` = '{$EmpId}' LIMIT 1";

  if($user_result = mysqli_query($con, $sql))
  {
    http_response_code(204);
    // $i = 0;
    // while ($row = mysqli_fetch_assoc($user_result)) {
    //     $user[$i]['EmpId']    = $row['EmpId'];
    //     $user[$i]['FirstName'] = $row['FirstName'];
    //     $user[$i]['LastName'] = $row['LastName'];
    //     $user[$i]['Email'] = $row['Email'];
    //     $user[$i]['Password'] = $row['Password'];
    //     $user[$i]['Designation'] = $row['Designation'];
    //     $user[$i]['Avatar'] = $row['Avatar'];
    //     $i++;
    // }
    // echo json_encode($user);
  }
  else
  {
    return http_response_code(422);
  }
}

?>
