import React, { Component } from "react";
import { connect } from 'react-redux';

class PostDetail extends Component {
  render(){
  	if (!this.props.post) {
  		return <div>Select a post to get started</div>;
  	}
    return(
      <div>
        <h1>Post detail view</h1>
        <div>Title: {this.props.post.title}</div>
        <div>Body: {this.props.post.body}</div>
        <div>Author: {this.props.post.author}</div>
        <div>Timestamp: {new Date(this.props.post.timestamp).toLocaleDateString()}</div>
        <div>
          <p>Vote Score: {this.props.post.voteScore} </p>
          <button>Up</button> 
          <button>Down</button> 
        </div>
        <div>
          <p>Comments: {this.props.post.commentCount} </p>
          <button>Add new comment</button>
        </div>
        <button>Edit post</button>
        <button>Delete post</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		post: state.activePost
	};
}

export default connect(mapStateToProps)(PostDetail);