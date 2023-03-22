import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {TextTranslate} from '..';
import {deviceWidth} from '../../styles';
import colors from '../../styles/colors';
import {BottomSheet} from './BottomSheet';

const UploadImage = React.forwardRef((props: any, ref: any) => {
  return (
    <BottomSheet ref={ref} title={'Choose'} h={props.size}>
      <TouchableOpacity onPress={props.onCamera} style={styles.buttonChoose}>
        <Feather name="camera" size={18} color={colors.iconColor} />
        <TextTranslate style={styles.text}>home.camera</TextTranslate>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onSelectImage}
        style={styles.buttonChoose}>
        <Feather name="image" size={18} color={colors.iconColor} />
        <TextTranslate style={styles.text}>home.gallery</TextTranslate>
      </TouchableOpacity>
      {props.image != null ? (
        <TouchableOpacity onPress={props.onDelete} style={styles.buttonChoose}>
          <Feather name="trash-2" size={18} color={'red'} />
          <TextTranslate style={[styles.text, {color: 'red'}]}>
            home.delete
          </TextTranslate>
        </TouchableOpacity>
      ) : null}
    </BottomSheet>
  );
});

export default React.memo(UploadImage);

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
  },
  buttonChoose: {
    flexDirection: 'row',
    width: deviceWidth,
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
});
