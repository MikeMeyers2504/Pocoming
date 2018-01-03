import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { createComment } from '../actions/index';

class AddComment extends Component {
  constructor(props) {
    super(props)
    const { post } = props
    if (post) {
      this.state = {
        parentId: post.id,
      }
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.props.body && this.props.author) {
      this.props.onSubmit({
          body: this.props.body,
          author: this.props.author,
          parentId: this.state.parentId
        })
      return this.props.history.push("/");
    }else {
      alert("You can't submit the comment with an empty field for body!");
    } 
  }

  render() {
    if (!this.props.post) {
      return <h2>Something has gone wrong, please go back.</h2>;
    }
    return (
    <form onSubmit={this.handleSubmit}>
      <div className="form">
        <div>
          <label>Body: </label>
          <Field name="body" component="textarea" type="text" placeholder="Body"/>
        </div>
        <div>
          <label>Author: </label>
          <Field name="author" component="input" type="text" placeholder="Author"/>
        </div> 
        <div>
          <button type='submit'>Create</button>
        </div>
      </div>
    </form>
    )
  }
}

const mapStateToProps = (state) => {
    const selector = formValueSelector('AddComment')
    return {
        body: selector(state, 'body'),
        author: selector(state, 'author'),
        initialValues: null,
        post: state.activePost,
    };
};

const mapDispatchToProps = (dispatch) => {
  return {
      onSubmit: (data) => {dispatch(createComment(data))}
  };
};

const myReduxForm = reduxForm({
  form: 'AddComment', 
})(AddComment)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(myReduxForm)
