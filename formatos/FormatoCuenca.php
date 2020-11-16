<?php

header("Content-disposition: attachment; filename=Formato_Cuenca.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_Cuenca.xlsx");
