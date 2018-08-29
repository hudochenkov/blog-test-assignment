import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post';

it('renders without crashing', () => {
	shallow(
		<Post
			post={{
				id: 23,
				title: 'hello',
				body: 'world',
			}}
			delete={() => {}}
			saveEdited={() => {}}
		/>
	);
});
