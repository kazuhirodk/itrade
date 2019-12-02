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

const seeMatches = (key) => {
    Actions.matches({ productId: key })
}

export default class ProductMatchesCount extends React.Component {

    componentDidMount() {
        state['products'] = [];
        var result = state['products'];
        const email = this.props.email;
        const list = FirebaseService.getDataList('usuarios', function () { })

        list.orderByChild("email").equalTo(email).on("child_added", snapshot => {
            let user = snapshot.val()
            var produtos = user.produtos
            var matches = user.matches

            if (matches == undefined)
                result = []

            else {

                var keys = Object.keys(produtos);
                keys.forEach(function (key) {
                    produtos[key].matchCount = 0

                    Object.keys(matches).forEach(function (id) {
                        if (matches[id].myProduct.id == key)
                            produtos[key].matchCount++
                    })
                })

                keys.forEach(function (key) {
                    if (produtos[key].matchCount > 0) {
                        result.push({ id: key, name: produtos[key].nome, sourceImage: produtos[key].foto, matchCount: produtos[key].matchCount })
                    }
                })

                this.setState({
                    products: result
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {state.products.map((item, index) => (
                    <View key={item.id} style={styles.product_container}>
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={{ uri: item.sourceImage }}
                        />
                        <Text style={styles.text}>{item.name} - {item.matchCount} matches</Text>

                        <Button
                            style={styles.product_button2}
                            color="#4f603c"
                            title="Visualizar"
                            onPress={() => seeMatches(item.id)}
                        />
                    </View>
                ))}
            </View>
        );
    }
}

const state = {
    products: []
};

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
