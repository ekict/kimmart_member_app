import {
  Linking,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import BaseComponent from '../../components/BaseComponent';
import style, {bgColor, deviceWidth} from '../../styles';
import {
  FlatListVertical,
  TextTranslate,
  TextTranslateWithValue,
} from '../../components';
import FastImage from 'react-native-fast-image';
import colors from '../../styles/colors';
import {Weight} from '../../res/lang';
import {MapPinIcon} from 'react-native-heroicons/outline';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {getImage} from '../../services/utils';
import {getHome} from '../../hooks/api/get-api';
import {setLoadHome} from '../../redux/actions';

const Locations = () => {
  const [isRefresh, setIsRefresh] = useState(false);
  const dispatch = useAppDispatch();
  const home = useAppSelector(state => state.home);
  const user = useAppSelector(state => state.user);
  const onDirections = (item: any) => {
    Linking.openURL(item?.map_url);
  };
  const renderItem = useCallback(({item}: any) => {
    return (
      <View className={`pb-3`}>
        <FastImage
          source={{
            uri: getImage(item?.image, 'branch'),
          }}
          resizeMode="cover"
          style={{
            width: deviceWidth,
            height: deviceWidth / 1.33,
            backgroundColor: colors.whiteSmokeColor,
          }}>
          <TouchableOpacity
            onPress={() => onDirections(item)}
            style={style.shadow}
            className="absolute flex-row items-center px-4 py-2.5 rounded-full bg-amber-400 bottom-5 right-5">
            <MaterialCommunityIcons
              name="directions"
              size={22}
              color={colors.lightColor}
            />
            <TextTranslate weight={Weight.bold} style={styles.directions}>
              home.directions
            </TextTranslate>
          </TouchableOpacity>
        </FastImage>
        <View className="p-3">
          <TextTranslateWithValue weight={Weight.bold} style={styles.name}>
            {item?.map_name}
          </TextTranslateWithValue>
          <View className="flex-row items-center gap-1">
            <MapPinIcon size={16} color={colors.darkColor} opacity={0.6} />
            <TextTranslateWithValue style={styles.address}>
              {item?.address}
            </TextTranslateWithValue>
          </View>
        </View>
      </View>
    );
  }, []);

  const fetchHome = async () => {
    const home = await getHome({customer_id: user?.id});
    if (home?.success) {
      dispatch(setLoadHome(home?.data));
    }
  };

  const onRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => {
      fetchHome();
      setIsRefresh(false);
    }, 250);
  };

  return (
    <BaseComponent title="home.locations">
      <View
        className={`flex-1 w-full ${bgColor}
          `}>
        <FlatListVertical
          refreshControl={
            <RefreshControl refreshing={isRefresh} onRefresh={onRefresh} />
          }
          data={home?.locations ?? []}
          renderItem={renderItem}
        />
      </View>
    </BaseComponent>
  );
};

export default Locations;

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
  },
  address: {
    fontSize: 13,
    opacity: 0.8,
  },
  directions: {
    fontSize: 14,
    color: colors.lightColor,
    marginLeft: 10,
  },
});
