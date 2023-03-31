import {StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import BaseComponent from '../../components/BaseComponent';
import {
  FlatListScroll,
  FlatListVertical,
  TextTranslate,
  TextTranslateWithValue,
} from '../../components';
import {Weight} from '../../res/lang';
import {dateDiffInNotification} from '../../services/utils';
import {getTotal} from '../../services/utils/calculate';
import colors from '../../styles/colors';
import {useTranslation} from 'react-i18next';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import {deviceWidth} from '../../styles';
import i18next from 'i18next';

const PurchaseDetail = (props: any) => {
  const {t} = useTranslation('common');
  const {invoice} = props.route.params;
  const orders = invoice?.invoice_id ? invoice?.returnorder : invoice?.order;
  const renderItem = useCallback(({item, index}: any) => {
    return (
      <View className="flex-row px-4 py-1.5">
        <TextTranslateWithValue
          style={{
            width: '5%',
          }}>
          {index + 1}
        </TextTranslateWithValue>
        <TextTranslateWithValue
          style={{
            width: '49%',
          }}>
          {i18next.language == 'en'
            ? item?.name_en
            : i18next.language == 'ko'
            ? item?.name_ko ?? item?.name_en
            : item?.name_kh ?? item?.name_en}
        </TextTranslateWithValue>
        <TextTranslateWithValue
          style={{
            width: '10%',
            textAlign: 'center',
          }}>
          {item?.quantity}
        </TextTranslateWithValue>
        <TextTranslateWithValue
          style={{
            width: '12%',
            textAlign: 'center',
          }}>
          {Number(item?.price).toFixed(2)}
        </TextTranslateWithValue>
        <TextTranslateWithValue
          style={{
            width: '12%',
            textAlign: 'center',
          }}>
          {Number(item?.discount_amount).toFixed(2)}
        </TextTranslateWithValue>
        <TextTranslateWithValue
          style={{
            width: '12%',
            textAlign: 'right',
          }}>
          {Number(
            item.quantity * item.price - item.discount_amount ?? 0,
          ).toFixed(2)}
        </TextTranslateWithValue>
      </View>
    );
  }, []);

  return (
    <BaseComponent title="home.purchase_detail">
      <View
        className={`flex-1 w-full bg-gray-100
        `}>
        <FlatListScroll>
          <View className="mx-4 mt-4 bg-white rounded-xl">
            <View className="px-4 py-2 border-b border-gray-200">
              <TextTranslate weight={Weight.bold} fontSize={16}>
                home.purchase_information
              </TextTranslate>
            </View>
            <View className="px-4 py-2 pb-4">
              {!invoice?.invoice_id && (
                <Barcode
                  format="CODE128"
                  value={`IN-${invoice?.uniq_id}`}
                  text={`${invoice?.uniq_id}`}
                  maxWidth={deviceWidth / 2.5}
                  height={50}
                  background="transparent"
                  textStyle={{
                    fontWeight: 'bold',
                  }}
                />
              )}
              <View className="flex-row items-center justify-between">
                <TextTranslate
                  style={{
                    opacity: 0.8,
                  }}>
                  {invoice?.invoice_id
                    ? 'home.return_invoice_number'
                    : 'home.invoice_number'}
                </TextTranslate>
                <TextTranslate
                  style={{
                    opacity: 0.8,
                  }}>
                  {invoice?.uniq_id}
                </TextTranslate>
              </View>
              <View className="flex-row items-center justify-between mt-2">
                <TextTranslate
                  style={{
                    opacity: 0.8,
                  }}>
                  home.purchase_point
                </TextTranslate>
                <TextTranslate weight={Weight.bold}>
                  {`P${parseFloat(
                    String(Number(invoice?.order_point).toFixed(3)),
                  )}`}
                </TextTranslate>
              </View>
              <View className="flex-row items-center justify-between mt-2">
                <TextTranslate
                  style={{
                    opacity: 0.8,
                  }}>
                  home.purchase_date
                </TextTranslate>
                <TextTranslate weight={Weight.bold}>
                  {dateDiffInNotification(invoice?.created_at)}
                </TextTranslate>
              </View>
            </View>
          </View>
          <View className="mx-4 mt-4 bg-white rounded-xl">
            <View className="flex-row px-4 py-2 border-b border-gray-200">
              <TextTranslateWithValue
                style={{
                  width: '5%',
                }}
                weight={Weight.bold}>
                #
              </TextTranslateWithValue>
              <TextTranslate
                style={{
                  width: '49%',
                }}
                weight={Weight.bold}>
                home.name
              </TextTranslate>
              <TextTranslate
                style={{
                  width: '10%',
                  textAlign: 'center',
                }}
                weight={Weight.bold}>
                home.qty
              </TextTranslate>
              <TextTranslate
                style={{
                  width: '12%',
                  textAlign: 'center',
                }}
                weight={Weight.bold}>
                home.price
              </TextTranslate>
              <TextTranslate
                style={{
                  width: '12%',
                  textAlign: 'center',
                }}
                weight={Weight.bold}>
                home.dis
              </TextTranslate>
              <TextTranslate
                style={{
                  width: '12%',
                  textAlign: 'right',
                }}
                weight={Weight.bold}>
                home.amt
              </TextTranslate>
            </View>
            <View className="pb-2">
              <FlatListVertical data={orders} renderItem={renderItem} />
            </View>
          </View>
          <View className="mx-4 mt-4 bg-white rounded-xl">
            <View className="px-4 py-2 border-b border-gray-200">
              <TextTranslate weight={Weight.bold} fontSize={16}>
                home.amount_of_purchase
              </TextTranslate>
            </View>
            <View className="px-4 py-2 pb-4">
              <View className="flex-row items-center justify-between">
                <TextTranslate
                  style={{
                    opacity: 0.8,
                  }}
                  fontSize={15}>
                  home.sub_total
                </TextTranslate>
                <TextTranslateWithValue
                  style={{
                    opacity: 0.8,
                  }}
                  fontSize={15}>
                  {`$${getTotal(orders ?? []).toFixed(2)}`}
                </TextTranslateWithValue>
              </View>
              <View className="flex-row items-center justify-between mt-2">
                <TextTranslate
                  style={{
                    opacity: 0.8,
                  }}
                  fontSize={15}>
                  home.discount
                </TextTranslate>
                <TextTranslateWithValue fontSize={15}>
                  {`$${Number(invoice?.discount_amount ?? 0).toFixed(2)}`}
                </TextTranslateWithValue>
              </View>
              <View className="flex-row items-center justify-between mt-2">
                <TextTranslate
                  style={{
                    opacity: 0.8,
                  }}
                  fontSize={16}>
                  home.grand_total_dollar
                </TextTranslate>
                <TextTranslateWithValue
                  weight={Weight.bold}
                  fontSize={16}
                  style={{
                    color: colors.secondColor,
                  }}>
                  {`$${(
                    getTotal(orders ?? []) -
                    Number(invoice?.discount_amount ?? 0)
                  ).toFixed(2)}`}
                </TextTranslateWithValue>
              </View>
              <View className="flex-row items-center justify-between mt-2">
                <TextTranslate
                  style={{
                    opacity: 0.8,
                  }}
                  fontSize={16}>
                  home.grand_total_riel
                </TextTranslate>
                <TextTranslateWithValue
                  weight={Weight.bold}
                  fontSize={16}
                  style={{
                    color: colors.secondColor,
                  }}>
                  {`៛${(
                    (getTotal(orders ?? []) -
                      Number(invoice?.discount_amount ?? 0)) *
                    Number(invoice?.exchange_rate)
                  ).toFixed(0)}`}
                </TextTranslateWithValue>
              </View>
              {invoice?.payments.map((payment: any, index: any) => {
                const is_point =
                  payment?.type ?? payment?.payment_type?.type === 'point';
                return (
                  <View
                    key={index}
                    className="flex-row items-center justify-between mt-2">
                    <TextTranslateWithValue
                      style={{
                        opacity: 0.8,
                      }}
                      fontSize={15}>
                      {is_point
                        ? t('home.redeem_point')
                        : payment?.title ?? payment?.payment_type?.title}
                    </TextTranslateWithValue>
                    <TextTranslateWithValue weight={Weight.bold} fontSize={15}>
                      {`${
                        is_point
                          ? 'P'
                          : Number(payment?.exchange_rate) > 1
                          ? '៛'
                          : '$'
                      }${Number(payment?.amount ?? 0).toFixed(
                        Number(payment?.exchange_rate) > 1 ? 0 : 2,
                      )}`}
                    </TextTranslateWithValue>
                  </View>
                );
              })}
              {Number(invoice?.change_amount) > 0 && (
                <>
                  <View className="flex-row items-center justify-between mt-2">
                    <TextTranslate
                      style={{
                        opacity: 0.8,
                      }}
                      fontSize={15}>
                      home.change_dollar
                    </TextTranslate>
                    <TextTranslateWithValue fontSize={15}>
                      {`$${Number(invoice?.change_amount ?? 0).toFixed(2)}`}
                    </TextTranslateWithValue>
                  </View>
                  <View className="flex-row items-center justify-between mt-2">
                    <TextTranslate
                      style={{
                        opacity: 0.8,
                      }}
                      fontSize={15}>
                      home.change_riel
                    </TextTranslate>
                    <TextTranslateWithValue fontSize={15}>
                      {`៛${(
                        Number(invoice?.change_amount ?? 0) *
                        Number(invoice?.exchange_rate)
                      ).toFixed(0)}`}
                    </TextTranslateWithValue>
                  </View>
                </>
              )}
            </View>
          </View>
        </FlatListScroll>
      </View>
    </BaseComponent>
  );
};

export default PurchaseDetail;

const styles = StyleSheet.create({});
