/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {StatusBar, View} from 'react-native';

import Route from './src/navigation/Route';
import en from './src/res/lang/en.json';
import km from './src/res/lang/km.json';
import ko from './src/res/lang/ko.json';

import {AuthProvider} from './src/hooks/auth';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/redux/store';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from './src/styles/colors';
import {MD3LightTheme, Provider as PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {TextTranslate} from './src/components';
import CodePushProvider from './src/services/utils/codepush';
import {
  CheckIcon,
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from 'react-native-heroicons/outline';
import FastImage from 'react-native-fast-image';

i18next.init({
  compatibilityJSON: 'v3',
  interpolation: {escapeValue: false}, // React already does escaping
  lng: 'en', // language to use
  resources: {
    en: {
      common: en, // 'common' is our custom namespace
    },
    km: {
      common: km,
    },
    ko: {
      common: ko,
    },
  },
});

// replace console.* for disable log on production
if (!__DEV__) {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}

export const StatusType = {
  success: 'success',
  warning: 'warning',
  error: 'error',
};

const renderToast = (text1: string, status: any) => {
  return (
    <View
      style={[
        {
          height: 45,
          width: '85%',
          backgroundColor: '#333232ED',
          borderRadius: 1000,
          paddingHorizontal: 15,
          justifyContent: 'center',
        },
      ]}>
      <View className="flex flex-row items-center justify-between">
        <View className="flex-row items-center">
          <FastImage
            source={require('./src/res/logo/logo-white.png')}
            style={{
              width: 30,
              height: 30,
            }}
            resizeMode="contain"
          />
          <View className="flex-col ml-3">
            <TextTranslate
              numberOfLines={1}
              style={{
                fontSize: 14,
                color: colors.lightColor,
              }}>
              {text1}
            </TextTranslate>
          </View>
        </View>
        {status === StatusType.success ? (
          <CheckIcon color={colors.lightColor} size={24} />
        ) : status === StatusType.warning ? (
          <ExclamationTriangleIcon color={colors.lightColor} size={26} />
        ) : (
          <ShieldExclamationIcon color={colors.lightColor} size={26} />
        )}
      </View>
    </View>
  );
};

//Custom Toast
export const toastConfig = {
  success: ({text1}: any) => renderToast(text1, StatusType.success),
  error: ({text1}: any) => renderToast(text1, StatusType.error),
  warning: ({text1}: any) => renderToast(text1, StatusType.warning),
};

const App = () => {
  return (
    <AuthProvider>
      <Provider store={store.baseStore}>
        <PersistGate loading={null} persistor={store.persistor}>
          <I18nextProvider i18n={i18next}>
            <PaperProvider theme={MD3LightTheme}>
              <StatusBar
                backgroundColor={colors.lightColor}
                barStyle={'dark-content'}
              />
              <SafeAreaView className={`flex-1 ${colors.bgLightColor}`}>
                <Route />
                <Toast
                  position="bottom"
                  config={toastConfig}
                  visibilityTime={3000}
                  bottomOffset={10}
                />
              </SafeAreaView>
            </PaperProvider>
          </I18nextProvider>
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
};

export default CodePushProvider(App);
