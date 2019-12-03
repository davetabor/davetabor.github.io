<?php
    echo verify_Username_and_Pass('dave', 'test');
    function verify_Username_and_Pass($un, $pwd) {
        $conn = new mysqli('rds-mysql-login.cdiso7xriw0s.us-east-2.rds.amazonaws.com', 'dtaborjr', '3+Turkies', 'security') or die("There was a problem connecting to the database.");
        IF ($conn->connect_error){
            die("Connnection failed: " . $conn->connect_error);
        }
        echo "Connected Successfully!";
        $query = 'SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1';
        if ($stmt = $conn->prepare($query)) {
            $stmt->bind_param('ss', $un, $pwd);
            $stmt->execute();
            if ($stmt->fetch()) {
                $stmt->close();
                return true;
            };
        };
    }
?>