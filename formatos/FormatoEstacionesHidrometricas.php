<?php

header("Content-disposition: attachment; filename=Formato_EstacionesHidrometricas.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_EstacionesHidrometricas.xlsx");
