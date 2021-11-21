import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView, Image, Flex } from 'react-native'
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as Location from 'expo-location';
import { connect, Provider } from 'react-redux'
import { setImageUri } from '../redux/actions/imageUri'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const TakePicture = ({setImageUri, organization, children}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [location, setLocation] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [])

  const sendPhoto = async (uri, width, height) => {
    const picture = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const payload = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      file: picture,
      orgId: organization.id
    }
    const organizationData = await axios.post('https://reservadex-api.azurewebsites.net/engine/encounter', payload)
    console.log(organizationData.data.match);
    setImageUri({imageUri: uri});
  }
  const snap = async () => {
    let photo = await ref.current.takePictureAsync();
    const uri = photo.uri;
    await sendPhoto(uri);
  };

  if (hasPermission === null || !location || (!organization.lat && organization.lat !== 0)) {
    return <Text>Loading...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
        <Camera
          style={styles.camera} type={type}
          ref={ref}
        >
          <View style={styles.overlayContainer}>
            <TouchableOpacity
            style={{...styles.button, ...styles.flip}}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
              <MaterialIcons name="flip-camera-android" size={28} color="white" />
            </TouchableOpacity>
            <View style={styles.cameraContainer}>
            <Center>
              <Button style={styles.cameraButton} onPress={snap}>
                <Entypo name="picasa" size={34} color="white" />
              </Button>
            </Center>
            </View>
            {children}
          </View>
        </Camera>
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
  overlayContainer: {
    position: 'relative',
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
  button: {
    position: 'absolute',
    bottom: 100,
    borderRadius: 10,
  },
  snap: {
    left: '50%',
  },
  flip: {
    right: 20,
    bottom: 20,
  }
})

const mapStateToProps = (state) => ({
  organization: state.organization,
  imageUri: state.imageUri,
})
const mapDispatchToProps = (dispatch) => ({
  setImageUri: (imageUri) => dispatch(setImageUri(imageUri)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TakePicture)