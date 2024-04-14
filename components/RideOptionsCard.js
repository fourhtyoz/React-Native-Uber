import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react';
import tw from 'twrnc';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native'
import { selectTravelTimeInfo } from '../slices/navSlice';
import { useSelector } from 'react-redux';

const RideOptionsCard = () => {
    const navigation = useNavigation()

    const data = [
        {
            id: "Uber-X-123",
            title: "Uber X",
            multiplier: 1,
            image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberX.png",
        },
        {
            id: "Uber-X-156",
            title: "Uber XL",
            multiplier: 1.5,
            image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/UberXL.png",
        },
        {
            id: "Uber-X-146",
            title: "Uber LUX",
            multiplier: 2.5,
            image: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_485,h_385/f_auto,q_auto/products/carousel/Lux.png",
        }
    ];
    const CHARGE_RATE = 1.5;
    const getPrice = (value, multiplier) => {
        return new Intl.NumberFormat('en-gb', {
            style:'currency',
            currency: 'USD'
        }).format(value * CHARGE_RATE * multiplier / 100).replace('US', '')
    }

    const [selected, setSelected] = useState(null)

    const travelTimeInfo = useSelector(selectTravelTimeInfo)

    return (
        <SafeAreaView style={tw`bg-white flex-1`}>
            <View>
                <TouchableOpacity 
                    onPress={navigation.goBack} 
                    style={tw`absolute top-3 left-5 p-3 rounded-full z-50`}>
                    <Icon name='chevron-left' type='fontawesome' />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select a Ride - {travelTimeInfo?.distance?.text}</Text>
            </View>
            <FlatList 
                data={data}
                keyExtractor={item => item.id}
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity 
                        onPress={() => {
                            if (selected) {
                                if (selected.id === item.id) {
                                    return setSelected(null)
                                }
                            }
                            setSelected(item)
                        }}
                        style={tw`flex-row items-center justify-between px-10 ${id === selected?.id && 'bg-gray-200'}`}
                    >
                        <Image 
                            style={{
                                width: 100,
                                height: 100,
                                resizeMode: 'contain'
                            }}
                            source={{ uri: image }}
                        />
                        <View>
                            <Text style={tw`font-semibold`}>{title}</Text>
                            <Text>{travelTimeInfo?.duration?.text}</Text>
                        </View>
                        <Text>{getPrice(travelTimeInfo?.duration?.value, multiplier)}</Text>
                    </TouchableOpacity>
                )}
            />
            {selected && 
                <View style={`mt-auto border-t border-gray-200`} >
                    <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 `}>
                        <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    )
}

export default RideOptionsCard