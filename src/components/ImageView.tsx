import React, {useEffect, useState} from 'react';
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import colors from '../styles/colors';
import {iconSize} from '../styles';
import {TextTranslateWithValue} from '.';
import {Weight} from '../res/lang';
import {goBack, navigate} from '../services/utils/navigate';
import {XMarkIcon} from 'react-native-heroicons/solid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PagerView, {
  PagerViewOnPageScrollEventData,
} from 'react-native-pager-view';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
import Route from '../navigation/constant';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useTranslation} from 'react-i18next';
import FastImage from 'react-native-fast-image';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
const refPagerView = React.createRef<PagerView>();
const DOT_SIZE = 33;
const Pagination = React.forwardRef(
  (
    {
      scrollOffsetAnimatedValue,
      positionAnimatedValue,
      data,
    }: {
      scrollOffsetAnimatedValue: Animated.Value;
      positionAnimatedValue: Animated.Value;
      data: any;
    },
    ref: any,
  ) => {
    const inputRange = [0, data.length];
    const translateX = Animated.add(
      scrollOffsetAnimatedValue,
      positionAnimatedValue,
    ).interpolate({
      inputRange,
      outputRange: [0, data.length * DOT_SIZE],
    });

    return (
      <View style={[styles.pagination]}>
        <Animated.View
          style={[
            styles.paginationIndicator,
            {
              position: 'absolute',
              transform: [{translateX: translateX}],
            },
          ]}
        />
        {data.map((_: any, index: any) => {
          return (
            <TouchableOpacity
              onPress={() =>
                requestAnimationFrame(() => ref.current?.setPage(index))
              }
              key={index}
              style={styles.paginationDotContainer}>
              <View
                style={[
                  styles.paginationDot,
                  {
                    backgroundColor: colors.darkColor,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  },
);

const ImageView = (props: any) => {
  const {
    data,
    index = 0,
    darkColor = colors.darkColor,
    lightColor = colors.lightColor,
    item = null,
  } = props.route.params;
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(index)).current;
  const [currentIndex, setCurrentIndex] = useState(index);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: lightColor,
      }}>
      <View className="flex-row h-[55px] absolute inset-0 z-10 justify-between items-center px-2">
        <TouchableOpacity
          activeOpacity={1}
          onPress={goBack}
          className="items-center justify-center w-12 h-12">
          <XMarkIcon color={colors.darkColor} size={iconSize} />
        </TouchableOpacity>
      </View>
      {data.length === 0 ? null : (
        <AnimatedPagerView
          ref={refPagerView}
          initialPage={currentIndex}
          style={{
            width: '100%',
            height: '100%',
          }}
          onPageScroll={Animated.event<PagerViewOnPageScrollEventData>(
            [
              {
                nativeEvent: {
                  offset: scrollOffsetAnimatedValue,
                  position: positionAnimatedValue,
                },
              },
            ],
            {
              listener: ({nativeEvent: {offset, position}}) => {
                setCurrentIndex(position);
                // console.log(`Position: ${position} Offset: ${offset}`);
              },
              useNativeDriver: true,
            },
          )}>
          {data.map((item: any, index: number) => {
            return (
              <ReactNativeZoomableView
                key={index}
                maxZoom={2}
                minZoom={1}
                zoomStep={1}
                initialZoom={1}
                bindToBorders={true}
                disablePanOnInitialZoom={props?.disablePanOnInitialZoom ?? true}
                style={{
                  backgroundColor: 'transparent',
                }}>
                <FastImage
                  resizeMode={'contain'}
                  style={{height: ' 100%', width: '100%'}}
                  source={{uri: item?.image_url}}
                />
              </ReactNativeZoomableView>
            );
          })}
        </AnimatedPagerView>
      )}
      {data.length > 1 && data.length <= 10 && (
        <Pagination
          scrollOffsetAnimatedValue={scrollOffsetAnimatedValue}
          positionAnimatedValue={positionAnimatedValue}
          ref={refPagerView}
          data={data}
        />
      )}
      {data.length > 10 && (
        <View className="absolute indent-0 right-8 bottom-6">
          <TextTranslateWithValue
            weight={Weight.bold}
            fontSize={20}
            style={{
              color: colors.darkColor,
              opacity: 0.7,
            }}>{`${currentIndex + 1}/${data.length}`}</TextTranslateWithValue>
        </View>
      )}
    </View>
  );
};

export default ImageView;

const styles = StyleSheet.create({
  page: {
    fontSize: 16,
  },
  pagination: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
    opacity: 0.7,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
});
