<?php
	$readurl = "dutyrosters.json";
    $json = file_get_contents($readurl);
    fclose($file);
    echo $json;
?>