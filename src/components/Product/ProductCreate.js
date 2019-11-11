import React from "react";
import ImagePicker from "react-native-image-picker";
import { View, Button, TextInput, StyleSheet, Text } from "react-native";
import firebase from 'react-native-firebase'
import FirebaseService from '../../../services/FirebaseService';

const options = {
  title: "Foto do Produto",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
}

export default class ProductCreate extends React.Component {
  state = {
    name: '',
    description: '',
    price: 0,
    owner_email: ''
  }

  key = ''

  componentDidMount() {
    firebase.auth().onAuthStateChanged(userLogged => {
      const list = FirebaseService.getDataList('usuarios', function(){});
      list.orderByChild("email").equalTo(userLogged.email).on("child_added", snapshot => {
        key = snapshot.key
      });
    })
  }

  onChangeText = (key, val) => {
    this.setState({[key]: val})
  }

  create = async () => {
    const imagePath = this.state.foto.path;
    const ref = firebase.storage().ref('/' + this.state.foto.fileName)

    ref.getDownloadURL().then((url) => {
      this.setState({'foto': url})
      try{
        let id = FirebaseService.pushData('usuarios/' + key + '/produtos', this.state)
        alert('Produto cadastrado com sucesso!')
        //limpar tela
      }
      catch(e){
        alert('Falha ao cadastrar produto.' + e)
      }
    })
    const uploadTask = ref.putFile(imagePath);
    // .on observer is completely optional (can instead use .then/.catch), but allows you to
    // do things like a progress bar for example
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
      // observe state change events such as progress
      // get task progress, including the number of bytes uploaded and the total number of    bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);

      switch (snapshot.state) {
        case firebase.storage.TaskState.SUCCESS: // or 'success'
          console.log('Upload is complete');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      console.error(error);
    })
  }

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
        const source = { uri: response.uri, path: response.path, fileName: response.fileName };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          foto: source
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
          onChangeText={val => this.onChangeText('name', val)}
        />
        <TextInput
          style={styles.descript}
          placeholder="Descrição"
          autoCapitalize="none"
          placeholderTextColor="#CD7F32"
          onChangeText={val => this.onChangeText('description', val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          autoCapitalize="none"
          keyboardType="numeric"
          placeholderTextColor="#CD7F32"
          onChangeText={val => this.onChangeText('price', val)}
        />

        <Button style={styles.button}
            color="#239033"
            title="Adicionar Foto"
            onPress={this.uploadImg}

        />

        <Button
          color="#239033"
          title="Cadastrar"
          onPress={this.create}
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
