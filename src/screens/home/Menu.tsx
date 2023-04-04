import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style, {deviceWidth} from '../../styles';
import colors from '../../styles/colors';
import {MENU} from '../../dummy';
import {navigate, openDrawer} from '../../services/utils/navigate';
import Route from '../../navigation/constant';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {TextTranslate} from '../../components';
import {Weight} from '../../res/lang';

const Menu = () => {
  return (
    <View className="absolute z-30 top-[220px]">
      <View
        style={[
          style.shadow,
          {
            width: deviceWidth - 64,
            backgroundColor: colors.lightColor,
          },
        ]}
        className={`flex-row p-2 mx-8 rounded-lg divide-x divide-gray-200`}>
        {MENU.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.route === 'Profile') {
                  openDrawer();
                } else if (item.route === 'QrCode') {
                  navigate(Route.CameraScan);
                } else {
                  navigate(item.route);
                }
              }}
              key={index}
              style={{
                width: (deviceWidth - 64) / 4,
              }}
              className="items-center justify-center">
              <MaterialIcons
                name={item.icon}
                color={colors.mainColor}
                size={28}
              />
              <TextTranslate style={styles.menu}>{item.title}</TextTranslate>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(Menu);

const styles = StyleSheet.create({
  menu: {
    fontSize: 14,
    paddingHorizontal: 10,
  },
});
