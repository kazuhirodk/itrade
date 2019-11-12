import ProductTrade from '../../src/components/Product/ProductTrade.js'
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
import { Image, Text, View } from 'react-native'

import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<ProductTrade />);

describe('#ProductTrade', () => {
  it('matches snapshot properly', () => {
    const jsonProductTrade = renderer.create(<ProductTrade />).toJSON();
    expect(jsonProductTrade).toMatchSnapshot();
  });

  describe('#renderCard', () => {
    it('render card properly', () => {
      const renderedResponse = <View style={{"alignItems": "center", "backgroundColor": "white", "borderColor": "#E8E8E8", "borderRadius": 4, "borderWidth": 2, "flex": 1, "height": "50%", "justifyContent": "center"}}><Image source={{"testUri": "../../../src/components/images/product1.png"}} style={{"height": 150, "width": 150}} /><Text style={{"backgroundColor": "transparent", "fontSize": 50, "textAlign": "center"}} /></View>
      expect(wrapper.instance().renderCard()).toEqual(renderedResponse);
    })
  });

  describe('onSwipeAllCards', () => {
    it('set state for swipedAllCards to true', () => {
      wrapper.instance().onSwipedAllCards();
      expect(wrapper.instance().state.swipedAllCards).toBeTruthy();
    })
  });
});
