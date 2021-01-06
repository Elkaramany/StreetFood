import React, {useEffect, useState} from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import HeaderArrow from './common/HeaderArrow'
import {GlobalStyles, Colors, textInputTheme} from './Constants'
import {Credential, AddStallToDB, checkSimilarity} from '../actions'
import {connect} from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {DrawerNavigationProp} from '@react-navigation/drawer'
import {TextInput, Switch} from 'react-native-paper'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Spinner from './common/Spinner';
import ImgToBase64 from 'react-native-image-base64'

interface Cred {
  prop: string
  value: string | boolean
}

interface Props {
  navigation: DrawerNavigationProp<any, any>
  name: string
  providedPicture: boolean
  description: string
  location: string
  vegetarian: boolean
  allStalls: any
  stallLoading: boolean
  Credential: (details: Cred) => void
  checkSimilarity: (allStalls: any, name: string) => boolean
  AddStallToDB: (
    name: string,
    location: string,
    description: string,
    imagePicker: string,
    providedPicture: boolean,
    vegetarian: boolean,
  ) => void
}

const Cart: React.FC<Props> = props => {
  const {
    name,
    providedPicture,
    location,
    vegetarian,
    navigation,
    description,
    allStalls,
    stallLoading,
    AddStallToDB,
    Credential,
    checkSimilarity,
  } = props

  const DrawerNavigationToggle = () => {
    navigation.toggleDrawer()
  }
  const [imagePicker, setImagePicker] = useState('')

  const renderFileData = () => {
    if (imagePicker) {
      return (
        <Image
          source={{uri: `data:image/jpeg;base64,${imagePicker}`}}
          style={styles.images}
        />
      )
    } else {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../Images/default.jpg')}
            style={styles.images}
          />
        </View>
      )
    }
  }

  const chooseImage = () => {
    /*ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      ImgToBase64.getBase64String(image.path)
        .then(base64String => setImagePicker(base64String))
        .catch(err => console.error(err))
      Credential({prop: 'providedPicture', value: true})
    })*/
  }

  const checkStallDetails = () => {
    if (!name || name.length < 2) {
      Alert.alert("Stall name can't be less than 2 chars long")
    } else if (!location || location.length < 2) {
      Alert.alert("Stall location can't be less than 5 chars long")
    } else if (
      !description ||
      description.length < 5 ||
      description.length > 280
    ) {
      Alert.alert('Stall Description must be 5-280 chars long')
    } else {
      if (checkSimilarity(allStalls, name) === false) {
        if (imagePicker.length == 0)Credential({prop: 'providedPicture', value: false})
        AddStallToDB(
          name,
          location,
          description,
          imagePicker,
          providedPicture,
          vegetarian,
        )
      } else {
        Alert.alert('A stall with this name already exists in the database')
      }
    }
  }

  const showButton = () => {
    if (stallLoading) {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner size={true} />
        </View>
      )
    }else{
      return(
        <TouchableOpacity
          onPress={() => checkStallDetails()}
          style={GlobalStyles.buttonContainer}>
          <Text style={GlobalStyles.buttonText}>Add food stall</Text>
        </TouchableOpacity>
      )
    }
  }

  return (
    <View style={styles.container}>
      <HeaderArrow
        HeaderText={'Add Food Stall'}
        HeaderStyle={{backgroundColor: 'transparent'}}
        TextStyle={GlobalStyles.headerTextStyle}
        navigateMeBack={() => DrawerNavigationToggle()}
        iconName={'menu'}
        iconColor={Colors.mainForeGround}
      />
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <TextInput
          right={
            <TextInput.Icon name='account' color={Colors.mainForeGround} />
          }
          mode='outlined'
          multiline={false}
          style={GlobalStyles.textInputContainer}
          label='Stall Name'
          value={name}
          onChangeText={text => Credential({prop: 'name', value: text})}
          theme={textInputTheme}
        />
        <TextInput
          right={
            <TextInput.Icon
              name={() => (
                <MaterialIcons
                  name='add-location'
                  color={Colors.mainForeGround}
                  size={25}
                />
              )}
            />
          }
          mode='outlined'
          multiline={false}
          style={GlobalStyles.textInputContainer}
          label='Location'
          value={location}
          onChangeText={text => Credential({prop: 'location', value: text})}
          theme={textInputTheme}
        />
        <View style={styles.switchStyle}>
          <Text style={styles.veganText}>Vegetarian</Text>
          <Switch
            value={vegetarian}
            color={Colors.mainForeGround}
            onValueChange={() =>
              Credential({prop: 'vegetarian', value: !vegetarian})
            }
          />
        </View>
        <TextInput
          right={
            <TextInput.Icon
              name={() => (
                <MaterialIcons
                  name='description'
                  color={Colors.mainForeGround}
                  size={25}
                />
              )}
            />
          }
          mode='outlined'
          multiline={true}
          style={GlobalStyles.textInputContainer}
          label='Description'
          value={description}
          onChangeText={text => Credential({prop: 'description', value: text})}
          theme={textInputTheme}
        />
        <View>{renderFileData()}</View>
        <TouchableOpacity
          onPress={() => chooseImage()}
          style={GlobalStyles.buttonContainer}>
          <Text style={GlobalStyles.buttonText}>Choose Image</Text>
        </TouchableOpacity>
        {showButton()}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  innerContainer: {
    top: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  veganText: {
    fontSize: wp('5%'),
    marginBottom: hp('0.8%'),
    color: Colors.mainForeGround,
  },
  switchStyle: {
    flexDirection: 'row',
    marginRight: wp('63%'),
  },
  images: {
    width: wp('35%'),
    height: hp('25%'),
  },spinnerContainer: {
        height: hp('2.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: hp('5%'),
    }, 
})

const mapStateToProps = ({StallReducer}) => {
  return {
    name: StallReducer.name,
    providedPicture: StallReducer.providedPicture,
    location: StallReducer.location,
    vegetarian: StallReducer.vegetarian,
    description: StallReducer.description,
    allStalls: StallReducer.allStalls,
    stallLoading: StallReducer.stallLoading,
  }
}

export default connect(mapStateToProps, {
  Credential,
  AddStallToDB,
  checkSimilarity,
})(Cart)
