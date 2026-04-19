export const formatMoney = (amount: number) => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const roundMoney = (amount: number) => {
  return Math.round(amount * 100) / 100;
};

export const calculateLineTotal = (price: number, quantity: number) => {
  return roundMoney(price * quantity);
};

export const calculateOrderTotals = (subtotalRaw: number, deliveryFeeRaw: number, ivaRate: number) => {
  const subtotal = roundMoney(subtotalRaw);
  const iva = roundMoney(subtotal * ivaRate);
  const deliveryFee = roundMoney(deliveryFeeRaw);
  const total = roundMoney(subtotal + iva + deliveryFee);
  return { subtotal, iva, deliveryFee, total };
};

export const calculateOrderTotalBs = (subtotalRaw: number, deliveryFeeRaw: number, ivaRate: number, rate: number) => {
  const { total } = calculateOrderTotals(subtotalRaw, deliveryFeeRaw, ivaRate);
  return roundMoney(total * rate);
};

export const calculateExactBs = (amount: number, rate: number) => {
  return roundMoney(amount * rate);
};

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
