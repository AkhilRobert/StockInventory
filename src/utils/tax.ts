// formulat from https://vatcalconline.com/
// Both GST and VAT have the same formula
export const calculateTax = (amount: number, percentage: number): number => {
  return amount + amount * (percentage / 100);
};
