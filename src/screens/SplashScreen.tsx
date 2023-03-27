import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {bgColor, deviceWidth} from '../styles';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {reset} from '../services/utils/navigate';
import Route from '../navigation/constant';
import FastImage from 'react-native-fast-image';
import {getURL} from '../hooks/api';
import {setLoadURL} from '../redux/actions';

const SplashScreen = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const url = useAppSelector(state => state.url);
  useEffect(() => {
    const initURL = async () => {
      const url = await getURL();
      dispatch(setLoadURL(url));
    };
    initURL();
  }, []);

  useEffect(() => {
    if (url) {
      setTimeout(() => {
        if (user) {
          reset(Route.Home);
        } else reset(Route.Login);
      }, 1000);
    }
  }, [user, url]);

  return (
    <View
      className={`flex-1 w-full items-center justify-center ${bgColor}
    `}>
      <FastImage
        source={require('../res/logo/logo-wide.png')}
        style={{
          width: deviceWidth / 1.5,
          height: '100%',
          marginBottom: 100,
        }}
        resizeMode="contain"
      />
      <View className="absolute bottom-24">
        <FastImage
          source={require('../assets/images/splash.png')}
          style={{
            width: deviceWidth,
            height: 300,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
