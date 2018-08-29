import React from 'react';
import { shallow } from 'enzyme';
import PostForm from './PostForm';

it('renders without crashing', () => {
	shallow(<PostForm title="hello" body="world" closeForm={() => {}} submit={() => {}} />);
});
