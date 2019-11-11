import ProductCreate from '../../src/components/Product/ProductCreate.js'
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<ProductCreate />);

describe('ProductCreate', () => {
  it('matches snapshot properly', () => {
    const jsonProductCreate = renderer.create(<ProductCreate />).toJSON();
    expect(jsonProductCreate).toMatchSnapshot();
  });

  describe('#onChangeText', () => {
    it('receive one or more info and add to state', () => {
      wrapper.instance().onChangeText('name', 'Nome do Produto');
      wrapper.instance().onChangeText('preco', '3');

      expect(wrapper.instance().state.name).toEqual('Nome do Produto');
      expect(wrapper.instance().state.preco).toEqual('3');
    })
  });
});
