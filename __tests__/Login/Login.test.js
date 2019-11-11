import Login from '../../src/components/Login/Login.js'
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('#Login', () => {
  it('matches snapshot properly', () => {
    const jsonLogin = renderer.create(<Login />).toJSON();
    expect(jsonLogin).toMatchSnapshot();
  });
});
