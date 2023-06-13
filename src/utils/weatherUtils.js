export const formatWindDirection = (degrees) => {
  const directions = ['norte', 'nordeste', 'leste', 'sudeste', 'sul', 'sudoeste', 'oeste', 'noroeste'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
}

export const formatWeatherCode = (code) => {
  switch (code) {
    case 0:
      return 'Sol';
    case 1:
      return 'Sol';
    case 2:
      return 'Parcialmente nublado';
    case 3:
      return 'nublado';
    case 45:
      return 'Névoa';
    case 48:
      return 'Geada';
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return 'Pancadas de chuva'
    case 61:
    case 80:
      return 'Chuva fraca';
    case 63:
    case 81:
      return 'Chuva';
    case 65:
    case 82:
      return 'Chuva forte';
    case 71:
    case 85:
      return 'Neve leve';
    case 72:
      return 'Neve moderada';
    case 75:
    case 86:
      return 'Neve intensa';
    case 77:
      return 'Grãos de neve';
    case 95:
      return 'Tempestade de raios';
    case 96:
      return 'Tempestade';
    case 99:
      return 'Tempestade intensa';
    default:
      return 'Descrição não disponível';
  }
}
