import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import firebase from 'react-native-firebase';
import { Image, Button, Alert, StyleSheet, Text, View } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { firebaseAuth } from '../../../firebase';

export default class ProductTrade extends Component {
  likes = firebase.auth().currentUser.likes;
  constructor (props) {
    super(props)
    this.state = {
      cards: ['produto 1', 'produto 2'],
      swipedAllCards: false,
      swipeDirection: '',
      cardIndex: 0
      
    }
  }
  /**
   * Decresce o numero de likes do usuario
   */
  const decreaselikes = () => {
    likes = likes -1;
    if(likes==0){
    alert.alert('Seus likes acabaram :(', 'Experimente fazer upgrade de plano e troque sem limites');
    Actions.home();
    }
    }
  

  renderCard = (card, index) => {
    return (
      <View style={styles.card}>
        <Image style={{width: 150, height: 150}} source={require('../../components/images/product1.png')}/>
        <Text style={styles.text}>{card}</Text>
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
    alert.alert('Os produtos na sua região acabaram :(', 'Tente trocar novamente mais tarde');
    Actions.home();
    
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
          onSwipedLeft={() => {
            this.onSwiped('left')
            this.decreaselikes()}}
          onSwipedRight={() => { 
            this.onSwiped('right')
            this.decreaselikes()}}
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
              title: 'BLEAH',
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
