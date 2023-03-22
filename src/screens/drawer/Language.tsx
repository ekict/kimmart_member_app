import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import BaseComponent from '../../components/BaseComponent';
import {bgColor} from '../../styles';
import {LanguageData} from '../../res/lang';
import {TextTranslate} from '../../components';
import i18next from 'i18next';
import colors from '../../styles/colors';
import {setCurrentLang} from '../../hooks/lang';

const Language = () => {
  const [language, setLanguage] = useState(i18next.language);

  return (
    <BaseComponent title="home.choose_language">
      <View
        className={`flex-1 w-full ${bgColor}
          `}>
        <View className="p-6">
          {LanguageData.map((item: any, index: number) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setLanguage(item.key);
                  setCurrentLang(item.key);
                }}
                key={index}
                className="flex-row items-center gap-2 py-4 border-b border-gray-100">
                <View
                  className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                    item.key === language
                      ? colors.borderSecondColor
                      : 'border-gray-600/50'
                  }`}>
                  {item.key === language && (
                    <View
                      className={`w-4 h-4 rounded-full ${colors.bgSecondColor}`}></View>
                  )}
                </View>

                <TextTranslate style={styles.name}>{item.name}</TextTranslate>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </BaseComponent>
  );
};

export default Language;

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
  },
});
