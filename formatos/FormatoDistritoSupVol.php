<?php

header("Content-disposition: attachment; filename=Formato_DistritoSupVol.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_DistritoSupVol.xlsx");
