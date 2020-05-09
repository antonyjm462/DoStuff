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





  $Pid = mysqli_real_escape_string($con, (int)trim($request->Pid));
  $Project_Status_id = mysqli_real_escape_string($con, (int)trim($request->Project_Status_id));
  $Project_Name = mysqli_real_escape_string($con, trim($request->Project_Name));
  $Project_Description = mysqli_real_escape_string($con, trim($request->Project_Description));
  $Project_Created = mysqli_real_escape_string($con, trim($request->Project_Created));
  $Project_Duedate = mysqli_real_escape_string($con, trim($request->Project_Duedate));
  $Project_Updated = mysqli_real_escape_string($con, trim($request->Project_Updated));

  // Update.
  $sql = "UPDATE `Project` SET `Project_Name`='$Project_Name',`Project_Description`='$Project_Description',`Project_Status_id`='$Project_Status_id',`Project_Created`=current_timestamp(),`Project_Duedate`='$Project_Duedate',`Project_Updated`=current_timestamp() WHERE `Pid` = '{$Pid}'";

  if($user_result = mysqli_query($con, $sql))
  {
    http_response_code(204);
    // $i = 0;
    // while ($row = mysqli_fetch_assoc($user_result)) {
    //     $user[$i]['Project_Status_id']    = $row['Project_Status_id'];
    //     $user[$i]['Project_Name'] = $row['Project_Name'];
    //     $user[$i]['Project_Description'] = $row['Project_Description'];
    //     $user[$i]['Project_Created'] = $row['Project_Created'];
    //     $user[$i]['Project_Duedate'] = $row['Project_Duedate'];
    //     $user[$i]['Project_Updated'] = $row['Project_Updated'];
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
