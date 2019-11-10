import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Alert, Image, Button, StyleSheet, Text, View } from 'react-native'
import FirebaseService from '../../../services/FirebaseService';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';

const goToChat = () => {
  console.log('GO TO CHAT!')
  Actions.chat()
}



export default class ProductTrade extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: [{id: 'teste', name: 'Clique no card para iniciar'}],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      allProducts: [],
      offeredProduct: '',
      interestedProduct: '',
    }
  }

  key = ''

  componentDidMount(){
    firebase.auth().onAuthStateChanged(userLogged => {
      const allUsers = FirebaseService.getDataList('usuarios', function(){});

      allUsers.orderByChild("email").on("child_added", snapshot => {
        let user = snapshot.val();

        if(typeof user.produtos !== "undefined" && userLogged.email !== user.email){
          var allProductsArray = this.state['cards'];
          var produtos = user.produtos;
          var keys = Object.keys(produtos);

          keys.forEach(function(key){
            var index = allProductsArray.findIndex( x => x.id==key);

            if (index === -1) {
              allProductsArray.push({id: key, name: produtos[key].nome, sourceImage: produtos[key].foto});
            } else console.log('object already exists')
          });

          this.setState({
            cards: allProductsArray
          })
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

    this.setState({
      offeredProduct: '-Lp-AfESnxj2hc3XnSj3',
      interestedProduct: this.state.cards[this.state.cardIndex].id
    })

    // console.log('INDEX: ' + this.state.cardIndex)
    // console.log('PRODUCT ID MATCH: ' + this.state.interestedProduct)
    // console.log('PRODUCT NAME: ' + this.state.cards[this.state.cardIndex].name)

    if(type === 'right'){
      FirebaseService.pushData('matchs', {produto_interesse: this.state.interestedProduct, produto_oferta: this.state.offeredProduct})

      const matchsWithMe = FirebaseService.getDataList('matchs', function(){});

      matchsWithMe.orderByChild('produto_interesse').equalTo(this.state.offeredProduct).on('child_added', snapshot => {
        let match = snapshot.val();
        if(match.produto_oferta == this.state.interestedProduct) {
          Alert.alert('Você deu match!', 'Clique em OK para continuar',
            [
              {text: 'OK', onPress: () => console.log('DEU MATCH!')},
            ],
            {cancelable: false},
          )
          // goToChat;
        }
      })
    }

    this.setState({
      cardIndex: this.state.cardIndex + 1
    })
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
    Alert.alert('Os produtos na sua região acabaram :(', 'Tente trocar novamente mais tarde');
    Actions.home();
  };

  swipeLeft = () => {
    this.setState({
      offeredProduct: '-Lp-AfESnxj2hc3XnSj3',
      interestedProduct: this.state.cards[this.state.cardIndex].id
    })

    this.setState({
      cardIndex: this.state.cardIndex + 1
    })

    this.swiper.swipeLeft()
  };

  render () {
    return (
      <View style={styles.container}>
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          onSwiped={() => this.onSwiped('general')}
          onSwipedLeft={() => this.onSwiped('left')}
          onSwipedRight={() => this.onSwiped('right')}
          onSwipedTop={() => this.onSwiped('top')}
          onSwipedBottom={() => this.onSwiped('bottom')}
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
          <Button onPress={() => this.swiper.swipeBack()} title='Desfazer ação' />
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
