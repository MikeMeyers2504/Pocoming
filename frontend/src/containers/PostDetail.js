import React, { Component } from "react";
import { connect } from 'react-redux';
import { voteUpPost, voteDownPost, postsFetchData, deletePost } from '../actions/index';
import { Link } from 'react-router-dom';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: null,
      posts: [],
    }
  }

  componentWillMount() {
        this.props.fetchPosts()
        .then(data => {
          this.setState({posts: data.posts})
        })
    }

    componentDidMount() {
      if (this.state.posts) {
        this.state.posts.map((post) => {
          if (post.id === this.props.post.id) {
            this.setState({ votes: this.props.post.voteScore });
          }
        })
      }
    }

    componentWillReceiveProps(nextProps) { 
      this.state.posts.map((post, index) => {
        if (post.id === nextProps.votedPost.id) {
          if (nextProps.votedPost.id === this.props.post.id) { 
            const newState = this.state.posts;
            newState[index].voteScore = nextProps.votedPost.voteScore;
            this.setState(() => ({ votes: nextProps.votedPost.voteScore, posts: newState})); 
          }
        }
      })
    }

  render(){
  	if (!this.props.post) {
  		return <div>In the home screen click on "Details" to see the post details</div>;
  	}
    return(
      <div>
        <h1>Post detail view</h1>
        <div>Title: {this.props.post.title}</div>
        <div>Body: {this.props.post.body}</div>
        <div>Author: {this.props.post.author}</div>
        <div>Timestamp: {new Date(this.props.post.timestamp).toLocaleDateString()}</div>
        <div>
          <p>Vote Score: {this.state.votes !== null ? this.state.votes : this.props.post.voteScore} </p>
          <button onClick={() => this.props.voteUpPost(this.props.post)}>Up</button> 
          <button onClick={() => this.props.voteDownPost(this.props.post)}>Down</button> 
        </div>
        <div>
          <p>Comments: {this.props.post.commentCount} </p>
          <button>Add new comment</button>
        </div>
        <Link to="/editForm">
            <button>Edit post</button>
        </Link>
        <Link to="/">
            <button onClick={() => this.props.deletePost(this.props.post)}>Delete post</button>
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
	return {
		post: state.activePost,
    posts: state.getPosts,
    votedPost: state.votedPost,
	};
}

const mapDispatchToProps = (dispatch) => {
    return {
        voteUpPost: (data) => dispatch(voteUpPost(data)),
        voteDownPost: (data) => dispatch(voteDownPost(data)),
        fetchPosts: () => dispatch(postsFetchData()),
        deletePost: (data) => dispatch(deletePost(data)), 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);