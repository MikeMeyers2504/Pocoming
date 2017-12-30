import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postsFetchData, fetchCategories, selectPost } from '../actions/index';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SinglePost from './SinglePost';

class HomeScreen extends Component {
    static propTypes = {
        fetchPosts: PropTypes.func.isRequired,
        posts: PropTypes.object.isRequired,

        fetchCategories: PropTypes.func.isRequired,
        categories: PropTypes.object.isRequired,
    }

    state = {
        categories: [],
        posts: []
    }

    componentWillMount() {
        this.props.fetchPosts()
        .then(data => {
            this.setState({posts: data.posts})
        })
        this.props.fetchCategories()
        .then(data => {
            this.setState({categories: data.categories})
        })
    }

    componentWillReceiveProps(nextProps) { 
      this.state.posts.map((post, index) => {
        if (post.id === nextProps.votedPost.id) {
            const newState = this.state.posts;
            newState[index].voteScore = nextProps.votedPost.voteScore;
            this.setState(() => ({ posts: newState})); 
        }
      })
    }

    sortPosts(type) {
        switch(type) {
            case 'votes':
                return this.setState((oldState) => ({
                    posts: oldState.posts.sort((a, b) => {
                        return a.voteScore < b.voteScore;
                    })
                }))
            case 'time':
                console.log("time" + this.state.posts);
                return this.setState((oldState) => ({
                    posts: oldState.posts.sort((a, b) => {
                        return a.timestamp < b.timestamp;
                    })
                }))
            default:
                return this.state;               
        }
    }

    render() {
        const { categories, posts } = this.state;
        return (
            <div>
                <div className="myHeader">
                    <h1>Home</h1>
                    <div>
                        <Link to="/newForm">Add a new post</Link>
                    </div>
                    <button className="sorting" onClick={() => this.sortPosts("time")}>Sort posts by time</button>
                    <button className="sorting" onClick={() => this.sortPosts("votes")}>Sort posts by votes</button>
                </div>
                {categories.map((category) => (
                    <div key={category.path} className="categories">
                        <Link to={`/categories/${category.path}`}>
                            <h3>
                                {category.name}
                            </h3>
                        </Link>
                        <div>
                            {posts.filter(post => post.category === category.name).map((post) => (
                                <div key={post.id} className="post">
                                    <SinglePost 
                                        postId={post.id}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.getPosts,
        categories: state.getCategories,
        votedPost: state.votedPost,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(postsFetchData()),
        fetchCategories: () => dispatch(fetchCategories()),
        selectPost: (data) => dispatch(selectPost(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
