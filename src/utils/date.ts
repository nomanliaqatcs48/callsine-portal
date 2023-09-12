const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function formatDate(isoString: string) {
  const date = new Date(isoString);

  const dayName = days[date.getDay()];
  const month = date.getMonth() + 1; // Months are 0-indexed
  const day = date.getDate();

  return `${dayName} ${month}/${day}`;
}

export function formatDateWithTime(input: string) {
  // Parse the date
  const date = new Date(input);

  // Get day name
  const dayName = days[date.getDay()];

  // Get the month (0-indexed, so add 1)
  const month = date.getMonth() + 1;

  // Get the day of the month
  const day = date.getDate();

  // Get the year
  const year = date.getFullYear();

  // Get the time in HH:MM AM/PM format
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return `${dayName} ${month}/${day
    .toString()
    .padStart(2, "0")}/${year} ${time}`;
}
