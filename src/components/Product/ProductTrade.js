import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Image, Button, StyleSheet, Text, View } from 'react-native'
import FirebaseService from '../../../services/FirebaseService';
import firebase from 'react-native-firebase';

export default class ProductTrade extends Component {
  constructor (props) {
    super(props)
    this.state = {
      cards: [{name: 'Arraste o card para iniciar'}],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0,
      allProducts: [],
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
  }

  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
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
