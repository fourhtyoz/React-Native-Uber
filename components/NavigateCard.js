import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native'
import NavFavourites from './NavFavourites';
import { Icon } from '@rneui/themed';



const NavigateCard = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning!</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete
                enablePoweredByContainer={false}
                styles={{
                    container: {
                        backgroundColor: 'white',
                        paddingTop: 20,
                        flex: 0
                    },
                    // textInputContainer: {
                    //     backgroundColor: 'gray',
                    //     paddingHorizontal: 10,
                    //     paddingBottom: 0
                    // },
                    // textInput: {
                    //     height: 38,
                    //     borderRadius: 0,
                    //     fontSize: 18,
                    //     height: 45,
                    //     borderWidth: 1
                        
                    // }
                }}
                onPress={(data, details = null) => {
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description
                    }))
                    navigation.navigate('RideOptionsCard')
                }}
                fetchDetails={true}
                placeholder='Where to?'
                nearbyPlacesAPI='GooglePlacesSearch'
                debounce={400} 
                query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en'
                }}
            />
        </View>
        <NavFavourites />
      </View>
      <View style={tw`flex-row bg-white justify-evenly p-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity
            onPress={() => navigation.navigate('RideOptionsCard')}
            style={tw`flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
        >
            <Icon name='car' type='font-awesome' color='white' size={16} />
            <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            onPress={() => navigation.navigate('RideOptionsCard')}
            style={tw`flex flex-row justify-between bg-white w-24 px-4 py-3 rounded-full border border-gray-100`}
        >
            <Icon name='fast-food-outline' type='ionicon' color='black' size={16} />
            <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard