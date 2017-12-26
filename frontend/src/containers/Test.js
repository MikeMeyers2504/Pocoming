import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories, postsFetchData, selectPost } from '../actions/index';

import SinglePost from './SinglePost';

class Test extends Component {
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

    renderCategories() {
        const { categories } = this.state
        if (categories === []) {
            return (
                <p>There are no categories</p>
            )
        }

        if (categories) {
            return categories.map((category) => {
                return (
                    <li key={category.name}>
                        <Link to={`test/${category.path}`}>
                            {category.name}
                        </Link>
                    </li>
                )
            })
        }
    }

    renderPosts() {
        const { posts } = this.state;
        if (posts === []) {
            return (
                <p>There are no posts</p>
            )
        }

        if (posts) {
            return posts.map((post) => {
                return (
                    <div key={post.id} className="post">
                                    <SinglePost 
                                        postId={post.id}
                                        onSelect={() => {
                                            selectPost(post)
                                        }}
                                    />
                                </div>
                )
            })
        }
    }

    sortCategories(type) {
    	switch(type) {
    		case 'name':
    			return this.setState((oldState) => ({
    				categories: oldState.categories.sort((a, b) => {
    					return a.name < b.name;
    				})
    			}))
    		default:
    			return this.state;
    	}
    }

	render(){
		return (
			<div>
				<li>All</li>
				{this.renderCategories()}
				<p>This is header</p>
				<button onClick={() => this.sortCategories('name')}>Name</button>
                {this.renderPosts()}
            </div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        categories: state.getCategories,
        posts: state.getPosts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        fetchPosts: () => dispatch(postsFetchData()),
        selectPost: (data) => dispatch(selectPost(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);