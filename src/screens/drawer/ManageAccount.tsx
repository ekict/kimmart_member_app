import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import BaseComponent from '../../components/BaseComponent';
import {bgColor} from '../../styles';
import {Weight} from '../../res/lang';
import {TextTranslate} from '../../components';
import {useTranslation} from 'react-i18next';
import {pusher} from '../../navigation/Route';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useAuth} from '../../hooks/auth';
import {setLoadUser} from '../../redux/actions';
import {reset} from '../../services/utils/navigate';
import Route from '../../navigation/constant';
import {ShieldExclamationIcon} from 'react-native-heroicons/outline';
import {memberDelete} from '../../hooks/api/get-api';
import Toast from 'react-native-toast-message';
import {toastConfig} from '../../../App';

const ManageAccount = () => {
  const {t} = useTranslation('common');
  const user = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {accessLogin} = useAuth();

  const deleteAccount = async () => {
    Alert.alert(
      String(t('message.confirm')),
      String(t('message.are_you_want_to_delete_account')),
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
            const result = await memberDelete({
              customer_id: user?.id,
            });
            if (result?.success) {
              const channelName = `user-real-time-${user?.phone}-channel`;
              const channel = pusher.getChannel(channelName);
              if (channel) {
                await pusher.unsubscribe({channelName});
                await pusher.disconnect();
              }
              accessLogin('');
              dispatch(setLoadUser(null));
              Toast.show({
                text1: 'message.delete_completed',
              });
              setTimeout(() => {
                reset(Route.Login);
              }, 500);
            } else {
              Toast.show({
                type: 'error',
                text1: 'error.server_error',
              });
              setIsLoading(false);
            }
          },
        },
      ],
    );
  };
  return (
    <BaseComponent title="auth.manage_account">
      <View
        className={`flex-1 w-full ${bgColor}
          `}>
        <View className="p-6">
          <View className="flex-row mb-3 items-center">
            <ShieldExclamationIcon color={'red'} size={22} />
            <TextTranslate
              weight={Weight.bold}
              style={[
                styles.name,
                {
                  marginLeft: 12,
                  color: 'red',
                },
              ]}>
              message.warning
            </TextTranslate>
          </View>
          <TextTranslate fontSize={16}>auth.delete_account_info</TextTranslate>
          <View className="mt-10">
            <TouchableOpacity
              disabled={isLoading}
              onPress={deleteAccount}
              style={{
                opacity: isLoading ? 0.5 : 1,
              }}
              className={`flex-row items-center justify-center w-full h-[50px] bg-red-500 rounded-lg`}>
              {isLoading ? (
                <ActivityIndicator color={'white'} size={24} />
              ) : (
                <TextTranslate
                  weight={Weight.bold}
                  style={[
                    styles.name,
                    {
                      marginLeft: 12,
                      color: 'white',
                    },
                  ]}>
                  auth.delete_account
                </TextTranslate>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Toast
        position="bottom"
        config={toastConfig}
        visibilityTime={3000}
        bottomOffset={10}
      />
    </BaseComponent>
  );
};

export default ManageAccount;

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
  },
});
