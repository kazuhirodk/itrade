import React from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  Picker
} from 'react-native';

import FirebaseService from '../../../services/FirebaseService';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

export default class SignUp extends React.Component {
  /*conforme conversamos, os produtos vao ser salvos dentro de uma lisa dentro do usuario*/
  state = {
    nome_usuario: '', senha: '', email: '', telefone: '', plano: '', likes: '', produtos: []
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  signUp = async () => {  
    try {
      await firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.senha)
        .then((res) => {       
          const newid = FirebaseService.pushData('usuarios', this.state);
          alert('Cadastro feito com sucesso!')
          Actions.login()
        }).catch(error => this.setState({ errorMessage: error.message }))    
    }    
    catch (err) {
      alert('Erro no cadastro: ', err)
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
        <Picker
        selectedValue={this.state.plano}
        style={{height: 50, width: 100}}
        onValueChange={(itemValue, itemIndex) => {
         /* Seta o numero de likes para 5 se for plano free*/
          if(itemValue == 'Free'){
          this.setState({plano: itemValue, likes:'5'})
          }
          this.setState({plano: itemValue, likes:'ilimitado'})
        } 
        }>
      
        <Picker.Item label="Free" value="Free" />
        <Picker.Item label="Premium" value="Premium" />
        </Picker>
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
