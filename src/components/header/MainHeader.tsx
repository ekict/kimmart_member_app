import {TouchableOpacity, useColorScheme, View} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import {ChevronLeftIcon, XMarkIcon} from 'react-native-heroicons/solid';
import {TextTranslate} from '..';
import {Weight} from '../../res/lang';
import {goBack, navigate} from '../../services/utils/navigate';
import Route from '../../navigation/constant';

const MainHeader = ({
  title,
  is_cross = false,
  rightIcon,
  is_back_to_home,
  is_show_back = true,
}: any) => {
  const onBack = () => {
    if (!is_back_to_home) goBack();
    else navigate(Route.Home);
  };
  return (
    <View className="h-[55px] flex-row items-center justify-between px-2 bg-[#F6E3D0]">
      {is_show_back ? (
        <TouchableOpacity
          onPress={onBack}
          className="items-center justify-center w-12 h-full">
          {is_cross ? (
            <XMarkIcon color={colors.darkColor} size={28} />
          ) : (
            <ChevronLeftIcon color={colors.darkColor} size={28} />
          )}
        </TouchableOpacity>
      ) : (
        <View className="w-12" />
      )}
      <TextTranslate weight={Weight.bold} fontSize={16}>
        {title}
      </TextTranslate>
      <View className="flex items-center justify-center w-12 h-full">
        {rightIcon && rightIcon()}
      </View>
    </View>
  );
};

export default React.memo(MainHeader);
