import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button, Divider, Input } from 'native-base';
import { connect, Provider } from 'react-redux'
import { setCustomer } from '../redux/actions/customer';
import { AntDesign } from '@expo/vector-icons'

import { fetchGraphQL } from '../helperFunctions';
import { setWishlist } from '../redux/actions/wishlist';
import Layout from '../components/Layout';
import WishlistItem from '../components/WishlistItem';
import { GET_WISHLISTITEM_OFFERS } from '../schemas';
import * as Location from 'expo-location';
import { setOffers } from '../redux/actions/offers';
import Offer from '../components/Offer';

const Offers = (props) => {
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    console.log('route', props.route.params.wishlistitemId);
    const offers = await fetchGraphQL(GET_WISHLISTITEM_OFFERS, { wishlistitemId: props.route.params.wishlistitemId });
    props.setOffers(offers.data.offers);
  }, [props.route.params.wishlistitemId])

  
  if (!props.offers.offers.length) {
    return (
      <Layout>
        <View style={styles.container}>
          <Button
            backgroundColor="#ffffff00"
            width="50"
            position="absolute"
            top="55"
          >
            <TouchableOpacity>
              <AntDesign onPress={() => {
                props.setOffers([]);
                props.navigation.navigate('Wishlist')
              }} name="arrowleft" size={30} color="#db2777" />
            </TouchableOpacity>
          </Button>
          <Center style={styles.row}>
            <Text fontSize='3xl' style={styles.altText}>Homer's </Text>
            <Text fontSize='3xl' style={styles.text}>Offers</Text>
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
  // sort props.offers.offers by price
  props.offers.offers
  return (
    <View style={styles.container}>
      <Button
        backgroundColor="#ffffff00"
        width="50"
        position="absolute"
        top="55"
      >
        <TouchableOpacity>
          <AntDesign onPress={() => {
            props.setOffers([]);
            props.navigation.navigate('Wishlist')
          }} name="arrowleft" size={30} color="#db2777" />
        </TouchableOpacity>
      </Button>
      <Center style={{...styles.row, ...styles.horPad}}>
        <Text fontSize='3xl' style={styles.altText}>Homer's </Text>
        <Text fontSize='3xl' style={styles.text}>Offers</Text>
      </Center>
      <Divider marginBottom={5} />
      <ScrollView width="100%">
        {props.offers.offers.sort((a, b) => a.price - b.price).map((offer, index) => {
          return (
            <Offer offer={offer} key={index} />
          )
        })}
        {/* {
          props.offers.items.map((item, index) => {
            return (
              <Offer item={item} />
            )
          })
        }
        <Center>
          <Input
            fontSize="lg"
            fontWeight="medium"
            type="text"
            w="90%"
            marginBottom={40}
            backgroundColor="coolGray.50"
            shadow="2"
            paddingLeft={5}
            InputRightElement={
              <Button isLoading={loading} size="xs" rounded="none" w="1/6" h="full" onPress={onAddRequest} backgroundColor="#db2777">
                <TouchableOpacity>
                  <AntDesign name="plus" size={24} color="white" />
                </TouchableOpacity>
              </Button>
            }
            onChangeText={(v) => setRequest(v)}
            value={request}
            placeholder="Wish..."
          />
        </Center> */}
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
    // color: '#db2777',
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
  offers: state.offers,
})
const mapDispatchToProps = (dispatch) => ({
  setCustomer: (customer) => dispatch(setCustomer(customer)),
  setWishlist: (wishlist) => dispatch(setWishlist(wishlist)),
  setOffers: (offers) => dispatch(setOffers(offers)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Offers)