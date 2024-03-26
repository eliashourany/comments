import { DateTime } from "luxon";

export function timeAgo(timestamp: string) {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const now = DateTime.now().setZone(userTimezone);
  const created = DateTime.fromISO(timestamp).setZone(userTimezone);
  const diff = now.diff(created, [
    "years",
    "months",
    "days",
    "hours",
    "minutes",
  ]);

  const roundedMinutes = Math.floor(diff.minutes);

  if (diff.years >= 1) {
    return created.toLocaleString(DateTime.DATE_MED);
  } else if (diff.months >= 1) {
    return `${diff.months} month${diff.months > 1 ? "s" : ""} ago`;
  } else if (diff.days >= 1) {
    return `${diff.days} day${diff.days > 1 ? "s" : ""} ago`;
  } else if (diff.hours >= 1) {
    return `${diff.hours} hour${diff.hours > 1 ? "s" : ""} ago`;
  } else if (roundedMinutes > 0) {
    return `${roundedMinutes} minute${roundedMinutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
}
