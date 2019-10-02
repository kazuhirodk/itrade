import React from 'react';
import {
  View,
  Button,
  StyleSheet,
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
          <Button
            color='#FD6D64'
            title='Não'
            onPress = {this.goToProdutosExpirados}
          />
        </View>
        <View>
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
  }
})
