import {Alert, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {XMarkIcon} from 'react-native-heroicons/solid';
import colors from '../../../styles/colors';
import {
  ButtonSubmit,
  FlatListVertical,
  TextTranslate,
  TextTranslateWithValue,
} from '../../../components';
import {Weight} from '../../../res/lang';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator} from 'react-native';
import {submitRedeem} from '../../../hooks/api/get-api';
import {useAppSelector} from '../../../hooks/redux';
import {StatusType, toastConfig} from '../../../../App';
import {Platform} from 'react-native';

const keypad = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'back'];
const RedeemPointModal = ({visible, closeModal, data}: any) => {
  const {t} = useTranslation('common');
  const user = useAppSelector(state => state.user);
  const result = data.length > 0 ? JSON.parse(data[0]?.displayValue) : null;
  const [redeemPoint, setRedeemPoint] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const renderItem = useCallback(
    ({item}: any) => {
      let width = 110;
      if (Platform.OS === 'ios') {
        if (Platform?.isPad) width = 150;
      }
      return (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            if (item == '.') {
              if (redeemPoint.indexOf('.') > 0) return;
            }

            if (item == 'back') {
              setRedeemPoint(point =>
                point.length == 1 ? '0' : point.slice(0, -1),
              );
            } else {
              setRedeemPoint(point => (point == '0' ? item : point + item));
            }
          }}
          style={{
            width,
            height: width - 30,
          }}
          className="items-center justify-center">
          {item === 'back' ? (
            <Ionicons
              name="backspace"
              size={30}
              color={colors.darkColor}
              style={{
                opacity: 0.8,
              }}
            />
          ) : (
            <TextTranslateWithValue weight={Weight.bold} fontSize={24}>
              {item}
            </TextTranslateWithValue>
          )}
        </TouchableOpacity>
      );
    },
    [redeemPoint],
  );
  const handleSubmit = async () => {
    if (Number(redeemPoint) > Number(user?.point)) {
      Toast.show({
        type: StatusType.warning,
        text1: 'message.insufficient_redeem_point',
      });
      return;
    }
    Alert.alert(
      String(t('message.confirm')),
      String(t('message.are_you_want_to_submit')),
      [
        {
          text: String(t('message.no')),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: String(t('message.yes')),
          onPress: async () => {
            setIsLoading(true);
            const submit = await submitRedeem({
              phone: user?.phone,
              customer_id: user?.id,
              redeem_point: Number(redeemPoint),
              temp_id: result?.temp_id,
            });
            if (submit.success) {
              closeModal();
              Toast.show({
                text1: 'message.redeem_completed',
              });
            } else {
              setIsLoading(false);
              Toast.show({
                type: StatusType.error,
                text1: 'message.redeem_incomplete',
              });
            }
          },
        },
      ],
    );
  };
  return result ? (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <View
        className={`flex-1 w-full bg-slate-200/95
        `}>
        {isLoading ? (
          <View className="mt-[200px] items-center">
            <TextTranslate weight={Weight.bold} fontSize={20}>
              message.processing
            </TextTranslate>
            <TextTranslate style={styles.desc}>
              message.wait_until_process_complete
            </TextTranslate>
            <View className="mt-24">
              <ActivityIndicator size={50} color={colors.secondColor} />
            </View>
          </View>
        ) : (
          <View className="mt-[20%] items-center">
            <View className="flex-row">
              <View className="items-center mb-12 border-b border-gray-400">
                <TextTranslate
                  weight={Weight.bold}
                  fontSize={16}
                  style={{
                    color: colors.secondColor,
                  }}>
                  home.current_point
                </TextTranslate>
                <TextTranslateWithValue
                  weight={Weight.bold}
                  fontSize={28}
                  style={{
                    color: colors.secondColor,
                    marginTop: 15,
                  }}>
                  {`P${parseFloat(String(Number(user?.point).toFixed(3)))}`}
                </TextTranslateWithValue>
              </View>
              <View className="items-center mb-12 ml-6 border-b border-gray-400">
                <TextTranslate
                  weight={Weight.bold}
                  fontSize={16}
                  style={{
                    color: colors.iconColor,
                  }}>
                  home.purchase_amount
                </TextTranslate>
                <TextTranslateWithValue
                  weight={Weight.bold}
                  fontSize={28}
                  style={{
                    color: colors.iconColor,
                    marginTop: 15,
                  }}>
                  {`$${Number(result?.amount ?? 0).toFixed(2)}`}
                </TextTranslateWithValue>
              </View>
            </View>
            <TextTranslate weight={Weight.bold} fontSize={18}>
              home.enter_redeem_point
            </TextTranslate>
            <View className="flex-row gap-1 mt-4">
              <TextTranslateWithValue
                fontSize={28}
                style={{
                  opacity: redeemPoint == '0' ? 0.6 : 1,
                }}>
                P
              </TextTranslateWithValue>
              <TextTranslateWithValue
                fontSize={28}
                style={{
                  opacity: redeemPoint == '0' ? 0.6 : 1,
                }}>
                {redeemPoint}
              </TextTranslateWithValue>
            </View>
            <FlatListVertical
              numColumns={3}
              data={keypad}
              renderItem={renderItem}
            />
            <ButtonSubmit
              onPress={handleSubmit}
              style={{
                marginTop: 10,
              }}>
              message.confirm
            </ButtonSubmit>
          </View>
        )}
        <TouchableOpacity
          onPress={closeModal}
          className="self-center mt-10 items-center justify-center w-16 h-16 bg-white rounded-full">
          <XMarkIcon color={colors.darkColor} size={30} />
        </TouchableOpacity>
      </View>
      <Toast
        position="bottom"
        config={toastConfig}
        visibilityTime={3000}
        bottomOffset={10}
      />
    </Modal>
  ) : null;
};

export default React.memo(RedeemPointModal);

const styles = StyleSheet.create({
  desc: {
    marginTop: 16,
  },
});
