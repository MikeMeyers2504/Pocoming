import React, { Component } from "react";
import { connect } from 'react-redux';
import { voteUpPost, voteDownPost, postsFetchData, deletePost, fetchComments, deleteComment, selectComment, voteUpComment, voteDownComment } from '../actions/index';
import { Link } from 'react-router-dom';

class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: null,
      posts: [],
      comments: [],
      votesComment: null,
    }
  }

  componentWillMount() {
        this.props.fetchPosts()
        .then(data => {
          this.setState({posts: data.posts})
        })
        if (this.props.post) {
            this.props.fetchComments(this.props.post)
              .then(data => {
                this.setState({comments: data.comments})
              })
        }
    }

    componentDidMount() {
      if (this.state.posts) {
        this.state.posts.map((post) => {
          if (post.id === this.props.post.id) {
            this.setState({ votes: this.props.post.voteScore });
            if (this.state.comments) {
              this.state.comments.map((comment) => {
                if (post.id === comment.parentId) {
                  this.setState({ votesComment: this.props.comment.voteScore });
                }
              })
            }
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
        if (this.state.comments) {
          this.state.comments.map((comment, index) => {
            if (nextProps.votedComment.parentId === post.id) {
              const newStateComments = this.state.comments;
              newStateComments[index].voteScore = nextProps.votedComment.voteScore;
              this.setState(() => ({ votesComment: nextProps.votedComment.voteScore, comments: newStateComments}));
            }
          })
        }
      })
    }

  render(){
    const { comments } = this.state;
    if (!this.props.post) {
  		return <h2>In the home screen click on "Details" to see the post details</h2>;
  	}
    return(
      <div className="postDetail">
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
        <div className="commentsArea">
          <ol>
            {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <div>
                  <h4>{comment.body}</h4>
                  <p>{comment.author}</p>
                  <p>Timestamp: {new Date(comment.timestamp).toLocaleDateString()}</p>
                  <div>
                    <p>Vote Score: {this.state.votesComment !== null ? this.state.votesComment : comment.voteScore} </p>
                    <button onClick={() => this.props.voteUpComment(comment)}>Up</button> 
                    <button onClick={() => this.props.voteDownComment(comment)}>Down</button> 
                  </div>
                  <Link to="/postDetails/editComment">
                      <button onClick={() => this.props.selectComment(comment)}>Edit</button>
                  </Link>
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
    votedComment: state.votedComment,
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
        selectComment: (data) => dispatch(selectComment(data)),
        voteUpComment: (data) => dispatch(voteUpComment(data)),
        voteDownComment: (data) => dispatch(voteDownComment(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);