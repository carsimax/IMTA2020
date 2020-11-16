<?php

header("Content-disposition: attachment; filename=Formato_DistritoVol.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_DistritoVol.xlsx");
