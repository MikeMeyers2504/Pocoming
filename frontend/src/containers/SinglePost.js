import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { voteUpPost, voteDownPost } from '../actions/index';
import { connect } from "react-redux";

class SinglePost extends Component{
	//const newTo = { pathname: "/test", params: post.id }; 
	// <Link to={newTo}>
    //<button>Down</button>
    //</Link>
    constructor(props) {
    	super(props);
    	this.text = props.text;

    	this.state = {
    		votes: null
    	}
  	}

  	componentDidMount() {
  		if (this.props.post)
  	}

    render(){
	    const { onSelect, posts, postId } = this.props;
		return posts.map((post) => {
			if (post.id === postId) {
				return (
					<li key={post.id} className="list-group-item">
						<div>
							<h3>{post.title}</h3>
							<div>
			          			<p className="votes">Votes: {post.voteScore}</p>
			          			<button onClick={() => this.props.voteUpPost(post)}>Up</button>
			          			<button onClick={() => this.props.voteDownPost(post)}>Down</button>
			        		</div>
							<p>{post.commentCount} comments</p>
							<p>{post.category}</p>
							<button onClick={() => onSelect(post)}>Details</button>
							<h3>{this.props.text}</h3> 
						</div>
					</li>
				);
			}
		});
	}
};

const mapStateToProps = (state, postId) => {
    return {
        posts: state.posts,
        text: state.posts.map((post) => {
        	return post.voteScore
        }),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        voteUpPost: (data) => dispatch(voteUpPost(data)),
        voteDownPost: (data) => dispatch(voteDownPost(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
