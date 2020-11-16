<?php

header("Content-disposition: attachment; filename=Formato_Titulo.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_Titulo.xlsx");
