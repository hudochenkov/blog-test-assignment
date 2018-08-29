import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PostForm.css';

class PostForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: props.title || '',
			body: props.body || '',
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		this.props.submit(this.state);
	}

	render() {
		return (
			<form className="edit-post" onSubmit={this.handleSubmit}>
				<p>
					<input
						type="text"
						name="title"
						className="edit-post__textfield"
						onChange={this.handleChange}
						value={this.state.title}
					/>
				</p>

				<p>
					<textarea
						name="body"
						rows="6"
						className="edit-post__textfield"
						onChange={this.handleChange}
						value={this.state.body}
					/>
				</p>

				<p>
					<button type="submit">Save</button>{' '}
					<button type="button" onClick={this.props.closeForm}>
						Discard
					</button>
				</p>
			</form>
		);
	}
}

PostForm.propTypes = {
	title: PropTypes.string,
	body: PropTypes.string,
	closeForm: PropTypes.func.isRequired,
	submit: PropTypes.func.isRequired,
};

export default PostForm;
