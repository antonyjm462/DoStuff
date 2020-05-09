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
  $List_Name = mysqli_real_escape_string($con, trim($request->List_Name));
  $List_Description = mysqli_real_escape_string($con, trim($request->List_Description));
  $List_Created = mysqli_real_escape_string($con, trim($request->List_Created));

  // Update.
  $sql = "UPDATE `List` SET `List_Name`='$List_Name',`List_Description`='$List_Description',`List_Created`=current_timestamp() WHERE `Pid` = '{$Pid}' ";

  if($user_result = mysqli_query($con, $sql))
  {
    http_response_code(204);
    $i = 0;
    while ($row = mysqli_fetch_assoc($user_result)) {
        $user[$i]['List_Pid']    = $row['List_Pid'];
        $user[$i]['List_Name'] = $row['List_Name'];
        $user[$i]['List_Description'] = $row['List_Description'];
        $user[$i]['List_Created'] = $row['List_Created'];
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
