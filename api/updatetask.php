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
  $Tid = mysqli_real_escape_string($con, (int)trim($request->Tid));
  $Lid = mysqli_real_escape_string($con, (int)trim($request->Lid));
  $Task_Description = mysqli_real_escape_string($con, trim($request->Task_Description));
  $Task_Comment = mysqli_real_escape_string($con, trim($request->Task_Comment));
  $Task_Status_id = mysqli_real_escape_string($con, trim($request->Task_Status_id));
  $Task_Duedate = mysqli_real_escape_string($con, trim($request->Task_Duedate));
  $Task_Priority = mysqli_real_escape_string($con, trim($request->Task_Priority));
  $Task_Name = mysqli_real_escape_string($con, trim($request->Task_Name));
  $Task_Assigned = mysqli_real_escape_string($con, trim($request->Task_Assigned));
  $Task_Created = mysqli_real_escape_string($con, trim($request->Task_Created));
  $Task_Updated = mysqli_real_escape_string($con, trim($request->Task_Updated));
  $Task_Status_id = mysqli_real_escape_string($con, trim($request->Task_Status_id));

  // Update.
  $sql = "UPDATE `Task` SET `Task_Assigned`='$Task_Assigned', `Task_Created`=current_timestamp() ,`Task_Updated`=current_timestamp() ,`Task_Description`='$Task_Description',
  `Task_Comment`='$Task_Comment',`Lid`='$Lid',`Task_Status_id`='$Task_Status_id',`Task_Duedate`='$Task_Duedate',`Task_Priority`='$Task_Priority' WHERE `Tid` = '{$Tid}'";

  if($user_result = mysqli_query($con, $sql))
  {
    http_response_code(204);
    $i = 0;
    while ($row = mysqli_fetch_assoc($user_result)) {
        $user[$i]['Lid']    = $row['Lid'];
        $user[$i]['Task_Description'] = $row['Task_Description'];
        $user[$i]['Task_Comment'] = $row['Task_Comment'];
        $user[$i]['Task_Status_id'] = $row['Task_Status_id'];
        $user[$i]['Task_Duedate'] = $row['Task_Duedate'];
        $user[$i]['Task_Priority'] = $row['Task_Priority'];
        $user[$i]['Task_Name'] = $row['Task_Name'];
        $user[$i]['Task_Updated'] = $row['Task_Updated'];
        $user[$i]['Task_Assigned'] = $row['Task_Assigned'];
        $user[$i]['Task_Created'] = $row['Task_Created'];
        $user[$i]['Task_Updated'] = $row['Task_Updated'];
        $user[$i]['Task_Status'] = $row['Task_Status'];
        $i++;
    }
    echo json_encode($user);
  }
  else
  {
    return http_response_code(422);
  }
}

?>
