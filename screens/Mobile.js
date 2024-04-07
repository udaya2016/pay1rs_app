import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';
import Icon from 'react-native-elements/dist/icons/Icon';
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
  Colors,
  MsgBox,
  Line,
  ExtraText,
  ExtraView,
  TextLink,
  TextLinkContent,
  WalletBanner,
  BannerText,
  RNPickerSelectView,
} from './../components/styles';
import {
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  TextInput,
} from 'react-native';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';
import RNPickerSelect from 'react-native-picker-select';
import Swiper from 'react-native-swiper';

//api client
import axios from 'axios';

//Colors
const { brand, darkLight, primary } = Colors;

const Mobile = ({ navigation, route }) => {
  const { name, email, token, id } = route.params;
  // console.log(route);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const [selectedValue, setSelectedValue] = useState(null);

  const placeholder = {
    label: 'Select Operator',
    value: '',
  };

  const items = [
    { label: 'Airtel', value: 'AT' },
    { label: 'V!', value: 'VI' },
    { label: 'Jio', value: 'RJ' },
    { label: 'BSNL-TalkTime', value: 'BT' },
    { label: 'BSNL-Special', value: 'BS' },
  ];

  const handleRechargeApi = (formData, setSubmitting) => {
    handleMessage(null);
    const url = 'https://pay1rs.com/api/recharge_api';

    axios
      .post(url, formData)
      .then((response) => {
        const result = response.data;
        const { message, status, data } = result;
        console.log(data);
        if (status == 'SUCCESS') {
          handleMessage("Recharge Successful", status);
        } 
        //else {
        //   // navigation.navigate('Welcome', { ...data });
        //   console.log(...data);
        // }
        // setSubmitting(false);
      })
      .catch((error) => {
        console.log(error.JSON());
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
      });
  };

  const handleMessage = (message, type = 'SUCCESS') => {
    setMessage(message);
    setMessageType(type);
  };

  const [isLoading, setIsLoading] = useState(false);

 
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <WalletBanner>
            <BannerText>Balance: ₹ 200000</BannerText>
          </WalletBanner>
          <PageTitle>Pay1rs</PageTitle>
          <SubTitle>Mobile Recharge</SubTitle>

          <CarouselSlider />
          <Formik
            initialValues={{ mobile: '', plan: '', network: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.mobile == '' || values.plan == '' || values.network == '') {
                handleMessage('Please fill all the fields');
                setSubmitting(false);
              } else {
                console.log(values);
                handleRechargeApi(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Mobile No."
                  icon="device-mobile"
                  placeholder="9512345678"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('mobile')}
                  onBlur={handleBlur('mobile')}
                  keyboardType="numeric"
                  value={values.mobile}
                  maxLength={10}
                />

                <TextInput
                  style={{ display: 'none' }}
                  onChangeText={handleChange('token')}
                  onBlur={handleBlur('token')}
                  value={token}
                />

                <TextInput
                  style={{ display: 'none' }}
                  onChangeText={handleChange('id')}
                  onBlur={handleBlur('id')}
                  value={id}
                />

                <View>
                  <LeftIcon>
                    <Octicons name="broadcast" size={30} color={brand} />
                  </LeftIcon>
                  <StyledInputLabel>Network</StyledInputLabel>
                  <RNPickerSelectView>
                    <RNPickerSelect
                      placeholder={placeholder}
                      items={items}
                      value={values.network}
                      onChangeText={handleChange('network')}
                      onBlur={handleBlur('network')}
                      onValueChange={handleChange('network')}
                      style={{
                        inputAndroid: styles.inputAndroid,
                        inputIOS: styles.inputIOS,
                      }}
                    />
                  </RNPickerSelectView>
                  <RightIcon>
                    <Icon name="arrow-drop-down" size={30} color="black" />
                  </RightIcon>
                </View>

                <MyTextInput
                  label="Amount"
                  icon="stack"
                  placeholder="₹ 199"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('plan')}
                  onBlur={handleBlur('plan')}
                  value={values.plan}
                  keyboardType="numeric"
                />

                <MsgBox type={messageType}>{message}</MsgBox>
                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Recharge</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
                
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};
const MyTextInput = ({ label, icon, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const sliderHeight = height * 0.15;

const CarouselSlider = () => {
  const images = [
    'https://asrecharge.com/Assets/slider-2.png',
    'https://asrecharge.com/Assets/slider-3.png',
    'https://asrecharge.com/Assets/slider-6.png',
  ];

  return (
    <Swiper
      style={[styles.wrapper, { height: sliderHeight, marginBottom: 5 }]}
      showsButtons={false}
      autoplay={true}
      autoplayTimeout={3}
    >
      {images.map((image, index) => (
        <View key={index} style={styles.slide}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  container_dropdown: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
  },
  iconContainer: {
    paddingHorizontal: 10,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: '#000000',
    flex: 1,
  },
  inputIOS: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: '#000000',
    flex: 1,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    flex: 1,
  },
});

export default Mobile;
