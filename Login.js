import React, {Component} from 'react'
import {View, Text, StyleSheet, Image,
        TouchableWithoutFeedback, StatusBar, TextInput,
        SafeAreaView, Keyboard, TouchableOpacity,
        KeyboardAvoidingView} from 'react-native'

export default class Login extends Component {
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <KeyboardAvoidingView behavior='padding' style={styles.container}>
                    <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
                        <View style = {styles.logoContainer}>
                            <View style={styles.logoContainer}>
                                <Text style={styles.title}>iTrade</Text>
                                <Text style={styles.rodape}>Registrar-se</Text>
                            </View>
                            
                        </View>
                    </TouchableWithoutFeedback>  
                    <View style={styles.infoContainer}>
                                <TextInput style={styles.input}
                                    placeholder="Nome de usuário"
                                    placeholderTextColor="rgba(255,255,255,0.8)"
                                    returnKeyType='next'
                                    autoCorrect ={false}
                                    onSubmitEditing={()=> this.refs.txtPassword.focus()}
                                />
                                <TextInput style={styles.input}
                                    placeholder="Senha"
                                    placeholderTextColor="rgba(255,255,255,0.8)"
                                    returnKeyType='go'
                                    autoCorrect ={false}
                                    secureTextEntry={true}
                                    ref={"txtPassword"}
                                />
                                <TouchableOpacity style={styles.buttonContainer}>
                                    <Text style={styles.buttonText}>LOGIN</Text>
                                </TouchableOpacity>    
                            </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(32, 53, 70)',
        flexDirection: 'column', 
        
    },
    logoContainer: {
       alignItems: 'center',
       justifyContent: 'center',
       flex:1
     
    },
   
    title:{
        fontWeight: 'bold',
        fontSize: 28,
        color: 'white', 
    },
    rodape: {
       fontWeight: 'bold',
       fontSize: 18,
       color: '#f7c744',
       textAlign: 'center', 
       marginTop: 5,
       opacity: 0.9,
       
    },
    infoContainer: {
        position:'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 200,
        padding: 20,
        //backgroundColor: 'red'
    },
    input: {
        height: 40,
        backgroundColor:'rgba(255,255,255,0.2)',
        color: "#FFF",
        marginBottom: 20,
        paddingHorizontal: 10
    },

    buttonContainer: {
        backgroundColor: '#f7c744',
        paddingVertical: 15
    },
    buttonText: {
        textAlign:'center',
        color:'black',
        fontWeight: "bold",
        fontSize: 18
        
    }

    
})