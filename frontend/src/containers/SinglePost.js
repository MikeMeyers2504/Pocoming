import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { votePost } from '../actions/index';

const SinglePost = props => {
	const { post, onSelect, onVote } = props;
	//const newTo = { pathname: "/test", params: post.id }; 
	// <Link to={newTo}>
    //<button>Down</button>
    //</Link>

	return (
		<li key={post.id} className="list-group-item">
			<div>
				<h3>{post.title}</h3>
				<div>
          			<p className="votes">Votes: {post.voteScore}</p>
          			<button onClick={() => onVote(post)}>Up</button>
          			<button>Down</button>
        		</div>
				<p>{post.commentCount} comments</p>
				<p>{post.category}</p>
				<button onClick={() => onSelect(post)}>Details</button> 
			</div>
		</li>
	);
};

export default SinglePost;
