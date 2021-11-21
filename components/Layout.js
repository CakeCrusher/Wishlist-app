import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button } from 'native-base';
import { connect, Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar';



const Layout = ({children}) => {


  return (
    <View style={styles.container}>
      <StatusBar translucent={true} style="dark" />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: 50,
    paddingHorizontal: 20,
    height: '100%',
    width: '100%',
  },
  row: {
    display:'flex',
    flexDirection:'row'
  },
})

const mapStateToProps = (state) => ({
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout)