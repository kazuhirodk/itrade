/*
Requisitos funcionais:
- Como usuário do itrade, eu quero ser informado quando acabarem as possibilidades de produtos disponiveis na região ou 
quando acabarem meus limites de like

A tela deve ter:
- Quando acabarem os produtos, deverá ter um aviso informando que não há mais produtos no range escolhido
  - Quando eu alcançar o limite de likes que eu posso dar, aparecerá um aviso informando o motivo de não conseguir 
  mais continuar e me oferecerá um plano premium

Requisitos não funcionais:
A aplicação deve me dar sugestões de como prosseguir em todos os casos
*/

import React from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

const goToHome = () => {
  Actions.home()
}

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.body}>Acabaram os produtos próximos</Text>
        <Button
          color='#FD6D64'
          title='Voltar para home'
          onPress = {goToHome}
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
    alignContent: 'center',
  },
  body:{
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 40
  }
})



