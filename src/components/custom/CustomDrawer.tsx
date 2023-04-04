import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BaseComponent from '../BaseComponent';
import colors from '../../styles/colors';
import LinearGradient from 'react-native-linear-gradient';
import {FlatListScroll, TextTranslate} from '..';
import {LanguageData, Weight} from '../../res/lang';
import {
  ChevronRightIcon,
  CogIcon,
  LanguageIcon,
  MapIcon,
  ShoppingBagIcon,
  UserIcon,
} from 'react-native-heroicons/outline';
import i18next from 'i18next';
import {ArrowLeftOnRectangleIcon} from 'react-native-heroicons/solid';
import {navigate, reset} from '../../services/utils/navigate';
import Route from '../../navigation/constant';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {useAuth} from '../../hooks/auth';
import {setLoadUser} from '../../redux/actions';
import {getImage} from '../../services/utils';
import {pusher} from '../../navigation/Route';

const CustomDrawer = () => {
  const {t} = useTranslation('common');
  const dispatch = useAppDispatch();
  const {accessLogin} = useAuth();
  const user = useAppSelector(state => state.user);
  const home = useAppSelector(state => state.home);
  const url = useAppSelector(state => state.url);
  const defaultImage = require('../../assets/images/profile.png');
  const image =
    user?.image && user?.image !== 'no_image.png'
      ? {uri: getImage(url, user?.image, 'member')}
      : defaultImage;

  const logout = async () => {
    Alert.alert(
      String(t('message.confirm')),
      String(t('message.are_you_want_to_logout')),
      [
        {
          text: String(t('message.no')),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: String(t('message.yes')),
          onPress: async () => {
            const channelName = `user-real-time-${user?.phone}-channel`;
            const channel = pusher.getChannel(channelName);
            if (channel) {
              await pusher.unsubscribe({channelName});
              await pusher.disconnect();
            }
            accessLogin('');
            dispatch(setLoadUser(null));
            reset(Route.Login);
          },
        },
      ],
    );
  };
  return (
    <BaseComponent>
      <View
        className={`flex-1 w-full
          `}>
        <View className="h-[25%] bg-[#F6E3D0] p-6">
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={['rgba(255, 122, 0, 1)', 'rgba(33, 150, 83, 1)']}
            className="items-center justify-center w-24 h-24 rounded-full">
            <View
              className={`w-[86px] h-[86px] rounded-full ${colors.bgMainMolor}`}>
              <FastImage
                source={image}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 500,
                }}
              />
            </View>
          </LinearGradient>
          <TextTranslate weight={Weight.bold} style={styles.phone}>
            {user?.phone}
          </TextTranslate>
        </View>
        <FlatListScroll>
          <View className="p-6">
            <View className="">
              <TextTranslate weight={Weight.bold} style={styles.title}>
                home.account
              </TextTranslate>
              <TouchableOpacity
                onPress={() => {
                  navigate(Route.EditProfile);
                }}
                className="flex-row items-center justify-between mt-4">
                <View className="flex-row items-center gap-2">
                  <UserIcon color={colors.darkColor} opacity={0.6} size={24} />
                  <TextTranslate style={styles.listTitle}>
                    home.edit_profile
                  </TextTranslate>
                </View>
                <ChevronRightIcon
                  color={colors.darkColor}
                  opacity={0.6}
                  size={18}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate(Route.ManageAccount);
                }}
                className="flex-row items-center justify-between mt-4">
                <View className="flex-row items-center gap-2">
                  <CogIcon color={colors.darkColor} opacity={0.6} size={24} />
                  <TextTranslate style={styles.listTitle}>
                    auth.manage_account
                  </TextTranslate>
                </View>
                <ChevronRightIcon
                  color={colors.darkColor}
                  opacity={0.6}
                  size={18}
                />
              </TouchableOpacity>
            </View>
            <View className="mt-6">
              <TextTranslate weight={Weight.bold} style={styles.title}>
                home.settings
              </TextTranslate>
              <TouchableOpacity
                onPress={() => {
                  navigate(Route.Language);
                }}
                className="flex-row items-center justify-between mt-4">
                <View className="flex-row items-center gap-2">
                  <LanguageIcon
                    color={colors.darkColor}
                    opacity={0.6}
                    size={24}
                  />
                  <TextTranslate style={styles.listTitle}>
                    language
                  </TextTranslate>
                </View>
                <View className="flex-row items-center gap-2">
                  <TextTranslate
                    style={[
                      styles.listTitle,
                      {
                        color: colors.secondColor,
                        fontSize: 14,
                      },
                    ]}>
                    {LanguageData.find((i: any) => i.key === i18next.language)
                      ?.name ?? 'English'}
                  </TextTranslate>
                  <ChevronRightIcon
                    color={colors.darkColor}
                    opacity={0.6}
                    size={18}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View className="mt-6">
              <TextTranslate weight={Weight.bold} style={styles.title}>
                home.invoices
              </TextTranslate>
              <TouchableOpacity
                onPress={() => {
                  navigate(Route.PurchaseHistory);
                }}
                className="flex-row items-center justify-between mt-4">
                <View className="flex-row items-center gap-2">
                  <ShoppingBagIcon
                    color={colors.darkColor}
                    opacity={0.6}
                    size={24}
                  />
                  <TextTranslate style={styles.listTitle}>
                    home.purchases
                  </TextTranslate>
                </View>
                <ChevronRightIcon
                  color={colors.darkColor}
                  opacity={0.6}
                  size={18}
                />
              </TouchableOpacity>
            </View>
            {home && (
              <View className="mt-6">
                <TextTranslate weight={Weight.bold} style={styles.title}>
                  home.kimmart_store
                </TextTranslate>
                <TouchableOpacity
                  onPress={() => {
                    navigate(Route.Locations);
                  }}
                  className="flex-row items-center justify-between mt-4">
                  <View className="flex-row items-center gap-2">
                    <MapIcon color={colors.darkColor} opacity={0.6} size={24} />
                    <TextTranslate style={styles.listTitle}>
                      home.locations
                    </TextTranslate>
                  </View>
                  <ChevronRightIcon
                    color={colors.darkColor}
                    opacity={0.6}
                    size={18}
                  />
                </TouchableOpacity>
              </View>
            )}
            <View className="mt-10">
              <TouchableOpacity
                onPress={logout}
                className={`flex-row items-center justify-center w-full h-[50px] bg-[#F6E3D0] rounded-lg`}>
                <ArrowLeftOnRectangleIcon
                  color={'red'}
                  opacity={0.6}
                  size={26}
                />
                <TextTranslate
                  weight={Weight.bold}
                  style={[
                    styles.listTitle,
                    {
                      marginLeft: 12,
                      color: 'red',
                    },
                  ]}>
                  home.logout
                </TextTranslate>
              </TouchableOpacity>
            </View>
          </View>
        </FlatListScroll>
      </View>
    </BaseComponent>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    opacity: 0.6,
    color: colors.secondColor,
  },
  listTitle: {
    fontSize: 16,
  },
  phone: {
    fontSize: 18,
    marginTop: 28,
    opacity: 0.6,
  },
});
