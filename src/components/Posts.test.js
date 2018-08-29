import React from 'react';
import { shallow } from 'enzyme';
import { Posts } from './Posts';

it('renders without crashing', () => {
	shallow(
		<Posts
			postsList={[23]}
			postsById={{
				23: {
					id: 23,
					title: 'hello',
					body: 'world',
				},
			}}
			isFetching={false}
			fetchPosts={() => {}}
			deletePost={() => {}}
			saveEditedPost={() => {}}
		/>
	);
});
