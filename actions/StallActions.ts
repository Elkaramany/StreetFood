import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Alert } from 'react-native'

interface stallArr {
  name: string
  providedPicture: boolean | null
  location: string
  vegetarian: boolean | null
  description: string
  imagePicker: string
}

export const AddStallToDB = (
  name: string,
  location: string,
  description: string,
  imagePicker: string,
  providedPicture: boolean,
  vegetarian: boolean,
) => {
  return dispatch => {
    dispatch({ type: 'flipLoading', value: true })
    firestore()
      .collection('Stalls')
      .add({
        name,
        location,
        description,
        imagePicker,
        providedPicture,
        vegetarian,
        reviews: [],
      })
      .then(() => {
        Alert.alert('Stall Added successfully')
        dispatch({ type: 'flipLoading', value: false })
      })
      .catch(err => {
        Alert.alert('Error adding the stall')
        dispatch({ type: 'flipLoading', value: false })
      })
  }
}

export const fetchAllStalls = () => {
  return dispatch => {
    firestore()
      .collection('Stalls')
      .orderBy('name')
      .get()
      .then(doc => {
        dispatch({ type: 'fetch_stalls_success', payload: doc.docs })
      })
      .catch(e => {
        Alert.alert('Error loading Stalls')
        console.log(e)
      })
  }
}

export const checkSimilarity = (allStalls: any[], name: string) => {
  return dispatch => {
    if (!allStalls || allStalls.length == 0) return false;
    if(allStalls.length == 1) return allStalls[0].data().name === name ? true : false
    dispatch({ type: 'flipLoading', value: true })
    let start = 0, end = allStalls.length - 1
    let mid = Math.floor((start + end) / 2)
    while (allStalls[mid].data().name !== name && start <= end) {
      if (name < allStalls[mid].data().name) end = mid - 1
      else start = mid + 1
      mid = Math.floor((start + end) / 2)
    }
    dispatch({ type: 'flipLoading', value: false })
    return allStalls[mid].data().name === name ? true : false
  }
}

export const writeStallReview = (review: string, docId: number, name: string,
  location: string,
  description: string,
  imagePicker: string,
  providedPicture: boolean,
  vegetarian: boolean, reviews: any[], userId: number) => {
  return dispatch => {
    reviews.push({ reviewId: userId, reviewText: review })
    firestore().collection('Stalls').doc(docId.toString())
      .set({
        name,
        location,
        description,
        imagePicker,
        providedPicture,
        vegetarian,
        reviews,
      }).then(() => {
        Alert.alert('Review added successfully')
      }).catch(() => {
        Alert.alert("Error adding the review")
      })
  }
}
