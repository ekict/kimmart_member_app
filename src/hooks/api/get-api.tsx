import {fetchAPI, MethodType} from '.';
import {
  CHECK_PHONE,
  EARN_POINT_INVOICES,
  EARN_POINT_RETURN_INVOICES,
  HOME_MEMBER,
  INVOICES,
  MEMBER_DELETE,
  REDEEM_POINT_INVOICES,
  RETURN_INVOICES,
  SUBMIT_REDEEM,
  TEST_LOGIN,
} from '../constants';

export const checkPhone = async (data: any) => {
  const result = await fetchAPI(MethodType.GET, CHECK_PHONE, data);
  return result;
};

export const getHome = async (data: any) => {
  const result = await fetchAPI(MethodType.GET, HOME_MEMBER, data);
  return result;
};

export const getInvoices = async (data: any) => {
  const result = await fetchAPI(MethodType.GET, INVOICES, data);
  return result;
};

export const getInvoicesReturn = async (data: any) => {
  const result = await fetchAPI(MethodType.GET, RETURN_INVOICES, data);
  return result;
};

export const getEarn = async (data: any) => {
  const result = await fetchAPI(MethodType.GET, EARN_POINT_INVOICES, data);
  return result;
};

export const getEarnReturn = async (data: any) => {
  const result = await fetchAPI(
    MethodType.GET,
    EARN_POINT_RETURN_INVOICES,
    data,
  );
  return result;
};

export const getRedeem = async (data: any) => {
  const result = await fetchAPI(MethodType.GET, REDEEM_POINT_INVOICES, data);
  return result;
};

export const submitRedeem = async (data: any) => {
  const result = await fetchAPI(MethodType.GET, SUBMIT_REDEEM, data);
  return result;
};

export const testLogin = async (data: any) => {
  const result = await fetchAPI(MethodType.GET, TEST_LOGIN, data);
  return result;
};

export const memberDelete = async (data: any) => {
  const result = await fetchAPI(MethodType.GET, MEMBER_DELETE, data);
  return result;
};
