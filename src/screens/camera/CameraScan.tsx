import * as React from 'react';
import {useRef, useState, useMemo, useCallback} from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  StyleSheet,
  Vibration,
  View
} from 'react-native';
import {
  Camera,
  CameraDeviceFormat,
  CameraRuntimeError,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import Reanimated, {runOnJS} from 'react-native-reanimated';
import {useEffect} from 'react';
import {useIsFocused} from '@react-navigation/core';
import {goBack} from '../../services/utils/navigate';
import {
  BarcodeFormat,
  scanBarcodes,
} from 'vision-camera-code-scanner';
import colors from '../../styles/colors';
import {useIsForeground} from '../../components/camera/camera';
import {deviceHeight, deviceWidth} from '../../styles';
import {
  HandlerStateChangeEvent,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {makeEventNotifier} from '../../services/events/useEventListener';
import BaseComponent from '../../components/BaseComponent';
import {TextTranslate} from '../../components';
import {Weight} from '../../res/lang';
import FastImage from 'react-native-fast-image';
import RedeemPointModal from './modal/RedeemPointModal';
import Orientation from "react-native-orientation-locker";

function getMaxFps(format: CameraDeviceFormat): number {
  return format.frameRateRanges.reduce((prev, curr) => {
    if (curr.maxFrameRate > prev) return curr.maxFrameRate;
    else return prev;
  }, 0);
}

const notifer = makeEventNotifier<{barcode: any; screen: any}>(
  'OnBarcodeSelected',
);

// Youy can add a snippet to generate this
export function useBarcodePickerListener(
  listener: typeof notifer.notify,
  deps: ReadonlyArray<any>,
) {
  notifer.useEventListener(listener, deps);
}

export function CameraScan() {
  const camera = useRef<Camera>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const top = deviceHeight * 0.18;
  const left = deviceWidth * 0.1;
  const width = deviceWidth - left * 2;
  const height = deviceWidth - left * 2.8;
  const lineColor = '#FFDD00';
  const borderColor = '#f37146';

  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  // check if camera page is active
  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  let isActive = isFocussed && isForeground;

  const [barcode, setBarcode] = useState<any>('');
  const [isTop, setIsTop] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);

  // camera format settings
  const wide_devices = useCameraDevices('wide-angle-camera');
  const all_devices = useCameraDevices();
  const device =
    all_devices?.['back'] !== undefined
      ? wide_devices?.['back'] ?? all_devices?.['back']
      : null;

  //Back Action
  const backAction = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    Orientation.lockToPortrait();
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>{
      BackHandler.removeEventListener('hardwareBackPress', backAction);
      Orientation.unlockAllOrientations();
    }
  }, []);

  useEffect(() => {
    startAnimation(isTop ? 1 : 0);
  }, [isTop]);

  const startAnimation = (toValue: any) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsTop(!isTop);
    });
  };

  useEffect(() => {
    if (isFocussed) setBarcode('');
  }, [isFocussed]);

  useEffect(() => {
    if (barcode?.length > 0) {
      Vibration.vibrate(150);
    }
  }, [barcode]);

  const onError = useCallback((error: CameraRuntimeError) => {
    console.error(error);
  }, []);

  const onInitialized = useCallback(() => {
    setIsCameraInitialized(true);
  }, []);

  //#endregion

  const format = useMemo(() => {
    return device?.formats.reduce((prev: any, curr) => {
      if (prev == null) return curr;
      if (getMaxFps(curr) > getMaxFps(prev)) return curr;
      else return prev;
    }, undefined);
  }, [device?.formats]);

  const onSubmit = () => {
    setVisibleModal(true);
    Vibration.vibrate(150);
  };

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      if (isActive) {
        const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
          checkInverted: true,
        });
        if (detectedBarcodes.length > 0) {
          runOnJS(setBarcode)(detectedBarcodes[0]?.displayValue);
        }
      }
    },
    [isActive],
  );

  const focusCamera = async ({
    nativeEvent,
  }: HandlerStateChangeEvent<TapGestureHandlerEventPayload>) => {
    if (device) {
      if (isCameraInitialized) {
        if (device.supportsFocus) {
          const x = nativeEvent.x;
          const y = nativeEvent.y;
          if (x > 0 && y > 0 && x <= width && y <= height) {
            try {
              await camera.current?.focus({x, y});
            } catch (error) {
              // console.log(error);
            }
          }
        }
      }
    }
  };

  const closeModal = () => {
    setBarcode('');
    setVisibleModal(false);
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height - 4],
    extrapolate: 'clamp',
  });

  return (
    <>
      <BaseComponent title="home.scan_qr">
        <View style={styles.container}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              {
                position: 'absolute',
                top,
                left,
                height,
                width,
                borderWidth: 2,
                borderColor: borderColor,
              },
            ]}>
            <View className="absolute inset-0 z-20 items-center">
              {device != null && (
                <TapGestureHandler onHandlerStateChange={focusCamera}>
                  <Reanimated.View>
                    <Camera
                      ref={camera}
                      format={format}
                      style={[
                        {
                          height: height - 3,
                          width: width - 3,
                        },
                      ]}
                      device={device}
                      isActive={isActive}
                      onInitialized={onInitialized}
                      onError={onError}
                      enableZoomGesture={false}
                      photo={true}
                      frameProcessorFps={1}
                      frameProcessor={
                        barcode?.length === 0 ? frameProcessor : undefined
                      }
                      orientation="portrait"
                    />
                  </Reanimated.View>
                </TapGestureHandler>
              )}
              {isCameraInitialized && (
                <Animated.View
                  className={'absolute z-30'}
                  style={[
                    {
                      width,
                      borderBottomWidth: 2,
                      borderBottomColor: lineColor,
                    },
                    {transform: [{translateY}]},
                  ]}
                />
              )}
            </View>
          </View>
          <View className="absolute left-0 right-0 z-20 items-center top-10">
            <TextTranslate weight={Weight.bold} style={styles.title}>
              home.kimmart_member
            </TextTranslate>
            <TextTranslate style={styles.desc}>
              home.put_frame_with_qr_code
            </TextTranslate>
          </View>
          <View className="absolute left-0 right-0 z-20 items-center bottom-10">
            <FastImage
              source={require('../../res/logo/logo-wide.png')}
              style={{
                height: 80,
                width: 250,
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </BaseComponent>
      {visibleModal && (
        <View className="z-50">
          <RedeemPointModal
            visible={visibleModal}
            closeModal={closeModal}
            data={barcode}
          />
        </View>
      )}
    </>
  );
}

export default CameraScan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  defaultUnitBarcode: {
    color: colors.lightColor,
    fontSize: 25,
    width: deviceWidth,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    color: colors.secondColor,
  },
  desc: {
    marginTop: 16,
  },
});
