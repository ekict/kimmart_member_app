import {StyleSheet, View} from 'react-native';
import React from 'react';
import {BlurView} from '@react-native-community/blur';
import LinearGradient from 'react-native-linear-gradient';
import {TextTranslate, TextTranslateWithValue} from '../../components';
import {Weight} from '../../res/lang';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import {deviceWidth} from '../../styles';
import colors from '../../styles/colors';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '../../hooks/redux';

const Card = () => {
  const user = useAppSelector(state => state.user);
  return (
    <View className={`overflow-hidden w-full absolute h-[250px] bg-[#F6E3D0]`}>
      <View className="w-56 h-56 bg-[#F8C7A7] rounded-full absolute left-[-70px] top-[-70px]"></View>
      <View className="w-56 h-56 bg-[#c46fcf80] absolute right-[-80px] rounded-full bottom-[-80px]"></View>
      <BlurView
        style={styles.absolute}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <LinearGradient
        style={{
          shadowColor: '#00000078',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        locations={[
          0.0222, 0.1069, 0.1805, 0.3309, 0.5509, 0.6553, 0.7834, 0.9659,
        ]}
        start={{x: 0, y: 0}}
        end={{x: 1.2, y: 1.2}}
        colors={[
          '#FBEACB',
          '#F3C3A1',
          '#EFB08D',
          '#ED9C7D',
          '#D97EB7',
          '#B971C8',
          '#9060DF',
          '#7659DD',
        ]}
        className="absolute left-0 right-0 top-4 h-[190px] rounded-3xl z-20 mx-8">
        <View className="flex-row justify-between h-full">
          <View className="px-6 pt-4">
            <TextTranslate weight={Weight.bold} style={styles.balance}>
              home.balance
            </TextTranslate>
            <TextTranslateWithValue
              weight={Weight.bold}
              style={[styles.balance, {fontSize: 28, marginTop: 10}]}>
              P{parseFloat(String(Number(user?.point ?? 0).toFixed(3)))}
            </TextTranslateWithValue>
            <Barcode
              format="CODE128"
              value={`KM-${user?.phone}`}
              text={`KM-${user?.phone}`}
              style={{marginTop: 10}}
              maxWidth={deviceWidth / 2.5}
              height={50}
              background="transparent"
              textStyle={{
                fontWeight: 'bold',
              }}
            />
          </View>
          <View className="items-center justify-center mr-4">
            <FastImage
              source={require('../../assets/images/k.png')}
              resizeMode="contain"
              style={{
                width: 100,
                height: '100%',
              }}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  balance: {
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 5,
    color: colors.lightColor,
    fontSize: 20,
  },
});
