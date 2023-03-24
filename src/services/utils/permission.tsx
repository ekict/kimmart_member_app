import {Platform} from 'react-native';
import {
  requestMultiple,
  PERMISSIONS,
  openSettings,
  check,
  RESULTS,
} from 'react-native-permissions';

export const allowCameraAccess = async () => {
  if (Platform.OS === 'android') {
    const permission = await requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    ]);
    if (
      permission[PERMISSIONS.ANDROID.CAMERA] === 'blocked' ||
      permission[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'blocked' ||
      permission[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'blocked'
    ) {
      openSettings();
    }
    return (
      permission[PERMISSIONS.ANDROID.CAMERA] === 'granted' &&
      permission[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === 'granted' &&
      permission[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === 'granted'
    );
  } else {
    const permission = await requestMultiple([
      PERMISSIONS.IOS.CAMERA,
      PERMISSIONS.IOS.PHOTO_LIBRARY,
      PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
    ]);

    if (
      permission[PERMISSIONS.IOS.CAMERA] === 'blocked' ||
      permission[PERMISSIONS.IOS.PHOTO_LIBRARY] === 'blocked' ||
      permission[PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY] === 'blocked'
    ) {
      openSettings();
    }
    return (
      permission[PERMISSIONS.IOS.CAMERA] === 'granted' &&
      permission[PERMISSIONS.IOS.PHOTO_LIBRARY] === 'granted' &&
      permission[PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY] === 'granted'
    );
  }
};

export const checkPermissionCamera = async () => {
  if (Platform.OS === 'android') {
    const permission = await check(PERMISSIONS.ANDROID.CAMERA);
    return RESULTS.GRANTED === permission;
  } else {
    const permission = await check(PERMISSIONS.IOS.CAMERA);
    return RESULTS.GRANTED === permission;
  }
};
