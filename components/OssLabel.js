import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button } from 'native-base';
import { connect, Provider } from 'react-redux'
import { setOrganization } from '../redux/actions/organization'
import { setImageUri } from '../redux/actions/imageUri'
import { setSpecies } from '../redux/actions/species'
import { AntDesign } from '@expo/vector-icons';
import { log } from 'react-native-reanimated';


const OssLabel = ({oss}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <TouchableOpacity onPress={() => setExpanded(!expanded)} style={{width: '100%', marginTop: 10}}>
      <Center>
        <View style={{...styles.container, ...styles.row}}>
          <Text style={{fontWeight: 'bold'}}>{oss.species.name}</Text>
          <View style={styles.row}>
            <AntDesign style={{paddingRight: 5}} name="eye" size={20} color="#7c83db" />
            <Text style={{color: '#7c83db'}}>{oss.encounters.length}</Text>
          </View>
        </View>
      </Center>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
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
})

const mapStateToProps = (state) => ({
  organization: state.organization,
  imageUri: state.imageUri,
  species: state.species,
})
const mapDispatchToProps = (dispatch) => ({
  setOrganization: (organization) => dispatch(setOrganization(organization)),
  setImageUri: (imageUri) => dispatch(setImageUri(imageUri)),
  setSpecies: (species) => dispatch(setSpecies(species)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OssLabel)