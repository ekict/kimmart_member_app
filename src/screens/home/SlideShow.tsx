import {StyleSheet, View} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';
import colors from '../../styles/colors';
import {deviceWidth} from '../../styles';
import {useAppSelector} from '../../hooks/redux';
import {getImage} from '../../services/utils';

const SlideShow = () => {
  const home = useAppSelector(state => state.home);
  return home?.slideshow.length === 0 ? (
    <View
      style={{
        marginTop: 40,
      }}
    />
  ) : (
    <View style={[styles.carouselArea]}>
      <Swiper
        autoplayTimeout={5}
        style={styles.wrapper}
        horizontal
        autoplay={true}
        showsButtons={false}
        dotStyle={{height: 0}}
        activeDotStyle={{height: 0}}
        removeClippedSubviews={false}>
        {home?.slideshow.map((item: any, index: any) => {
          return (
            <View key={index} style={[styles.slide1]}>
              {/* image size 700 x 330 */}
              <FastImage
                style={[
                  styles.slideImage,
                  {
                    backgroundColor: colors.whiteSmokeColor,
                  },
                ]}
                source={{uri: getImage(item.image, 'slideshows')}}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

export default SlideShow;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  carouselArea: {
    height: deviceWidth / 2,
    marginTop: 40,
  },
});
