import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity, Dimensions, Alert, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Credential, EditUserInfo} from '../actions'
import firestore from '@react-native-firebase/firestore'
import HeaderArrow from './common/HeaderArrow'
import {TextInput} from 'react-native-paper'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Colors, textInputTheme, GlobalStyles} from './Constants'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Spinner from './common/Spinner'
import {DrawerNavigationProp} from '@react-navigation/drawer'

const WIDTH = Dimensions.get('window').width

interface Cred {
  prop: string
  value: string
}

interface Props {
  firstName: string
  lastName: string
  address1: string
  address2: string
  Credential: (details: Cred) => void
  EditUserInfo: (
    uid: number,
    firstName: string,
    lastName: string,
    address1: string,
    address2: string,
  ) => void
  user: any
  navigation: DrawerNavigationProp<any, any>
  editLoading: boolean
  errorMessage: string
  signMeOut: () => void;
}

const Settings: React.FC<Props> = props => {
  const [loaded, setLoaded] = useState(false)
  const {
    firstName,
    lastName,
    address1,
    address2,
    Credential,
    user,
  } = props

  useEffect(() => {
    if (user) {
      let id = user.user.uid
      firestore()
        .collection('Info')
        .doc(id.toString())
        .get()
        .then(doc => {
          if(doc.data() != undefined){
            Credential({prop: 'firstName', value: doc.data()?.firstName})
            Credential({prop: 'lastName', value: doc.data()?.lastName})
            Credential({prop: 'address1', value: doc.data()?.address1})
            Credential({prop: 'address2', value: doc.data()?.address2})
          }
          setLoaded(true)
        })
        .catch(e => {
          Alert.alert('Error loading you information')
          setLoaded(true)
        })
    }
  }, [user])

  const validFormEdit = () => {
    if (!firstName || firstName.length < 2) {
      Alert.alert("First name can't be less than 2 chars long")
    } else if (!lastName || lastName.length < 2) {
      Alert.alert("Last name can't be less than 2 chars long")
    } else if (!address1 || address1.length < 3) {
      Alert.alert("Address1 can't be less than 3 chars long")
    } else if (!address2 || address2.length < 3) {
      Alert.alert("Address2 can't be less than 3 chars long")
    } else {
      let uid
      if (user) {
        uid = user.user.uid
        props.EditUserInfo(
          uid,
          firstName,
          lastName,
          address1,
          address2,
        )
      }
    }
  }

  const showButton = () => {
    if (!props.editLoading) {
      return (
        <TouchableOpacity
          style={[GlobalStyles.buttonContainer, styles.logOut]}
          onPress={() => validFormEdit()}>
          <Text
            style={[GlobalStyles.buttonText, {color: Colors.mainBackground}]}>
            Save changes
          </Text>
          <Icon name={'account-edit'} size={25} color={Colors.mainBackground} />
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner size={true} spinnerColor={Colors.mainForeGround} />
        </View>
      )
    }
  }

  const showErrorMessage = () => {
    if (props.errorMessage) {
      return (
        <View style={{height: 20}}>
          <Text style={styles.textMissMatch}>{props.errorMessage}</Text>
        </View>
      )
    } else {
      return <View></View>
    }
  }

  const DrawerNavigationToggle = () => {
    props.navigation.toggleDrawer()
  }

  if (!loaded)
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: Colors.mainBackground,
        }}>
        <Spinner size={false} />
      </View>
    )
  else {
    return (
      <View style={{flex: 1, backgroundColor: Colors.mainBackground}}>
        <HeaderArrow
          HeaderText={'Settings'}
          HeaderStyle={{backgroundColor: 'transparent'}}
          TextEdited={GlobalStyles.headerTextStyle}
          navigateMeBack={() => DrawerNavigationToggle()}
          iconName={'menu'}
          iconColor={Colors.mainForeGround}
        />
        <View style={styles.container}>
          <TextInput
            right={
              <TextInput.Icon name='account' color={Colors.mainForeGround} />
            }
            mode='outlined'
            multiline={false}
            style={GlobalStyles.textInputContainer}
            label='First name'
            value={firstName}
            onChangeText={text => Credential({prop: 'firstName', value: text})}
            theme={textInputTheme}
          />
          <TextInput
            right={
              <TextInput.Icon name='account' color={Colors.mainForeGround} />
            }
            mode='outlined'
            multiline={false}
            style={GlobalStyles.textInputContainer}
            label='Last name'
            value={lastName}
            onChangeText={text => Credential({prop: 'lastName', value: text})}
            theme={textInputTheme}
          />
          <TextInput
            right={
              <TextInput.Icon
                name='account-box'
                color={Colors.mainForeGround}
              />
            }
            mode='outlined'
            multiline={false}
            style={GlobalStyles.textInputContainer}
            label='First Name'
            value={address1}
            onChangeText={text => Credential({prop: 'address1', value: text})}
            theme={textInputTheme}
          />
          <TextInput
            right={
              <TextInput.Icon
                name='account-box'
                color={Colors.mainForeGround}
              />
            }
            mode='outlined'
            multiline={false}
            style={GlobalStyles.textInputContainer}
            label='Sur Name'
            value={address2}
            onChangeText={text => Credential({prop: 'address2', value: text})}
            theme={textInputTheme}
          />
          {showButton()}
          {showErrorMessage()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('5%'),
  },
  textMissMatch: {
    color: Colors.gray,
    fontSize: hp('3%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logOut: {
    flexDirection: 'row',
    width: WIDTH * 0.5,
    backgroundColor: Colors.mainForeGround,
  },
})

const mapStateToProps = ({SignInReducer}) => {
  return {
    firstName: SignInReducer.firstName,
    lastName: SignInReducer.lastName,
    address1: SignInReducer.address1,
    address2: SignInReducer.address2,
    user: SignInReducer.user,
    editLoading: SignInReducer.editLoading,
    errorMessage: SignInReducer.errorMessage,
  }
}

export default connect(mapStateToProps, {Credential, EditUserInfo})(
  Settings,
)
