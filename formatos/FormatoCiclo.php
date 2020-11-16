<?php

header("Content-disposition: attachment; filename=Formato_Ciclo.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_Ciclo.xlsx");
