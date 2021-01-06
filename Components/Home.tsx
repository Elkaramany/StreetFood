import React, { useEffect } from 'react';
import { Text, View, ImageBackground, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { TextInput } from 'react-native-paper';
import _ from 'lodash';
import { Colors, textInputTheme, GlobalStyles } from './Constants';
import { Credential, TryLogin } from '../actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from './common/Header';
import Spinner from './common/Spinner';
import {StackNavigationProp} from '@react-navigation/stack';

interface Cred{
    prop: string,
    value: string
}

interface Props{
    navigation: StackNavigationProp<any, any>,
    user: null| object,
    errorMessage: string,
    email: string,
    password: string,
    TryLogin: (email: string, password: string) => void;
    Credential: (details: Cred) => void;
    loading: boolean;
    
}

const Home:React.FC<Props> = (props) => {

    useEffect(() => {
        if (props.user) {
            props.navigation.navigate('Menu');
        }
    }, [props.user])

    const showErrorMessage = () => {
        if (props.errorMessage) {
            return (
                <View style={{ height: 20 }}>
                    <Text style={GlobalStyles.textMissMatch}>
                        {props.errorMessage}
                    </Text>
                </View>
            )
        } else {
            return <View></View>
        }
    }

    const LoginUser = () => {
        const { email, password, TryLogin } = props;
        if (email && password) {
            TryLogin(email, password );
        } else {
            Alert.alert("Email or password can't be empty")
        }
    }

    const showButton = () => {
        if (!props.loading) {
            return (
                <TouchableOpacity style={[GlobalStyles.buttonContainer, { flexDirection: 'row' }]}
                    onPress={() => LoginUser()}
                >
                    <Text style={GlobalStyles.buttonText}>Login</Text>
                    <Icon
                        name={'login'}
                        size={30}
                        color={Colors.mainBackground}
                    />
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={styles.spinnerContainer}>
                    <Spinner size={true} />
                </View>
            )
        }
    }

    if (props.user) {
        return (
            <View style={[styles.container, {backgroundColor: Colors.mainBackground}]}>
                <Spinner size={false} />
            </View>
        )
    } else {
        const { Credential, email, password } = props;
        return (
            <View style={{flex: 1}}>
            <ImageBackground
                source={require('../Images/Background.jpg')}
                style={styles.image}
            >
                <Header HeaderText={'Street Food'} HeaderStyle={{ backgroundColor: 'transparent' }}
                    TextStyle={GlobalStyles.headerTextStyle} />
                <View style={styles.container}>
                    <TextInput
                        right={<TextInput.Icon name="email" color={Colors.mainForeGround} />}
                        mode="outlined"
                        multiline={false}
                        style={GlobalStyles.textInputContainer}
                        label="Email"
                        value={email}
                        onChangeText={text => Credential({ prop: 'email', value: text })}
                        theme={textInputTheme}
                    />
                    <TextInput
                        right={<TextInput.Icon name="lock" color={Colors.mainForeGround} />}
                        mode="outlined"
                        multiline={false}
                        style={GlobalStyles.textInputContainer}
                        label="Password"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={text => Credential({ prop: 'password', value: text })}
                        theme={textInputTheme}
                    />
                    {showButton()}
                    {showErrorMessage()}
                    <TouchableOpacity style={{ flexDirection: 'row' }}
                        onPress={() => props.navigation.navigate('UserSignup')}
                    >
                        <Text style={[styles.signUp, { color: Colors.mainHeader }]}>Don't have an accout?</Text>
                        <Text style={styles.signUp}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    }, spinnerContainer: {
        height: hp('2.5%'),
        justifyContent: 'center',
        alignItems: 'center',
        margin: hp('5%'),
    }, signUp: {
        color: Colors.mainHeader,
        fontSize: hp('2.4%'),
        margin: hp('1%')
    },
})

const mapStateToProps = ({ SignInReducer }) => {
    return {
        user: SignInReducer.user,
        email: SignInReducer.email,
        password: SignInReducer.password,
        errorMessage: SignInReducer.errorMessage,
        loading: SignInReducer.loading,
        navigated: SignInReducer.navigated,
    }
}

export default connect(mapStateToProps, { Credential, TryLogin })(Home);