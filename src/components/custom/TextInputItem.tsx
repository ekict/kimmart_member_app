import {StyleSheet, useColorScheme, View} from 'react-native';
import React from 'react';
import colors from '../../styles/colors';
import {TextInput} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {TextTranslate, TextTranslateError} from '..';
import {Weight} from '../../res/lang';

const TextInputItem = React.forwardRef((props: any, ref: any) => {
  const {t}: any = useTranslation('common');
  return (
    <View className="w-full">
      {props.title && (
        <TextTranslate
          weight={Weight.bold}
          style={[styles.title, props.titleStyle]}>
          {props.title}
        </TextTranslate>
      )}
      <View
        style={[
          styles.textInputContainer,
          {
            backgroundColor: colors.whiteSmokeColor,
            marginTop: props.title ? 10 : 20,
          },
          props.containerStyle,
        ]}>
        {props.leftIcon}
        <TextInput
          ref={ref}
          {...props}
          placeholder={t(props.placeholder)}
          placeholderTextColor={colors.placeholderColor}
          underlineStyle={{
            height: 0,
          }}
          style={[styles.textInput, props.style]}
        />
      </View>
      {props.error && (
        <TextTranslateError style={styles.error}>
          {props.error}
        </TextTranslateError>
      )}
    </View>
  );
});

export default React.memo(TextInputItem);

const styles = StyleSheet.create({
  textInputContainer: {
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    height: 40,
    backgroundColor: 'transparent',
  },
  error: {
    marginLeft: 10,
  },
  title: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
