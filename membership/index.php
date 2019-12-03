<?php
    // require_once 'classes/Membership.php';
    // $membership = New Membership();
    // $membership->confirm_Member();

    session_start();
    require_once 'classes/Membership.php';
    $membership = new Membership();

    // If the user clicks the logout link
    if(isset($_GET['status']) && $_GET['status'] == "loggedout") {
        $membership->log_User_out();
    };

    // // Did the user enter a password/username and click submit?
    if($_POST && !empty($_POST['username']) && !empty($_POST['pwd'])) {
        $response = $membership->validate_User($_POST['username'], $_POST['pwd']);
    };
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/default.css" />
    <!--[if lt IE 7]>
    <script type="text/javascript" src="js/DD_belatedPNG_0.0.7a-min.js"></script>
    <![endif]-->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js"></script>
    <title>Untitled Document</title>

</head>
<body>
    <div id="containter">
        <p>
            You've reached the page that stores all the secrets!
        </p>
        <a href="index.php?status=loggedout">Log Out</a>
    </div>
</body>
</html> 