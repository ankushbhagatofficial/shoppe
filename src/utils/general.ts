
export function formatDateToDDYYYYMM(date: Date) {
  const d = new Date(date);

  return `${d.getDate()}, ${d.toLocaleString("en-US", {
    month: "short",
  })}, ${d.getFullYear()}`;
}
