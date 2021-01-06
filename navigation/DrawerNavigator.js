import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Dimensions } from 'react-native';
import { Colors } from '../Components/Constants';

import Menu from '../Components/Menu';
import AddStall from '../Components/AddStall';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Settings from '../Components/Settings';
import Profile from '../Components/Profile';
import DrawerScreen from './Drawer';

const WIDTH = Dimensions.get('window').width

const Drawer = createDrawerNavigator();

const ICON_SIZE = 25;

const GET_OPTIONS = (title) => {
  let OPTIONS={
    headerShown: true,
    headerTitle: title,
    headerStyle: {backgroundColor: Colors.mainBackground},
    headerTitleStyle: styles.TextStyle,
    headerBackTitleVisible: false,
    headerTintColor: Colors.mainForeGround,
  }
  return OPTIONS;
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerStyle={{
        backgroundColor: Colors.mainBackground,
        width: WIDTH * 0.8,
      }}

      drawerContent={props => <DrawerScreen {...props} />}

      drawerContentOptions={{
        activeTintColor: Colors.mainForeGround,
        itemStyle: { marginVertical: 8, marginHorizontal: 8 },
        labelStyle: {
          fontSize: 18,
        },
      }}
    >
      <Drawer.Screen name="Menu" component={Menu}
        options={{
          title: 'Food Stalls',
          drawerIcon: ({ color }) => {
            return <Icon name={'menu'} size={ICON_SIZE} color={color} />
          },
        }}
      />
      <Drawer.Screen name="AddStall" component={AddStall}
        options={{
          title: 'Add Stall',
          drawerIcon: ({ color }) => {
            return <Icon name={'map-marker-plus'} size={ICON_SIZE} color={color} />
          },
        }}
      />
      <Drawer.Screen name="Settings" component={Settings}
        options={{
          title: 'Settings',
          drawerIcon: ({ color }) => {
            return <Icon2 name={'settings'} size={ICON_SIZE} color={color} />
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;