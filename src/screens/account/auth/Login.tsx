import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {ButtonSubmit, FlatListScroll, TextTranslate} from '../../../components';
import {bgColor} from '../../../styles';
import colors from '../../../styles/colors';
import {Weight} from '../../../res/lang';
import {Formik} from 'formik';
import {LoginSchema, LoginValue} from '../../../services/utils/validation';
import TextInputItem from '../../../components/custom/TextInputItem';
import {navigate} from '../../../services/utils/navigate';
import BaseComponent from '../../../components/BaseComponent';
import {Path, Svg} from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {checkPhoneNumber} from '../../../services/utils';
import Route from '../../../navigation/constant';
import FastImage from 'react-native-fast-image';
import {setCurrentLang} from '../../../hooks/lang';
import i18next from 'i18next';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';

const LanguageIcon: any = {
  en: require('../../../assets/images/flags/en.png'),
  km: require('../../../assets/images/flags/km.png'),
  ko: require('../../../assets/images/flags/ko.png'),
};

const Login = () => {
  const [language, setLanguage] = useState(i18next.language);
  const flagComponent = (lang: string) => (
    <TouchableOpacity
      className={`flags w-[45px] h-[45px] rounded-full p-1 ${
        language === lang ? 'border-[#c6cddb] border-2' : ''
      }`}
      onPress={() => {
        setLanguage(lang);
        setCurrentLang(lang);
      }}>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        source={LanguageIcon[lang]}
        alt=""
      />
    </TouchableOpacity>
  );

  return (
    <BaseComponent>
      <FlatListScroll>
        <View
          className={`flex-1 w-full ${bgColor}
          `}>
          <View className="bg-[#F05A28] opacity-50 h-[150px] w-full" />
          <View className="absolute z-10 top-[60px] h-[250px] left-[-25px]">
            <Svg height={250} width={280} viewBox="0 0 261 302">
              <Path
                fill={'#7BAB91'}
                d="M-11.934 26.1278C-10.2638 11.1331 2.44563 0 17.5331 0H230.584C247.314 0 260.811 13.6848 260.581 30.4135L258.268 198.169C258.023 215.97 242.416 229.739 224.663 228.415C173.99 224.636 79.4599 221.3 44.4803 244.963C-4.29358 277.958 -12.0427 346.448 -21.6152 259.961C-28.9018 194.126 -17.6995 77.8868 -11.934 26.1278Z"
              />
            </Svg>
          </View>
          <View className="absolute right-[-15px] top-[90px] z-20 bg-[#F6E3D0] h-[120px] w-9/12 rounded-[21px] p-[26px]">
            <FastImage
              source={require('../../../res/logo/logo-wide.png')}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>

          <View className="flex-1 w-full items-center mt-[140px]">
            <View
              className={`w-24 h-24 rounded-full items-center justify-center mb-4 ${colors.bgMainMolor}`}>
              <MaterialCommunityIcons
                name="lock-outline"
                color={colors.lightColor}
                size={40}
              />
            </View>
            <TextTranslate weight={Weight.bold} style={styles.title}>
              auth.verify_your_account
            </TextTranslate>
            <TextTranslate style={styles.desc}>
              auth.verfiy_detail
            </TextTranslate>
            <View className="w-11/12">
              <Formik
                initialValues={LoginValue}
                validationSchema={LoginSchema}
                onSubmit={values => {
                  navigate(Route.VerifyOTP, {
                    phone: `+855${checkPhoneNumber(values.phone)}`,
                    phoneText: `0${checkPhoneNumber(values.phone)}`,
                  });
                }}>
                {({handleChange, handleBlur, handleSubmit, errors}) => (
                  <View className="items-center">
                    <TextInputItem
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      placeholder="auth.phone_number"
                      keyboardType="phone-pad"
                      error={errors.phone}
                    />
                    <ButtonSubmit
                      disabled={Object.keys(errors).length > 0}
                      onPress={handleSubmit}
                      style={{
                        marginTop: 30,
                      }}>
                      auth.get_code
                    </ButtonSubmit>
                  </View>
                )}
              </Formik>
              <View className="items-center mt-6">
                <TextTranslate style={styles.desc}>
                  home.choose_language
                </TextTranslate>
                <View className="flex-row items-center justify-around mt-4 mb-3 space-x-10">
                  {flagComponent('en')}
                  {flagComponent('km')}
                  {flagComponent('ko')}
                </View>
              </View>
            </View>
          </View>
        </View>
      </FlatListScroll>
    </BaseComponent>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 24,
  },
  desc: {
    fontSize: 16,
    marginTop: 5,
  },
  scroll: {
    marginTop: 8,
    padding: 16,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  code: {
    fontSize: 16,
    marginRight: 5,
  },
  forgotPassword: {
    height: 25,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  textForgotPassword: {
    color: colors.mainColor,
  },
  orSignIn: {
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  google: {},
  textGoogle: {
    fontSize: 16,
    marginLeft: 16,
  },
  signUp: {
    height: 25,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
  textSignUp: {
    color: colors.mainColor,
  },
  donnotAccount: {
    marginHorizontal: 10,
    marginTop: 2,
  },
});
