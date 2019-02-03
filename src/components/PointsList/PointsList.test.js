import React from 'react';
import PointsList from './PointsList';
import { shallow } from "enzyme";

it('renders without crashing', () => {
  shallow(<PointsList />);
});