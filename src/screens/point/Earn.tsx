import {Platform, StyleSheet, useWindowDimensions, View} from 'react-native';
import React from 'react';
import BaseComponent from '../../components/BaseComponent';
import {bgColor} from '../../styles';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import EarnInvoices from './EarnInvoices';
import colors from '../../styles/colors';
import {TextTranslate} from '../../components';
import {Weight} from '../../res/lang';

const renderScene = SceneMap({
  invoices: EarnInvoices,
  return_invoices: EarnInvoices,
});

const Earn = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'invoices', title: 'home.invoices', is_return: false},
    {key: 'return_invoices', title: 'home.return_invoices', is_return: true},
  ]);

  const renderLabel = ({route, focused}: any) => {
    return (
      <View
        className="px-4 py-3 rounded-full"
        style={{
          backgroundColor: focused ? colors.whiteSmokeColor : undefined,
        }}>
        <TextTranslate
          style={{
            opacity: 0.8,
          }}
          weight={Weight.bold}
          fontSize={14}>
          {route.title}
        </TextTranslate>
      </View>
    );
  };

  const renderTabBar = (props: any) => {
    return (
      <View
        style={{
          width: '100%',
        }}>
        <TabBar
          {...props}
          scrollEnabled
          pressColor={'transparent'}
          tabStyle={{
            width: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
          }}
          style={[
            {
              backgroundColor: colors.lightColor,
              paddingHorizontal: 16,
              justifyContent: 'center',
              elevation: 0,
              height: 60,
            },
          ]}
          renderLabel={renderLabel}
          indicatorStyle={[styles.indicator]}
        />
      </View>
    );
  };

  return (
    <BaseComponent title="home.earn_points">
      <View
        className={`flex-1 w-full ${bgColor}
          `}>
        <TabView
          removeClippedSubviews={Platform.OS === 'ios' ? false : true}
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={renderTabBar}
        />
      </View>
    </BaseComponent>
  );
};

export default Earn;

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    opacity: 0.6,
  },
  indicator: {
    height: 0,
  },
});
