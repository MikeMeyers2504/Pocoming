import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost} from '../actions/index';
import { bindActionCreators } from 'redux';

class Post extends Component {
	render() {
		return this.props.posts.map((post) => {
			return (
				<li 
					key={post.id} 
					onClick={() => this.props.selectPost(post)} 
					className="list-group-item"
				>
					<div>
						<h3>{post.title}</h3>
						<div>
          					<p className="votes">Votes: {post.voteScore}</p>
          					<button>Up</button> 
          					<button>Down</button> 
        				</div>
						<p>{post.commentCount} comments</p>
					</div>
				</li>
			);
		});
	}
}

function mapStateToProps(state) {

	return {
		posts: state.posts
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ selectPost: selectPost}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
