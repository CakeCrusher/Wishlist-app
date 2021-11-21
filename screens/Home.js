import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Linking, Image } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import { connect, Provider } from 'react-redux'
import { setOrganization } from '../redux/actions/organization'
import { setImageUri } from '../redux/actions/imageUri'
import { setSpecies } from '../redux/actions/species'
import axios from 'axios'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button } from 'native-base';
import DexMap from '../components/DexMap'
import {AiFillCamera} from 'react-icons/ai'
import { Entypo } from '@expo/vector-icons';
import OssLabel from '../components/OssLabel';
import { log } from 'react-native-reanimated';

const Home = ({setOrganization, setImageUri, organization, navigation, species, setSpecies}) => {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      let _location = await Location.getCurrentPositionAsync({});
      setLocation(_location);
      setImageUri({imageUri: ''})
      setOrganization({lat: 10, lng: 10})
      const  payload = {
        lat: _location.coords.latitude,
        lng: _location.coords.longitude
      }
      const organizationData = await axios.post('https://reservadex-api.azurewebsites.net/organization/retrieve', payload)
      axios.get(`https://reservadex-api.azurewebsites.net/organization/species/${organizationData.data.id}`)
      .then(res => {
        setSpecies({species: res.data})
        console.log('Set species')
      }).catch(err => {
        console.log('err', err);
      })
      // console.log(organizationData.data);
      setOrganization(organizationData.data)
    })();
  }, []);
  if (!location) {
    return <Text style={styles.text}>Loading...</Text>;
  }

  const OssLabels = () => {
    return (
      <ScrollView>
        {species.species.map(oss => (
          <OssLabel key={oss.species.id} oss={oss} />
        ))}
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <Center style={{...styles.row, paddingTop: 40}}>
        <Image source={require('../icon.png')} style={styles.icon} />
        <Heading style={styles.brand}>
          <Text style={styles.header}>ReservaDEX</Text>
        </Heading>
      </Center>
      <Center style={{...styles.row, paddingBottom: 10}}>
        <Image source={{uri: 'https://alachuacounty.us/PublishingImages/Seal_of_Alachua_County,_Florida.png'}} style={styles.iconOrg} />
        <Heading>
          <Text style={styles.headerOrg}>{organization.name}</Text>
        </Heading>
      </Center>
      <DexMap navigation={navigation} location={location} />
      <OssLabels />
      <View style={styles.cameraContainer}>
        <Center>
          <Button style={styles.cameraButton} onPress={() => navigation.navigate('Camera')}>
            <Entypo name="camera" size={34} color="white" />
          </Button>
        </Center>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
    width: 50,
    height: 50,
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
  species: state.species,
})
const mapDispatchToProps = (dispatch) => ({
  setOrganization: (organization) => dispatch(setOrganization(organization)),
  setImageUri: (imageUri) => dispatch(setImageUri(imageUri)),
  setSpecies: (species) => dispatch(setSpecies(species)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)