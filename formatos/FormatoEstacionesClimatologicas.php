<?php

header("Content-disposition: attachment; filename=Formato_EstacionesClimatologicas.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_EstacionesClimatologicas.xlsx");
