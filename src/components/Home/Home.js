import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import FirebaseService from '../../../services/FirebaseService';
import firebase from 'react-native-firebase';

const goToProfileEdit = () => {
  Actions.profileEdit()
}

const goToProductCreate = () => {
  Actions.productCreate()
}

const goToProductEdit = () => {
  Actions.productEdit()
}

const goToTrade = () => {
  Actions.productTrade()
}

const goToMatch = () => {
  Actions.matches()
}

export default class Home extends React.Component {
  state = {
    products: [],
    showEdit: false
  }
  toggleEdit()
    {
      this.setState({
        showEdit:!this.state.showEdit
      })
    }
  key = ''
  
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged(userLogged => {
      const list = FirebaseService.getDataList('usuarios', function(){});

      list.orderByChild("email").equalTo(userLogged.email).on("child_added", snapshot => {
        let user = snapshot.val()

        var result = state['products'];
        var produtos = user.produtos;
        var keys = Object.keys(produtos);

        keys.forEach(function(key){
          result.push({id: key, name: produtos[key].nome, sourceImage: produtos[key].foto, description: produtos[key].descricao, price: produtos[key].preco });
        });

        this.setState({
          products: result
        })

        key = snapshot.key
      });
    })
  }
  updateProduct = async() => {
    try {
      FirebaseService.updateData('usuarios/' + key, this.state.products);
      alert("Edição realizada com sucesso!")
    } catch(e){
      alert("Atualização falhou.")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          
          state.products.map((item, index) => (
            <TouchableOpacity
              key = {item.id}
              style = {styles.product_container}
              onPress = {this.toggleEdit}>
              <Image style={{width: 50, height: 50}} source={{uri: item.sourceImage}} />
              <Text style = {styles.text}>
                {item.name}
              </Text>
              <Button
                style={styles.product_button}
                color='#CD7F32'
                title='Editar'
                onPress = {this.toggleEdit}
              />

              {
              this.state.showEdit?
              <div>
              <TextInput
          style={styles.input}
          placeholder='Nome'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.setState(products[key].name, val)}
          value={item.name}
        />
        <TextInput
          style={styles.input}
          placeholder='Preço'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.setState(products[key].price, val)}
          value={item.price}
        />
        <TextInput
          style={styles.input}
          placeholder='Telefone'
          autoCapitalize="none"
          placeholderTextColor='#CD7F32'
          onChangeText={val => this.setState(products[key].description, val)}
          value={item.description}
        />
        <Button
          color='#239033'
          title='Salvar edição'
          onPress={this.updateProduct}
          />
          </div>
          : null
          }
          
        }

              <Button
                style={styles.product_button}
                color='#4f603c'
                title='Trocar'
                onPress = {goToTrade}
              />
            </TouchableOpacity>
          ))
        
    <View style = {styles.buttons}>
        <Button
          color='#CD7F32'
          title='Cadastrar Produto'
          onPress = {goToProductCreate}
        />

        <Button
          color='#FD6D64'
          title='Editar Perfil'
          onPress = {goToProfileEdit}
        />

        <Button
          color='#CD7F32'
          title='Ver Matches'
          onPress = {goToMatch}
        />
        </View>
      </View>
    )
  }
}




const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFFAFA',
    alignContent: 'center'
  },
  text: {
    color: '#4f603c',
    padding: 10
  },
  buttons: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  product_container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#FFFAFA',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  product_button: {

    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
})
