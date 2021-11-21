import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button } from 'native-base';
import { connect, Provider } from 'react-redux'
import { setCustomer } from '../redux/actions/customer';
import { setWishlist } from '../redux/actions/wishlist';
import { setOffers } from '../redux/actions/offers';


const Analysis = (props) => {
  


  return (
    <View>
      <Text>Analysis</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage)