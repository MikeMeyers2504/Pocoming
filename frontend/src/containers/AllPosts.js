import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postsFetchData } from '../actions/index';
import PropTypes from 'prop-types';
import Post from './Post';

class AllPosts extends Component {
    static propTypes = {
        fetchPosts: PropTypes.func.isRequired,
        posts: PropTypes.array.isRequired,
        hasErrored: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired
    }

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the posts</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div>
                <ul>
                    <Post />
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts,
        hasErrored: state.postsHasErrored,
        isLoading: state.postsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(postsFetchData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);