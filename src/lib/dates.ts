const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * "2024-02-08" -> "February 8, 2024", the form the blog bylines already use.
 * Read off the string, not through `Date`, so a timezone cannot move the day.
 */
export function longDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d || m > 12) throw new Error(`longDate: "${iso}" is not YYYY-MM-DD`);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
