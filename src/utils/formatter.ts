export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(value);
};

export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("en-IN").format(value);
};
