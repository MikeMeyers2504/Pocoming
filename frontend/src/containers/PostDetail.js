import React, { Component } from "react";
import { connect } from 'react-redux';
import { voteUpPost, voteDownPost, postsFetchData, deletePost, fetchComments, deleteComment } from '../actions/index';
import { Link } from 'react-router-dom';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: null,
      posts: [],
      comments: [],
    }
  }

  componentWillMount() {
        this.props.fetchPosts()
        .then(data => {
          this.setState({posts: data.posts})
        })
        this.props.fetchComments(this.props.post)
        .then(data => {
          this.setState({comments: data.comments})
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
    const { comments } = this.state;
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
        <Link to="/editForm">
            <button>Edit post</button>
        </Link>
        <Link to="/">
            <button onClick={() => this.props.deletePost(this.props.post)}>Delete post</button>
        </Link>
        <div>
          <p>Total number of comments: {this.props.post.commentCount} </p>         
        </div>
        <div>
          <p> comments: </p>
          <ol>
            {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <div>
                  <h4>{comment.body}</h4>
                  <p>{comment.author}</p>
                  <p>Timestamp: {new Date(comment.timestamp).toLocaleDateString()}</p>
                  <div>
                    <p>Vote Score: {comment.voteScore} </p>
                    <button>Up</button> 
                    <button>Down</button> 
                  </div>
                  <button>Edit</button>
                  <Link to="/">
                    <button onClick={() => this.props.deleteComment(comment)}>Delete</button>
                  </Link> 
                </div>
              </li>
            )
          })}
          </ol>
        </div>
        <Link to="/postDetails/newComment">
            <button>Add new comment</button>
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
    comments: state.comments,
	};
}

const mapDispatchToProps = (dispatch) => {
    return {
        voteUpPost: (data) => dispatch(voteUpPost(data)),
        voteDownPost: (data) => dispatch(voteDownPost(data)),
        fetchPosts: () => dispatch(postsFetchData()),
        deletePost: (data) => dispatch(deletePost(data)), 
        fetchComments: (data) => dispatch(fetchComments(data)),
        deleteComment: (data) => dispatch(deleteComment(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);