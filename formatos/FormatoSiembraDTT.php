<?php

header("Content-disposition: attachment; filename=Formato_SiembraDTT.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_SiembraDTT.xlsx");
