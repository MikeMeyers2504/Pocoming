import React, { Component } from "react";
import { connect } from 'react-redux';
import { voteUpPost, voteDownPost, postsFetchData, deletePost, fetchComments, deleteComment, selectComment, voteUpComment, voteDownComment } from '../actions/index';
import { Link } from 'react-router-dom';
import ThumbsD from 'react-icons/lib/ti/thumbs-down';
import ThumbsU from 'react-icons/lib/ti/thumbs-up';
import FaComment from 'react-icons/lib/fa/comment-o';
import FaComments from 'react-icons/lib/fa/comments-o';
import FaCalendar from 'react-icons/lib/fa/calendar';
import User from 'react-icons/lib/ti/user-outline';
import Edit from 'react-icons/lib/md/edit';
import Remove from 'react-icons/lib/md/highlight-remove';

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
          }
          return this.state.votes;
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
            if (nextProps.votedComment.id === comment.id) {
              const newStateComments = this.state.comments;
              newStateComments[index].voteScore = nextProps.votedComment.voteScore;
              this.setState(() => ({comments: newStateComments}));
            }
            return this.state.comments;
          })
        }
        return (
          this.state.votes,
          this.state.posts,
          this.state.comments
        )      
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
        <div className="detailsArea">         
          <p>Title: {this.props.post.title}</p>
          <p>Body: {this.props.post.body}</p>
          <p><User size={20}/> : {this.props.post.author}</p>
          <p><FaCalendar size={20}/> : {new Date(this.props.post.timestamp).toLocaleDateString()}</p>
          <p>Total <FaComments size={20}/> : {this.props.post.commentCount} </p>         
          <div>
            <p className="votes">Vote Score: {this.state.votes !== null ? this.state.votes : this.props.post.voteScore} </p>
            <button onClick={() => this.props.voteUpPost(this.props.post)}><ThumbsU size={20}/></button> 
            <button onClick={() => this.props.voteDownPost(this.props.post)}><ThumbsD size={20}/></button> 
          </div>
          <div className="button">
            <Link to="/editForm">
                <button><Edit size={20}/></button>
            </Link>
          </div>
          <div className="button">
            <Link to="/">
                <button onClick={() => this.props.deletePost(this.props.post)}><Remove size={20}/></button>
            </Link>
          </div>
        </div>

        <div className="commentsArea">
          <h3>Comments</h3>
          <Link to="/postDetails/newComment">
            <button>Add new <FaComment/></button>
          </Link>
          <ol>
            {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <div>
                  <h4>{comment.body}</h4>
                  <p><User size={20}/> : {comment.author}</p>
                  <p><FaCalendar size={20}/> : {new Date(comment.timestamp).toLocaleDateString()}</p>
                  <div>
                    <p className="votes">Vote Score: {comment.voteScore} </p>
                    <button onClick={() => this.props.voteUpComment(comment)}><ThumbsU size={20}/></button> 
                    <button onClick={() => this.props.voteDownComment(comment)}><ThumbsD size={20}/></button> 
                  </div>
                  <div className="button">
                    <Link to="/postDetails/editComment">
                        <button onClick={() => this.props.selectComment(comment)}><Edit size={20}/></button>
                    </Link>
                  </div>
                  <div className="button">
                    <Link to="/">
                      <button onClick={() => this.props.deleteComment(comment)}><Remove size={20}/></button>
                    </Link> 
                  </div>
                </div>
              </li>
            )
          })}
          </ol>
        </div>
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