import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import throttle from 'lodash.throttle';
import { fetchPosts, deletePost, saveEditedPost } from '../store/posts';
import './Posts.css';
import Post from './Post';

const itemsPerPage = 10;

export class Posts extends Component {
	constructor() {
		super();

		this.state = {
			currentPage: 1,
		};

		// this.onScroll = this.onScroll;
		// Performance optimization. Runs onScroll handler no more than once in 200ms.
		this.throttledOnScroll = throttle(this.onScroll.bind(this), 200);

		this.isEndOfList = this.isEndOfList.bind(this);
		this.showNextPage = this.showNextPage.bind(this);
	}

	componentDidMount() {
		this.props.fetchPosts();

		window.addEventListener('scroll', this.throttledOnScroll, false);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.throttledOnScroll, false);
	}

	onScroll() {
		// Return early if no posts loaded yet
		if (!this.props.postsList.length) {
			return;
		}

		// Return early if all posts are visible
		if (this.isEndOfList()) {
			return;
		}

		// Show more if page scrolled to position 1000 or less pixels from the bottom of the page
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
			this.showNextPage();
		}
	}

	isEndOfList() {
		return this.state.currentPage * itemsPerPage >= this.props.postsList.length;
	}

	showNextPage() {
		this.setState(prevState => ({
			currentPage: prevState.currentPage + 1,
		}));
	}

	render() {
		if (this.props.isFetching) {
			return <p>Loading posts.</p>;
		}

		return (
			<Fragment>
				<div className="posts">
					{this.props.postsList
						.filter((postId, index) => {
							return index < this.state.currentPage * itemsPerPage;
						})
						.map(postId => {
							const post = this.props.postsById[postId];

							return (
								<div className="posts__post" key={post.id}>
									<Post
										post={post}
										delete={this.props.deletePost}
										saveEdited={this.props.saveEditedPost}
									/>
								</div>
							);
						})}
				</div>

				{this.isEndOfList() && (
					<p className="no-more-posts">You see all posts. No more posts there.</p>
				)}
			</Fragment>
		);
	}
}

Posts.propTypes = {
	postsList: PropTypes.arrayOf(PropTypes.number).isRequired,
	postsById: PropTypes.objectOf(
		PropTypes.shape({
			id: PropTypes.number,
		})
	).isRequired,
	isFetching: PropTypes.bool.isRequired,
	fetchPosts: PropTypes.func.isRequired,
	deletePost: PropTypes.any,
	saveEditedPost: PropTypes.any,
};

function mapStateToProps(state) {
	return {
		postsList: state.posts.allIds,
		postsById: state.posts.byId,
		isFetching: state.posts.isFetching,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			fetchPosts,
			deletePost,
			saveEditedPost,
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Posts);
