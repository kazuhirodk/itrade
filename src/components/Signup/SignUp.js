import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text
} from 'react-native';

export default class SignUp extends React.Component {
  state = {
    username: '', password: '', email: '', phone_number: ''
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {
    const { username, password, email, phone_number } = this.state
    try {
      // Talvez aqui implementemos a lógica do login
      console.log('Login feito com sucesso!', success)
    } catch (err) {
      console.log('Erro no login: ', err)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro do iTrade</Text>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('email', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Telefone'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('phone_number', val)}
        />
        <Button
          color='#239033'
          title='Registrar'
          onPress={this.signUp}
        />
        <Button
          color='#EE2C2C'
          title='Cancelar'
          onPress={this.return}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#E3E1E1',
    margin: 10,
    padding: 8,
    color: '#000',
    borderRadius: 5,
    fontSize: 18,
    fontWeight: '200',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: '#CD7F32'
  }
})
