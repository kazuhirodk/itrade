import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Alert, Image, Button, StyleSheet, Text, View } from 'react-native'
import FirebaseService from '../../../services/FirebaseService';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

export default class ProductTrade extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: [{id: 'teste', name: 'Clique no card para iniciar'}],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      allProducts: [],
      offeredProduct: this.props.offeredProductId,
      interestedProduct: '',
      match: {
        myProduct: {
          contato: '',
          id: '',
          name: '',
          ownerName: '',
          sourceImage: ''
        },
        interestProduct: {
          contato: '',
          id: '',
          name: '',
          ownerName: '',
          sourceImage: ''
        }
      }
    }
  }

  key = ''
  user = ''

  componentDidMount(){
    firebase.auth().onAuthStateChanged(userLogged => {
      const allUsers = FirebaseService.getDataList('usuarios', function(){});

      allUsers.orderByChild("email").equalTo(userLogged.email).on("child_added", snapshot => {
        key = snapshot.key;
        user = snapshot.val();

        myProductInfo = this.state.match.myProduct;

        produto = user.produtos[this.state.offeredProduct];

        console.log(this.state)
      })

      allUsers.orderByChild("email").on("child_added", snapshot => {
        let generalUser = snapshot.val();

        if(typeof generalUser.produtos !== "undefined" && userLogged.email !== generalUser.email){
          var allProductsArray = this.state['cards'];
          var produtos = generalUser.produtos;
          var keys = Object.keys(produtos);

          keys.forEach(function(key){
            var index = allProductsArray.findIndex( x => x.id==key);

            if (index === -1) {
              allProductsArray.push({id: key, name: produtos[key].nome, sourceImage: produtos[key].foto, ownerName: generalUser.nome_usuario, ownerContact: generalUser.telefone});
            } else console.log('object already exists')
          });

          if (this.state.cards == [{id: 'teste', name: 'Clique no card para iniciar'}]){ //gambiarra monstra pra arrumar o indice, depois eu arrumo
            this.setState({
              cards: [{id: 'teste', name: 'Clique no card para iniciar'}].concat(allProductsArray)
            })
          }
        }
      })
    })
  }

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Image style={{width: 150, height: 150}} source={{uri: card.sourceImage}}/>
        <Text style={styles.text}>{card.name}</Text>
      </View>
    )
  };

  onSwiped = (type) => {
    console.log(`on swiped ${type}`)
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
    Alert.alert('Os produtos na sua região acabaram :(', 'Tente trocar novamente mais tarde');
    Actions.home();
  };

  swipeLeft = (cardIndex) => {
    this.setState({
      offeredProduct: this.state.offeredProduct,
      interestedProduct: this.state.cards[cardIndex].id,
      cardIndex: cardIndex
    })

    this.swiper.swipeLeft()
  };

  swipeRight = (cardIndex) => {
    this.setState({
      offeredProduct: this.state.offeredProduct,
      interestedProduct: this.state.cards[cardIndex].id,
      cardIndex: cardIndex
    })

    FirebaseService.pushData('likes', {produto_interesse: this.state.cards[cardIndex].id, produto_oferta: this.state.offeredProduct})

    const likesOnMe = FirebaseService.getDataList('likes', function(){});

    likesOnMe.orderByChild('produto_interesse').equalTo(this.state.offeredProduct).on('child_added', snapshot => {
      let match = snapshot.val();

      if(match.produto_oferta == this.state.cards[cardIndex].id) {
        this.setState({
          match: {
            myProduct: {
              contato: user.telefone,
              id: this.state.offeredProduct,
              name: produto.nome,
              ownerName: user.nome_usuario,
              sourceImage: produto.foto
            },
            interestProduct: {
              contato: this.state.cards[cardIndex].ownerContact,
              id: match.produto_oferta,
              name: this.state.cards[cardIndex].name,
              ownerName: this.state.cards[cardIndex].ownerName,
              sourceImage: this.state.cards[cardIndex].sourceImage
            }
          }
        })

        console.log('DADOS MATCH: ' + this.state.cards[cardIndex].ownerName);
        FirebaseService.pushData('usuarios/' + key + '/matches', this.state.match);

        Alert.alert('Você deu match!', 'Clique em OK para continuar',
          [
            {text: 'OK', onPress: () => console.log('DEU MATCH!')},
          ],
          {cancelable: false},
        )
      }
    })
  };

  render () {
    return (
      <View style={styles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          // onSwiped={() => this.onSwiped('general')}
          // onSwipedLeft={() => this.onSwiped('left')}
          onSwipedRight={this.swipeRight}
          // onSwipedTop={() => this.onSwiped('top')}
          // onSwipedBottom={() => this.onSwiped('bottom')}
          onTapCard={this.swipeLeft}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          cardVerticalMargin={80}
          renderCard={this.renderCard}
          onSwipedAll={this.onSwipedAllCards}
          stackSize={3}
          stackSeparation={15}
          overlayLabels={{
            bottom: {
              title: 'PULAR',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            },
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30
                }
              }
            },
            top: {
              title: 'SUPER LIKE',
              style: {
                label: {
                  backgroundColor: 'black',
                  borderColor: 'black',
                  color: 'white',
                  borderWidth: 1
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center'
                }
              }
            }
          }}
          animateOverlayLabelsOpacity
          animateCardOpacity
          swipeBackCard
        >
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '50%'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})
