import dayjs from "dayjs";

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-IN").format(value);
};

export const getRemainingDays = (start: Date, end: Date): string => {
  const remainingYears = dayjs(end).diff(start, "year");
  if (remainingYears > 0)
    return (
      remainingYears +
      " " +
      (remainingYears === 1 ? "year " : "years ") +
      "remaining"
    );

  const remainingMonths = dayjs(end).diff(start, "month");
  if (remainingMonths > 0)
    return (
      remainingMonths +
      " " +
      (remainingMonths === 1 ? "month " : "months ") +
      "remaining"
    );

  const remainingDays = dayjs(end).diff(start, "day");
  if (remainingDays > 0)
    return (
      remainingDays +
      " " +
      (remainingDays === 1 ? "day " : "days ") +
      "remaining"
    );

  return "";
};
