import {Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import BrandFooter from '../components/BrandFooter';
import {Button, Text} from 'react-native-paper';
import {Bar} from 'react-native-progress';
import {deviceWidth} from '../styles';
import {bytesToSize} from '../services/utils';
import CodePush from 'react-native-code-push';
import colors from '../styles/colors';

const UpdateScreen = ({data}: any) => {
  const is_update_to_date =
    data?.status === CodePush.SyncStatus.UP_TO_DATE ||
    data?.status === CodePush.SyncStatus.UPDATE_INSTALLED;

  return (
    <Modal
      animated
      animationType="slide"
      transparent={true}
      statusBarTranslucent={true}
      visible={true}>
      <View className="justify-between flex-1 bg-white">
        <View className="h-[60%]">
          <Lottie
            source={require('../assets/lotties/update.json')}
            autoPlay
            loop
          />
        </View>
        <View className="items-center justify-between flex-1 px-6">
          <View className="items-center w-full">
            <Text
              variant="bodyLarge"
              style={{
                color: colors.darkColor,
              }}>
              Please keep your app up to date.
            </Text>
            {!is_update_to_date ? (
              data?.status === CodePush.SyncStatus.CHECKING_FOR_UPDATE ? (
                <Text
                  variant="bodyLarge"
                  style={{
                    color: colors.darkColor,
                  }}>
                  Checking for update...
                </Text>
              ) : (
                <Text
                  variant="bodyLarge"
                  style={{
                    color: colors.darkColor,
                  }}>
                  Awaiting update in progress.
                </Text>
              )
            ) : (
              <Text
                variant="bodyLarge"
                style={{
                  color: colors.darkColor,
                }}>
                By click "Restart Now".
              </Text>
            )}
            {!is_update_to_date ? (
              data?.status !== CodePush.SyncStatus.CHECKING_FOR_UPDATE && (
                <View className="mt-6">
                  <Bar
                    progress={data?.progress}
                    width={deviceWidth / 1.2}
                    height={4}
                  />
                  <View
                    className="flex-row justify-between mt-1"
                    style={{width: deviceWidth / 1.2}}>
                    <Text
                      style={{
                        color: colors.darkColor,
                      }}>
                      {bytesToSize(data?.receivedBytes ?? 0)}
                    </Text>
                    <Text
                      style={{
                        color: colors.darkColor,
                      }}>
                      {bytesToSize(data?.totalBytes ?? 0)}
                    </Text>
                  </View>
                </View>
              )
            ) : (
              <Button
                icon="update"
                mode="contained"
                className="w-full mt-10"
                onPress={() => CodePush.restartApp()}>
                Restart Now
              </Button>
            )}
          </View>
          <BrandFooter />
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(UpdateScreen);

const styles = StyleSheet.create({});
