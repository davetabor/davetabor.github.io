<?php
    $json = $_POST['jsonDTA'];
    $newjson = json_encode($json);

    $date = date('Y-m-d-H-i-s');
    
    $writeurl = "dutyrosters-" . $date . ".json";
    $file2 = fopen($writeurl,'w');
    fwrite($file2,$newjson);
    fclose($file2);
    echo "Backed Up!";
?>