import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {bgColor, deviceWidth} from '../../../styles';
import BaseComponent from '../../../components/BaseComponent';
import {ButtonSubmit, TextTranslate} from '../../../components';
import {Weight} from '../../../res/lang';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../styles/colors';
import {reset} from '../../../services/utils/navigate';
import Route from '../../../navigation/constant';
import FastImage from 'react-native-fast-image';
const data = [
  {
    title: 'auth.earn_point_from',
    icon: 'star',
    color: '#F05A28',
    bg_color: '#F8C7A7',
  },
  {
    title: 'auth.use_point_for',
    icon: 'gift',
    color: '#2B4590',
    bg_color: '#EDDBC7',
  },
];
const GettingStart = () => {
  const onExplore = () => {
    reset(Route.Home);
  };
  return (
    <BaseComponent>
      <View
        className={`flex-1 w-full ${bgColor}
  `}>
        <View className={`pb-6 rounded-b-[30px] ${colors.bgMainMolor}`}>
          <FastImage
            source={require('../../../assets/images/splash.png')}
            style={{
              width: deviceWidth,
              height: 300,
            }}
            resizeMode="contain"
          />
        </View>
        <View
          className={`py-10 w-full flex-col mt-6 flex-1 rounded-t-[30px] px-4 justify-between`}>
          <View className="items-center">
            <TextTranslate weight={Weight.bold} style={styles.title}>
              auth.introducing_kimmart
            </TextTranslate>
            <View className="w-full mt-10">
              {data.map((item: any, index: number) => {
                return (
                  <View key={index} className="flex-row w-8/12 gap-3 mb-3">
                    <View
                      style={{
                        backgroundColor: item.bg_color,
                        width: 44,
                        height: 44,
                      }}
                      className="items-center justify-center rounded-full">
                      <Ionicons name={item.icon} color={item.color} size={18} />
                    </View>
                    <TextTranslate style={styles.desc}>
                      {item.title}
                    </TextTranslate>
                  </View>
                );
              })}
            </View>
          </View>
          <ButtonSubmit
            onPress={onExplore}
            style={{
              marginBottom: 50,
              alignSelf: 'center',
            }}>
            auth.lets_explore
          </ButtonSubmit>
        </View>
      </View>
    </BaseComponent>
  );
};

export default GettingStart;

const styles = StyleSheet.create({
  title: {
    color: '#F05A28',
    fontSize: 20,
  },
  desc: {
    fontSize: 16,
    opacity: 0.8,
    paddingTop: 8,
    lineHeight: 30,
  },
});
