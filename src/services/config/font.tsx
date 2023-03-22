import {Platform} from 'react-native';
interface Props {
  weight: any;
  family: string;
  familyIOS: string;
}

const font: any = {
  Battambang: {
    weights: {
      Thin: '100',
      Light: '300',
      Regular: '400',
      Medium: '400',
      Bold: '700',
      ExtraBold: '700',
      Black: '900',
    },
  },
  OpenSans: {
    weights: {
      Thin: '300',
      Light: '300',
      Regular: '400',
      Medium: '500',
      Bold: '600',
      ExtraBold: '700',
      Black: '800',
    },
  },
  NotoSansKR: {
    weights: {
      Thin: '100',
      Light: '300',
      Regular: '400',
      Medium: '500',
      Bold: '700',
      ExtraBold: '700',
      Black: '900',
    },
  },
  NotoSansSC: {
    weights: {
      Thin: '100',
      Light: '300',
      Regular: '400',
      Medium: '500',
      Bold: '700',
      ExtraBold: '700',
      Black: '900',
    },
  },
};

const fontMaker = (options: any) => {
  let {weight, family, familyIOS}: Props = Object.assign(options);
  const {weights} = font[family];
  if (Platform.OS === 'android') {
    weight = weights[weight] ? weight : '';
    const suffix = weight;
    return {
      fontFamily: family + (suffix.length ? `-${suffix}` : ''),
    };
  } else {
    weight = weights[weight] || weights.Normal;
    return {
      fontFamily: familyIOS,
      fontWeight: weight,
    };
  }
};

// Khmer font

export const BattambangThin = fontMaker({
  weight: 'Thin',
  family: 'Battambang',
  familyIOS: 'Battambang-Thin',
});

export const BattambangLight = fontMaker({
  weight: 'Light',
  family: 'Battambang',
  familyIOS: 'Battambang-Light',
});

export const Battambang: any = fontMaker({
  weight: 'Regular',
  family: 'Battambang',
  familyIOS: 'Battambang-Regular',
});

export const BattambangMedium = fontMaker({
  weight: 'Medium',
  family: 'Battambang',
  familyIOS: 'Battambang-Regular',
});

export const BattambangBold = fontMaker({
  weight: 'Bold',
  family: 'Battambang',
  familyIOS: 'Battambang-Bold',
});

export const BattambangExtraBold = fontMaker({
  weight: 'ExtraBold',
  family: 'Battambang',
  familyIOS: 'Battambang-Bold',
});

export const BattambangBlack = fontMaker({
  weight: 'Black',
  family: 'Battambang',
  familyIOS: 'Battambang-Black',
});

//================================================================

// English font

export const OpenSansThin = fontMaker({
  weight: 'Thin',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Light',
});

export const OpenSansLight = fontMaker({
  weight: 'Light',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Light',
});

export const OpenSans = fontMaker({
  weight: 'Regular',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Regular',
});

export const OpenSansMedium = fontMaker({
  weight: 'Medium',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Medium',
});

export const OpenSansBold = fontMaker({
  weight: 'Bold',
  family: 'OpenSans',
  familyIOS: 'OpenSans-SemiBold',
});

export const OpenSansExtraBold = fontMaker({
  weight: 'ExtraBold',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Bold',
});

export const OpenSansBlack = fontMaker({
  weight: 'Black',
  family: 'OpenSans',
  familyIOS: 'OpenSans-ExtraBold',
});

//================================================================

// Korea Font

export const NotoSansKRThin = fontMaker({
  weight: 'Thin',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Thin',
});

export const NotoSansKRLight = fontMaker({
  weight: 'Light',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Light',
});

export const NotoSansKR = fontMaker({
  weight: 'Regular',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Regular',
});

export const NotoSansKRMedium = fontMaker({
  weight: 'Medium',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Medium',
});

export const NotoSansKRBold = fontMaker({
  weight: 'Bold',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Bold',
});

export const NotoSansKRExtraBold = fontMaker({
  weight: 'ExtraBold',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Bold',
});

export const NotoSansKRBlack = fontMaker({
  weight: 'Black',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Black',
});

//============================================================================

// Chinese font

export const NotoSansSCThin = fontMaker({
  weight: 'Thin',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Thin',
});

export const NotoSansSCLight = fontMaker({
  weight: 'Light',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Light',
});

export const NotoSansSC = fontMaker({
  weight: 'Regular',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Regular',
});

export const NotoSansSCMedium = fontMaker({
  weight: 'Medium',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Medium',
});

export const NotoSansSCBold = fontMaker({
  weight: 'Bold',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Bold',
});

export const NotoSansSCExtraBold = fontMaker({
  weight: 'ExtraBold',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Bold',
});

export const NotoSansSCBlack = fontMaker({
  weight: 'Black',
  family: 'OpenSans',
  familyIOS: 'OpenSans-Black',
});

//================================================================
