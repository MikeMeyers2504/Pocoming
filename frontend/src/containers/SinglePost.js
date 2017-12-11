import React, { Component } from 'react';
import { selectPost} from '../actions/index';

const SinglePost = props => {
	const { post, onSelect } = props;
	return (
		<li key={post.id} onClick={() => onSelect(post)} className="list-group-item">
			<div>
				<h3>{post.title}</h3>
				<div>
          			<p className="votes">Votes: {post.voteScore}</p>
          			<button>Up</button> 
          			<button>Down</button> 
        		</div>
				<p>{post.commentCount} comments</p>
				<p>{post.category}</p>
			</div>
		</li>
	);
};

export default SinglePost;
