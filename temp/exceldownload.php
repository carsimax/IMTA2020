<?php

header("Content-disposition: attachment; filename=Registros_No_Insertados.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Registros_No_Insertados.xlsx");
unlink('Registros_No_Insertados.xlsx');