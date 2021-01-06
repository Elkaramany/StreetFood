import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
 
interface Props{
 
}
 
const Name: React.FC<Props> = props =>{
    return(
        <View style={styles.container}>
            <Text>Name</Text>
        </View>
    )
}
 
const styles = StyleSheet.create({
   container:{
        flex: 1,
   }
})
 
const mapStateToProps = ({}) =>{
    return{
 
    }
}
 
export default connect(mapStateToProps, {}) (Name);