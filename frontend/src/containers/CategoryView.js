import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postsFetchData, selectPost } from '../actions/index';

import SinglePost from './SinglePost';

class Test extends Component {
	state = {
        posts: [],
        category: null
	}

	componentWillMount() {
        let categoryName = this.props.location.pathname.split("/");
        console.log(categoryName[2]);
        this.setState({category: categoryName[2]})
        this.props.fetchPosts()
        .then(data => {
            this.setState({posts: data.posts})
        })
    }

    renderPosts() {
        const { posts, category } = this.state;
        if (posts === []) {
            return (
                <p>There are no posts</p>
            )
        }
        if (posts) {
            return posts.filter(post => post.category === category).map((post) => {
                return (
                    <div key={post.id} className="postCategory">
                        <SinglePost 
                            onSelect={() => {
                                selectPost(post)
                            }}
                            postId={post.id}
                            />
                    </div>
                )
            })
        }
    }

	render(){
		return (
			<div>
                {this.renderPosts()}
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
        selectPost: (data) => dispatch(selectPost(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);