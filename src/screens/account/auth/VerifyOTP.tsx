import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseComponent from '../../../components/BaseComponent';
import {ButtonSubmit, FlatListScroll, TextTranslate} from '../../../components';
import Svg, {Path} from 'react-native-svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../../styles/colors';
import {Weight} from '../../../res/lang';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {padLeadingZeros} from '../../../services/utils';
import {bgColor} from '../../../styles';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import {reset} from '../../../services/utils/navigate';
import Route from '../../../navigation/constant';
import FastImage from 'react-native-fast-image';

let interval: any = null;
const CELL_COUNT = 6;
const VerifyOTP = (props: any) => {
  const {phone, phoneText} = props.route.params;
  const [durationCode, setDurationCode] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState('');
  const [verifiedID, setVerifiedID] = useState('');
  const ref = useBlurOnFulfill({value: code, cellCount: CELL_COUNT});
  const [_props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    const settings = auth().settings;
    settings.appVerificationDisabledForTesting = true;

    if (durationCode === 60) signInWithPhoneNumber();
    return () => {
      clearInterval(interval);
    };
  }, [phone]);

  // Handle the button press
  async function signInWithPhoneNumber(isResend = false) {
    setIsLoading(true);
    await auth()
      .verifyPhoneNumber(phone, isResend)
      .on('state_changed', async phoneAuthSnapshot => {
        setIsLoading(false);
        switch (phoneAuthSnapshot.state) {
          case auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
            const {verificationId, code} = phoneAuthSnapshot;
            if (
              verificationId !== '' ||
              verificationId !== null ||
              verificationId !== undefined
            ) {
              if (code !== null) {
                setCode(code);
                await _confirmCode(verificationId, code);
              }
            }
            break;

          case auth.PhoneAuthState.CODE_SENT: // or 'sent'
            setVerifiedID(phoneAuthSnapshot.verificationId);
            Toast.show({
              text1: 'auth.wait_for_6_digit_code',
            });
            let count = 0;
            interval = setInterval(() => {
              if (count === 60) {
                clearInterval(interval);
              }
              setDurationCode((counter: number) => counter - 1);
              count = count + 1;
            }, 1000);
            break;
          case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
            break;
          case auth.PhoneAuthState.ERROR: // or 'error'
            break;
        }
      })
      .catch(async error => {
        console.log(error);
        setIsLoading(false);
        Toast.show({
          type: 'error',
          text1: 'auth.please_check_your_phone_number',
        });
        clearInterval(interval);
      });
  }
  async function _confirmCode(verificationId: any, code: any) {
    setIsLoading(true);
    const provider = await auth.PhoneAuthProvider;
    const authCredential = await provider.credential(verificationId, code);
    signInWithPhoneAuthCredential(authCredential);
  }

  async function signInWithPhoneAuthCredential(
    credential: FirebaseAuthTypes.AuthCredential,
  ) {
    await auth()
      .signInWithCredential(credential)
      .then(async () => {
        reset(Route.CompletedVerify, {
          phone: phoneText,
        });
      })
      .catch(async error => {
        console.log(error);
        Toast.show({
          type: 'warning',
          text1: 'auth.code_incorrect',
        });
        setIsLoading(false);
        clearInterval(interval);
      });
  }

  function verifyCode() {
    _confirmCode(verifiedID, code);
  }

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
                name="lock-open-outline"
                color={colors.lightColor}
                size={40}
                style={{
                  transform: [{scaleX: -1}],
                }}
              />
            </View>
            <TextTranslate weight={Weight.bold} style={styles.title}>
              auth.please_enter_the_code_sent_to
            </TextTranslate>
            <TextTranslate style={styles.desc}>{phoneText}</TextTranslate>
            <View className="items-center mt-6">
              <CodeField
                ref={ref}
                {..._props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({index, symbol, isFocused}) => (
                  <View
                    // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                    onLayout={getCellOnLayoutHandler(index)}
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}>
                    <Text style={styles.cellText}>
                      {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                  </View>
                )}
              />
              {isLoading ? null : durationCode > 0 ? (
                <Text style={styles.code}>
                  {durationCode === 60
                    ? '1:00'
                    : `00:${padLeadingZeros(durationCode, 2)}`}
                </Text>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setDurationCode(60);
                    signInWithPhoneNumber(true);
                  }}
                  style={styles.resendCode}>
                  <TextTranslate style={styles.textResendCode}>
                    auth.resend_code
                  </TextTranslate>
                </TouchableOpacity>
              )}
              <ButtonSubmit
                disabled={code.length < 6 || isLoading}
                onPress={verifyCode}
                style={{
                  marginTop: 30,
                }}>
                auth.verify
              </ButtonSubmit>
            </View>
          </View>
        </View>
      </FlatListScroll>
    </BaseComponent>
  );
};

export default VerifyOTP;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginTop: 24,
  },
  desc: {
    fontSize: 16,
    marginTop: 5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 24,
    color: colors.darkColor,
    opacity: 0.8,
  },
  codeFieldRoot: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  cell: {
    width: 50,
    height: 50,
    fontSize: 24,
    borderWidth: 1,
    borderColor: '#00000030',
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focusCell: {
    borderColor: colors.mainColor,
  },
  code: {
    height: 25,
    fontSize: 16,
    marginRight: 10,
    alignSelf: 'flex-end',
    color: colors.mainColor,
  },
  resendCode: {
    height: 25,
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  textResendCode: {
    color: colors.mainColor,
    fontSize: 16,
  },
});
