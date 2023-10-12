/** @param {string} string */
export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/** @param {string} string */
export function capitalizeAll(string) {
  return string
    .split('_')
    .map((el) => capitalizeFirstLetter(el))
    .join('');
}
