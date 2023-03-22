import {StyleSheet, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const BrandFooter = () => {
  return (
    <View className="absolute left-0 right-0 z-20 items-center bottom-10">
      <FastImage
        source={require('../res/logo/logo-wide.png')}
        style={{
          height: 80,
          width: 250,
        }}
        resizeMode="contain"
      />
    </View>
  );
};

export default React.memo(BrandFooter);

const styles = StyleSheet.create({});
