import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostForm from './PostForm';
import './Post.css';

class Post extends Component {
	constructor() {
		super();

		this.state = {
			isEditing: false,
		};

		this.handleDelete = this.handleDelete.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.closeEditForm = this.closeEditForm.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	handleDelete() {
		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Delete “${this.props.post.title}”?`)) {
			this.props.delete(this.props.post.id);
		}
	}

	handleSubmit(data) {
		this.props.saveEdited(this.props.post.id, data);

		this.closeEditForm();
	}

	handleEdit() {
		this.setState({
			isEditing: true,
		});
	}

	closeEditForm() {
		this.setState({
			isEditing: false,
		});
	}

	render() {
		const { post } = this.props;

		if (this.state.isEditing) {
			return (
				<PostForm
					title={post.title}
					body={post.body}
					closeForm={this.closeEditForm}
					submit={this.handleSubmit}
				/>
			);
		}

		return (
			<article className="post">
				<header className="post__header">
					<h2 className="post__title">{post.title}</h2>

					<ul className="post__actions">
						<li className="post__action">
							<button type="button" onClick={this.handleEdit}>
								edit
							</button>
						</li>

						<li className="post__action">
							<button type="button" onClick={this.handleDelete}>
								delete
							</button>
						</li>
					</ul>
				</header>

				<div className="post__body">{post.body}</div>
			</article>
		);
	}
}

Post.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.any.isRequired,
		title: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
	}).isRequired,
	delete: PropTypes.func.isRequired,
	saveEdited: PropTypes.func.isRequired,
};

export default Post;
