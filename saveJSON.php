<?php
    $json = $_POST['jsonDTA'];
    alert($json);
    function alert($msg) {
        echo "<script type='text/javascript'>alert('$msg');</script>";
    }
    
    $newjson = json_encode($json);
    
    $writeurl = "dutyrosters.json";
    $file2 = fopen($writeurl,'w');
    fwrite($file2,$newjson);
    fclose($file2);
?>