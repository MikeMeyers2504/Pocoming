import React, { Component } from 'react';
import { voteUpPost, voteDownPost, postsFetchData, selectPost } from '../actions/index';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import ThumbsD from 'react-icons/lib/ti/thumbs-down';
import ThumbsU from 'react-icons/lib/ti/thumbs-up';

class SinglePost extends Component{
    constructor(props) {
    	super(props);
    	this.state = {
    		votes: null,
        posts: []
    	}
  	}

    componentWillMount() {
        this.props.fetchPosts()
        .then(data => {
          this.setState({posts: data.posts})
        })
    }

    componentDidMount() {
      if (this.state.posts && this.props.postId) {
        this.state.posts.map((post) => {
          if (post.id === this.props.postId) {
            this.setState({ votes: post.voteScore });
          }
          return this.state.votes;
        })
      }
    }

    componentWillReceiveProps(nextProps) { 
      this.state.posts.map((post, index) => {
        if (post.id === nextProps.votedPost.id) {
          if (nextProps.votedPost.id === this.props.postId) { 
            const newState = this.state.posts;
            newState[index].voteScore = nextProps.votedPost.voteScore;
            this.setState(() => ({ votes: nextProps.votedPost.voteScore, posts: newState})); 
          }
        }
        return (
          this.state.votes,
          this.state.posts
        )
      })
    }

    render(){
      const { postId } = this.props;
      const { posts } = this.state;
      if (!posts) {
        return (
          <p>There are no posts</p>
        )
      }
      if (posts) {
        return posts.filter(post => post.deleted === false).map((post, index) => {
          if (post.id === postId) {
            return (
              <li key={post.id} className="list-group-item">
                <div>
                  <h3>{post.title}</h3>
                  <div>
                    <p className="votes">Votes: {this.state.votes !== null ? this.state.votes : post.voteScore}</p>
                    <button onClick={() => this.props.voteUpPost(post)}><ThumbsU size={20}/></button>
                    <button onClick={() => this.props.voteDownPost(post)}><ThumbsD size={20}/></button>
                  </div>
                  <p>{post.commentCount} comments</p>
                  <Link to="/postDetails">
                      <button onClick={() => this.props.selectPost(post)}>Details</button>
                  </Link>
                </div>
              </li>
            );
          }
        });
      }     
	 }
};

const mapStateToProps = (state) => {
    return {
        votedPost: state.votedPost,
        posts: state.getPosts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        voteUpPost: (data) => dispatch(voteUpPost(data)),
        voteDownPost: (data) => dispatch(voteDownPost(data)),
        fetchPosts: () => dispatch(postsFetchData()),
        selectPost: (data) => dispatch(selectPost(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

