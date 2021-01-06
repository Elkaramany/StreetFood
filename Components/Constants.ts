import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Dimensions, Platform, StyleSheet} from 'react-native';

const WIDTH: number = Dimensions.get('window').width;

const Colors = {
    mainBackground: '#fffff0',
    mainForeGround: '#216FD7',
    mainFooter: '#FFD700',
    gray: '#808080',
    brightRed: '#a35d6a',
    mainHeader: '#3b2e5a',
}

const GlobalStyles = StyleSheet.create({
    textInputContainer: {
        marginBottom: hp('3%'),
        width: '90%',
        borderRadius: wp('50%'),
    }, headerTextStyle: {
        color: Colors.mainForeGround,
        fontSize: hp('3.5%'),
        fontWeight: 'bold'
    },buttonContainer:{
        backgroundColor: Colors.mainForeGround,
        justifyContent: 'center',
        alignItems: 'center',
        padding: wp('1.3%'),
        borderRadius: wp('3%'),
        margin: hp('2%'),
    },buttonText:{
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        color: Colors.mainBackground
    },textMissMatch: {
        color: Colors.gray,
        fontSize: wp('3%'),
        fontWeight: 'bold',
        textAlign: 'center'
    },headerContainer:{
        height: hp('20%')
    }
})

const textInputTheme = {
    colors: {
        placeholder: Colors.mainForeGround, text: Colors.mainForeGround, primary: Colors.mainForeGround,
        underlineColor: Colors.mainForeGround, background: Colors.mainBackground
    }
}

export { Colors, textInputTheme, GlobalStyles };