export function getTodayDate() {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit format
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit format
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}