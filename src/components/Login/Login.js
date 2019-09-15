import React from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';


export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  signin = async() => {
    url = 'https://10.0.2.2:3000/users?email=' + this.email + '&password=' + this.password
    axios.get(url)
    .then((res) =>{
      console.log(res),
      this.goToHome
    })
    .catch(console.error())
  }
  
  goToSignUp = () => {
    Actions.signup()
  }
  goToHome = () => {
    Actions.home()
  }
  render(){
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../../components/images/itrade-logo.png')} />
        </View>

        <View style={styles.formContainer}>
          <TextInput style = {styles.input}
            autoCapitalize="none"
            onSubmitEditing={() => this.passwordInput.focus()}
            onChangeText={(email) => this.setState({email})}
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType="next"
            placeholder='Email'
            placeholderTextColor='#CD7F32'/>

          <TextInput style = {styles.input}
            returnKeyType="go"
            ref={(input)=> this.passwordInput = input}
            onChangeText={(password) => this.setState({password})}
            placeholder='Senha'
            placeholderTextColor='#CD7F32'
            secureTextEntry/>

          <TouchableOpacity style={styles.buttonContainer} onPress = {this.signin} >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress = {this.goToSignUp} >
            <Text style={styles.signupButton}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFFAFA'
  },
  loginContainer:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    position: 'absolute',
    width: 300,
    height: 100
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
})
