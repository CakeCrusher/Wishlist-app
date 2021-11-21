import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Button, TouchableOpacity, ScrollView, Linking, Image } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { connect, Provider } from 'react-redux'
import { setOrganization } from '../redux/actions/organization'
import { setImageUri } from '../redux/actions/imageUri'
import axios from 'axios'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox } from 'native-base';
import { log } from 'react-native-reanimated';

const DexMap = ({location, organization, species, navigation, setImageUri}) => {
  
  const CustomMarker = ({encounter}) => {
    const onSelect = () => {
      console.log('PRESSED');
      setImageUri({imageUri: encounter.image})
      navigation.navigate('Camera')
    }
    return (
      <Marker 
        coordinate={{
          latitude: encounter.lat,
          longitude: encounter.lng,
        }}
        onPress={onSelect}
      >
          <View style={styles.marker}>
            <Image style={styles.pinImage} source={{uri: 'https://alachuacounty.us/PublishingImages/Seal_of_Alachua_County,_Florida.png'}} />
          </View>
      </Marker>
    )
  }

  const CustomMarkerList = () => {
    const encounters = []
    for (let i = 0; i < species.species.length; i++) {
      for (let j = 0; j < species.species[i].encounters.length; j++) {
        encounters.push(species.species[i].encounters[j])
      }
    }
    return encounters.map(encounter => <CustomMarker encounter={encounter} key={encounter.id} />)
  }
  
  return (
    <View style={styles.container}>

    <MapView
    initialRegion={{
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.02722,
      longitudeDelta: 0.01221
    }}
    style={styles.map}
    showsUserLocation={true}
    >
    <CustomMarkerList />
    {/* <Marker coordinate={{
      latitude: 29.637,
      longitude: -82.382,
    }}>
      <View style={styles.marker}>
        <Image style={styles.pinImage} source={{uri: "https://alachuacounty.us/PublishingImages/Seal_of_Alachua_County,_Florida.png"}} />
      </View>
    </Marker> */}
    </MapView>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    marginVertical:20
  },
  map: {
    width: '100%',
    height: 300,
  },
  buttonContainer: {
    height: 100,
  },
  row: {
    display:'flex',
    flexDirection:'row'
  },

  text: {
    fontSize: 20,
    color: 'white',
  },
  pinImage: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#7c83db',
  },
  header: {
    fontSize: 12,
    color: '#7c83db'
  },
  icon: {
    width: 10,
    height: 10,
  },
  headerOrg: {
  },
  iconOrg: {
    height: 40,
    width: 40,
  },
  brand: {
    paddingLeft: 10,
  }
})


const mapStateToProps = (state) => ({
  organization: state.organization,
  imageUri: state.imageUri,
  species: state.species,
})
const mapDispatchToProps = (dispatch) => ({
  setOrganization: (organization) => dispatch(setOrganization(organization)),
  setImageUri: (imageUri) => dispatch(setImageUri(imageUri)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DexMap)
