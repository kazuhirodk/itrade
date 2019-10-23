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

  const goToChat = () => {
    Actions.chat()
  }

  const showInfo = (contato) => {
    alert(contato)
  }


export default class ProductMatches extends React.Component {

    
  render() {
    return(
        <View style={styles.container}>
            {
            state.products.map((item, index) => (
            <View
              key = {item.id}
              style = {styles.product_container}
              >
              <Image style={{width: 50, height: 50}} source={item.sourceImage}/>
              <Text style = {styles.text}>
                {item.name}
              </Text>
              
              <Button
                style={styles.product_button}
                color='#4f603c'
                title='Chat'
                onPress = {goToChat}
              />
              <Button
                style={styles.product_button2}

                color='#4f603c'
                title='Contato'
                onPress = {showInfo(item.contato)}
              />
            </View>
          ))
        }
        </View>


    )
  }
}

const state = {
    products: [
      {
        id: 0,
        name: 'Product 1',
        ownwer: 'Nome1',
        contato: '8888-8888',
        sourceImage: require('../../components/images/product1.png'),
      },
      {
        id: 1,
        name: 'Product 2',
        ownwer: 'Nome2',
        contato: '9999-9999',
        sourceImage: require('../../components/images/product1.png'),
      }
    ]
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
    product_container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#FFFAFA',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    product_button: {
      //flexDirection: 'row',
      //justifyContent: 'space-around',
    },

    product_button2: {
        //flexDirection: 'row-reverse',
        //justifyContent: 'space-around',
      }
  })