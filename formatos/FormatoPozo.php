<?php

/**
 * Copyright (c) 2019.
 * Universidad Politécnica del Estado de Morelos.
 * Maximiliano Carsi Castrejón.
 * Jorge Calderon Peralta.
 * Ingeniería en informática IIF – 10A.
 * Sistema de Información Sobre el Uso de Agua de Riego en la Agricultura Nacional.
 */
header("Content-disposition: attachment; filename=Formato_Pozo.xlsx");
header("Content-type: application/vnd.ms-excel");
readfile("Formato_Pozo.xlsx");
