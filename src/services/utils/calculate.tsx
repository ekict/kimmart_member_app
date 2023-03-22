export const getTotal = (data: any, is_return: any = false) => {
  let amount = 0;
  if (data.length > 0) {
    data.forEach((item: any) => {
      amount +=
        Number(item.price) *
          Number(is_return ? item?.return_quantity : item?.quantity) -
        Number(item?.discount_amount);
    });
  }
  return Number(amount);
};

export const getTotalByInvoice = (data: any) => {
  let amount = 0;
  if (data.length > 0) {
    data.forEach((item: any) => {
      amount +=
        Number(item.price) * Number(item.quantity) -
        Number(item?.discount_amount ?? 0);
    });
    return amount;
  } else {
    return amount;
  }
};

export const getCurrentTotal = (data: any) => {
  const amount = data.quantity * data.price;
  let total = amount - (data?.discount_amount ?? 0);
  return total;
};

export const getCurrentTotalReturn = (data: any) => {
  const amount = (data?.quantity - data?.return_quantity) * data.price;
  let total = amount - data.discount_amount;
  return total;
};

export const getTotalPoint = async (data: any) => {
  let point = 0;
  if (data.length > 0) {
    await data.forEach((item: any) => {
      point += (getCurrentTotal(item) * Number(item.point)) / 100;
    });
    return point;
  } else return point;
};
