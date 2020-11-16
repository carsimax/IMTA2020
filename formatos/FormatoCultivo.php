<?php

header("Content-disposition: attachment; filename=Formato_Cultivo.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_Cultivo.xlsx");
