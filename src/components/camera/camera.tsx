import {useEffect, useState} from 'react';
import {AppState, AppStateStatus, Dimensions} from 'react-native';

export const CONTENT_SPACING = 15;

const SAFE_BOTTOM = 0;

export const SAFE_AREA_PADDING = {
  paddingLeft: CONTENT_SPACING,
  paddingTop: CONTENT_SPACING,
  paddingRight: CONTENT_SPACING,
  // paddingBottom:
  //   SAFE_BOTTOM + CONTENT_SPACING + (deviceHeight - (deviceHeight * 75) / 100),
  paddingBottom: SAFE_BOTTOM + CONTENT_SPACING,
};

// The maximum zoom _factor_ you should be able to zoom in
export const MAX_ZOOM_FACTOR = 20;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

// Capture Button
export const CAPTURE_BUTTON_SIZE = 78;

export const useIsForeground = (): boolean => {
  const [isForeground, setIsForeground] = useState(true);

  useEffect(() => {
    const onChange = (state: AppStateStatus): void => {
      setIsForeground(state === 'active');
    };
    const listener = AppState.addEventListener('change', onChange);
    return () => listener.remove();
  }, [setIsForeground]);

  return isForeground;
};
