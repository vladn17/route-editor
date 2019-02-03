import React from 'react';
import PointInput from './PointInput';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<PointInput />);
});