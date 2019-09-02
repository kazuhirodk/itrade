import React, { Component } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm';


class Login extends Component {
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../../components/images/itrade-logo.png')} />
        </View>

        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAFA',
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
  }
})

export default Login;
