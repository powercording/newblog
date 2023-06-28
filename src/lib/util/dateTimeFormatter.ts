const formatter = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

export const dateFormat = (date: Date) => {
  return formatter.format(date);
};
