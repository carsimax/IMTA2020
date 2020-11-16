<?php

header("Content-disposition: attachment; filename=Formato_MarginacionMunicipio.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_MarginacionMunicipio.xlsx");
