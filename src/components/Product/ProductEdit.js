import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase'
import FirebaseService from '../../../services/FirebaseService';
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

key = '';
user = '';

export default class ProductEdit extends Component {
  constructor (props) {
    super(props)
    this.productId = this.props.productEditId;
    this.state = {
      nome: '',
      preco: '',
      descricao: '',
      foto: 'imageUrl'
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(userLogged => {
      const list = FirebaseService.getDataList('usuarios', function(){});

      list.orderByChild("email").equalTo(userLogged.email).on("child_added", snapshot => {
        key = snapshot.key;
        user = snapshot.val();
        product = user.produtos[this.productId];

        this.setState({
          nome: product.nome,
          preco: product.preco,
          descricao: product.descricao,
          foto: product.foto
        })
      });
    })
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  updateProduct = async() => {
    try {
      FirebaseService.updateData('usuarios/' + key + '/produtos/' + this.productId, this.state);
      alert("Atualização realizada com sucesso!")
    } catch(e){
      alert("Atualização falhou.")
    }
    goToHome();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: this.state.foto}}/>
        <View style={styles.body}>
          <Text style={styles.name}>{this.state.nome}</Text>
          <Text style={styles.info}>Preço médio: R$ {this.state.preco}</Text>
          <Text style={styles.description}>{this.state.descricao}</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder='Nome'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('nome', val)}
          value={this.state.nome}
        />
        <TextInput
          style={styles.input}
          placeholder='Preço'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('preco', val)}
          value={this.state.preco.toString()}
        />
        <TextInput
          style={styles.input}
          placeholder='Nova Descrição'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.onChangeText('descricao', val)}
          value={this.state.descricao}
        />
        <Button
          color='#239033'
          title='Salvar'
          onPress={this.updateProduct}
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
    backgroundColor: "#CD7F32",
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
