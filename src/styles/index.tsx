import {Dimensions, StyleSheet} from 'react-native';
import {
  Battambang,
  BattambangBlack,
  BattambangBold,
  BattambangExtraBold,
  BattambangLight,
  BattambangMedium,
  BattambangThin,
  NotoSansKR,
  NotoSansKRBlack,
  NotoSansKRBold,
  NotoSansKRExtraBold,
  NotoSansKRLight,
  NotoSansKRMedium,
  NotoSansKRThin,
  NotoSansSC,
  NotoSansSCBlack,
  NotoSansSCBold,
  NotoSansSCExtraBold,
  NotoSansSCLight,
  NotoSansSCMedium,
  NotoSansSCThin,
  OpenSans,
  OpenSansBlack,
  OpenSansBold,
  OpenSansExtraBold,
  OpenSansLight,
  OpenSansMedium,
  OpenSansThin,
} from '../services/config/font';
import colors from './colors';

export const deviceWidth = Dimensions.get('window').width;
export const deviceHeight = Dimensions.get('window').height;
export const paddingHorizontal = 15;
export const resizeMode = 'contain';
export const borderRadius = 10;
export const bgColor = 'bg-white';
export const borderColor = `border-[0.5px] ${colors.borderMainColor}`;
export const borderDarkColor = `border-[0.5px] border-gray-600`;
export const container = `mt-2 ${bgColor}`;
export const iconSize = 26;
const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  // font style
  kmThin: {
    ...BattambangThin,
  },
  enThin: {
    ...OpenSansThin,
  },
  koThin: {
    ...NotoSansKRThin,
  },
  chThin: {
    ...NotoSansSCThin,
  },
  kmLight: {
    ...BattambangLight,
  },
  enLight: {
    ...OpenSansLight,
  },
  koLight: {
    ...NotoSansKRLight,
  },
  chLight: {
    ...NotoSansSCLight,
  },
  km: {
    ...Battambang,
  },
  en: {
    ...OpenSans,
  },
  ko: {
    ...NotoSansKR,
  },
  ch: {
    ...NotoSansSC,
  },
  kmMedium: {
    ...BattambangMedium,
  },
  enMedium: {
    ...OpenSansMedium,
  },
  koMedium: {
    ...NotoSansKRMedium,
  },
  chMedium: {
    ...NotoSansSCMedium,
  },
  kmBold: {
    ...BattambangBold,
  },
  enBold: {
    ...OpenSansBold,
  },
  koBold: {
    ...NotoSansKRBold,
  },
  chBold: {
    ...NotoSansSCBold,
  },
  kmExtraBold: {
    ...BattambangExtraBold,
  },
  enExtraBold: {
    ...OpenSansExtraBold,
  },
  koExtraBold: {
    ...NotoSansKRExtraBold,
  },
  chExtraBold: {
    ...NotoSansSCExtraBold,
  },
  kmBlack: {
    ...BattambangBlack,
  },
  enBlack: {
    ...OpenSansBlack,
  },
  koBlack: {
    ...NotoSansKRBlack,
  },
  chBlack: {
    ...NotoSansSCBlack,
  },
  cartCount: {
    fontSize: 8,
    color: colors.whiteSmokeColor,
  },
});

export default style;
