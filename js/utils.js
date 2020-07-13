export function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
