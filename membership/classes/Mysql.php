    <?php
    require_once 'includes/constants.php';

    class Mysql {
        // private $conn;
        // function __construct() {
        //     $this->conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME) or die("There was a problem connecting to the database.");
        // }

        function verify_Username_and_Pass($un, $pwd) {
            $conn = new mysqli(DB_SERVER, DB_USER, DB_PASSWORD, DB_NAME) or die("There was a problem connecting to the database.");

            $query = "SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1";
            
            if ($stmt = $conn->prepare($query)) {
                $stmt->bind_param('ss', $un, $pwd);
                $stmt->execute();
                if ($stmt->fetch()) {
                    $stmt->close();
                    return true;
                };
            };
        }
    }
?>