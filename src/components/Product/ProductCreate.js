import React from "react";

import ImagePicker from "react-native-image-picker";

import { View, Button, TextInput, StyleSheet, Text } from "react-native";

const options = {
  title: "Foto do Produto",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

export default class ProductCreate extends React.Component {
  /* state = {
      username: '', password: '', email: '', phone_number: ''
    }
    onChangeText = (key, val) => {
      this.setState({ [key]: val })
    }
    signUp = async () => {
      const { username, password, email, phone_number } = this.state
      try {
        // Talvez aqui implementemos a lógica do login
        console.log('Login feito com sucesso!', success)
      } catch (err) {
        console.log('Erro no login: ', err)
      }
    } */

  uploadImg = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source
        });
      }
    });
  }; 

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro do Produto</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Produto"
          autoCapitalize="none"
          placeholderTextColor="#CD7F32"
          //onChangeText={val => this.onChangeText('username', val)}
        />
        <TextInput
          style={styles.descript}
          placeholder="Descrição"
          autoCapitalize="none"
          placeholderTextColor="#CD7F32"
          //onChangeText={val => this.onChangeText('password', val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          autoCapitalize="none"
          keyboardType="numeric"
          placeholderTextColor="#CD7F32"
          // onChangeText={val => this.onChangeText('email', val)}
        />

        <Button style={styles.button}
            color="#239033"
            title="Adicionar Foto"
            onPress={this.uploadImg}

        />

        <Button
          color="#239033"
          title="Cadastrar"
          //onPress={this.signUp}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: "#E3E1E1",
    marginBottom: 10,
    padding: 10,
    color: "#000"
  },
  descript: {
    height: 100,
    backgroundColor: "#E3E1E1",
    marginBottom: 10,
    padding: 10,
    alignContent: "center",
    color: "#000"
  },
  button: {
    marginBottom: 10,
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#FFFAFA",
    alignContent: "center"
  },
  title: {
    fontSize: 20,
    color: "#CD7F32",
    marginBottom: 30
  }
});
