import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system'
import { useNavigation } from '@react-navigation/native'
import TakePicture from '../components/TakePicture';
import ShowPictureWInfo from '../components/ShowPictureWInfo';
import { connect, Provider } from 'react-redux'
import { setImageUri } from '../redux/actions/imageUri'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button } from 'native-base';
import { Entypo } from '@expo/vector-icons';

const CameraPage = ({organization, imageUri, navigation}) => {
  console.log('imageUri', imageUri.imageUri);
  return (
    <View style={styles.container}>
      {imageUri.imageUri ? (
      <ShowPictureWInfo >
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.headerContainer}>
        <Center style={{...styles.row, paddingBottom: 10}}>
          <Image source={{uri: 'https://alachuacounty.us/PublishingImages/Seal_of_Alachua_County,_Florida.png'}} style={styles.iconOrg} />
          <Heading>
            <Text style={styles.headerOrg}>{organization.name}</Text>
          </Heading>
        </Center>
        </TouchableOpacity>
        <Text style={styles.text}>Hello</Text>
        <Text style={styles.text}>Hello</Text>
      </ShowPictureWInfo>
      ) : (
      <TakePicture>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.headerContainer}>
        <Center style={{...styles.row, paddingBottom: 10}}>
          <Image source={{uri: 'https://alachuacounty.us/PublishingImages/Seal_of_Alachua_County,_Florida.png'}} style={styles.iconOrg} />
          <Heading>
            <Text style={styles.headerOrg}>{organization.name}</Text>
          </Heading>
        </Center>
        </TouchableOpacity>

      </TakePicture>
      )}
    </View>
  )
}

const styles = StyleSheet.create({

  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 40,
  },
  container: {
    height: '100%',
    width: '100%',
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  row: {
    display:'flex',
    flexDirection:'row'
  },
  headerOrg: {
    textDecorationLine: 'underline',
  },
  iconOrg: {
    height: 40,
    width: 40,
  },
})

const mapStateToProps = (state) => ({
  organization: state.organization,
  imageUri: state.imageUri,
})
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraPage)
