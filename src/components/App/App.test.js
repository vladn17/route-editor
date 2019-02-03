import React from 'react';
import App from './App';
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders title', () => {
  const wrapper = shallow(<App />);
  const welcome = <h1>Route Editor</h1>;
  expect(wrapper.contains(welcome)).toEqual(true);
});