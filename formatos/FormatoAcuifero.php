<?php

header("Content-disposition: attachment; filename=Formato_Acuifero.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_Acuifero.xlsx");
