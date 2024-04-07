// CustomHeader.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StyledButton, ButtonText, PageTitle } from './../components/styles'; // Import your styled components
import { Icon } from 'react-native-elements';

const CustomHeader = ({ title, userName, onLogout }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <PageTitle>{title}</PageTitle>
      </View>
      <View style={styles.headerContent}>
        <Text>Welcome! {userName}</Text>
      </View>
      <View style={styles.headerContent}>
      <StyledButton onPress={onLogout} style={styles.logoutButton}>
          <Icon name="logout" type="material-community" color="#fff" size={24} />
        </StyledButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#007bff', // Add your desired background color
    paddingHorizontal: 16, // Adjust padding as needed
    paddingVertical: 10, // Adjust padding as needed
    marginTop: -20, // Set marginTop to 0 to remove space at the top
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'transparent', // Use 'transparent' to make the background clear
  },
});

export default CustomHeader;
