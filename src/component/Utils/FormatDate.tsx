export const formatTime = (timestamp: Date): string => {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - timestamp.getTime()) / 1000
  );

  const timeUnits = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  const oneMonthInSeconds = 2592000;
  if (diffInSeconds > oneMonthInSeconds) {
    return formatDate(timestamp);
  }

  for (const { unit, seconds } of timeUnits) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value >= 1) {
      return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

export const formatDate = (timestamp: Date): string => {
  const day = String(timestamp.getDate()).padStart(2, "0");
  const month = String(timestamp.getMonth() + 1).padStart(2, "0");
  const year = timestamp.getFullYear();
  return `${day}/${month}/${year}`;
};
