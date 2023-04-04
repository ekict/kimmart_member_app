import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {getCurrentLang} from '../hooks/lang';
import CompletedVerify from '../screens/account/auth/CompletedVerify';
import GettingStart from '../screens/account/auth/GettingStart';
import Login from '../screens/account/auth/Login';
import VerifyOTP from '../screens/account/auth/VerifyOTP';
import CameraScan from '../screens/camera/CameraScan';
import Language from '../screens/drawer/Language';
import Locations from '../screens/drawer/Locations';
import UpdateProfile from '../screens/drawer/UpdateProfile';
import PurchaseDetail from '../screens/invoice/PurchaseDetail';
import PurchaseHistory from '../screens/invoice/PurchaseHistory';
import Earn from '../screens/point/Earn';
import Redeem from '../screens/point/Redeem';
import SplashScreen from '../screens/SplashScreen';
import Route from './constant';
import MainDrawer from './MainDrawer';
import ManageAccount from '../screens/drawer/ManageAccount';

const Stack = createNativeStackNavigator();
const MainStack = () => {
  //When start application with have internet
  useEffect(() => {
    getCurrentLang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
        animation: 'slide_from_right',
      }}
      initialRouteName={Route.SplashScreen}>
      <Stack.Screen name={Route.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={Route.Home} component={MainDrawer} />

      {/* Auth */}
      <Stack.Screen
        name={Route.Login}
        options={{
          animation: 'fade',
        }}
        component={Login}
      />
      <Stack.Screen name={Route.VerifyOTP} component={VerifyOTP} />
      <Stack.Screen name={Route.CompletedVerify} component={CompletedVerify} />
      <Stack.Screen name={Route.GettingStart} component={GettingStart} />
      <Stack.Screen name={Route.EditProfile} component={UpdateProfile} />
      <Stack.Screen name={Route.ManageAccount} component={ManageAccount} />
      <Stack.Screen name={Route.Language} component={Language} />
      <Stack.Screen name={Route.Locations} component={Locations} />
      <Stack.Screen
        name={Route.CameraScan}
        options={{
          animation: 'fade',
        }}
        component={CameraScan}
      />
      <Stack.Screen name={Route.Earn} component={Earn} />
      <Stack.Screen name={Route.Redeem} component={Redeem} />
      <Stack.Screen name={Route.PurchaseHistory} component={PurchaseHistory} />
      <Stack.Screen name={Route.PurchaseDetail} component={PurchaseDetail} />

      {/* ====================================================================== */}
    </Stack.Navigator>
  );
};

export default React.memo(MainStack);
