import {StyleSheet} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawer from '../components/custom/CustomDrawer';
import HomeScreen from '../screens/HomeScreen';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: 'slide',
        drawerStyle: {width: '80%'},
        headerShown: false,
      }}
      drawerContent={() => <CustomDrawer />}>
      <Drawer.Screen name="MainHome" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default MainDrawer;

const styles = StyleSheet.create({});
