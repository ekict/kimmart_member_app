import React, {useState} from 'react';
import {
  InteractionManager,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import {bgColor} from '../styles';
import MainHeader from './header/MainHeader';
import Loading from './Loading';

const BaseComponent = ({
  children,
  title,
  loading,
  is_cross = false,
  rightIcon = null,
  is_back_to_home = false,
  is_show_back = true,
}: any) => {
  const [isReady, setIsReady] = useState(false);
  React.useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
  }, []);
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS === 'ios' ? 15 : 25}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className={'flex-1'}>
      <View className={`flex-1 ${bgColor}`}>
        {title && (
          <MainHeader
            title={title}
            is_cross={is_cross}
            rightIcon={rightIcon}
            is_back_to_home={is_back_to_home}
            is_show_back={is_show_back}
          />
        )}
        {!isReady ? loading ? <Loading /> : null : children}
      </View>
    </KeyboardAvoidingView>
  );
};

export default React.memo(BaseComponent);
