import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Select extends React.Component{
  state = {
    counter: 0,
  }

  goToProdutosExpirados = () =>{
    Actions.produtosExpirados()
  }

  goToLikesExpirados = () =>{
    Actions.likesExpirados()
  }
  
  likeCounter = () => {
    this.state.counter = this.state.counter + 1
    console.log(this.state.counter)
    if (this.state.counter >= 5){
      this.goToLikesExpirados()
    }
  }  
    
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image style={styles.produto} source={require('../../components/images/product1.png')}/>
          <Button
            color='#FD6D64'
            title='Não'
            onPress = {this.goToProdutosExpirados}
          />
          <Button
            color='#FD6D64'
            title='Sim'
            onPress = {this.likeCounter}
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
  produto: {
    width: 300,
    height: 300,
    borderRadius: 50,
    borderWidth: 4,
    alignSelf:'center',
    marginTop:10,
    marginBottom: 100,
  }
})
