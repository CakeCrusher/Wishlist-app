import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button,
  AspectRatio, Image, Stack, HStack, MoreIcon } from 'native-base';
import { connect, Provider } from 'react-redux'
import { setCustomer } from '../redux/actions/customer';
import { setWishlist } from '../redux/actions/wishlist';


const WishlistItem = (props) => {
  


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
        <Stack space="2" style={styles.box}>
        {props.item.offers.length ? (
          <Box
          rounded="lg"
          style={styles.notification}
          >
            <Text color="white">{props.item.offers.length}</Text>
          </Box>
        ) : (<View height={1} />)}

          <Text color="gray.400">{props.item.timeCreated.split('T')[0]}</Text>
          <Text fontSize="lg" fontWeight="medium">
            {props.item.request}
          </Text>
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
    top: -5,
    right: -5,
    fontWeight: "bold",
    backgroundColor: "#db2777",
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
})

export default connect(mapStateToProps, mapDispatchToProps)(WishlistItem)