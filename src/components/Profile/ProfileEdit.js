import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button
} from 'react-native';

const goToHome = () => {
  Actions.home()
}

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={require('../../components/images/avatar.png')}/>
        <View style={styles.body}>
          <Text style={styles.name}>Fox Developer</Text>
          <Text style={styles.info}>Mobile Developer / UX Designer</Text>
          <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
        />
        <TextInput
          style={styles.input}
          placeholder='Telefone'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
        />
        <Button
          color='#239033'
          title='Salvar dados'
          onPress={goToHome}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFFAFA',
    alignContent: 'center'
  },
  header:{
    backgroundColor: "#FD6D64",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 40
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#CD7F32",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  input: {
    height: 40,
    backgroundColor: '#E3E1E1',
    marginBottom: 10,
    padding: 10,
    color: '#000'
  },
});
