<?php

header("Content-disposition: attachment; filename=Formato_Distrito.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_Distrito.xlsx");
