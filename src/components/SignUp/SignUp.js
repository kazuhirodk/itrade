import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text
} from 'react-native';
import firebase from "firebase";

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
      axios
      .post("https://itrade-8e6c0.firebaseio.com/usuarios.json", this.state)
      .then(response => console.log(response))
      .catch(error => console.log(error));

      console.log('Cadastro feito com sucesso!', success)
    } catch (err) {
      console.log('Erro no cadastro: ', err)
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
          onChangeText={val => this.onChangeText('nome_usuario', val)}
        />
        <TextInput
          style={styles.input}
          placeholder='Senha'
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('senha', val)}
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
          onChangeText={val => this.onChangeText('telefone', val)}
        />
        <Button
          color='#239033'
          title='Registrar'
          onPress={this.signUp}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: '#E3E1E1',
    marginBottom: 10,
    padding: 10,
    color: '#000'
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFFAFA',
    alignContent: 'center'
  },
  title: {
    fontSize: 20,
    color: '#CD7F32',
    marginBottom: 30
  }
})
