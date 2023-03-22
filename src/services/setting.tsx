import {numberWithCommas, numberWithCommasDecimalPoint} from './utils';

export const decimal_point = 2;

export const Currency = {
  DOLLAR: '$',
  RIEL: '៛',
};

export function formatCurrency(value: any, noDecimal = false, currency = '$') {
  const num = Number(value);
  let covertToCurrency = '';
  if (!isNaN(num)) {
    switch (currency) {
      case '$':
        covertToCurrency =
          currency +
          (noDecimal
            ? numberWithCommas(num)
            : numberWithCommasDecimalPoint(num));
        break;
      case '៛':
        covertToCurrency = currency + numberWithCommas(num);
        break;
      default:
        covertToCurrency = '';
        break;
    }
  }
  return covertToCurrency;
}

export function formatPercent(value: any) {
  const num = Number(value);
  let covertToCurrency = '';
  if (!isNaN(num)) {
    covertToCurrency = numberWithCommas(num) + '%';
  }
  return covertToCurrency;
}

export function calculateDiscount(item: any) {
  const price = item?.original_price ?? item?.price;
  let is_not_discount =
    item?.discount_amount === 0 && item?.discount_percent === 0;
  if (is_not_discount) return price;

  const base_price = price;
  const discount_amount = item?.discount_amount;
  const discount_percent = item?.discount_percent;
  let total_price = 0;
  if (discount_amount === 0) {
    const discount_value = base_price * (discount_percent / 100);
    total_price = base_price - discount_value;
  } else {
    total_price = base_price - discount_amount;
  }
  return total_price;
}

export function DiscountExists(item: any) {
  return (
    item?.discount_amount !== 0 ||
    item?.discount_percent !== 0 ||
    item?.price !== (item?.original_price ?? item?.price)
  );
}
