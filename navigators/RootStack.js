import React from 'react';

import { Colors } from './../components/styles';
const {primary, tertiary} = Colors;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Welcome from './../screens/Welcome';
import Mobile from './../screens/Mobile';
import Postpaid from './../screens/Postpaid';
import PostpaidModal from './../screens/PostpaidModal';
import Electricity from './../screens/Electricity';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerStyle:{
            backgroundColor: 'transparent'
        },
        headerTintColor: tertiary,
        headerTransparent: true,
        headerTitle: '',
        headerLeftContainerStyle:{
            paddingLeft: 20
        }
      }}
      initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen options={{headerTintColor: primary}} name="Welcome" component={Welcome} />
        <Stack.Screen name="Mobile" component={Mobile} />
        <Stack.Screen name="Postpaid" component={Postpaid} />
        <Stack.Screen name="PostpaidModal" component={PostpaidModal} />
        <Stack.Screen name="Electricity" component={Electricity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
