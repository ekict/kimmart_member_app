import i18next from 'i18next';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {FlatList, Platform, TouchableOpacity, Text, View} from 'react-native';
import {FormatLang, Weight} from '../res/lang';
import {formatCurrency} from '../services/setting';
import {capitalizeFirstLetter, makeid} from '../services/utils';
import colors from '../styles/colors';
import {CheckCircleIcon} from 'react-native-heroicons/solid';
import {flagLanguage} from '../assets/json';
import FastImage from 'react-native-fast-image';

var data = require('../assets/json/country-by-calling-code.json');

export const FlatListScroll = React.forwardRef((props: any, ref: any) => {
  return (
    <FlatList
      ref={ref}
      {...props}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'ios' ? false : true}
      data={['dumy']}
      renderItem={() => {
        return props.children;
      }}
      bounces={false}
      scrollEventThrottle={16}
      ListEmptyComponent={null}
      ListHeaderComponent={null}
      keyExtractor={(_, index) => index.toString()}
    />
  );
});

export const FlatListHorizontal = React.forwardRef((props: any, ref: any) => {
  return (
    <FlatList
      ref={ref}
      {...props}
      keyboardShouldPersistTaps="handled"
      listKey={makeid()}
      cellKey={makeid()}
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'ios' ? false : true}
      horizontal
      data={props.data}
      bounces={false}
      scrollEventThrottle={16}
      renderItem={props.renderItem}
      keyExtractor={(_, index) => index.toString()}
    />
  );
});

export function FlatListVertical(props: any) {
  return (
    <FlatList
      keyboardShouldPersistTaps="handled"
      {...props}
      listKey={makeid()}
      cellKey={makeid()}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={Platform.OS === 'ios' ? false : true}
      data={props.data}
      bounces={false}
      scrollEventThrottle={16}
      onEndReachedThreshold={props.onEndReachedThreshold ?? 0.01}
      renderItem={props.renderItem}
      keyExtractor={(_, index) => index.toString()}
    />
  );
}

export function TextTranslate(props: any) {
  const {t} = useTranslation('common');
  const styleText = {
    ...FormatLang[`${i18next.language}${props?.weight ?? ''}`],
    fontSize: props?.fontSize ?? undefined,
    color: colors.darkColor,
  };
  return (
    <Text {...props} style={[styleText, props.style]}>
      {t(props.children)}
    </Text>
  );
}

export function TextTranslateError(props: any) {
  const {t} = useTranslation('common');
  const value = JSON.parse(props.children);
  const styleText = {
    ...FormatLang[`${i18next.language}${props?.weight ?? ''}`],
    fontSize: props?.fontSize ?? 12,
    color: 'red',
    marginTop: 5,
  };
  return (
    <Text {...props} style={[styleText, props.style]}>
      {capitalizeFirstLetter(
        t(value.name, {
          value1: t(value.value1),
          value2: t(value.value2),
        }),
      )}
    </Text>
  );
}

export function TextTranslateWithValue(props: any) {
  const styleText = {
    ...FormatLang[`${i18next.language}${props?.weight ?? ''}`],
    fontSize: props?.fontSize ?? undefined,
    color: colors.darkColor,
  };
  return (
    <Text {...props} style={[styleText, props.style]}>
      {props.children}
    </Text>
  );
}

export function TextPrice(props: any) {
  const priceStyle = {
    color: props.discount ? colors.darkColor : colors.mainColor,
    textDecorationLine: props.discount ? 'line-through' : 'none',
  };
  const price =
    Number(props.children) > 0 ? formatCurrency(props.children) : '';
  return (
    <Text {...props} style={[priceStyle, props.style]}>
      {price}
    </Text>
  );
}

export function TextPriceSplit(props: any) {
  const price = formatCurrency(props.children);
  const split = price.split('.');
  const priceStyle = {
    color: colors.darkColor,
    lineHeight: 20,
    opacity: 0.8,
  };
  return (
    <View className="flex-row items-end">
      <Text
        {...props}
        style={[
          priceStyle,
          {
            fontSize: 18,
            fontWeight: 'bold',
            fontStyle: 'italic',
          },
          props.firstStyle,
        ]}>
        {split[0]}
      </Text>
      <Text
        {...props}
        style={[
          priceStyle,
          {
            fontSize: 14,
            lineHeight: 20,
          },
          props.secondStyle,
        ]}>
        .{split[1]}
      </Text>
    </View>
  );
}

export const Logo = ({width, height}: any) => {
  return (
    <FastImage
      source={require('../res/logo/logo.png')}
      style={{
        width,
        height,
      }}
      resizeMode="contain"
    />
  );
};

export const ButtonSubmit = React.forwardRef((props: any, ref: any) => {
  const buttonStyle = {
    height: 60,
    width: 200,
    backgroundColor: colors.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    marginTop: 10,
    opacity: props.disabled ? 0.5 : 1,
  };
  const textStyle = {
    color: colors.lightColor,
    fontSize: 16,
  };
  return (
    <TouchableOpacity ref={ref} {...props} style={[buttonStyle, props.style]}>
      {props.is_loading ? (
        props.children
      ) : (
        <TextTranslate
          weight={Weight.bold}
          style={[textStyle, props.textStyle]}>
          {props.children}
        </TextTranslate>
      )}
    </TouchableOpacity>
  );
});

export const ClearLine = () => <View className={`bg-[#f6f6f6] h-2 w-full`} />;

const getFlagPath = (code: string) => `../assets/images/wave-flags/${code}.png`;

export const Verified = (props: any) => {
  const flag = data.find(
    (v: {name: string}) =>
      v?.name.toLowerCase() === props?.country.toLowerCase(),
  );
  const code = (flag?.code ?? 'kh').toLowerCase();
  return (
    <View className="flex-row items-center gap-1 pl-1">
      <FastImage
        source={flagLanguage[code]}
        style={{width: props?.size ?? 16, height: props?.size ?? 16}}
        resizeMode="contain"
      />
      <CheckCircleIcon color={colors.verifyColor} size={props?.size ?? 16} />
    </View>
  );
};
