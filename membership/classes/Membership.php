<?php
    require 'Mysql.php';

    class Membership {
        function validate_User($un, $pwd) {
            $mysql = New Mysql;
            $ensure_credentials = $mysql->verify_Username_and_Pass($un, md5($pwd));
            if ($ensure_credentials) {
                $_SESSION['status'] = "authorized";
                header("location: custs.php");
            } else return "Please enter a correct username and password.";
        }

        function log_User_Out(){
            if(isset($_SESSION['status'])) {
                unset($_SESSION['status']);
                if(isset($_COOKIE[session_name()])) {
                     setcookie(session_name(),'',time() - 10000);
                     session_destroy();
                };
            };
        }

        function confirm_Member(){
            session_start();
            if($_SESSION['status'] != 'authorized') {
                header("location: index.php");
            };
        }
    }
?>