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

const getUnique = (arr, comp) => {

  const unique = arr
    .map(e => e[comp])

  // store the keys of the unique objects
  .map((e, i, final) => final.indexOf(e) === i && i)

  // eliminate the dead keys & store unique objects
  .filter(e => arr[e]).map(e => arr[e]);

  return unique;
}

export default class Home extends React.Component {
  key = ''

  componentDidMount(){
    firebase.auth().onAuthStateChanged(userLogged => {
      const products = FirebaseService.getDataList('produtos', function(){});

      products.orderByChild("owner_email").equalTo(userLogged.email).on("child_added", snapshot => {
        let product = snapshot.val();

        product_array = state['products']
        var index = product_array.findIndex( x => x.id==snapshot.key);

        if (index === -1) {
          product_array.push({id: snapshot.key, name: product.name, sourceImage: require('../../components/images/product1.png')});
        } else console.log('object already exists')

        this.setState({products: product_array })
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
              <Image style={{width: 50, height: 50}} source={item.sourceImage}/>
              <Text style = {styles.text}>
                {item.name}
              </Text>
              <Button
                style={styles.product_button}
                color='#CD7F32'
                title='Editar'
                onPress = {goToProductEdit}
              />
              <Button
                style={styles.product_button}
                color='#4f603c'
                title='Trocar'
                onPress = {goToTrade}
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
