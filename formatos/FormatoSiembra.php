<?php

header("Content-disposition: attachment; filename=Formato_Siembra.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_Siembra.xlsx");
