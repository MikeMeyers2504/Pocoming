import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postsFetchData } from '../actions/index';
import PropTypes from 'prop-types';
import Post from './Post';

class AllPosts extends Component {
    static propTypes = {
        fetchPosts: PropTypes.func.isRequired,
        posts: PropTypes.object.isRequired,
    }

    state = {
        posts: []
    }

    componentWillMount() {
        this.props.fetchPosts()
        .then(data => {
            this.setState({posts: data.posts})
        })
    }

    render() {
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
        posts: state.getPosts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => dispatch(postsFetchData()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);