import ProfileEdit from '../../src/components/Profile/ProfileEdit.js'
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<ProfileEdit />);

describe('ProfileEdit', () => {
  it('matches snapshot properly', () => {
    const jsonProfileEdit = renderer.create(<ProfileEdit />).toJSON();
    expect(jsonProfileEdit).toMatchSnapshot();
  });

  describe('#onChangeText', () => {
    it('receive one or more info and add to state', () => {
      wrapper.instance().onChangeText('name', 'Nome do Usuário');
      wrapper.instance().onChangeText('email', 'email@teste.com');

      expect(wrapper.instance().state.name).toEqual('Nome do Usuário');
      expect(wrapper.instance().state.email).toEqual('email@teste.com');
    })
  });
});
