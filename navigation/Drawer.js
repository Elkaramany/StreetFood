import { DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../Components/Constants';
import {signMeOut} from '../actions';
import {connect} from 'react-redux';

const DrawerScreen = (props) => {
  const { navigation } = props;

  const functionsLogOut = () => {
    props.signMeOut();
    navigation.navigate('Home')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView {...props}>
        {/* <DrawerItem
          label={'Profile Name'}
          labelStyle={{ textTransform: 'capitalize', color: 'tomato', fontSize: 30 }}
          onPress={() => navigation.navigate("Profile")}
          icon={() => (
            <Icon
              name="account"
              color={'tomato'}
              size={50}
            />
          )}
        /> */}
        <DrawerItemList
          {...props}
        />
      </ScrollView>
      <DrawerItem
        label="logout"
        labelStyle={{ textTransform: 'capitalize', color: 'tomato', fontSize: 20 }}
        onPress={() => functionsLogOut()}
        icon={() => (
          <Icon
            name="logout"
            color={'tomato'}
            size={20}
          />)}
      />
      <DrawerItem
        label="V0.0.1"
        labelStyle={{ textTransform: 'capitalize', color: Colors.mainForeGround, fontSize: 20 }}
      />
    </SafeAreaView>
  );
};

export default connect( null, {signMeOut})(DrawerScreen)

