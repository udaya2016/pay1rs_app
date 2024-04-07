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

const PostpaidModal = ({ navigation, route }) => {
  const { billFetchId, billedamount, billdate, payamount, customerName } = route.params;

//   const [eWallet, seteWallet] = useState(null);
const handlePress = async () => {
    try {
      const apiUrl = 'https://pay1rs.com/api/postpaidPayBill'; 
      const data = {
        billFetchId: billFetchId
      };

      const response = await axios.post(apiUrl, data);

      // Handle the response as needed
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
    }
  };
  
  return (
    <StyledContainer>
      <StatusBar style="light" />
      <InnerContainer>
        <PageTitle>Pay1rs</PageTitle>        
        
        <WelcomeContainer>
          <PageTitle welcome={true}>Pay Bill</PageTitle>
          <SubTitle welcome={true}>Customer Name: {customerName || 'NA'}</SubTitle>
          <SubTitle welcome={true}>Bill Date: {billdate || 'NA'}</SubTitle>
          <SubTitle welcome={true}>Pay Amount: {payamount || 'NA'}</SubTitle>
          <StyledFormArea>
            
            <Line />
            <StyledButton
              onPress={handlePress}
            >
              <ButtonText>Pay Bill</ButtonText>
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

export default PostpaidModal;
