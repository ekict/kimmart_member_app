import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import BaseComponent from '../../components/BaseComponent';
import {bgColor} from '../../styles';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
import {CameraIcon} from 'react-native-heroicons/outline';
import UploadImage from '../../components/custom/UploadImage';
import RBSheet from '../../components/custom/BottomSheet/RNSheet';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getImage} from '../../services/utils';
import {allowCameraAccess} from '../../services/utils/permission';
import {Formik} from 'formik';
import TextInputItem from '../../components/custom/TextInputItem';
import {profileSchema} from '../../services/utils/validation';
import {ButtonSubmit, FlatListScroll, TextTranslate} from '../../components';
import FastImage from 'react-native-fast-image';
import {reset} from '../../services/utils/navigate';
import Route from '../../navigation/constant';
import {postMember} from '../../hooks/api/post-api';
import Toast from 'react-native-toast-message';
import {StatusType} from '../../../App';
import {setLoadUser} from '../../redux/actions';

const UpdateProfile = (props: any) => {
  const {phone} = props.route.params;
  const user = useAppSelector(state => state.user);
  const url = useAppSelector(state => state.url);
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef<RBSheet>(null);
  const defaultImage = require('../../assets/images/profile.png');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(
    user?.image && user?.image !== 'no_image.png'
      ? {
          uri: getImage(url, user?.image, 'member'),
        }
      : null,
  );
  const onShowBottomSheet = () => {
    bottomSheetRef.current?.open();
  };
  const onClose = () => {
    bottomSheetRef.current?.close();
  };

  const onSelectImage = async () => {
    const hasPermission = await allowCameraAccess();
    if (hasPermission) {
      setIsLoading(true);
      launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: true,
          maxHeight: 512,
          maxWidth: 512,
        },
        (response: any) => {
          if (response.didCancel) {
            setIsLoading(false);
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            setImage(response.assets[0]);
            onClose();
            setTimeout(() => {
              setIsLoading(false);
            }, 1500);
          }
        },
      );
    }
  };
  const onCamera = async () => {
    const hasPermission = await allowCameraAccess();
    if (hasPermission) {
      setIsLoading(true);
      launchCamera(
        {
          mediaType: 'photo',
          includeBase64: true,
          maxHeight: 512,
          maxWidth: 512,
        },
        (response: any) => {
          if (response.didCancel) {
            setIsLoading(false);
            console.log('User cancelled image picker');
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
          } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
          } else {
            setImage(response.assets[0]);
            onClose();
            setTimeout(() => {
              setIsLoading(false);
            }, 1500);
          }
        },
      );
    }
  };

  const onRemoveImage = () => {
    setImage(null);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const params: any = {
        name: data.fullName,
        phone: phone ?? user?.phone,
        email: data.email,
      };

      if (image) {
        if (image?.uri !== getImage(url, user?.image, 'member')) {
          params.image = image;
        }
      } else {
        params.image = null;
      }

      const result = await postMember(params);
      if (result?.success) {
        dispatch(setLoadUser(result?.data));
        if (phone) {
          reset(Route.GettingStart);
        } else {
          Toast.show({
            text1: 'message.update_completed',
          });
        }
      } else {
        Toast.show({
          type: StatusType.error,
          text1: 'error.server_error',
        });
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <UploadImage
        ref={bottomSheetRef}
        size={image == null ? 180 : 220}
        onCamera={onCamera}
        onSelectImage={onSelectImage}
        image={image}
        onDelete={() => {
          setImage(null);
          onRemoveImage();
          onClose();
        }}
      />
      <BaseComponent
        title={phone ? 'home.create_acccount' : 'home.edit_profile'}
        is_show_back={phone ? false : true}>
        <View
          className={`flex-1 w-full ${bgColor}
          `}>
          <View className="h-[15%] bg-[#F6E3D0] p-6 z-20">
            <View className="absolute left-0 right-0 items-center top-[35px] z-20">
              <TouchableOpacity onPress={onShowBottomSheet}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['rgba(255, 122, 0, 1)', 'rgba(33, 150, 83, 1)']}
                  className="items-center justify-center rounded-full w-36 h-36">
                  <View
                    className={`w-[130px] h-[130px] rounded-full ${colors.bgMainMolor}`}>
                    <FastImage
                      source={image ? image : defaultImage}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 1000,
                      }}
                    />
                  </View>
                </LinearGradient>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={['rgba(255, 122, 0, 1)', 'rgba(33, 150, 83, 1)']}
                  className="absolute z-30 items-center justify-center rounded-full bottom-2 right-2 w-9 h-9">
                  <View
                    className={`w-8 h-8 rounded-full bg-[#F6E3D0] items-center justify-center`}>
                    <CameraIcon
                      color={colors.darkColor}
                      opacity={0.6}
                      size={20}
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <FlatListScroll>
            <Formik
              initialValues={{
                fullName: user?.name ?? '',
                email: user?.email ?? '',
              }}
              validationSchema={profileSchema}
              onSubmit={onSubmit}>
              {({handleChange, handleBlur, values, handleSubmit, errors}) => (
                <View className="items-center px-6 mt-20">
                  <TextInputItem
                    disabled={true}
                    value={phone ?? user?.phone}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    textColor={colors.darkColor}
                    title={'auth.phone_number'}
                  />
                  <TextInputItem
                    value={values.fullName}
                    autoCapitalize="none"
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    textColor={colors.darkColor}
                    title={'auth.full_name'}
                    error={errors.fullName}
                    placeholder={'auth.enter_full_name'}
                  />
                  <TextInputItem
                    value={values.email}
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    textColor={colors.darkColor}
                    title={'auth.email'}
                    error={errors.email}
                    placeholder={'auth.enter_email'}
                  />
                  <ButtonSubmit
                    disabled={Object.keys(errors).length > 0 || isLoading}
                    onPress={handleSubmit}
                    style={{
                      marginTop: 40,
                    }}
                    is_loading={isLoading}>
                    {isLoading ? (
                      <ActivityIndicator color={'white'} size={24} />
                    ) : phone ? (
                      'home.create_account'
                    ) : (
                      'home.update'
                    )}
                  </ButtonSubmit>
                </View>
              )}
            </Formik>
          </FlatListScroll>
        </View>
      </BaseComponent>
    </>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({});
