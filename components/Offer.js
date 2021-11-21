import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button,
  AspectRatio, Image, Stack, HStack, MoreIcon } from 'native-base';
import { connect, Provider } from 'react-redux'
import { setCustomer } from '../redux/actions/customer';
import { setWishlist } from '../redux/actions/wishlist';
import { Entypo } from '@expo/vector-icons';
import { fetchGraphQL } from '../helperFunctions';
import { ACCEPT_OFFER, DECLINE_OFFER, GET_WISHLISTITEM_OFFERS } from '../schemas';
import { setOffers } from '../redux/actions/offers';

const Offer = (props) => {
  
  const B = (p) => <Text style={{fontWeight: 'bold'}}>{p.children}</Text>
  
  const declineOffer = async () => {
    const offer = await fetchGraphQL(DECLINE_OFFER, {
      offerId: props.offer.id
    })
    const _offers = await fetchGraphQL(GET_WISHLISTITEM_OFFERS, { wishlistitemId: props.offer.wishlistItem.id });
    props.setOffers(_offers.data.offers);
  }
  const acceptOffer = async () => {
    const offer = await fetchGraphQL(ACCEPT_OFFER, {
      offerId: props.offer.id
    })
    const _offers = await fetchGraphQL(GET_WISHLISTITEM_OFFERS, { wishlistitemId: props.offer.wishlistItem.id });
    props.setOffers(_offers.data.offers);
  }

  const ShowStatus = () => {
    if (props.offer.accepted) {
      return (
        <Box
        rounded="lg"
        roundedLeft="0"
        style={styles.notification}
        backgroundColor="green.400"
        >
          <Entypo name="check" size={24} color="white" />
        </Box>
      )
    }
    if (props.offer.accepted === false) {
      return (
        <Box
          rounded="lg"
          roundedLeft="0"
          style={styles.notification}
          backgroundColor="red.300"
        >
          <Entypo name="cross" size={24} color="white" />
        </Box>
      )
    }
    return null;
  }

  return (
    <Center>
      <Box
        shadow="2"
        rounded="lg"
        width="90%"
        _light={{ bg: "coolGray.50" }}
        _dark={{ bg: "gray.700" }}
        marginBottom={5}
      >
        <ShowStatus />
        <Stack space="0" style={styles.box}>

          <Text color="gray.400">{props.offer.business.category.name}</Text>
          <Text fontSize="lg" fontWeight="medium" paddingBottom='3'>
            {props.offer.business.businessName}
          </Text>
          <Text fontSize="sm">
            <B>Price:</B> ${props.offer.price}
          </Text>
          <Text fontSize="sm" paddingBottom='5'>
            <B>Deivery date:</B> {props.offer.deliveryDate}
          </Text>
          {props.offer.accepted === null ? (
            <View flexDirection="row" justifyContent="space-between">
              <Button backgroundColor='red.300' width='40%'>
                <TouchableOpacity onPress={declineOffer}>
                  <Entypo name="cross" size={24} color="white" />
                </TouchableOpacity>
              </Button>
              <Button backgroundColor='green.400' width='40%'>
                <TouchableOpacity onPress={acceptOffer}>
                  <Entypo name="check" size={24} color="white" />
                </TouchableOpacity>
              </Button>
            </View>
          ) : (null)}

        </Stack>
      </Box>
    </Center>
  )
}

const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  notification: {
    width: 30,
    height: 30,
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    position: "absolute",
    top: 0,
    right: 0,
    height: '100%',
    fontWeight: "bold",
    color: "red",
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
  setOffers: (offers) => dispatch(setOffers(offers)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Offer)