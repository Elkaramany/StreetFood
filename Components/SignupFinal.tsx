import React, {useEffect, useState} from 'react'
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux'
import {TextInput} from 'react-native-paper'
import _ from 'lodash'
import {Colors, textInputTheme, GlobalStyles} from './Constants'
import {Credential, createAccountUser, resetErrorMessage} from '../actions'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import HeaderArrow from './common/HeaderArrow'
import Spinner from './common/Spinner'
import {StackNavigationProp} from '@react-navigation/stack'

interface Cred {
  prop: string
  value: string
}

interface Props {
  loading: boolean
  email: string
  password: string
  resetErrorMessage: () => void
  createAccountUser: (
    email: string,
    password: string,
    address1: string,
    address2: string,
    firstName: string,
    lastName: string,
  ) => void
  firstName: string
  lastName: string
  address1: string
  address2: string
  Credential: (details: Cred) => void
  user: any
  navigation: StackNavigationProp<any, any>
}

const UserSignupFinal: React.FC<Props> = props => {
  const [error, setError] = useState('')

  const {
    email,
    password,
    Credential,
    createAccountUser,
    firstName,
    lastName,
    address1,
    address2,
  } = props

  const backToLogin = () => {
    props.navigation.goBack()
  }

  useEffect(() => {
    props.resetErrorMessage()
  }, [])

  const SignUpUser = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid Email format')
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password)
    ) {
      setError(
        'Password must be at least 8 chars that contains at least one digit, an uppercase and a lowercase letter',
      )
    } else {
      setError('')
      createAccountUser(
        email,
        password,
        firstName,
        lastName,
        address1,
        address2,
      )
      props.navigation.navigate('Home')
    }
  }

  const showButton = () => {
    if (!props.loading) {
      return (
        <TouchableOpacity
          style={[GlobalStyles.buttonContainer, {flexDirection: 'row'}]}
          onPress={() => SignUpUser()}>
          <Text style={GlobalStyles.buttonText}>Sign up</Text>
          <Icon name={'account-plus'} size={30} color={Colors.mainBackground} />
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={styles.spinnerContainer}>
          <Spinner size={true} spinnerColor={Colors.mainBackground} />
        </View>
      )
    }
  }

  return (
    <ImageBackground
      source={require('../Images/Background.jpg')}
      style={styles.image}>
      <View style={GlobalStyles.headerContainer}>
        <HeaderArrow
          HeaderText={'Sign up (2 of 2)'}
          HeaderStyle={{backgroundColor: 'transparent'}}
          TextEdited={GlobalStyles.headerTextStyle}
          navigateMeBack={() => backToLogin()}
          iconName={'arrow-left'}
          iconColor={Colors.mainForeGround}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          right={<TextInput.Icon name='email' color={Colors.mainForeGround} />}
          mode='outlined'
          multiline={false}
          style={GlobalStyles.textInputContainer}
          label='Email'
          value={email}
          onChangeText={text => Credential({prop: 'email', value: text})}
          theme={textInputTheme}
        />
        <TextInput
          right={<TextInput.Icon name='lock' color={Colors.mainForeGround} />}
          mode='outlined'
          multiline={false}
          style={GlobalStyles.textInputContainer}
          label='Password'
          secureTextEntry={true}
          value={password}
          onChangeText={text => Credential({prop: 'password', value: text})}
          theme={textInputTheme}
        />
        {showButton()}
        <Text style={GlobalStyles.textMissMatch}>{error}</Text>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: wp('100%'),
    height: hp('100%')
  },
  signUp: {
    color: Colors.mainHeader,
    fontSize: hp('15%'),
    margin: hp('5%'),
  },
  spinnerContainer: {
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    margin: hp('5%'),
    backgroundColor: 'transparent',
  },
})

const mapStateToProps = ({SignInReducer}) => {
  return {
    password: SignInReducer.password,
    email: SignInReducer.email,
    firstName: SignInReducer.firstName,
    lastName: SignInReducer.lastName,
    address1: SignInReducer.address1,
    address2: SignInReducer.address2,
    user: SignInReducer.user,
    loading: SignInReducer.loading,
  }
}

export default connect(mapStateToProps, {
  Credential,
  createAccountUser,
  resetErrorMessage,
})(UserSignupFinal)
