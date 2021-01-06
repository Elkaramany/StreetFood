import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../Components/Home';
import UserSignup from '../Components/Signup';
import UserSignupFinal from '../Components/SignupFinal';
import Profile from '../Components/Profile';
import SingleStall from '../Components/SingleStall';

import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
      initialRouteName={'Home'}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UserSignup" component={UserSignup} />
      <Stack.Screen name="UserSignupFinal" component={UserSignupFinal} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SingleStall" component={SingleStall} />
      <Stack.Screen name="Menu" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
