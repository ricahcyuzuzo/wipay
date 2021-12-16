import * as React from 'react'
import { Dimensions, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

    const PaySuccess = ({ navigation }) => {
    return (
        <View style={{
            height: height,
            backgroundColor: '#f9f9f9'
        }}>
            <StatusBar barStyle='dark-content' backgroundColor='#fff' />

            <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 100
            }}>
                <Ionicons name="ios-checkmark-circle" size={200} color="green" />
                <Text style={{ fontSize: 20, marginTop: 100}}>Your Payment Successsul</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{
                    backgroundColor: 'green',
                    width: '90%',
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginTop: 20,
                }}>
                    <Text style={{ color: '#fff'}}>Go Back</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default PaySuccess
