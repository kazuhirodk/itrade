import React from 'react';
import {
  View,
  Button,
  StyleSheet
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

export default class Home extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Button
          color='#FD6D64'
          title='Editar Perfil'
          onPress = {goToProfileEdit}
        />
        <Button
          color='#CD7F32'
          title='Cadastrar Produto'
          onPress = {goToProductCreate}
        />
        <Button
          color='#CD7F32'
          title='Editar Produto'
          onPress = {goToProductEdit}
        />
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
  }
})
