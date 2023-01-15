export const dateFormat = fecha => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };
  return fechaNueva.toLocaleDateString('es-ES', opciones);
};

export const tiempoTranscurrido = fecha => {
  const fechaNueva = new Date(fecha);
  const fechaActual = new Date();
  const diferencia = fechaActual - fechaNueva;
  const minutos = Math.floor(diferencia / 1000 / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);
  if (minutos < 60) {
    return `${minutos} minutos`;
  } else if (horas < 24) {
    return `${horas} horas`;
  } else if (dias < 30) {
    return `${dias} días`;
  } else {
    return dateFormat(fecha);
  }
};
