/**
 * @format
 */
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import {
  AppRegistry,
  LogBox,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  '`new NativeEventEmitter()` was called with a non-null',
]);

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

if (TouchableOpacity.defaultProps == null) TouchableOpacity.defaultProps = {};
TouchableOpacity.defaultProps.activeOpacity = 0.8;

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }
  return <App />;
}

AppRegistry.registerComponent(appName, () =>
  gestureHandlerRootHOC(HeadlessCheck),
);
