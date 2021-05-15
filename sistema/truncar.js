function truncar(num) {
  let rendimiento = num.toString();
  rendimiento = rendimiento.slice(0, (rendimiento.indexOf(".")) + 3);
  return rendimiento
}