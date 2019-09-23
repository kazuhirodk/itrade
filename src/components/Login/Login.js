import React, { Component } from 'react';
import { Alert, View, Image, StyleSheet, KeyboardAvoidingView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

export default class Login extends React.Component {
  goToSignUp = () => {
    Actions.signup()
  }
  goToHome = () => {
    Actions.home()
  }

  state = {
    email: '',
    password: '',
    isAuthenticated: false,
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if(user)
        this.goToHome()    
    })
  }

  login = async () => {
    const { email, password } = this.state;

    try {
      const user = await firebase.auth()
        .signInWithEmailAndPassword(email, password);

      //this.setState({ isAuthenticated: true });
      const { currentUser } = firebase.auth()
      this.setState({ currentUser })
      this.goToHome();
      //console.log(user);
    } catch (err) {
      Alert.alert('Usuário ou senha inválida')
      console.log(err);
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../../components/images/itrade-logo.png')} />
        </View>

        <View style={styles.formContainer}>
          <TextInput style = {styles.input}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            autoCapitalize="none"
            onSubmitEditing={() => this.passwordInput.focus()}
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType="next"
            placeholder='Email'
            placeholderTextColor='#CD7F32'/>

          <TextInput style = {styles.input}
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            returnKeyType="go"
            placeholder='Senha'
            placeholderTextColor='#CD7F32'
            secureTextEntry/>

          <TouchableOpacity style={styles.buttonContainer} onPress= {this.login} >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signupButton} onPress = {this.goToSignUp} >
            <Text style={styles.signupButton}>Registre-se</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
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
