import {
  ActivityIndicator,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import colors from '../styles/colors';

const LoadMoreFooter = () => {
  return (
    <ActivityIndicator
      size="large"
      color={colors.mainColor}
      style={{marginBottom: 15, alignSelf: 'center'}}
    />
  );
};

export default React.memo(LoadMoreFooter);

const styles = StyleSheet.create({});
