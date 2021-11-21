import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button, Divider, Input } from 'native-base';
import { connect, Provider } from 'react-redux'
import { setCustomer } from '../redux/actions/customer';
import { AntDesign } from '@expo/vector-icons'

import { fetchGraphQL } from '../helperFunctions';
import { GET_CUSTOMER_WISHLIST } from '../schemas';
import { setWishlist } from '../redux/actions/wishlist';
import Layout from '../components/Layout';
import WishlistItem from '../components/WishlistItem';
import { log } from 'react-native-reanimated';
import { CREATE_WISHLISTITEM_PROCESS } from '../schemas';
import * as Location from 'expo-location';
import { NavigationContainer } from '@react-navigation/native';

const Wishlist = (props) => {
  const [location, setLocation] = useState(null);
  const [request, setRequest] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    const wishlist = await fetchGraphQL(GET_CUSTOMER_WISHLIST, { customerId: props.customer.id });
    props.setWishlist(wishlist.data.wishlistItem);
    let { status } = await Location.requestForegroundPermissionsAsync();
    let _location = await Location.getCurrentPositionAsync({});
    setLocation(_location);
  }, [])
  const reload = async () => {
    const wishlist = await fetchGraphQL(GET_CUSTOMER_WISHLIST, { customerId: props.customer.id });
    props.setWishlist(wishlist.data.wishlistItem);
  }

  const onAddRequest = async () => {
    // round a float to the nearest hundredth
    console.log('adding');
    setLoading(true);
    const createWishlistItem = await fetchGraphQL(CREATE_WISHLISTITEM_PROCESS, {
      customerId: props.customer.id,
      lat: Math.round(location.coords.latitude * 100000) / 100000,
      lng: Math.round(location.coords.longitude * 100000) / 100000,
      request,
    });
    console.log('CREATING', createWishlistItem);
    const wishlist = await fetchGraphQL(GET_CUSTOMER_WISHLIST, { customerId: props.customer.id });
    console.log(wishlist);
    props.setWishlist(wishlist.data.wishlistItem);
    setLoading(false);
    setRequest('');
  }

  if (!props.wishlist.items.length) {
    return (
      <Layout>
        <View style={styles.container}>
          <Center style={styles.row}>
            <Text fontSize='3xl' style={styles.altText}>Homer's </Text>
            <Text fontSize='3xl' style={styles.text}>Wishlist</Text>
          </Center>
          <Button
            isLoading
            backgroundColor="#ffffff00"
            _spinner={{
              color: "#db2777",
            }}
          />
        </View>
      </Layout>
    )
  }

  return (
    <View style={styles.container}>
      <Center style={{...styles.row, ...styles.horPad}}>
        <Text fontSize='3xl' style={styles.altText}>Homer's </Text>
        <Text fontSize='3xl' style={styles.text}>Wishlist</Text>
      </Center>
      <Divider marginBottom={5} />
      <ScrollView width="100%">
        {
          props.wishlist.items.sort((b, a) => a.timeCreated - b.timeCreated).map((item, index) => {
            return (
              <TouchableOpacity onPress={() => props.navigation.navigate('Offers', {wishlistitemId: item.id})} key={index}>
                <WishlistItem item={item} />
              </TouchableOpacity>
            )
          })
        }
        <Center>
          <Input
            fontSize="lg"
            fontWeight="medium"
            type="text"
            w="90%"
            backgroundColor="coolGray.50"
            shadow="2"
            color="black"
            paddingLeft={5}
            InputRightElement={
              <Button isLoading={loading} size="xs" rounded="none" w="1/6" h="full"  backgroundColor="#db2777">
                <TouchableOpacity onPress={onAddRequest}>
                  <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
              </Button>
            }
            onChangeText={(v) => setRequest(v)}
            value={request}
            placeholder="Wish..."
          />
          <View margin={20}>
            <TouchableOpacity styles onPress={reload}>
              <AntDesign name="reload1" size={24} color="#00000055" />
            </TouchableOpacity>
          </View>


        </Center>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  horPad: {
    paddingHorizontal: 20
  },
  container: {
    paddingTop: 50,
    // paddingHorizontal: 20,
    // width: '100%',
  },
  altText: {
    // fontWeight: 'bold',
  },
  text: {
    fontWeight: 'bold',
    color: '#db2777',
  },
  buttonContainer: {
    height: 100,
  },
  row: {
    display:'flex',
    flexDirection:'row'
  },
})

const mapStateToProps = (state) => ({
  customer: state.customer,
  wishlist: state.wishlist,
})
const mapDispatchToProps = (dispatch) => ({
  setCustomer: (customer) => dispatch(setCustomer(customer)),
  setWishlist: (wishlist) => dispatch(setWishlist(wishlist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)