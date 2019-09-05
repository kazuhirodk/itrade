import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Button, StyleSheet, StatusBar } from 'react-native';

class LoginForm extends Component {
  render() {
    return (
      <View style={StyleSheet.container}>
        <TextInput style = {styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => this.passwordInput.focus()}
          autoCorrect={false}
          keyboardType='email-address'
          returnKeyType="next"
          placeholder='Email'
          placeholderTextColor='#CD7F32'/>

        <TextInput style = {styles.input}
          returnKeyType="go"
          ref={(input)=> this.passwordInput = input}
          placeholder='Senha'
          placeholderTextColor='#CD7F32'
          secureTextEntry/>

        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButton}>Registre-se</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input:{
    height: 40,
    backgroundColor: '#E3E1E1',
    marginBottom: 10,
    padding: 10,
    color: '#000'
  },
  buttonContainer:{
    backgroundColor: '#FD6D64',
    paddingVertical: 15,
    marginBottom: 10
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  signupButton:{
    marginBottom: 20,
    textAlign: 'center',
    color: '#CD7F32'
  }
});

export default LoginForm;
