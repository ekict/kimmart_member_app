import * as React from 'react';
import {useRef, useState, useMemo, useCallback} from 'react';
import {BackHandler, StyleSheet, Vibration, View} from 'react-native';
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
import {BarcodeFormat, scanBarcodes} from 'vision-camera-code-scanner';
import {Defs, Mask, Rect, Svg} from 'react-native-svg';
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
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  // check if camera page is active
  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  let isActive = isFocussed && isForeground;

  const [qrcodes, setQrcodes] = useState<any>([]);
  const [visibleModal, setVisibleModal] = useState(false);

  // camera format settings
  const devices = useCameraDevices();
  const device = devices['back'];

  //Back Action
  const backAction = () => {
    goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  useEffect(() => {
    let isCapture = false;
    if (qrcodes.length > 0 && isCameraInitialized && isActive) {
      const init = () => {
        isCapture = true;
        onSubmit();
      };
      if (!isCapture) init();
    }
    return () => {
      isCapture = false;
    };
  }, [qrcodes.length, isCameraInitialized, isActive]);

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

  const CameraFrame = () => {
    return (
      <Svg height={'100%'} width={'100%'}>
        <Defs>
          <Mask id="mask" height={'100%'} width={'100%'} x="0" y="0">
            <Rect height={'100%'} width={'100%'} fill="#fff" />
            <Rect
              x={(deviceWidth - 330) / 2}
              y={150}
              height={'330'}
              width={'330'}
              fill="black"
            />
          </Mask>
        </Defs>
        <Rect
          height={'100%'}
          width={'100%'}
          fill="rgb(252, 252, 252)"
          mask="url(#mask)"
        />
        <Rect
          x={(deviceWidth - 330) / 2}
          y={150}
          height={'330'}
          width={'330'}
          strokeWidth={2}
          stroke={colors.secondColor}
          fill={'transparent'}
        />
      </Svg>
    );
  };

  const frameProcessor = useFrameProcessor(
    frame => {
      'worklet';
      if (isActive) {
        const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
          checkInverted: true,
        });
        runOnJS(setQrcodes)(detectedBarcodes);
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
          const x = nativeEvent.x - deviceWidth * 0.1;
          const y = nativeEvent.y - deviceHeight * 0.2;
          if (x > 0 && y > 0 && x <= 330 && y <= 330) {
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
    setQrcodes([]);
    setVisibleModal(false);
  };
  return (
    <>
      <BaseComponent title="home.scan_qr">
        <View style={styles.container}>
          {device != null && (
            <TapGestureHandler onHandlerStateChange={focusCamera}>
              <Reanimated.View
                style={[
                  StyleSheet.absoluteFill,
                  {
                    height: '100%',
                    zIndex: 15,
                  },
                ]}>
                <Camera
                  ref={camera}
                  format={format}
                  style={[
                    StyleSheet.absoluteFillObject,
                    {
                      width: 325,
                      height: 325,
                      left: (deviceWidth - 325) / 2,
                      top: 152.5,
                    },
                  ]}
                  device={device}
                  isActive={isActive}
                  onInitialized={onInitialized}
                  onError={onError}
                  enableZoomGesture={false}
                  photo={true}
                  frameProcessor={
                    device.supportsParallelVideoProcessing &&
                    qrcodes.length === 0
                      ? frameProcessor
                      : undefined
                  }
                  orientation="portrait"
                />
              </Reanimated.View>
            </TapGestureHandler>
          )}

          <View className="absolute inset-0 z-10">
            <CameraFrame />
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
            data={qrcodes}
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
