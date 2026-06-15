export const formatTime = (timestamp: string | Date, locale = "en") => {
  let relativeTime;

  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const diff = (Date.now() - date.getTime()) / 1000;
  const minutes = Math.floor(diff / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "always" });

  if (years > 0) {
    relativeTime = rtf.format(-years, "year");
  } else if (months > 0) {
    relativeTime = rtf.format(-months, "month");
  } else if (days > 0) {
    relativeTime = rtf.format(-days, "day");
  } else if (hours > 0) {
    relativeTime = rtf.format(-hours, "hour");
  } else if (minutes > 0) {
    relativeTime = rtf.format(-minutes, "minute");
  } else {
    relativeTime = rtf.format(-Math.round(diff), "second");
  }

  return relativeTime;
};
