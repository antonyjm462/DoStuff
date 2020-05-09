<?php
require 'database.php';

// Get the posted data.
$postdata = file_get_contents("php://input");

if (isset($postdata) && !empty($postdata)) {
    // Extract the data.
    $request = json_decode($postdata);
    
    $user = [];
    // Sanitize.
    $Email = mysqli_real_escape_string($con, trim($request->Email));
    // Update.
    $sql = "SELECT EmpId,FirstName,LastName,Email,Password,Designation,Avatar FROM User WHERE Email='$Email'";
    
    if ($user_result = mysqli_query($con, $sql)) {
        $i = 0;
        while ($row = mysqli_fetch_assoc($user_result)) {
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
    else {
        return http_response_code(422);
    }
}
