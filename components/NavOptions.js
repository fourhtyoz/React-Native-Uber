import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { Icon } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'
import { selectOrigin } from '../slices/navSlice';
import { useSelector } from 'react-redux';

const NavOptions = () => {
    const navigation = useNavigation()

    const data = [
        {
            id: "12",
            title: "Get a ride",
            image: "https://links.papareact.com/3pn",
            screen: "Map"
        },
        {
            id: "123",
            title: "Order food",
            image: "https://links.papareact.com/28w",
            screen: "Map"
        }
    ];

    const origin = useSelector(selectOrigin)

    return (
        <FlatList 
            data={data} 
            horizontal
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
            <TouchableOpacity
                disabled={!origin}
                onPress={() => navigation.navigate(item.screen)}
                style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
            >
                <View style={tw`${!origin && 'opacity-20'}`}>
                    <Image 
                        style={{
                            height: 120,
                            width: 120,
                            resizeMode: 'contain'
                        }}
                        source={{
                            uri: item.image
                        }}
                    />
                    <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                    <Icon
                        style={tw`p-2 bg-black rounded-full w-10 mt-4`} 
                        type='antdesign' 
                        name='arrowright' 
                        color='#ffffff'/>
                </View>
            </TouchableOpacity>    
        )}/>
    )
}

export default NavOptions