import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { votePost } from '../actions/index';
import { connect } from "react-redux";

class SinglePost extends Component{
	state = {
		votes: this.props.post.voteScore
	}
	//const newTo = { pathname: "/test", params: post.id }; 
	// <Link to={newTo}>
    //<button>Down</button>
    //</Link>
    render(){
    	const { post, onSelect } = this.props;
	return (
		<li key={post.id} className="list-group-item">
			<div>
				<h3>{post.title}</h3>
				<div>
          			<p className="votes">Votes: {this.state.votes}</p>
          			<button onClick={() => this.props.votePost(post)}>Up</button>
          			<button>Down</button>
        		</div>
				<p>{post.commentCount} comments</p>
				<p>{post.category}</p>
				<button onClick={() => onSelect(post)}>Details</button> 
			</div>
		</li>
	);
	}
};

const mapDispatchToProps = (dispatch) => {
    return {
        votePost: (data) => dispatch(votePost(data)),
    };
};

export default connect(null, mapDispatchToProps)(SinglePost);
