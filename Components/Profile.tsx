import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {StackNavigationProp} from '@react-navigation/stack'

interface Props {
  navigation: StackNavigationProp<any, any>
}

const Profile: React.FC<Props> = props => {
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Menu')}>
        <Text> this is the profile page</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile
