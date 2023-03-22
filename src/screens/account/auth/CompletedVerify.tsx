import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import BaseComponent from '../../../components/BaseComponent';
import {bgColor, deviceWidth} from '../../../styles';
import colors from '../../../styles/colors';
import {TextTranslate} from '../../../components';
import {Weight} from '../../../res/lang';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {reset} from '../../../services/utils/navigate';
import Route from '../../../navigation/constant';
import FastImage from 'react-native-fast-image';
import {checkPhone} from '../../../hooks/api/get-api';
import {useAuth} from '../../../hooks/auth';
import {useAppDispatch} from '../../../hooks/redux';
import {setLoadHome, setLoadUser} from '../../../redux/actions';

const CompletedVerify = (props: any) => {
  const {accessLogin} = useAuth();
  const dispatch = useAppDispatch();
  const {phone} = props.route.params;
  useEffect(() => {
    checkRoute();
  }, []);

  const checkRoute = async () => {
    const result = await checkPhone({
      phone,
    });
    if (result?.success) {
      accessLogin(result?.token);
      if (result?.data) {
        dispatch(setLoadUser(result?.data));
        reset(Route.Home);
      } else {
        reset(Route.EditProfile, {
          phone,
        });
      }
    } else {
      reset(Route.Login);
    }
  };

  return (
    <BaseComponent>
      <View
        className={`flex-1 w-full ${bgColor}
          `}>
        <View className="bg-[#F05A28] opacity-50 h-[200px] w-full rounded-b-[30px]" />
        <View
          style={{
            width: deviceWidth - 80,
          }}
          className="absolute top-[120px] z-20 bg-[#F6E3D0] h-[146px] rounded-[21px] p-[26px] mx-10">
          <FastImage
            source={require('../../../res/logo/logo-wide.png')}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </View>
        <View className="flex-1 w-full items-center mt-[180px]">
          <View
            className={`w-24 h-24 rounded-full items-center justify-center mb-4 bg-[#7BAB91]`}>
            <MaterialCommunityIcons
              name="check"
              color={colors.lightColor}
              size={40}
            />
          </View>
          <TextTranslate weight={Weight.bold} style={styles.title}>
            auth.congratulations
          </TextTranslate>
          <TextTranslate style={styles.desc}>
            auth.you_account_verifies
          </TextTranslate>
          <ActivityIndicator
            size="large"
            color={colors.mainColor}
            style={{marginTop: 40, alignSelf: 'center'}}
          />
        </View>
      </View>
    </BaseComponent>
  );
};

export default CompletedVerify;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 24,
  },
  desc: {
    fontSize: 16,
    marginTop: 5,
  },
});
