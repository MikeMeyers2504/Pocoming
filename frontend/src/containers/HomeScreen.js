import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postsFetchData, fetchCategories, selectPost, votePost } from '../actions/index';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import SinglePost from './SinglePost';

class HomeScreen extends Component {
    static propTypes = {
        fetchPosts: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired,
        postsHasErrored: PropTypes.bool.isRequired,
        postsIsLoading: PropTypes.bool.isRequired,

        fetchCategories: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        categoriesHasErrored: PropTypes.bool.isRequired,
        categoriesIsLoading: PropTypes.bool.isRequired
    }

    componentDidMount() {
        this.props.fetchPosts();
        this.props.fetchCategories();
    }

    render() {
        const { posts, categories } = this.props;
        if (this.props.categoriesHasErrored) {
            return <p>Sorry! There was an error loading the categories</p>;
        }
        if (this.props.categoriesIsLoading) {
            return <p>Loading categories …</p>;
        }
        if (this.props.postsHasErrored) {
            return <p>Sorry! There was an error loading the posts</p>;
        }

        if (this.props.postsIsLoading) {
            return <p>Loading posts …</p>;
        }
        return (
            <div>
                <div className="header">
                    <h1>Home</h1>
                    <Link to="/newForm">Add a new post</Link>
                </div>
                { categories.map((category) => (
                    <div key={category.path} className="categories">
                        <h2>
                            {category.name}
                        </h2>
                        <select>
                            <option value="title">Sort posts by ...</option>
                            <option value="time">Time</option>
                            <option value="votes">Votes</option>
                        </select>
                        <div>
                            {posts.filter(post => post.category === category.name).map((post) => (
                                <div key={post.id}>
                                    <SinglePost
                                        post={post} 
                                        onSelect={() => {
                                            selectPost(post)
                                        }}
                                        onVote={votePost(post)}
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
        posts: state.posts,
        postsHasErrored: state.postsHasErrored,
        postsIsLoading: state.postsIsLoading,

        categories: state.categories,
        categoriesHasErrored: state.categoriesHasErrored,
        categoriesIsLoading: state.categoriesIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(postsFetchData()),
        fetchCategories: () => dispatch(fetchCategories()),
        selectPost: (data) => dispatch(selectPost(data)),
        votePost: (data) => dispatch(votePost(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
