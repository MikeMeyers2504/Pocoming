import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/index';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Post from '../containers/Post';

class Categories extends Component {
  /*constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }*/

  /*handleClick(e) {
    e.preventDefault();
    this.props.history.push('/newForm');
  }*/

  /*<button onClick={this.handleClick} >Add a new post</button>*/ // this is with return in render method

  static propTypes = {
        fetchCategories: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        hasErrored: PropTypes.bool.isRequired,
        isLoading: PropTypes.bool.isRequired
  }

  componentDidMount() {
    this.props.fetchCategories();
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
                <div className="header">
                    <h1>Home</h1>
                    <Link to="/newForm">Add a new post</Link>
                </div>
                <div>
                { this.props.categories.map((category) => (
                    <div key={category.path} className="categories">
                        <h2>
                            {category.name}
                        </h2>
                        <select>
                            <option value="title">Sort posts by ...</option>
                            <option value="time">Time</option>
                            <option value="votes">Votes</option>
                        </select>
                        <Post
                            categories={category.name} 
                        />
                    </div>
                ))}
                </div>
            </div>
        );
  }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        hasErrored: state.categoriesHasErrored,
        isLoading: state.categoriesIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
