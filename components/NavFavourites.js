import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed'
import tw from 'twrnc';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';

const NavFavourites = () => {
    const data = [
        {
            id: "1",
            icon: "home",
            name: "Home",
            location: {
                lat: 51.5,
                lng: 0.1
            },
            destination: "London Eye, London, UK"
        },
        {
            id: "2",
            icon: "business",
            name: "Work",
            location: {
                lat: 51.5742,
                lng: 0.4857
            },
            destination: "Essex, UK"
        },
        {
            id: "3",
            icon: "cafe",
            location: {
                lat: 52.52,
                lng: 13.4050
            },
            name: "Cafe",
            destination: "Berlin, Germany"
        },
    ]

    const navigation = useNavigation()
    const dispatch = useDispatch()
    const route = useRoute()
  return (
    <FlatList 
        data={data}
        ItemSeparatorComponent={
        <View style={[tw`bg-gray-200`, { height: 0.5 }]}/>}
        keyExtractor={item => item.id}
        renderItem={({ item: { location, destination, icon, name } }) => (
            <TouchableOpacity 
                onPress={() => {
                    if (route?.name === 'Home') {
                        dispatch(setOrigin({
                            location: location,
                            description: destination
                        }))
                        dispatch(setDestination(null))
                    }
                    if (route?.name === 'NavigateCard') {
                        dispatch(setDestination({
                            location: location,
                            description: destination
                        }))
                    }
                    navigation.navigate('Map')
                }}
                style={tw`flex-row items-center p-5`}>
                <Icon
                    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name={icon}
                    type='ionicon'
                    color='white'
                    size={18}
                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{name}</Text>
                    <Text style={tw`text-gray-500`}>{destination}</Text>
                </View>
            </TouchableOpacity>
        )} 
    />
  )
}

export default NavFavourites