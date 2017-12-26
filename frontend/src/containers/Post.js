import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, postsFetchData} from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

class Post extends Component {
	state = {
        posts: []
    }

    componentWillMount() {
        this.props.fetchPosts()
        .then(data => {
            this.setState({posts: data.posts})
        })
    }

	render() {
		return this.state.posts.map((post) => {
			return (
				<li 
					key={post.id}  
					className="list-group-item"
				>
					<div>
						<h3>{post.title}</h3>
						<h3>{this.props.categories}</h3>
						<div>
          					<p className="votes">Votes: {post.voteScore}</p>
          					<button>Up</button> 
          					<button>Down</button> 
        				</div>
						<p>{post.commentCount} comments</p>
						<p>{post.category}</p>
						<Link to={'/postDetails'}>
                            <button onClick={() => this.props.selectPost(post)}>Go to</button>
                        </Link>
					</div>
				</li>
			);
		});
	}
}

function mapStateToProps(state) {
	return {
		posts: state.getPosts
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ selectPost: selectPost, fetchPosts: postsFetchData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
