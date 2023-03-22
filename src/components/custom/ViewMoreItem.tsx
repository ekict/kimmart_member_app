import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextTranslate, TextTranslateWithValue} from '..';
import {Weight} from '../../res/lang';

const ViewMoreItem = ({numberOfLines = 3, title, description}: any) => {
  const [viewMore, setViewMore] = useState(false);
  const [lines, setLines] = useState(numberOfLines);
  useEffect(() => {
    setLines(numberOfLines);
  }, [numberOfLines]);

  return (
    <View>
      <Text
        numberOfLines={lines}
        className="mt-[2px]"
        onTextLayout={e => {
          setViewMore(e.nativeEvent.lines.length > lines ? true : false);
        }}>
        <TextTranslateWithValue weight={Weight.bold} fontSize={12}>
          {title}
        </TextTranslateWithValue>
        <TextTranslateWithValue
          style={{
            lineHeight: 25,
          }}
          weight={Weight.bold}
          fontSize={12}>
          {'\n'}
        </TextTranslateWithValue>
        <TextTranslateWithValue style={[styles.description]}>
          {description}
        </TextTranslateWithValue>
      </Text>
      {viewMore && (
        <TouchableOpacity
          onPress={() => {
            setLines(undefined);
          }}
          className="w-32 mt-1 h-7 justify-center">
          <TextTranslate
            weight={Weight.bold}
            fontSize={12}
            style={{
              opacity: 0.7,
            }}>
            store.view_more
          </TextTranslate>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(ViewMoreItem);

const styles = StyleSheet.create({
  description: {
    fontSize: 12,
  },
});
