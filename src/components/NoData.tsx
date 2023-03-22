import {StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import {TextTranslate} from '.';
import {FaceFrownIcon} from 'react-native-heroicons/outline';
import colors from '../styles/colors';

const NoData = ({paddingTop = 60}) => {
  return (
    <View
      className="items-center opacity-40"
      style={{
        paddingTop,
      }}>
      <FaceFrownIcon color={colors.mainColor} size={35} />
      <TextTranslate>message.no_data</TextTranslate>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({});
