import React, {useEffect, useMemo, useState} from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import {navigationRef} from '../services/utils/navigate';
import {adaptNavigationTheme} from 'react-native-paper';
import {useCodePush} from '../services/utils/codepush';
import CodePush from 'react-native-code-push';
import UpdateScreen from '../screens/UpdateScreen';
import {Pusher} from '@pusher/pusher-websocket-react-native';

//Pusher
var config = require('../services/config/pusher.json');

export const pusher = Pusher.getInstance();

const {LightTheme} = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
});

const Route = () => {
  const {progress, status, receivedBytes, totalBytes} = useCodePush();

  const [update, setUpdate] = useState(false);
  const theme: any = {
    ...LightTheme,
    colors: {
      background: '#f6f6f6',
    },
  };

  useEffect(() => {
    const init = async () => {
      await pusher.init({
        apiKey: config.key,
        cluster: config.cluster,
        onConnectionStateChange,
        onSubscriptionSucceeded,
        onSubscriptionError,
      });
    };
    init();
  }, []);

  useEffect(() => {
    if (status === CodePush.SyncStatus.DOWNLOADING_PACKAGE) {
      setUpdate(true);
    }
  }, [status]);

  function onSubscriptionSucceeded(channelName: string, data: any) {
    console.log(`onSubscriptionSucceeded: ${channelName} data: ${data}`);
  }
  function onSubscriptionError(channelName: string, message: string, e: any) {
    console.log(
      `onSubscriptionError: ${message} channelName: ${channelName} Exception: ${e}`,
    );
  }

  function onConnectionStateChange(
    currentState: string,
    previousState: string,
  ) {
    console.log(`Connection: ${currentState}`);
  }

  const _ROUTE = useMemo(() => {
    return (
      <NavigationContainer ref={navigationRef} theme={theme}>
        <MainStack />
      </NavigationContainer>
    );
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {_ROUTE}
      {update && (
        <UpdateScreen
          data={{
            status,
            progress,
            receivedBytes,
            totalBytes,
          }}
        />
      )}
    </SafeAreaProvider>
  );
};

export default React.memo(Route);
