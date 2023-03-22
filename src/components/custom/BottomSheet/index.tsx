import React from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextTranslate} from '../..';
import {Weight} from '../../../res/lang';
import colors from '../../../styles/colors';

var RNSheet = require('./RNSheet').default;

export const BottomSheet = React.forwardRef((props: any, ref: any) => {
  const insets = useSafeAreaInsets();
  return (
    <RNSheet
      ref={ref}
      animationType="fade"
      height={(props.h ? props.h : 180) + insets.bottom}
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        container: {
          ...styles.bottomSheet,
          backgroundColor: colors.whiteSmokeColor,
        },
        wrapper: {
          backgroundColor: 'rgba(0,0,0,.2)',
        },
        draggableIcon: {
          backgroundColor: colors.darkColor,
        },
      }}>
      <View style={styles.contentContainer}>
        <TextTranslate weight={Weight.bold} style={styles.bottomSheetTitle}>
          {props.title}
        </TextTranslate>
        {props.children}
      </View>
    </RNSheet>
  );
});

const styles = StyleSheet.create({
  bottomSheet: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  contentContainer: {
    flex: 1,
  },
  bottomSheetTitle: {
    color: colors.mainColor,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },
});
