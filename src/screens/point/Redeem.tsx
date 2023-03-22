import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BaseComponent from '../../components/BaseComponent';
import {bgColor} from '../../styles';
import {FlatListVertical, TextTranslateWithValue} from '../../components';
import LoadMoreFooter from '../../components/LoadMoreFooter';
import {ConvertDate, groupBy} from '../../services/utils';
import {Weight} from '../../res/lang';
import PointItem from '../../components/custom/PointItem';
import {getRedeem} from '../../hooks/api/get-api';
import colors from '../../styles/colors';
import NoData from '../../components/NoData';
import {useAppSelector} from '../../hooks/redux';

let lastDoc: any = 1;
const Redeem = () => {
  const user = useAppSelector(state => state.user);
  const realtime = useAppSelector(state => state.realtime);
  const [invoices, setInvoices] = useState<any>(null);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    lastDoc = 1;
    getData();
    return () => {
      lastDoc = 1;
    };
  }, [realtime]);

  const getData = async () => {
    let result = await fetchData();
    let data = [];
    if (result?.data.length > 0) data = groupBy(result?.data, 'date');
    setInvoices(data);
  };

  const getMore = async () => {
    if (!hasScrolled) return null;
    if (lastDoc > 0) {
      setIsMoreLoading(true);
      let result = await fetchData(lastDoc + 1);
      let data: any = [];
      invoices.map((item: any) => {
        data.push(...item?.invoices);
      });
      if (result?.data.length > 0) data.push(...result?.data);
      lastDoc = Math.ceil(data.length / result?.result_per_page);
      if (Number(result?.total) <= data.length) {
        lastDoc = 0;
      }
      data = groupBy(data, 'date');
      setInvoices(data);
      setIsMoreLoading(false);
    }
  };

  const fetchData = async (page: number = 1) => {
    let result: any = await getRedeem({
      customer_id: user?.id,
      page,
    });
    if (result?.success) {
      let data: any = result?.data?.data;
      data = data.map((item: any) => {
        return {
          ...item,
          date: `${ConvertDate(
            item?.created_at,
            false,
          )?.month.toUpperCase()} / ${
            ConvertDate(item?.created_at, false)?.year
          }`,
        };
      });
      return {
        data,
        result_per_page: result?.data?.per_page,
        total: result?.data?.total,
      };
    } else {
      return {
        data: [],
        result_per_page: 0,
        total: 0,
      };
    }
  };

  const _onScroll = () => {
    if (!hasScrolled) setHasScrolled(true);
  };

  const renderFooter: any = () => {
    if (!isMoreLoading) return true;
    return <LoadMoreFooter />;
  };

  const renderInvoiceItem = useCallback(({item}: any) => {
    return <PointItem item={item} is_redeem />;
  }, []);
  const renderItem = useCallback(({item}: any) => {
    return (
      <View>
        <View className={`w-full py-2 bg-[#FFF1E4] items-center`}>
          <TextTranslateWithValue style={styles.title} weight={Weight.bold}>
            {item?.date}
          </TextTranslateWithValue>
        </View>
        <FlatListVertical
          renderItem={renderInvoiceItem}
          data={item?.invoices}
        />
      </View>
    );
  }, []);

  return (
    <BaseComponent title="home.redeem_points">
      <View
        className={`flex-1 w-full ${bgColor}
          `}>
        {invoices === null ? (
          <ActivityIndicator
            size={40}
            color={colors.mainColor}
            style={{
              marginTop: 10,
            }}
          />
        ) : invoices.length === 0 ? (
          <NoData />
        ) : (
          <FlatListVertical
            onEndReached={() => {
              if (!isMoreLoading) {
                getMore();
              }
            }}
            onTouchMove={_onScroll}
            ListFooterComponent={
              isMoreLoading && lastDoc !== 0 && renderFooter()
            }
            data={invoices}
            renderItem={renderItem}
          />
        )}
      </View>
    </BaseComponent>
  );
};

export default Redeem;

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    opacity: 0.6,
  },
});
