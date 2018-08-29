import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../store/posts';
import './App.css';
import Posts from './Posts';
import PostForm from './PostForm';

export class App extends Component {
	constructor() {
		super();

		this.state = {
			showCreatePostForm: false,
		};

		this.showCreatePostForm = this.showCreatePostForm.bind(this);
		this.hideCreatePostForm = this.hideCreatePostForm.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	showCreatePostForm() {
		this.setState({
			showCreatePostForm: true,
		});
	}

	hideCreatePostForm() {
		this.setState({
			showCreatePostForm: false,
		});
	}

	handleSubmit(data) {
		this.props.dispatch(createPost(data));

		this.hideCreatePostForm();
	}

	render() {
		return (
			<Fragment>
				<header className="header">
					<h1 className="header__title">Blog</h1>

					<p>
						<button type="button" onClick={this.showCreatePostForm}>
							Create a post
						</button>
					</p>
				</header>

				<main className="content">
					{this.state.showCreatePostForm && (
						<div className="create-post">
							<h2>Create a post</h2>

							<PostForm
								closeForm={this.hideCreatePostForm}
								submit={this.handleSubmit}
							/>
						</div>
					)}

					<Posts />
				</main>
			</Fragment>
		);
	}
}

export default connect()(App);
