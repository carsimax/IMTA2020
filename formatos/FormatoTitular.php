<?php

header("Content-disposition: attachment; filename=Formato_Titulares.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_Titulares.xlsx");
