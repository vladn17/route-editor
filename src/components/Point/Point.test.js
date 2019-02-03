import React from 'react';
import Point from './index';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Point />);
});