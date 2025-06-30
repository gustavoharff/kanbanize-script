export function secondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  const hoursStr = String(hours).padStart(2, "0");
  const minutesStr = String(minutes).padStart(2, "0");

  return `${hoursStr}:${minutesStr}`;
}

export function decimalToTime(decimal: number) {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);

  const finalHours = minutes === 60 ? hours + 1 : hours;
  const finalMinutes = minutes === 60 ? 0 : minutes;

  const hoursStr = String(finalHours).padStart(2, "0");
  const minutesStr = String(finalMinutes).padStart(2, "0");

  return `${hoursStr}:${minutesStr}`;
}

export function decimalToMinutes(decimal: number): number {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  return hours * 60 + minutes;
}

export function secondsToMinutes(seconds: number): number {
  return Math.floor(seconds / 60);
}
