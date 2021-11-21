import React, { useState, useEffect, Children } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import { connect, Provider } from 'react-redux'
import { setImageUri } from '../redux/actions/imageUri'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button } from 'native-base';
import { Entypo } from '@expo/vector-icons';

const ShowPictureWInfo = ({imageUri, setImageUri, organization,species,children}) => {
  const findSpecies = () => {
    let outer = null
    let inner = null
    for (let animal = 0; animal < species.species.length; animal++) {

      for (let encounter = 0; encounter < species.species[animal].length; encounter++) {
        if (species.species[animal].encounters[encounter].image === setImageUri.setImageUri) {
          outer = species.species[animal]
          inner = species.species[animal].encounters[encounter]
        }
      }
    }
    return {outer, inner}
  }
  const foundSpecies = findSpecies()
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri.imageUri }} style={styles.image} />
      <View style={styles.childrenContainer}>
        {children}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.containerBox}>
          <Text style={{fontWeight: 'bold'}}>{species.species[0].name}</Text>
        </View>
      </View>
      <View style={styles.cameraContainer}>
        <Center>
          <Button style={styles.cameraButton} onPress={() => setImageUri({imageUri: null})}>
            <Entypo name="camera" size={34} color="white" />
          </Button>
        </Center>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    top: 100,
    left: 0,
  },
  containerBox: {
    width: '90%',
    backgroundColor: '#b3bef6',
    borderBottomWidth:3,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: '#7c83db',
    justifyContent: 'space-between',
    borderRadius: 3,
  },
  row: {
    display:'flex',
    flexDirection:'row'
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    width: '100%',
  },
  cameraButton: {
    borderRadius: 10,
    width: 70,
    height: 55,
    backgroundColor: '#7c83db'
  },
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  childrenContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  retake: {
    right: 0, 
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'red',
    opacity: 0.8,
    borderRadius: 10,
  },
  snap: {
    left: '50%',
  },
  flip: {
    right: 0,
  }
})

const mapStateToProps = (state) => ({
  organization: state.organization,
  imageUri: state.imageUri,
  species: state.species,
})
const mapDispatchToProps = (dispatch) => ({
  setImageUri: (imageUri) => dispatch(setImageUri(imageUri)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPictureWInfo)