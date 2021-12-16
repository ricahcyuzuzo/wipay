import React, { useEffect, useState } from 'react'
import { View, StatusBar, Text , Dimensions, Image, ScrollView, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import Avatar from './images/avatar.png';
import { FontAwesome5 } from '@expo/vector-icons';
import { firebase } from '../config/firebase.config';
import { LogBox } from 'react-native';

const { width, height} = Dimensions.get('window');

const Home = ({ navigation }) => {
    const [modalVisible1, setModalVisible1] = useState(false);
    const [orders, setOrders] = useState([]);
    const [stock, setStock] = useState();
    const [order, setOrder] = useState({});

    LogBox.ignoreLogs(['Setting a timer']);

    useEffect(() => {
        getAllOrders();
        getAllStock();
    }, []);

    const ordersRef = firebase.firestore().collection('orders');
    const stockRef = firebase.firestore().collection('stock');
    
    const getAllOrders = async () => {
        const datas = await ordersRef.get();
        setOrders((datas.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data()
            }
        })))
    }

    const getAllStock = async () => {
        const datas = await stockRef.get();
        setStock((datas.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data()
            }
        })))
    }

    return (
        <View style={{
            backgroundColor: '#f9f9f9',
            height: height
        }}>
            <StatusBar  barStyle='dark-content' backgroundColor='#fff' />
            <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                height: height,
            }}>
            <View style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginTop: 20
            }}>
                <Image 
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                    }}
                    source={Avatar}
                />
                <View>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '700',
                        marginTop: 7,
                        marginLeft: 5,
                    }}>My Wallet</Text>
                </View>
            </View>

            <View>
                <View style={{
                    backgroundColor: '#fefefe',
                    width: '90%',
                    height: 150,
                    marginTop: 50,
                    alignSelf: 'center',
                    borderRadius: 10,
                    shadowColor: "#fff",
                    shadowOffset: {
                        width: 0,
                        height: 12,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 20.00,

                    elevation: 54,
                    justifyContent: 'center',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingRight: 20,
                    }}>
                        <View style={{
                            paddingLeft: 20,
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: '700',
                                lineHeight: 30,
                            }}>Total Balance</Text>
                            <Text style={{ fontSize: 25, color: '#222', fontWeight: 'bold', lineHeight: 30,}}>122,866 RWF</Text>
                            <Text style={{color: 'green', fontSize: 16, lineHeight: 30,}}>Amount Secured</Text>
                        </View>
                        <FontAwesome5 name="wallet" size={70} color="#eac18d" style={{ marginTop: 10}} />
                    </View>
                </View>

                <Text style={{marginTop: 30, fontSize: 18, marginLeft: 20, fontWeight: '700', color: '#222'}}>Payment Requests</Text>
                <View style={{
                    height: 3,
                    width: 70,
                    backgroundColor: 'orange',
                    marginLeft: 20,
                    marginTop: 5
                }}></View>
                <View style={{
                    marginTop: 20,
                    marginBottom: 80,
                }}>
                    {
                        orders.length > 0 ? orders.map((items, idx) => (
                            <TouchableOpacity key={idx} onPress={() => {
                                setModalVisible1(!modalVisible1)
                                setOrder(items);
                            }} style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: '#fff',
                                marginLeft: 20,
                                marginTop: 10,
                                padding: 10,
                                width: '90%',
                                borderRadius: 10,
                                shadowColor: "#fff",
                                shadowOffset: {
                                    width: 0,
                                    height: 12,
                                },
                                shadowOpacity: 0.8,
                                shadowRadius: 20.00,

                                elevation: 54,
                            }}>
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight:'bold'}}>{items.data.name}</Text>
                                </View>
                                <View>
                                    <Text>{items.data.amount} RWF</Text>
                                    <Text style={{
                                        color: items.data.status === 'pending' ? 'orange' : 'green'
                                    }}>{items.data.status === 'pending' ? 'Pending' : 'Paid'}</Text>
                                </View>
                            </TouchableOpacity>
                        )): <Text style={{
                            marginLeft: 20,
                        }}>Loading...</Text>
                    }
                </View>
            </View>
            </ScrollView>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible1}
                onRequestClose={() => setModalVisible1(!modalVisible1)}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 18,
                            marginBottom: 30,
                            marginTop: 20
                        }}>Pay</Text>
                        <View>
                            <Text style={{
                                fontSize: 18,
                            }}>Product: <Text style={{fontWeight: 'bold'}}>{order?.data?.name}</Text></Text>
                            <Text style={{
                                fontSize: 18,
                            }}>Amount: <Text style={{ fontWeight: 'bold'}}>{order?.data?.amount} RWF</Text></Text>
                        </View>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: 10,
                            paddingRight: 10,
                            marginTop:30,
                        }}>
                            <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)} style={{
                                backgroundColor: '#dc3545',
                                borderRadius: 10,
                                width: '40%',
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 20,
                                }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                getAllStock();
                                ordersRef.doc(order.id).update({status: 'paid'}).then(() => {
                                    setModalVisible1(!modalVisible1)
                                    getAllOrders();
                                    const newNumber = stock[0].data.stock - 1;
                                    stockRef.doc('fGJdvwiOLDqzqC35KLuo').update({stock: newNumber}).then(() => {
                                        getAllStock();
                                        navigation.navigate('Pay');
                                    })
                                });
                            }} style={{
                                backgroundColor: '#6ab2ff',
                                borderRadius: 10,
                                width: '40%',
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 20,
                                }}>Pay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: height
      },
      modalView: {
        width: '80%',
        height: height - 400,
        margin: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})
