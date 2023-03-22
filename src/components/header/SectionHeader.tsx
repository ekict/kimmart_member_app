import {StyleSheet, TouchableOpacity, useColorScheme, View} from 'react-native';
import React from 'react';
import {TextTranslate} from '..';
import {Weight} from '../../res/lang';
import {Bars3BottomRightIcon} from 'react-native-heroicons/outline';
import colors from '../../styles/colors';

const SectionHeader = ({title, onView, style, isViewMore = true}: any) => {
  const color = colors.mainColor;
  return (
    <View className="flex-row items-center justify-between p-4">
      <TextTranslate weight={Weight.bold} style={style}>
        {title}
      </TextTranslate>
      {isViewMore && (
        <TouchableOpacity onPress={onView} className="flex-row items-center">
          <TextTranslate
            fontSize={13}
            style={{
              color,
              marginHorizontal: 5,
            }}>
            global.more
          </TextTranslate>
          <Bars3BottomRightIcon color={color} size={22} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(SectionHeader);

const styles = StyleSheet.create({});
