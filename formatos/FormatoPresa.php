<?php

header("Content-disposition: attachment; filename=Formato_Presa.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_Presa.xlsx");
