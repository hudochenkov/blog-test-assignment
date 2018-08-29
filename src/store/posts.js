import api from './api';

const actions = {
	REQUEST_POSTS: 'posts/request-posts',
	RECEIVE_POSTS: 'posts/receive-posts',
	DELETE_POST: 'posts/delete-post',
	ADD_POST: 'posts/add-post',
	UPDATE_POST: 'posts/update-post',
};

const defaultState = {
	byId: {},
	allIds: [],
	isFetching: false,
};

export default function reducer(state = defaultState, action = {}) {
	switch (action.type) {
		case actions.REQUEST_POSTS:
			return {
				...state,
				isFetching: true,
			};

		case actions.RECEIVE_POSTS:
			// Normalize state for easier operations later
			const newState = {
				byId: {},
				allIds: [],
			};

			action.payload.forEach(item => {
				const { id, ...otherInfo } = item;

				newState.allIds.push(id);
				newState.byId[id] = { id, ...otherInfo };
			});

			return {
				...state,
				...newState,
				isFetching: false,
			};

		case actions.DELETE_POST:
			const newIds = state.allIds.filter(item => {
				return item !== action.payload;
			});

			// Don't delete info from `byId`, because it doesn't make much sense for this MVP

			return {
				...state,
				allIds: newIds,
			};

		case actions.ADD_POST:
			return {
				...state,
				byId: {
					...state.byId,
					[action.payload.id]: action.payload,
				},
				allIds: [action.payload.id, ...state.allIds],
			};

		case actions.UPDATE_POST:
			const updatedPost = {
				...state.byId[action.payload.id],
				...action.payload,
			};

			return {
				...state,
				byId: {
					...state.byId,
					[action.payload.id]: updatedPost,
				},
			};

		default:
			return state;
	}
}

export function requestPosts() {
	return {
		type: actions.REQUEST_POSTS,
	};
}

export function receivePosts(payload) {
	return {
		type: actions.RECEIVE_POSTS,
		payload,
	};
}

export function deletePostFromStore(payload) {
	return {
		type: actions.DELETE_POST,
		payload,
	};
}

export function addPost(payload) {
	return {
		type: actions.ADD_POST,
		payload,
	};
}

export function updatePost(payload) {
	return {
		type: actions.UPDATE_POST,
		payload,
	};
}

// None of the following api() calls have specific logic for error handling, so .catch() wasn't used

export function fetchPosts() {
	return dispatch => {
		dispatch(requestPosts());

		return api('/posts').then(json => {
			return dispatch(receivePosts(json));
		});
	};
}

export function deletePost(id) {
	return dispatch => {
		return api(`/posts/${id}`, { method: 'DELETE' }).then(() => {
			return dispatch(deletePostFromStore(id));
		});
	};
}

export function createPost(data) {
	return dispatch => {
		const options = {
			method: 'POST',
			body: {
				...data,
				userId: 8, // We don't have userId in this MVP. Send hardcoded value
			},
		};

		return api('/posts', options).then(response => {
			return dispatch(addPost(response));
		});
	};
}

export function saveEditedPost(id, data) {
	return dispatch => {
		const options = {
			method: 'PATCH',
			body: data,
		};

		// Update UI instantly for better user experience
		dispatch(
			updatePost({
				id,
				...data,
			})
		);

		return api(`/posts/${id}`, options).then(response => {
			// And now update UI after real request
			// Saving user's input in case of an error is out of scope this MVP
			return dispatch(updatePost(response));
		});
	};
}
