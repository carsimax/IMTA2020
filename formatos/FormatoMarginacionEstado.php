<?php

header("Content-disposition: attachment; filename=Formato_MarginacionEstado.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_MarginacionEstado.xlsx");
