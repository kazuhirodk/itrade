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

const goToProductEdit = (productId) => {
  Actions.productEdit({ productEditId: productId })
}

const goToTrade = (productId) => {
  Actions.productTrade({ offeredProductId: productId })
}

const goToMatch = () => {
  Actions.matches()
}

export default class Home extends React.Component {
  key = ''

  componentDidMount(){
    state['products'] = [];

    firebase.auth().onAuthStateChanged(userLogged => {
      const list = FirebaseService.getDataList('usuarios', function(){});

      list.orderByChild("email").equalTo(userLogged.email).on("child_added", snapshot => {
        let user = snapshot.val()

        var result = state['products'];
        var produtos = user.produtos;
        var keys = Object.keys(produtos);

        keys.forEach(function(key){
          result.push({id: key, name: produtos[key].nome, sourceImage: produtos[key].foto});
        });

        this.setState({
          products: result
        })

        key = snapshot.key
      });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {
          state.products.map((item, index) => (
            <TouchableOpacity
              key = {item.id}
              style = {styles.product_container}
              onPress = {goToProfileEdit}>
              <Image style={{width: 50, height: 50}} source={{uri: item.sourceImage}} />
              <Text style = {styles.text}>
                {item.name}
              </Text>
              <Button
                style={styles.product_button}
                color='#CD7F32'
                title='Editar'
                onPress = {() => goToProductEdit(item.id)}
              />
              <Button
                style={styles.product_button}
                color='#4f603c'
                title='Trocar'
                onPress = {() => goToTrade(item.id)}
              />
            </TouchableOpacity>
          ))
        }
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

const state = {
  products: []
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
