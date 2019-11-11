import Home from '../../src/components/Home/Home.js'
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('#Home', () => {
  it('matches snapshot properly', () => {
    const jsonHome = renderer.create(<Home />).toJSON();
    expect(jsonHome).toMatchSnapshot();
  });
});
