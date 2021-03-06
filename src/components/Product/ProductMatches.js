import React from "react";
import {
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from "react-native";
import { Actions } from "react-native-router-flux";
import FirebaseService from '../../../services/FirebaseService';
import firebase from 'react-native-firebase';
import DialogInput from 'react-native-dialog-input';

const state = {
  products: [],
  isVisible : false,
};

const goToChat = () => {
  Actions.chat();
};

export default class ProductMatches extends React.Component {
  showInfo = contato => {
    alert('Tel: ' + contato);
  };
  
  showDialog = (show) => {
    console.log(show)
    this.setState({isVisible: show });
  };

  sendInput = (inputText) => {
    firebase.auth().onAuthStateChanged(userLogged => {
      const list = FirebaseService.getDataList('usuarios', function(){});

      list.orderByChild("email").equalTo(userLogged.email).on("child_added", snapshot => {
        let user = snapshot.val()
        let key = snapshot.key
        FirebaseService.pushData('usuarios/'+key + '/avaliacao', inputText)
      });
    })
  };

  componentDidMount(){
    state['products'] = [];
    

    firebase.auth().onAuthStateChanged(userLogged => {
      const list = FirebaseService.getDataList('usuarios', function(){});

      list.orderByChild("email").equalTo(userLogged.email).on("child_added", snapshot => {
        let user = snapshot.val()

        var result = state['products'];
        var matches = user.matches;
        var keys = Object.keys(matches);

        keys.forEach(function(key){
          if (typeof matches[key].interestProduct !== "undefined" && matches[key].interestProduct.name !== "") {
            var index = result.findIndex( x => x.name==matches[key].interestProduct.name);

            if (index === -1) {
              result.push({id: key, name: matches[key].interestProduct.name, sourceImage: matches[key].interestProduct.sourceImage, contato:matches[key].interestProduct.contato, proprietario:matches[key].interestProduct.ownerName});
            } else console.log('object already exists')
          }
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
        {state.products.map((item, index) => (
          <View key={item.id} style={styles.product_container}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{uri: item.sourceImage}}
            />
            <Text style={styles.text}>{item.name}</Text>

            <Button
              style={styles.product_button}
              color="#4f603c"
              title="Chat"
              onPress={goToChat}
            />
            <Button
              style={styles.product_button2}
              color="#4f603c"
              title="Contato"
              onPress={() => this.showInfo(item.contato)}
            />
            <Button
              style={styles.product_button3}
              color="#4f603c"
              title="Avaliar Usuário"
              onPress={()=>this.setState({isVisible:true})}
            />

            <DialogInput isDialogVisible = {this.state.isVisible}
            title={"Avalie" + item.ownerName}
            message={"De 1 a 5, como você avalia sua experiência de troca com" + item.ownerName}
            submitInput={(inputText) => {this.sendInput(inputText)}}
            closeDialog={ () => {this.showDialog(false)}}
            />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#FFFAFA",
    alignContent: "center"
  },
  text: {
    color: "#4f603c",
    padding: 10
  },
  product_container: {
    padding: 10,
    marginTop: 3,
    backgroundColor: "#FFFAFA",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  product_button: {
    //flexDirection: 'row',
    //justifyContent: 'space-around',
  },

  product_button2: {
    //flexDirection: 'row-reverse',
    //justifyContent: 'space-around',
  }
});

// this.state.products.push({
//   name: "Product 1",
//       ownwer: "Nome1",
//       contato: "8888-8888",
//       sourceImage: require("../../components/images/product1.png")
// })
