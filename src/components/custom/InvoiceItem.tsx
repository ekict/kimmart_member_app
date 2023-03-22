import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ShoppingBagIcon} from 'react-native-heroicons/outline';
import colors from '../../styles/colors';
import {TextPriceSplit, TextTranslate, TextTranslateWithValue} from '..';
import {Weight} from '../../res/lang';
import {dateDiffInNotification} from '../../services/utils';
import {useTranslation} from 'react-i18next';
import {navigate} from '../../services/utils/navigate';
import Route from '../../navigation/constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const InvoiceItem = ({item, is_background = true}: any) => {
  const {t} = useTranslation('common');
  const payment = item?.payments.find(
    (payment: any) => payment?.payment_type?.type === 'point',
  );
  return (
    <TouchableOpacity
      onPress={() =>
        navigate(Route.PurchaseDetail, {
          invoice: item,
        })
      }
      className={`flex-row items-center px-4 py-4 ${
        item?.invoice_id && is_background ? 'bg-red-50' : ''
      }`}>
      <View className="items-center justify-center w-14 h-14 rounded-full bg-[#F6E3D0]">
        <ShoppingBagIcon color={colors.mainColor} size={28} />
      </View>
      <View className="flex-row justify-between flex-1">
        <View>
          <TextTranslate weight={Weight.bold} style={styles.uniq}>
            {item?.uniq_id}
          </TextTranslate>
          <TextTranslate style={styles.date}>
            {dateDiffInNotification(item?.created_at)}
          </TextTranslate>
          <View className="flex-row px-[10px]">
            {Number(item?.order_point ?? 0) > 0 && (
              <View className="flex-row">
                <MaterialIcons
                  name={item?.invoice_id ? 'call-received' : 'call-made'}
                  color={item?.invoice_id ? '#f15b29' : '#3ab54a'}
                  size={16}
                />
                <TextTranslateWithValue
                  weight={Weight.bold}
                  style={[
                    styles.point,
                    {
                      color: '#3ab54a',
                    },
                  ]}>
                  {t('home.earn_value', {
                    value: parseFloat(
                      String(Number(item?.order_point ?? 0).toFixed(3)),
                    ),
                    symbol:
                      Number(item?.order_point ?? 0) > 0
                        ? item?.invoice_id
                          ? '-'
                          : '+'
                        : '',
                  })}
                </TextTranslateWithValue>
              </View>
            )}
            {Number(payment?.amount ?? 0) > 0 && (
              <View
                className={`flex-row ${
                  Number(item?.order_point ?? 0) > 0 ? 'ml-3' : ''
                }`}>
                <MaterialIcons
                  name={'call-received'}
                  color={'#f15b29'}
                  size={16}
                />
                <TextTranslateWithValue
                  weight={Weight.bold}
                  style={[
                    styles.point,
                    {
                      color: '#f15b29',
                    },
                  ]}>
                  {t('home.redeem_value', {
                    value: parseFloat(
                      String(Number(payment?.amount ?? 0).toFixed(3)),
                    ),
                    symbol: Number(payment?.amount ?? 0) > 0 ? '-' : '',
                  })}
                </TextTranslateWithValue>
              </View>
            )}
          </View>
        </View>
        <View className="items-end">
          <TextTranslate style={styles.title} weight={Weight.bold}>
            {item?.invoice_id ? 'home.return_amount' : 'home.amount'}
          </TextTranslate>
          <TextPriceSplit>
            {Number(item?.amount ?? 0).toFixed(2)}
          </TextPriceSplit>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(InvoiceItem);

const styles = StyleSheet.create({
  uniq: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 13,
    opacity: 0.8,
    paddingHorizontal: 10,
  },
  point: {
    fontSize: 13,
    marginLeft: 3,
  },
  title: {
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 5,
  },
});
