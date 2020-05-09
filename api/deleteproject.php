<?php

require 'database.php';

// Extract, validate and sanitize the id.
$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

if(!$id)
{
  return http_response_code(400);
}

// Delete.
$user_sql = "DELETE FROM `Project` WHERE `Pid` ='{$id}' LIMIT 1";

if(mysqli_query($con, $user_sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}

?>
