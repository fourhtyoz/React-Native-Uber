import { View, Text, SafeAreaView, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';


const HomeScreen = () => {
    const dispatch = useDispatch()
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
            <Image 
                source={{
                    uri: 'https://links.papareact.com/gzs'
                }}
                style={{
                    left: 10,
                    width: 100,
                    height: 100,
                    resizeMode: 'contain'
                }}
            />
        <GooglePlacesAutocomplete
            styles={{
                container: {
                    flex: 0
                },
                textInput: {
                    fontSize: 18
                }
            }}
            query={{
                key: GOOGLE_MAPS_APIKEY,
                language: 'en'
            }}
            onPress={(data, details = null) => {
                dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description
                }))
                dispatch(setDestination(null))
            }}
            
            minLength={2}
            returnKeyType={'search'}
            fetchDetails={true}
            placeholder='Where From?'
            debounce={400}
            nearbyPlacesAPI='GooglePlacesSearch'
        />
            <NavOptions />
            <NavFavourites />
        </View>
    </SafeAreaView>
  )
}

export default HomeScreen