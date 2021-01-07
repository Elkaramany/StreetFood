import React, {useState, useEffect} from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native'
import {connect} from 'react-redux'
import {StackNavigationProp} from '@react-navigation/stack'
import HeaderArrow from './common/HeaderArrow'
import {GlobalStyles, Colors, textInputTheme} from './Constants'
import {writeStallReview} from '../actions'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import {TextInput} from 'react-native-paper'

interface Props {
  name: string
  location: string
  vegetarian: boolean | null
  description: string
  imagePicker: string
  reviews: any[]
  navigation: StackNavigationProp<any, any>
  route: any
  user: object
  writeStallReview: (
    review: string,
    docId: number,
    name: string,
    location: string,
    description: string,
    imagePicker: string,
    vegetarian: boolean,
    reviews: any[],
    userId: number,
  ) => void
}

const SingleStall: React.FC<Props> = props => {
  const [review, setReview] = useState('')

  const backToStalls = () => {
    props.navigation.goBack()
  }

  const singleItem = props.route.params.item.data()

  const isVegan = item => {
    if (item === true) {
      return (
        <Text style={[styles.stallName, {color: Colors.mainForeGround}]}>
          This place serves Vegetarian food
        </Text>
      )
    }
  }

  const hasPicture = (picture) => {
    if (picture && picture.length > 63 === true) {
      return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: `data:image/jpeg;base64,${picture}`}}
            style={styles.images}
          />
        </View>
      )
    } else {
      return (
        <Text style={styles.stallName}>No image available for this stall</Text>
      )
    }
  }

  const renderItem = ({item, index}) => {
    return (
      <View>
        <Text style={styles.stallName}>
          {index + 1}: {item.reviewText}
        </Text>
      </View>
    )
  }

  const hasReviews = allReviews => {
    if (!allReviews || allReviews.length == 0) {
      return (
        <Text style={styles.stallName}>
          No reviews available for this stall
        </Text>
      )
    } else {
      return (
        <View>
          <Text style={[styles.stallName, {color: Colors.mainForeGround}]}>
            Reviews:
          </Text>
          <FlatList
            data={allReviews}
            renderItem={renderItem}
            keyExtractor={stall => stall.name}
          />
          <TextInput
            mode='outlined'
            multiline={false}
            style={GlobalStyles.textInputContainer}
            label='You can type your review here'
            value={review}
            onChangeText={text => setReview(text)}
            theme={textInputTheme}
          />
        </View>
      )
    }
  }

  const addReview = (docId) => {
    if (!review || review.length < 5) {
      Alert.alert("Review can't be less than 5 chars long")
    } else {
      const {
        name,
        location,
        description,
        imagePicker,
        vegetarian,
        reviews,
      } = singleItem
      const userId = props.user.user.uid
      props.writeStallReview(
        review,
        docId,
        name,
        location,
        description,
        imagePicker,
        vegetarian,
        reviews,
        userId,
      ) 
    }
  }

  return (
    <View style={styles.container}>
      <HeaderArrow
        HeaderText={singleItem.name}
        HeaderStyle={{backgroundColor: 'transparent'}}
        TextEdited={GlobalStyles.headerTextStyle}
        navigateMeBack={() => backToStalls()}
        iconName={'arrow-left'}
        iconColor={Colors.mainForeGround}
      />
      <View style={{marginHorizontal: 15, marginVertical: 5}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.stallName, {color: Colors.mainForeGround}]}>
            Location:{' '}
          </Text>
          <Text style={styles.stallName}>{singleItem.location}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.stallName, {color: Colors.mainForeGround}]}>
            Description:{' '}
          </Text>
          <Text style={styles.stallName}>{singleItem.description}</Text>
        </View>
        {isVegan(singleItem.vegetarian)}
        {hasPicture(singleItem.imagePicker)}
        {hasReviews(singleItem.reviews)}
        <TouchableOpacity
          onPress={() => addReview(props.route.params.item.id)}
          style={GlobalStyles.buttonContainer}>
          <Text style={GlobalStyles.buttonText}>Add reviews</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  stallName: {
    fontSize: wp('4%'),
    color: 'tomato',
    marginVertical: hp('0.5%'),
  },
  images: {
    width: wp('80%'),
    height: hp('45%'),
    margin: hp('1%'),
    borderRadius: wp('5%'),
  },
})

const mapStateToProps = ({SignInReducer}) => {
  return {
    user: SignInReducer.user,
  }
}

export default connect(mapStateToProps, {writeStallReview})(SingleStall)
