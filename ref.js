import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
//formik
import { Formik } from 'formik';

//icons
import { Octicons, Ionicons, Fontisto } from '@expo/vector-icons';

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  WelcomeContainer,
  WelcomeImage,
  Avatar,
  EwalletTitle,
} from './../components/styles';

import { Text, View, StyleSheet } from 'react-native';
//api client
import axios from 'axios';
import { Button, Icon } from 'react-native-elements';
const Welcome = ({ navigation, route }) => {
  const { name, email, token, id } = route.params;

  const [eWallet, seteWallet] = useState(null);

  useEffect(() => {
    const apiUrl = 'https://pay1rs.com/api/getAvaliableBalance';

    axios
      .post(apiUrl, { userid: id, token: token })
      .then((response) => {
        const result = response.data;
        const { status, data } = result;
        console.log(data);
        seteWallet(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const zerobalance = 0;
  return (
    <StyledContainer>
      <StatusBar style="light" />
      <InnerContainer>
        <PageTitle>Pay1rs</PageTitle>
        <EwalletTitle>
          E-Wallet: {eWallet ? <Text>₹{eWallet.toFixed(2)}</Text> : <Text>₹ {zerobalance.toFixed(2)}</Text>}
        </EwalletTitle>
        <View style={styles.container}>
          <Button
            icon={<Icon name="mobile" type="font-awesome" color="#ffffff" />}
            title="Mobile"
            buttonStyle={styles.button}
          />
          <View style={styles.spacing} />
          <Button
            icon={<Icon name="flash" type="material-community" color="#ffffff" />}
            title="Electricity"
            buttonStyle={styles.button}
          />
          <View style={styles.spacing} />
          <Button
            icon={<Icon name="plane" type="font-awesome" color="#ffffff" />}
            title="Travel"
            buttonStyle={styles.button}
          />
        </View>
        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome! Buddy</PageTitle>
          <SubTitle welcome={true}>{name || 'Udaya'}</SubTitle>
          <SubTitle welcome={true}>{email || 'udaya@gmail.com'}</SubTitle>
          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('./../assets/img/pay1rs_logo.png')} />
            <Line />
            <StyledButton
              onPress={() => {
                navigation.navigate('Login');
              }}
            >
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </StyledContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff', // You can customize the button color
  },
  spacing: {
    width: 10,
  }
});

export default Welcome;
