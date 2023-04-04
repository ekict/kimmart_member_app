import {RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import BaseComponent from '../components/BaseComponent';
import {bgColor} from '../styles';
import {allowCameraAccess} from '../services/utils/permission';
import InvoiceItem from '../components/custom/InvoiceItem';
import Card from './home/Card';
import Menu from './home/Menu';
import SlideShow from './home/SlideShow';
import {FlatListScroll, FlatListVertical, TextTranslate} from '../components';
import {Weight} from '../res/lang';
import {MapPinIcon} from 'react-native-heroicons/solid';
import colors from '../styles/colors';
import {navigate} from '../services/utils/navigate';
import Route from '../navigation/constant';
import {checkPhone, getHome} from '../hooks/api/get-api';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {setLoadHome, setLoadUser, setRandomRealtime} from '../redux/actions';
import {ActivityIndicator} from 'react-native';
import {useAuth} from '../hooks/auth';
import {pusher} from '../navigation/Route';
import {PusherEvent} from '@pusher/pusher-websocket-react-native';
import {makeid} from '../services/utils';

const HomeScreen = () => {
  const {accessLogin} = useAuth();
  const user = useAppSelector(state => state.user);
  const [isRefresh, setIsRefresh] = useState(false);
  const home = useAppSelector(state => state.home);
  const [invoices, setInvoices] = useState<any>(null);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const init = async () => {
      fetchHome();
      await allowCameraAccess();
      const channelName = `user-real-time-${user?.phone}-channel`;
      const initPusher = async () => {
        try {
          const channel = pusher.getChannel(channelName);
          if (channel === undefined) {
            await pusher.subscribe({
              channelName,
              onEvent,
            });
            await pusher.connect();
          }
        } catch (e) {
          console.log(`ERROR: ${e}`);
        }
      };
      initPusher();
    };
    init();
    return () => {
      const channelName = `user-real-time-${user?.phone}-channel`;
      const channel = pusher.getChannel(channelName);
      if (channel) {
        pusher.unsubscribe({channelName});
        pusher.disconnect();
      }
    };
  }, []);

  //Pusher
  async function onEvent(event: PusherEvent) {
    console.log('==> Event: ', event.channelName);
    fetchHome();
    dispatch(setRandomRealtime(makeid()));
  }

  const fetchHome = async () => {
    const result = await checkPhone({
      phone: user?.phone,
    });
    if (result?.success) {
      accessLogin(result?.token);
      if (result?.data) {
        dispatch(setLoadUser(result?.data));
      }
    }
    const home = await getHome({
      customer_id: user?.id,
    });
    if (home?.success) {
      dispatch(setLoadHome(home?.data));
      let data: any = [...home?.data?.invoices, ...home?.data?.return_invoices];
      data = data.sort((a: any, b: any) => {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      });
      setInvoices(data);
    } else {
      setInvoices([]);
    }
  };
  const renderItem = ({item, index}: any) => {
    return (
      <View
        style={{
          marginBottom: index === invoices.length - 1 ? 20 : 0,
        }}>
        <InvoiceItem item={item} />
      </View>
    );
  };

  const onRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => {
      fetchHome();
      setIsRefresh(false);
    }, 250);
  };

  return (
    <BaseComponent>
      <View
        className={`flex-1 w-full ${bgColor}
          `}>
        <Card />
        <Menu />
        <View className="flex-1 mt-[250px]">
          <FlatListScroll
            refreshControl={
              <RefreshControl
                progressViewOffset={20}
                refreshing={isRefresh}
                onRefresh={onRefresh}
              />
            }>
            {home ? (
              <>
                <SlideShow />
                {invoices === null ? (
                  <ActivityIndicator
                    size={40}
                    color={colors.mainColor}
                    style={{
                      marginTop: 10,
                    }}
                  />
                ) : (
                  invoices.length > 0 && (
                    <>
                      <TextTranslate weight={Weight.bold} style={styles.title}>
                        home.recent_transactions
                      </TextTranslate>
                      <View className="flex-1">
                        <FlatListVertical
                          data={invoices}
                          renderItem={renderItem}
                        />
                      </View>
                    </>
                  )
                )}
              </>
            ) : (
              <ActivityIndicator
                size={40}
                color={colors.mainColor}
                style={{
                  marginTop: 60,
                }}
              />
            )}
          </FlatListScroll>
          {home && (
            <TouchableOpacity
              onPress={() => navigate(Route.Locations)}
              style={{
                backgroundColor: colors.whiteSmokeColor,
              }}
              className={`h-16 ${bgColor} items-center justify-center border-t border-gray-200`}>
              <View className="p-0.5 absolute top-[-32px] border rounded-full border-gray-200 bg-white">
                <View className=" items-center justify-center w-14 h-14 rounded-full bg-[#F6E3D0]">
                  <MapPinIcon color={colors.lightColor} size={32} />
                </View>
              </View>
              <TextTranslate
                weight={Weight.bold}
                style={[
                  styles.title,
                  {
                    marginTop: 32,
                    fontSize: 16,
                  },
                ]}>
                home.kimmart_store
              </TextTranslate>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </BaseComponent>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    marginHorizontal: 12,
    marginTop: 6,
    marginBottom: 8,
  },
});
