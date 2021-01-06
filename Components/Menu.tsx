import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {connect} from 'react-redux'
import HeaderArrow from './common/HeaderArrow'
import Spinner from './common/Spinner'
import {fetchAllStalls} from '../actions'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import {Colors, textInputTheme, GlobalStyles} from './Constants'

interface stallArr {
  name: string
  providedPicture: boolean | null
  location: string
  vegetarian: boolean | null
  description: string
  imagePicker: string
  reviews: any[]
}

interface Props {
  navigation: DrawerNavigationProp<any, any>
  allStalls: stallArr[]
  fetchAllStalls: () => void
}

const UserMenu: React.FC<Props> = props => {
  useEffect(() => {
    props.fetchAllStalls()
  }, [])

  const DrawerNavigationToggle = () => {
    props.navigation.toggleDrawer()
  }

  const isVegan = item => {
    if (item === true) {
      return (
        <Text style={[styles.stallName, {color: Colors.mainForeGround}]}>
          This place serves Vegetarian food
        </Text>
      )
    }
  }

  const hasPicture = (providedPicture, picture) => {
    if (providedPicture === true) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: `data:image/jpeg;base64,${picture}`}}
            style={styles.images}
          />
        </View>
      )
    } else {
      return <Text style={styles.stallName}>No image available for this stall</Text>
    }
  }

  const renderItem = ({item}) => {
    return (
      <View style={{marginHorizontal: 15, marginVertical: 5}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.stallName, {color: Colors.mainForeGround}]}>
            Name: 
          </Text>
          <Text style={styles.stallName}>{item.data().name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.stallName, {color: Colors.mainForeGround}]}>
            Location:{' '}
          </Text>
          <Text style={styles.stallName}>{item.data().location}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.stallName, {color: Colors.mainForeGround}]}>
            Description:{' '}
          </Text>
          <Text style={styles.stallName}>{item.data().description}</Text>
        </View>
        {isVegan(item.data().vegetarian)}
        {hasPicture(item.data().providedPicture, item.data().imagePicker)}
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SingleStall',{
            item
          })}
          style={GlobalStyles.buttonContainer}>
          <Text style={GlobalStyles.buttonText}>Check reviews</Text>
        </TouchableOpacity>
        <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.mainBackground}}>
      <HeaderArrow
        HeaderText={'Food Stalls'}
        HeaderStyle={{backgroundColor: 'transparent'}}
        TextEdited={GlobalStyles.headerTextStyle}
        navigateMeBack={() => DrawerNavigationToggle()}
        iconName={'menu'}
        iconColor={Colors.mainForeGround}
      />
        <FlatList
          data={props.allStalls}
          renderItem={renderItem}
          keyExtractor={stall => stall.name}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp('7%'),
  },
  stallName: {
    fontSize: wp('4%'),
    color: 'tomato',
    marginVertical: hp('0.5%'),
  },images: {
    width: wp('60%'),
    height: hp('30%'),
    margin: hp('1%'),
    borderRadius: wp('5%')
  },
})

const mapStateToProps = ({StallReducer}) => {
  return {
    allStalls: StallReducer.allStalls,
  }
}

export default connect(mapStateToProps, {fetchAllStalls})(UserMenu)
