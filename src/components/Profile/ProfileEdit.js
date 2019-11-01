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
import FirebaseService from '../../../services/FirebaseService';
import firebase from 'react-native-firebase';

const goToHome = () => {
  Actions.home()
}

export default class Profile extends Component {

  state = {
    nome_usuario: '',
    email: '',
    telefone:''
  }
  key = ''

  componentDidMount(){
    firebase.auth().onAuthStateChanged(userLogged => {
      const list = FirebaseService.getDataList('usuarios', function(){});

      list.orderByChild("email").equalTo(userLogged.email).on("child_added", snapshot => {
        let user = snapshot.val()
        this.setState({
          nome_usuario: user.nome_usuario,
          email: user.email,
          telefone: user.telefone
        })

        key = snapshot.key
      });
    })
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  updateUser = async() => {
    try {
      FirebaseService.updateData('usuarios/' + key, this.state);
      alert("Atualização realizada com sucesso!")
    } catch(e){
      alert("Atualização falhou.")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={require('../../components/images/avatar.png')}/>
        <View style={styles.body}>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('nome_usuario', val)}
          value={this.state.nome_usuario}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('email', val)}
          value={this.state.email}
        />
        <TextInput
          style={styles.input}
          placeholder='Telefone'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('telefone', val)}
          value={this.state.telefone}
        />
        <Button
          color='#239033'
          title='Salvar dados'
          onPress={this.updateUser}
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
