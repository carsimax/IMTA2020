<?php

header("Content-disposition: attachment; filename=Formato_UnidadSiembra.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_UnidadSiembra.xlsx");
