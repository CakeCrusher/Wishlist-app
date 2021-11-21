import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native'
import { NativeBaseProvider, Text, Box, Heading, Center,NBBox, Button,
  VStack, FormControl, Input, Radio, Divider, Checkbox, AddIcon  } from 'native-base';
import { connect, Provider } from 'react-redux'
import { setCustomer } from '../redux/actions/customer';
import { StatusBar } from 'expo-status-bar';

import Layout from '../components/Layout';
import { fetchGraphQL } from '../helperFunctions';
import { SIGN_IN_CUSTOMER } from '../schemas';

const Signin = (props) => {
  const [username, setUsername] = useState('Home');
  const [password, setPassword] = useState('secret');
  
  const handleSubmit = async () => {
    const customer = await fetchGraphQL(SIGN_IN_CUSTOMER, {
      username,
      password,
    })
    console.log(customer.data.customer);
    if (customer.data.customer.length) {
      props.setCustomer(customer.data.customer[0])
      props.navigation.navigate('Wishlist')
    }
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Center>
          <Text fontSize='5xl' style={styles.text}>Wishlist</Text>
        </Center>
        <Box alignItems="flex-end" p="8">
          <VStack alignItems="flex-start" space="5" width="100%" marginBottom="5">
            <FormControl>
              <Input onChangeText={(v) => setUsername(v)} value={username} placeholder="Username" />
            </FormControl>
            <FormControl>
              <Input onChangeText={(v) => setPassword(v)} value={password} type="password" placeholder="Password" />
            </FormControl>
          </VStack>
          <Button onPress={handleSubmit} backgroundColor="#db2777" mt="2" width="100%">Sign in</Button>
        </Box>
      </View>

    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center', //Centered horizontally
    // alignItems: 'center', //Centered vertically
    flex:1
  },
  text: {
    fontWeight: 'bold',
    color: '#db2777',
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
})
const mapDispatchToProps = (dispatch) => ({
  setCustomer: (customer) => dispatch(setCustomer(customer)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signin)